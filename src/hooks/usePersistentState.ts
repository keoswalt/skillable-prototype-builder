/*************************
 * Persistent State Hook
 * Configurable state persistence with migration and cleanup utilities
 *************************/

import { useState, useEffect, useCallback } from 'react';

export type PersistenceType = 'localStorage' | 'sessionStorage' | 'none';

interface PersistenceConfig {
  type: PersistenceType;
  key: string;
  version?: string;
  migrate?: (oldData: unknown, oldVersion: string) => unknown;
  validate?: (data: unknown) => boolean;
  cleanup?: (data: unknown) => unknown;
}

interface UsePersistentStateOptions<T> {
  key: string;
  defaultValue: T;
  persistenceType?: PersistenceType;
  version?: string;
  migrate?: (oldData: unknown, oldVersion: string) => T;
  validate?: (data: unknown) => data is T;
  cleanup?: (data: T) => T;
  debounceMs?: number;
}

interface PersistentStateResult<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  isLoaded: boolean;
  clear: () => void;
  reset: () => void;
  migrate: (newVersion: string, migrationFn: (oldData: T, oldVersion: string) => T) => void;
}

// Storage utilities
const getStorage = (type: PersistenceType): Storage | null => {
  if (typeof window === 'undefined') return null;
  
  switch (type) {
    case 'localStorage':
      return window.localStorage;
    case 'sessionStorage':
      return window.sessionStorage;
    case 'none':
      return null;
    default:
      return null;
  }
};

const getStorageKey = (key: string, version?: string): string => {
  return version ? `${key}@v${version}` : key;
};

const getVersionKey = (key: string): string => {
  return `${key}@version`;
};

// Migration utilities
const migrateState = <T>(
  storage: Storage,
  key: string,
  currentVersion: string,
  migrationFn: (oldData: unknown, oldVersion: string) => T,
  defaultValue: T
): T => {
  try {
    // Try to get current version
    const versionKey = getVersionKey(key);
    const storedVersion = storage.getItem(versionKey);
    
    if (!storedVersion) {
      // No version stored, try to get data without version
      const oldData = storage.getItem(key);
      if (oldData) {
        const parsed = JSON.parse(oldData);
        const migrated = migrationFn(parsed, 'unknown');
        // Store with new version
        storage.setItem(getStorageKey(key, currentVersion), JSON.stringify(migrated));
        storage.setItem(versionKey, currentVersion);
        return migrated;
      }
    } else if (storedVersion !== currentVersion) {
      // Version mismatch, migrate
      const oldData = storage.getItem(getStorageKey(key, storedVersion));
      if (oldData) {
        const parsed = JSON.parse(oldData);
        const migrated = migrationFn(parsed, storedVersion);
        // Store with new version
        storage.setItem(getStorageKey(key, currentVersion), JSON.stringify(migrated));
        storage.setItem(versionKey, currentVersion);
        // Clean up old version
        storage.removeItem(getStorageKey(key, storedVersion));
        return migrated;
      }
    } else {
      // Same version, load normally
      const data = storage.getItem(getStorageKey(key, currentVersion));
      if (data) {
        return JSON.parse(data);
      }
    }
  } catch (error) {
    console.warn(`Failed to migrate state for key "${key}":`, error);
  }
  
  return defaultValue;
};

// Validation utilities
const validateState = <T>(
  data: unknown,
  validate?: (data: unknown) => data is T,
  defaultValue: T
): T => {
  if (validate && !validate(data)) {
    console.warn(`Invalid state data for key, using default value`);
    return defaultValue;
  }
  return data as T;
};

// Cleanup utilities
const cleanupState = <T>(
  data: T,
  cleanup?: (data: T) => T
): T => {
  if (cleanup) {
    return cleanup(data);
  }
  return data;
};

