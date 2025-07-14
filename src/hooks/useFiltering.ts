/*************************
 * Filtering Hook
 *************************/

import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_FILTER_CONFIGS, type Filter } from '@/config/filtering';
import { type CardType } from '@/config/sorting';
import { APP_CONSTANTS } from '@/config/constants';
import { GenericFilterFunction, BaseItem } from '@/types/generic';
import { getFilterOptions } from '@/config/filtering';

export function useFiltering() {
  const [filterConfigs, setFilterConfigs, isFilterConfigsLoaded] = useLocalStorage<Record<CardType, Filter[]>>(
    APP_CONSTANTS.STORAGE_KEYS.FILTER_CONFIGS,
    DEFAULT_FILTER_CONFIGS
  );

  // Validate filter configuration against data model
  const validateFilterConfig = (cardType: CardType, filters: Filter[]): Filter[] => {
    const validColumns = getFilterOptions(cardType).map(option => option.value);
    
    return filters.filter(filter => {
      const isValidColumn = validColumns.includes(filter.column);
      if (!isValidColumn) {
        console.warn(`Invalid filter column "${filter.column}" for card type "${cardType}"`);
      }
      return isValidColumn;
    });
  };

  // Synchronize filter configuration with data model
  const synchronizeFilterConfig = (cardType: CardType, data: BaseItem[]): Filter[] => {
    const currentFilters = filterConfigs[cardType] || DEFAULT_FILTER_CONFIGS[cardType];
    
    // Validate filters against available columns
    const validatedFilters = validateFilterConfig(cardType, currentFilters);
    
    // Check if filter columns exist in data
    if (data.length > 0) {
      return validatedFilters.filter(filter => {
        const columnExists = filter.column in data[0];
        if (!columnExists) {
          console.warn(`Filter column "${filter.column}" not found in data for card type "${cardType}"`);
        }
        return columnExists;
      });
    }
    
    return validatedFilters;
  };

  // Update filter configuration with validation
  const updateFilterConfig = (cardType: CardType, filters: Filter[]) => {
    // Validate all filters before updating
    const validatedFilters = validateFilterConfig(cardType, filters);
    
    // Only update if all filters are valid
    if (validatedFilters.length === filters.length) {
      setFilterConfigs(prev => ({
        ...prev,
        [cardType]: filters,
      }));
    } else {
      console.warn(`Some filters were invalid for card type "${cardType}" and were not applied`);
      // Update with only valid filters
      setFilterConfigs(prev => ({
        ...prev,
        [cardType]: validatedFilters,
      }));
    }
  };

  const getCurrentFilterConfig = (cardType: CardType): Filter[] => {
    return filterConfigs[cardType] || DEFAULT_FILTER_CONFIGS[cardType];
  };

  // Get synchronized filter configuration for specific data
  const getSynchronizedFilterConfig = (cardType: CardType, data: BaseItem[]): Filter[] => {
    return synchronizeFilterConfig(cardType, data);
  };

  // Add a single filter
  const addFilter = (cardType: CardType, filter: Filter) => {
    const currentFilters = getCurrentFilterConfig(cardType);
    const newFilters = [...currentFilters, filter];
    updateFilterConfig(cardType, newFilters);
  };

  // Remove a filter by index
  const removeFilter = (cardType: CardType, filterIndex: number) => {
    const currentFilters = getCurrentFilterConfig(cardType);
    const newFilters = currentFilters.filter((_, index) => index !== filterIndex);
    updateFilterConfig(cardType, newFilters);
  };

  // Update a specific filter
  const updateFilter = (cardType: CardType, filterIndex: number, filter: Filter) => {
    const currentFilters = getCurrentFilterConfig(cardType);
    const newFilters = [...currentFilters];
    newFilters[filterIndex] = filter;
    updateFilterConfig(cardType, newFilters);
  };

  // Clear all filters for a card type
  const clearFilters = (cardType: CardType) => {
    updateFilterConfig(cardType, []);
  };

  // Clear all filters for all card types
  const clearAllFilters = () => {
    setFilterConfigs(DEFAULT_FILTER_CONFIGS);
  };

  // Validate all filter configurations
  const validateAllFilterConfigs = (): Record<CardType, boolean> => {
    const validation: Record<CardType, boolean> = {} as Record<CardType, boolean>;
    
    Object.keys(filterConfigs).forEach(cardType => {
      const currentFilters = filterConfigs[cardType as CardType];
      const validatedFilters = validateFilterConfig(cardType as CardType, currentFilters);
      validation[cardType as CardType] = validatedFilters.length === currentFilters.length;
    });
    
    return validation;
  };

  const applyFilters: GenericFilterFunction<BaseItem> = <T extends BaseItem>(
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
    getSynchronizedFilterConfig,
    validateFilterConfig,
    synchronizeFilterConfig,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    clearAllFilters,
    validateAllFilterConfigs,
    applyFilters,
    isLoaded: isFilterConfigsLoaded,
  };
} 