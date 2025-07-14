/*************************
 * Dashboard State Hook
 *************************/

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { APP_CONSTANTS } from '@/config/constants';
import { CardType } from '@/config/sorting';

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export function useDashboardState() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // State for managing starred items
  const [starredItems, setStarredItems, isStarredItemsLoaded] = useLocalStorage<Record<string, boolean>>(
    'skillable-ds-starred-items',
    APP_CONSTANTS.DEFAULT_STARRED_ITEMS
  );

  // State for managing pagination - persist in localStorage
  const [paginationState, setPaginationState, isPaginationLoaded] = useLocalStorage<PaginationState>(
    'skillable-ds-pagination',
    { currentPage: 1, pageSize: 25 }
  );

  const toggleStar = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setStarredItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updatePagination = (updates: Partial<PaginationState>) => {
    setPaginationState(prev => ({
      ...prev,
      ...updates
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
    paginationState,
    updatePagination,
    getCurrentCardType,
    isLoaded: isStarredItemsLoaded && isPaginationLoaded,
  };
} 