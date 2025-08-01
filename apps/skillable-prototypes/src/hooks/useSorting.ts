/*************************
 * Sorting Hook
 *************************/

import { useLocalStorage } from './useLocalStorage';
import { DEFAULT_SORT_CONFIGS, type SortConfig, type CardType } from '@/config/sorting';
import { APP_CONSTANTS } from '@/config/constants';
import { GenericSortFunction, BaseItem } from '@/types/generic';
import { getSortOptions, getFieldType, getCustomSortOrder } from '@/config/sorting';
import { compareValues } from '@/utils/sortingUtils';

export function useSorting() {
  const [sortConfigs, setSortConfigs, isSortConfigsLoaded] = useLocalStorage<Record<CardType, SortConfig>>(
    APP_CONSTANTS.STORAGE_KEYS.SORT_CONFIGS,
    DEFAULT_SORT_CONFIGS
  );

  // Validate sort configuration against data model
  const validateSortConfig = (cardType: CardType, sortConfig: SortConfig): boolean => {
    const validFields = getSortOptions(cardType).map(option => option.value);
    return validFields.includes(sortConfig.field);
  };

  // Synchronize sort configuration with data model
  const synchronizeSortConfig = (cardType: CardType, data: BaseItem[]): SortConfig => {
    const currentConfig = sortConfigs[cardType] || DEFAULT_SORT_CONFIGS[cardType];
    
    // Check if current field exists in data
    if (data.length > 0 && !(currentConfig.field in data[0])) {
      // Fall back to default configuration
      return DEFAULT_SORT_CONFIGS[cardType];
    }
    
    // Validate against available sort options
    if (!validateSortConfig(cardType, currentConfig)) {
      return DEFAULT_SORT_CONFIGS[cardType];
    }
    
    return currentConfig;
  };

  // Update sort configuration with validation
  const updateSortConfig = (cardType: CardType, field: string) => {
    // Validate the field exists in sort options
    const validFields = getSortOptions(cardType).map(option => option.value);
    if (!validFields.includes(field)) {
      console.warn(`Invalid sort field "${field}" for card type "${cardType}"`);
      return;
    }

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

  // Get synchronized sort configuration for specific data
  const getSynchronizedSortConfig = (cardType: CardType, data: BaseItem[]): SortConfig => {
    return synchronizeSortConfig(cardType, data);
  };

  // Reset sort configuration to defaults
  const resetSortConfig = (cardType: CardType) => {
    setSortConfigs(prev => ({
      ...prev,
      [cardType]: DEFAULT_SORT_CONFIGS[cardType]
    }));
  };

  // Reset all sort configurations
  const resetAllSortConfigs = () => {
    setSortConfigs(DEFAULT_SORT_CONFIGS);
  };

  // Validate all sort configurations
  const validateAllSortConfigs = (): Record<CardType, boolean> => {
    const validation: Record<CardType, boolean> = {} as Record<CardType, boolean>;
    
    Object.keys(sortConfigs).forEach(cardType => {
      validation[cardType as CardType] = validateSortConfig(cardType as CardType, sortConfigs[cardType as CardType]);
    });
    
    return validation;
  };

  const sortItems: GenericSortFunction<BaseItem> = <T extends BaseItem>(
    items: T[], 
    sortConfig: SortConfig,
    cardType?: CardType
  ): T[] => {
    return [...items].sort((a, b) => {
      // First, sort by starred status (starred items always come first)
      const aStarred = a.starred || false;
      const bStarred = b.starred || false;
      
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      
      // If both items have the same starred status, apply the user-selected sort
      const aValue = (a as Record<string, unknown>)[sortConfig.field];
      const bValue = (b as Record<string, unknown>)[sortConfig.field];
      
      // Get field type and custom order for proper comparison
      const fieldType = cardType ? getFieldType(cardType, sortConfig.field) : 'string';
      const customOrder = cardType ? getCustomSortOrder(cardType, sortConfig.field) : undefined;
      
      // Use the new comparison function
      const comparison = compareValues(aValue, bValue, fieldType, customOrder);
      
      // Apply sort direction
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  };

  return {
    sortConfigs,
    updateSortConfig,
    toggleSortDirection,
    getCurrentSortConfig,
    getSynchronizedSortConfig,
    validateSortConfig,
    synchronizeSortConfig,
    resetSortConfig,
    resetAllSortConfigs,
    validateAllSortConfigs,
    sortItems,
    isLoaded: isSortConfigsLoaded,
  };
} 