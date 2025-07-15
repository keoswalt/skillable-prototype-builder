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

  // Shared page size across all tabs
  const [sharedPageSize, setSharedPageSize, isSharedPageSizeLoaded] = useLocalStorage<number>(
    'skillable-ds-shared-page-size',
    25
  );

  // State for managing current page per tab - persist in localStorage
  const [perTabCurrentPage, setPerTabCurrentPage, isCurrentPageLoaded] = useLocalStorage<Record<string, number>>(
    'skillable-ds-per-tab-current-page',
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
    return {
      currentPage: perTabCurrentPage[currentTabId] || 1,
      pageSize: sharedPageSize
    };
  };

  // Update pagination for current tab
  const updateCurrentTabPagination = (updates: Partial<PaginationState>) => {
    const currentTabId = getCurrentTabId();
    
    // Handle page size updates (shared across all tabs)
    if (updates.pageSize !== undefined) {
      setSharedPageSize(updates.pageSize);
      // Reset all tabs to page 1 when page size changes
      const tabIds = getTabIds();
      const resetCurrentPages: Record<string, number> = {};
      tabIds.forEach(tabId => {
        resetCurrentPages[tabId] = 1;
      });
      setPerTabCurrentPage(resetCurrentPages);
    }
    
    // Handle current page updates (per tab)
    if (updates.currentPage !== undefined) {
      setPerTabCurrentPage(prev => ({
        ...prev,
        [currentTabId]: updates.currentPage!
      }));
    }
  };

  // Update pagination for specific tab
  const updateTabPagination = (tabId: string, updates: Partial<PaginationState>) => {
    // Handle page size updates (shared across all tabs)
    if (updates.pageSize !== undefined) {
      setSharedPageSize(updates.pageSize);
      // Reset all tabs to page 1 when page size changes
      const tabIds = getTabIds();
      const resetCurrentPages: Record<string, number> = {};
      tabIds.forEach(id => {
        resetCurrentPages[id] = 1;
      });
      setPerTabCurrentPage(resetCurrentPages);
    }
    
    // Handle current page updates (per tab)
    if (updates.currentPage !== undefined) {
      setPerTabCurrentPage(prev => ({
        ...prev,
        [tabId]: updates.currentPage!
      }));
    }
  };

  // Get pagination state for specific tab
  const getTabPagination = (tabId: string): PaginationState => {
    return {
      currentPage: perTabCurrentPage[tabId] || 1,
      pageSize: sharedPageSize
    };
  };

  // Reset pagination for current tab
  const resetCurrentTabPagination = () => {
    const currentTabId = getCurrentTabId();
    setPerTabCurrentPage(prev => ({
      ...prev,
      [currentTabId]: 1
    }));
  };

  // Reset pagination for all tabs
  const resetAllTabPagination = () => {
    const tabIds = getTabIds();
    const resetState: Record<string, number> = {};
    tabIds.forEach(tabId => {
      resetState[tabId] = 1;
    });
    setPerTabCurrentPage(resetState);
  };

  // Update shared page size (affects all tabs)
  const updateSharedPageSize = (newPageSize: number) => {
    setSharedPageSize(newPageSize);
    // Reset all tabs to page 1 when page size changes
    const tabIds = getTabIds();
    const resetCurrentPages: Record<string, number> = {};
    tabIds.forEach(tabId => {
      resetCurrentPages[tabId] = 1;
    });
    setPerTabCurrentPage(resetCurrentPages);
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
    // Shared page size methods
    sharedPageSize,
    updateSharedPageSize,
    // All pagination state (for debugging/management)
    perTabCurrentPage,
    getCurrentCardType,
    isLoaded: isStarredItemsLoaded && isSharedPageSizeLoaded && isCurrentPageLoaded,
  };
} 