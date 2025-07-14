/*************************
 * State Synchronization Hook
 * Handles synchronization between different state management hooks
 *************************/

import { useCallback, useMemo } from 'react';
import { useSorting } from './useSorting';
import { useFiltering } from './useFiltering';
import { useDashboardState } from './useDashboardState';
import { BaseItem } from '@/types/generic';
import { CardType } from '@/config/sorting';

interface UseStateSynchronizationProps {
  cardType: CardType;
  data: BaseItem[];
}

interface SynchronizedState {
  sortConfig: ReturnType<typeof useSorting>['getCurrentSortConfig'];
  filterConfig: ReturnType<typeof useFiltering>['getCurrentFilterConfig'];
  paginationState: ReturnType<typeof useDashboardState>['getCurrentTabPagination'];
  isValid: boolean;
  validationErrors: string[];
}

export function useStateSynchronization({ cardType, data }: UseStateSynchronizationProps) {
  const {
    getCurrentSortConfig,
    getSynchronizedSortConfig,
    validateSortConfig,
    resetSortConfig,
  } = useSorting();

  const {
    getCurrentFilterConfig,
    getSynchronizedFilterConfig,
    validateFilterConfig,
    clearFilters,
  } = useFiltering();

  const {
    getCurrentTabPagination,
    resetCurrentTabPagination,
  } = useDashboardState();

  // Validate current state against data model
  const validateCurrentState = useCallback((): SynchronizedState => {
    const validationErrors: string[] = [];
    
    // Validate sort configuration
    const currentSortConfig = getCurrentSortConfig(cardType);
    const isSortValid = validateSortConfig(cardType, currentSortConfig);
    if (!isSortValid) {
      validationErrors.push(`Invalid sort configuration for ${cardType}`);
    }
    
    // Validate filter configuration
    const currentFilterConfig = getCurrentFilterConfig(cardType);
    const validatedFilters = validateFilterConfig(cardType, currentFilterConfig);
    const isFilterValid = validatedFilters.length === currentFilterConfig.length;
    if (!isFilterValid) {
      validationErrors.push(`Invalid filter configuration for ${cardType}`);
    }
    
    // Validate pagination state
    const paginationState = getCurrentTabPagination();
    const isPaginationValid = paginationState.currentPage >= 1 && paginationState.pageSize > 0;
    if (!isPaginationValid) {
      validationErrors.push(`Invalid pagination state for ${cardType}`);
    }
    
    return {
      sortConfig: currentSortConfig,
      filterConfig: currentFilterConfig,
      paginationState,
      isValid: isSortValid && isFilterValid && isPaginationValid,
      validationErrors,
    };
  }, [cardType, data, getCurrentSortConfig, validateSortConfig, getCurrentFilterConfig, validateFilterConfig, getCurrentTabPagination]);

  // Get synchronized state for current data
  const getSynchronizedState = useCallback((): SynchronizedState => {
    const synchronizedSortConfig = getSynchronizedSortConfig(cardType, data);
    const synchronizedFilterConfig = getSynchronizedFilterConfig(cardType, data);
    const paginationState = getCurrentTabPagination();
    
    return {
      sortConfig: synchronizedSortConfig,
      filterConfig: synchronizedFilterConfig,
      paginationState,
      isValid: true,
      validationErrors: [],
    };
  }, [cardType, data, getSynchronizedSortConfig, getSynchronizedFilterConfig, getCurrentTabPagination]);

  // Reset state to defaults for current card type
  const resetState = useCallback(() => {
    resetSortConfig(cardType);
    clearFilters(cardType);
    resetCurrentTabPagination();
  }, [cardType, resetSortConfig, clearFilters, resetCurrentTabPagination]);

  // Auto-synchronize state when data changes
  const autoSynchronize = useCallback(() => {
    const currentState = validateCurrentState();
    
    if (!currentState.isValid) {
      console.warn('State synchronization issues detected:', currentState.validationErrors);
      
      // Auto-fix common issues
      if (data.length > 0) {
        // Use synchronized configurations
        const synchronizedState = getSynchronizedState();
        return synchronizedState;
      }
    }
    
    return currentState;
  }, [validateCurrentState, getSynchronizedState, data]);

  // Check if state needs synchronization
  const needsSynchronization = useMemo(() => {
    const currentState = validateCurrentState();
    return !currentState.isValid;
  }, [validateCurrentState]);

  // Get recommended state fixes
  const getStateFixes = useCallback(() => {
    const currentState = validateCurrentState();
    const fixes: string[] = [];
    
    if (!currentState.isValid) {
      fixes.push('Reset to default configurations');
      if (data.length > 0) {
        fixes.push('Use synchronized configurations');
      }
    }
    
    return fixes;
  }, [validateCurrentState, data]);

  return {
    validateCurrentState,
    getSynchronizedState,
    resetState,
    autoSynchronize,
    needsSynchronization,
    getStateFixes,
  };
} 