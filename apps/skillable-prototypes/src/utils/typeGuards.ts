/*************************
 * Type Guards
 * Runtime type checking and validation utilities
 *************************/

import { BaseItem, GenericCardType, GenericSortConfig, GenericFilter } from '@/types/generic';
import { InstanceItem, ProfileItem, SeriesItem, TemplateItem } from '@/types/dashboard';

// Type guard for BaseItem
export function isBaseItem(item: unknown): item is BaseItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as BaseItem).id === 'number' &&
    typeof (item as BaseItem).name === 'string' &&
    typeof (item as BaseItem).starred === 'boolean'
  );
}

// Type guard for InstanceItem
export function isInstanceItem(item: unknown): item is InstanceItem {
  return (
    isBaseItem(item) &&
    typeof (item as InstanceItem).instanceId === 'string' &&
    typeof (item as InstanceItem).labProfile === 'string' &&
    typeof (item as InstanceItem).series === 'string' &&
    typeof (item as InstanceItem).student === 'string' &&
    typeof (item as InstanceItem).instructionSet === 'string' &&
    typeof (item as InstanceItem).duration === 'string' &&
    typeof (item as InstanceItem).lastActivity === 'string' &&
    typeof (item as InstanceItem).state === 'string'
  );
}

// Type guard for ProfileItem
export function isProfileItem(item: unknown): item is ProfileItem {
  return (
    isBaseItem(item) &&
    typeof (item as ProfileItem).number === 'string' &&
    typeof (item as ProfileItem).seriesName === 'string' &&
    typeof (item as ProfileItem).organization === 'string' &&
    typeof (item as ProfileItem).platform === 'string' &&
    typeof (item as ProfileItem).created === 'string' &&
    typeof (item as ProfileItem).modified === 'string' &&
    typeof (item as ProfileItem).statusLabel === 'string' &&
    typeof (item as ProfileItem).statusTone === 'string' &&
    typeof (item as ProfileItem).onStarToggle === 'function'
  );
}

// Type guard for SeriesItem
export function isSeriesItem(item: unknown): item is SeriesItem {
  return (
    isBaseItem(item) &&
    typeof (item as SeriesItem).organization === 'string' &&
    typeof (item as SeriesItem).labProfiles === 'string' &&
    typeof (item as SeriesItem).virtualMachines === 'string' &&
    typeof (item as SeriesItem).apiConsumers === 'string' &&
    typeof (item as SeriesItem).created === 'string' &&
    typeof (item as SeriesItem).modified === 'string' &&
    typeof (item as SeriesItem).onStarToggle === 'function'
  );
}

// Type guard for TemplateItem
export function isTemplateItem(item: unknown): item is TemplateItem {
  return (
    isBaseItem(item) &&
    typeof (item as TemplateItem).number === 'string' &&
    typeof (item as TemplateItem).seriesName === 'string' &&
    typeof (item as TemplateItem).organization === 'string' &&
    typeof (item as TemplateItem).platform === 'string' &&
    typeof (item as TemplateItem).created === 'string' &&
    typeof (item as TemplateItem).modified === 'string' &&
    typeof (item as TemplateItem).onStarToggle === 'function'
  );
}

// Type guard for GenericCardType
export function isCardType(value: unknown): value is GenericCardType {
  return typeof value === 'string' && ['instance', 'profile', 'series', 'template'].includes(value);
}

// Type guard for GenericSortConfig
export function isSortConfig(config: unknown): config is GenericSortConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof (config as GenericSortConfig).field === 'string' &&
    typeof (config as GenericSortConfig).direction === 'string' &&
    ['asc', 'desc'].includes((config as GenericSortConfig).direction)
  );
}

// Type guard for GenericFilter
export function isFilter(filter: unknown): filter is GenericFilter {
  return (
    typeof filter === 'object' &&
    filter !== null &&
    typeof (filter as GenericFilter).column === 'string' &&
    typeof (filter as GenericFilter).operator === 'string' &&
    ['equals', 'contains', 'startsWith', 'endsWith', 'greaterThan', 'lessThan', 'isTrue', 'isFalse'].includes((filter as GenericFilter).operator) &&
    (typeof (filter as GenericFilter).value === 'string' || typeof (filter as GenericFilter).value === 'number' || typeof (filter as GenericFilter).value === 'boolean')
  );
}

// Type guard for array of BaseItems
export function isBaseItemArray(items: unknown): items is BaseItem[] {
  return Array.isArray(items) && items.every(isBaseItem);
}

// Type guard for array of InstanceItems
export function isInstanceItemArray(items: unknown): items is InstanceItem[] {
  return Array.isArray(items) && items.every(isInstanceItem);
}

// Type guard for array of ProfileItems
export function isProfileItemArray(items: unknown): items is ProfileItem[] {
  return Array.isArray(items) && items.every(isProfileItem);
}

// Type guard for array of SeriesItems
export function isSeriesItemArray(items: unknown): items is SeriesItem[] {
  return Array.isArray(items) && items.every(isSeriesItem);
}

// Type guard for array of TemplateItems
export function isTemplateItemArray(items: unknown): items is TemplateItem[] {
  return Array.isArray(items) && items.every(isTemplateItem);
}

// Type guard for array of GenericFilters
export function isFilterArray(filters: unknown): filters is GenericFilter[] {
  return Array.isArray(filters) && filters.every(isFilter);
}

// Type guard for CSV data validation
export function isValidCSVData(data: unknown): data is Record<string, unknown>[] {
  return Array.isArray(data) && data.every(item => typeof item === 'object' && item !== null);
}

// Type guard for starred items record
export function isStarredItemsRecord(starredItems: unknown): starredItems is Record<string, boolean> {
  return (
    typeof starredItems === 'object' &&
    starredItems !== null &&
    Object.entries(starredItems as Record<string, unknown>).every(([key, value]) => 
      typeof key === 'string' && typeof value === 'boolean'
    )
  );
}

// Utility function to validate dashboard item with fallback
export function validateDashboardItem<T extends BaseItem>(item: unknown, fallback: T): T {
  if (isBaseItem(item)) {
    return item as T;
  }
  console.warn('Invalid dashboard item detected, using fallback:', item);
  return fallback;
}

// Utility function to validate array of dashboard items
export function validateDashboardItemArray<T extends BaseItem>(items: unknown, fallback: T[]): T[] {
  if (Array.isArray(items) && items.every(isBaseItem)) {
    return items as T[];
  }
  console.warn('Invalid dashboard item array detected, using fallback:', items);
  return fallback;
} 