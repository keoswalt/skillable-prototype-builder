/*************************
 * Sorting Hook
 *************************/

import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_SORT_CONFIGS, type SortConfig, type CardType } from '@/config/sorting';
import { APP_CONSTANTS } from '@/config/constants';
import { GenericSortFunction, BaseItem } from '@/types/generic';

export function useSorting() {
  const [sortConfigs, setSortConfigs, isSortConfigsLoaded] = useLocalStorage<Record<CardType, SortConfig>>(
    APP_CONSTANTS.STORAGE_KEYS.SORT_CONFIGS,
    DEFAULT_SORT_CONFIGS
  );

  const updateSortConfig = (cardType: CardType, field: string) => {
    setSortConfigs(prev => ({
      ...prev,
      [cardType]: {
        ...prev[cardType],
        field,
      }
    }));
  };

  const toggleSortDirection = (cardType: CardType) => {
    setSortConfigs(prev => ({
      ...prev,
      [cardType]: {
        ...prev[cardType],
        direction: prev[cardType].direction === 'asc' ? 'desc' : 'asc',
      }
    }));
  };

  const getCurrentSortConfig = (cardType: CardType): SortConfig => {
    return sortConfigs[cardType] || DEFAULT_SORT_CONFIGS[cardType];
  };

  const sortItems: GenericSortFunction<BaseItem> = <T extends BaseItem>(
    items: T[], 
    sortConfig: SortConfig
  ): T[] => {
    return [...items].sort((a, b) => {
      // First, sort by starred status (starred items always come first)
      const aStarred = a.starred || false;
      const bStarred = b.starred || false;
      
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      
      // If both items have the same starred status, apply the user-selected sort
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      // Handle different data types
      let comparison = 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // Fallback to string comparison
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      // Apply sort direction
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  };

  return {
    sortConfigs,
    updateSortConfig,
    toggleSortDirection,
    getCurrentSortConfig,
    sortItems,
    isLoaded: isSortConfigsLoaded,
  };
} 