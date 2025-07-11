/*************************
 * Sorting Types
 *************************/

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export type CardType = 'instance' | 'profile' | 'series' | 'template';

export interface SortOption {
  label: string;
  value: string;
}

export interface SortConfigs {
  instance: SortConfig;
  profile: SortConfig;
  series: SortConfig;
  template: SortConfig;
} 