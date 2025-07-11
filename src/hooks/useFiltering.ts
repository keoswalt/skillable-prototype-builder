/*************************
 * Filtering Hook
 *************************/

import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_FILTER_CONFIGS, type Filter, OPERATORS_BY_TYPE } from '@/config/filtering';
import { type CardType } from '@/config/sorting';
import { APP_CONSTANTS } from '@/config/constants';

export function useFiltering() {
  const [filterConfigs, setFilterConfigs, isFilterConfigsLoaded] = useLocalStorage<Record<CardType, Filter[]>>(
    APP_CONSTANTS.STORAGE_KEYS.FILTER_CONFIGS,
    DEFAULT_FILTER_CONFIGS
  );

  const updateFilterConfig = (cardType: CardType, filters: Filter[]) => {
    setFilterConfigs(prev => ({
      ...prev,
      [cardType]: filters,
    }));
  };

  const getCurrentFilterConfig = (cardType: CardType): Filter[] => {
    return filterConfigs[cardType] || DEFAULT_FILTER_CONFIGS[cardType];
  };

  const applyFilters = <T extends { starred?: boolean; [key: string]: any }>(
    items: T[], 
    filters: Filter[]
  ): T[] => {
    if (!filters || filters.length === 0) {
      return items;
    }

    return items.filter(item => {
      return filters.every(filter => {
        const itemValue = item[filter.column];
        const filterValue = filter.value;

        // Handle different operators
        switch (filter.operator) {
          case 'equals':
            return String(itemValue).toLowerCase() === String(filterValue).toLowerCase();
          
          case 'contains':
            return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
          
          case 'startsWith':
            return String(itemValue).toLowerCase().startsWith(String(filterValue).toLowerCase());
          
          case 'endsWith':
            return String(itemValue).toLowerCase().endsWith(String(filterValue).toLowerCase());
          
          case 'greaterThan':
            const numValue1 = Number(itemValue);
            const numFilter1 = Number(filterValue);
            return !isNaN(numValue1) && !isNaN(numFilter1) && numValue1 > numFilter1;
          
          case 'lessThan':
            const numValue2 = Number(itemValue);
            const numFilter2 = Number(filterValue);
            return !isNaN(numValue2) && !isNaN(numFilter2) && numValue2 < numFilter2;
          
          case 'isTrue':
            return Boolean(itemValue) === true;
          
          case 'isFalse':
            return Boolean(itemValue) === false;
          
          default:
            return true;
        }
      });
    });
  };

  return {
    filterConfigs,
    updateFilterConfig,
    getCurrentFilterConfig,
    applyFilters,
    isLoaded: isFilterConfigsLoaded,
  };
} 