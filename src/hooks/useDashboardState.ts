/*************************
 * Dashboard State Hook
 *************************/

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { APP_CONSTANTS } from '@/config/constants';
import { CardType } from '@/config/sorting';
import { getTabIds } from '@/config/tabs';

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

interface PerTabPaginationState {
  [tabId: string]: PaginationState;
}

export function useDashboardState() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // State for managing starred items
  const [starredItems, setStarredItems, isStarredItemsLoaded] = useLocalStorage<Record<string, boolean>>(
    'skillable-ds-starred-items',
    APP_CONSTANTS.DEFAULT_STARRED_ITEMS
  );

  // State for managing pagination per tab - persist in localStorage
  const [perTabPaginationState, setPerTabPaginationState, isPaginationLoaded] = useLocalStorage<PerTabPaginationState>(
    'skillable-ds-per-tab-pagination',
    {}
  );

  // Get current tab ID
  const getCurrentTabId = (): string => {
    const tabIds = getTabIds();
    return tabIds[activeTabIndex] || tabIds[0];
  };

  // Get pagination state for current tab
  const getCurrentTabPagination = (): PaginationState => {
    const currentTabId = getCurrentTabId();
    return perTabPaginationState[currentTabId] || { currentPage: 1, pageSize: 25 };
  };

  // Update pagination for current tab
  const updateCurrentTabPagination = (updates: Partial<PaginationState>) => {
    const currentTabId = getCurrentTabId();
    setPerTabPaginationState(prev => ({
      ...prev,
      [currentTabId]: {
        ...(prev[currentTabId] || { currentPage: 1, pageSize: 25 }),
        ...updates
      }
    }));
  };

  // Update pagination for specific tab
  const updateTabPagination = (tabId: string, updates: Partial<PaginationState>) => {
    setPerTabPaginationState(prev => ({
      ...prev,
      [tabId]: {
        ...(prev[tabId] || { currentPage: 1, pageSize: 25 }),
        ...updates
      }
    }));
  };

  // Get pagination state for specific tab
  const getTabPagination = (tabId: string): PaginationState => {
    return perTabPaginationState[tabId] || { currentPage: 1, pageSize: 25 };
  };

  // Reset pagination for current tab
  const resetCurrentTabPagination = () => {
    const currentTabId = getCurrentTabId();
    setPerTabPaginationState(prev => ({
      ...prev,
      [currentTabId]: { currentPage: 1, pageSize: 25 }
    }));
  };

  // Reset pagination for all tabs
  const resetAllTabPagination = () => {
    const tabIds = getTabIds();
    const resetState: PerTabPaginationState = {};
    tabIds.forEach(tabId => {
      resetState[tabId] = { currentPage: 1, pageSize: 25 };
    });
    setPerTabPaginationState(resetState);
  };

  const toggleStar = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setStarredItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCurrentCardType = (): CardType => {
    const cardTypes: CardType[] = ['instance', 'profile', 'series', 'template'];
    return cardTypes[activeTabIndex];
  };

  return {
    activeTabIndex,
    setActiveTabIndex,
    starredItems,
    toggleStar,
    // Current tab pagination (for backward compatibility)
    paginationState: getCurrentTabPagination(),
    updatePagination: updateCurrentTabPagination,
    // Per-tab pagination methods
    getCurrentTabId,
    getCurrentTabPagination,
    updateCurrentTabPagination,
    updateTabPagination,
    getTabPagination,
    resetCurrentTabPagination,
    resetAllTabPagination,
    // All pagination state (for debugging/management)
    perTabPaginationState,
    getCurrentCardType,
    isLoaded: isStarredItemsLoaded && isPaginationLoaded,
  };
} 