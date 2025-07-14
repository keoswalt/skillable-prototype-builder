import React, { useState } from 'react';
import { usePersistentState, PersistenceType } from './usePersistentState';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  lastVisit: string;
}

interface OldUserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export const UsePersistentStateExample: React.FC = () => {
  const [persistenceType, setPersistenceType] = useState<PersistenceType>('localStorage');
  const [showDebug, setShowDebug] = useState(false);

  // Example 1: Simple persistent state
  const { 
    value: counter, 
    setValue: setCounter, 
    isLoaded: isCounterLoaded,
    clear: clearCounter,
    reset: resetCounter 
  } = usePersistentState({
    key: 'example-counter',
    defaultValue: 0,
    persistenceType
  });

  // Example 2: Complex object with validation
  const { 
    value: userPrefs, 
    setValue: setUserPrefs, 
    isLoaded: isUserPrefsLoaded,
    clear: clearUserPrefs,
    reset: resetUserPrefs,
    migrate: migrateUserPrefs
  } = usePersistentState<UserPreferences>({
    key: 'example-user-preferences',
    defaultValue: {
      theme: 'light',
      language: 'en',
      notifications: true,
      lastVisit: new Date().toISOString()
    },
    persistenceType,
    version: '2.0',
    validate: (data): data is UserPreferences => {
      return (
        typeof data === 'object' &&
        data !== null &&
        'theme' in data &&
        'language' in data &&
        'notifications' in data &&
        'lastVisit' in data
      );
    },
    migrate: (oldData, oldVersion) => {
      console.log(`Migrating from version ${oldVersion} to 2.0`);
      
      if (oldVersion === '1.0' || oldVersion === 'unknown') {
        // Migrate from old format
        const oldPrefs = oldData as OldUserPreferences;
        return {
          ...oldPrefs,
          lastVisit: new Date().toISOString()
        };
      }
      
      return oldData as UserPreferences;
    },
    cleanup: (data) => ({
      ...data,
      lastVisit: new Date().toISOString()
    })
  });

  // Example 3: Session-only state
  const { 
    value: sessionData, 
    setValue: setSessionData, 
    isLoaded: isSessionLoaded 
  } = usePersistentState({
    key: 'example-session-data',
    defaultValue: { visits: 0, currentPage: 'home' },
    persistenceType: 'sessionStorage'
  });

  // Example 4: No persistence
  const { 
    value: tempData, 
    setValue: setTempData, 
    isLoaded: isTempLoaded 
  } = usePersistentState({
    key: 'example-temp-data',
    defaultValue: { temp: 'This will not persist' },
    persistenceType: 'none'
  });

  const handleThemeChange = () => {
    setUserPrefs(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const handleLanguageChange = (language: string) => {
    setUserPrefs(prev => ({
      ...prev,
      language
    }));
  };

  const handleNotificationsToggle = () => {
    setUserPrefs(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  const handleMigration = () => {
    migrateUserPrefs('3.0', (oldData, oldVersion) => {
      console.log(`Migrating from ${oldVersion} to 3.0`);
      return {
        ...oldData,
        theme: 'dark', // Force dark theme in new version
        language: 'en',
        notifications: true,
        lastVisit: new Date().toISOString()
      };
    });
  };

  if (!isCounterLoaded || !isUserPrefsLoaded || !isSessionLoaded || !isTempLoaded) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-center mt-2">Loading persistent state...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Persistent State Examples</h2>
      
      {/* Persistence Type Selector */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Persistence Type</h3>
        <div className="flex space-x-4">
          {(['localStorage', 'sessionStorage', 'none'] as PersistenceType[]).map((type) => (
            <button
              key={type}
              onClick={() => setPersistenceType(type)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                persistenceType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Current: {persistenceType} - Try changing this and refreshing the page to see the difference
        </p>
      </div>

      {/* Example 1: Simple Counter */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Simple Counter</h3>
        <div className="border rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">{counter}</span>
            <button
              onClick={() => setCounter(prev => prev + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Increment
            </button>
            <button
              onClick={() => setCounter(prev => prev - 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Decrement
            </button>
            <button
              onClick={resetCounter}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Reset
            </button>
            <button
              onClick={clearCounter}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Example 2: User Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">User Preferences (with Migration)</h3>
        <div className="border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <button
                onClick={handleThemeChange}
                className={`px-4 py-2 rounded ${
                  userPrefs.theme === 'light' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-800 text-white'
                }`}
              >
                {userPrefs.theme === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={userPrefs.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Notifications</label>
              <button
                onClick={handleNotificationsToggle}
                className={`px-4 py-2 rounded ${
                  userPrefs.notifications 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}
              >
                {userPrefs.notifications ? '🔔 On' : '🔕 Off'}
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Last Visit</label>
              <p className="text-sm text-gray-600">
                {new Date(userPrefs.lastVisit).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              onClick={resetUserPrefs}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Reset to Default
            </button>
            <button
              onClick={clearUserPrefs}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear
            </button>
            <button
              onClick={handleMigration}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Migrate to v3.0
            </button>
          </div>
        </div>
      </div>

      {/* Example 3: Session Data */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Session Data</h3>
        <div className="border rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <span>Visits: {sessionData.visits}</span>
            <span>Current Page: {sessionData.currentPage}</span>
            <button
              onClick={() => setSessionData(prev => ({ 
                ...prev, 
                visits: prev.visits + 1 
              }))}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Increment Visits
            </button>
            <button
              onClick={() => setSessionData(prev => ({ 
                ...prev, 
                currentPage: prev.currentPage === 'home' ? 'dashboard' : 'home' 
              }))}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Toggle Page
            </button>
          </div>
        </div>
      </div>

      {/* Example 4: Temporary Data */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Temporary Data (No Persistence)</h3>
        <div className="border rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <span>{tempData.temp}</span>
            <button
              onClick={() => setTempData({ temp: 'Updated at ' + new Date().toLocaleTimeString() })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This data will be lost when you refresh the page
          </p>
        </div>
      </div>

      {/* Debug Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-800">Debug Information</h3>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            {showDebug ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showDebug && (
          <div className="border rounded-lg p-6 bg-gray-50">
            <pre className="text-sm overflow-auto">
              {JSON.stringify({
                persistenceType,
                counter,
                userPrefs,
                sessionData,
                tempData
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsePersistentStateExample; 