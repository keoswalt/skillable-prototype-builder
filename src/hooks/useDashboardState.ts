/*************************
 * Dashboard State Hook
 *************************/

import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { APP_CONSTANTS } from '@/config/constants';
import { CardType } from '@/config/sorting';

export function useDashboardState() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // State for managing starred items
  const [starredItems, setStarredItems, isStarredItemsLoaded] = useLocalStorage<Record<string, boolean>>(
    'skillable-ds-starred-items',
    APP_CONSTANTS.DEFAULT_STARRED_ITEMS
  );

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
    getCurrentCardType,
    isLoaded: isStarredItemsLoaded,
  };
} 