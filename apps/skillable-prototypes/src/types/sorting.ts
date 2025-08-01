/*************************
 * Sorting Types
 *************************/

import { GenericSortConfig, GenericSortOption, GenericCardType } from './generic';

export type SortDirection = 'asc' | 'desc';

// Use generic types directly instead of empty interfaces
export type SortConfig = GenericSortConfig;
export type CardType = GenericCardType;
export type SortOption = GenericSortOption;

export interface SortConfigs {
  instance: SortConfig;
  profile: SortConfig;
  series: SortConfig;
  template: SortConfig;
} 