export function usePersistentState<T>({
  key,
  defaultValue,
  persistenceType = 'localStorage',
  version,
  migrate,
  validate,
  cleanup,
  debounceMs = 100
}: UsePersistentStateOptions<T>): PersistentStateResult<T> {
  const [value, setValueState] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const storage = getStorage(persistenceType);

  // Load initial state
  useEffect(() => {
    if (!storage || persistenceType === 'none') {
      setIsLoaded(true);
      return;
    }

    try {
      let loadedValue: T;

      if (version && migrate) {
        // Use migration
        loadedValue = migrateState(storage, key, version, migrate, defaultValue);
      } else {
        // Simple load
        const data = storage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          loadedValue = validateState(parsed, validate, defaultValue);
        } else {
          loadedValue = defaultValue;
        }
      }

      // Apply cleanup
      loadedValue = cleanupState(loadedValue, cleanup);
      
      setValueState(loadedValue);
    } catch (error) {
      console.warn(`Failed to load persistent state for key "${key}":`, error);
      setValueState(defaultValue);
    } finally {
      setIsLoaded(true);
    }
  }, [key, defaultValue, persistenceType, version, migrate, validate, cleanup, storage]);

  // Save state with debouncing
  const saveToStorage = useCallback((newValue: T) => {
    if (!storage || persistenceType === 'none') return;

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      try {
        const cleanedValue = cleanupState(newValue, cleanup);
        const storageKey = getStorageKey(key, version);
        storage.setItem(storageKey, JSON.stringify(cleanedValue));
        
        if (version) {
          storage.setItem(getVersionKey(key), version);
        }
      } catch (error) {
        console.warn(`Failed to save persistent state for key "${key}":`, error);
      }
    }, debounceMs);

    setDebounceTimer(timer);
  }, [storage, persistenceType, debounceTimer, debounceMs, key, version, cleanup]);

  // Set value function
  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValueState(prev => {
      const nextValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      saveToStorage(nextValue);
      return nextValue;
    });
  }, [saveToStorage]);

  // Clear function
  const clear = useCallback(() => {
    if (storage && persistenceType !== 'none') {
      try {
        const storageKey = getStorageKey(key, version);
        storage.removeItem(storageKey);
        if (version) {
          storage.removeItem(getVersionKey(key));
        }
      } catch (error) {
        console.warn(`Failed to clear persistent state for key "${key}":`, error);
      }
    }
    setValueState(defaultValue);
  }, [storage, persistenceType, key, version, defaultValue]);

  // Reset function
  const reset = useCallback(() => {
    setValueState(defaultValue);
    saveToStorage(defaultValue);
  }, [defaultValue, saveToStorage]);

  // Migrate function
  const migrate = useCallback((newVersion: string, migrationFn: (oldData: T, oldVersion: string) => T) => {
    if (!storage || persistenceType === 'none') return;

    try {
      const migratedValue = migrateState(storage, key, newVersion, migrationFn, defaultValue);
      setValueState(migratedValue);
      saveToStorage(migratedValue);
    } catch (error) {
      console.warn(`Failed to migrate state for key "${key}":`, error);
    }
  }, [storage, persistenceType, key, defaultValue, saveToStorage]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    value,
    setValue,
    isLoaded,
    clear,
    reset,
    migrate
  };
}

// Utility functions for state management
export const clearAllPersistentState = (type: PersistenceType = 'localStorage'): void => {
  const storage = getStorage(type);
  if (!storage) return;

  try {
    storage.clear();
  } catch (error) {
    console.warn('Failed to clear all persistent state:', error);
  }
};

export const getPersistentStateKeys = (type: PersistenceType = 'localStorage'): string[] => {
  const storage = getStorage(type);
  if (!storage) return [];

  try {
    return Object.keys(storage);
  } catch (error) {
    console.warn('Failed to get persistent state keys:', error);
    return [];
  }
};

export const removePersistentState = (key: string, type: PersistenceType = 'localStorage'): void => {
  const storage = getStorage(type);
  if (!storage) return;

  try {
    storage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove persistent state for key "${key}":`, error);
  }
}; 