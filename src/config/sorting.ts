/*************************
 * Sort Types and Configuration
 *************************/

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export type CardType = 'instance' | 'profile' | 'series' | 'template';

// Sort field options for each card type
export const SORT_OPTIONS = {
  instance: [
    { label: 'Name', value: 'name' },
    { label: 'Instance ID', value: 'instanceId' },
    { label: 'Lab Profile', value: 'labProfile' },
    { label: 'Series', value: 'series' },
    { label: 'User', value: 'user' },
    { label: 'State', value: 'state' },
    { label: 'Last Activity', value: 'lastActivity' },
    { label: 'Duration', value: 'duration' },
  ],
  profile: [
    { label: 'Name', value: 'name' },
    { label: 'Number', value: 'number' },
    { label: 'Series Name', value: 'seriesName' },
    { label: 'Organization', value: 'organization' },
    { label: 'Platform', value: 'platform' },
    { label: 'Status', value: 'statusLabel' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
  series: [
    { label: 'Name', value: 'name' },
    { label: 'Organization', value: 'organization' },
    { label: 'Lab Profiles', value: 'labProfiles' },
    { label: 'Virtual Machines', value: 'virtualMachines' },
    { label: 'API Consumers', value: 'apiConsumers' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
  template: [
    { label: 'Name', value: 'name' },
    { label: 'Number', value: 'number' },
    { label: 'Series Name', value: 'seriesName' },
    { label: 'Organization', value: 'organization' },
    { label: 'Platform', value: 'platform' },
    { label: 'Status', value: 'statusLabel' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
};

// Default sort configurations for each card type
export const DEFAULT_SORT_CONFIGS: Record<CardType, SortConfig> = {
  instance: { field: 'name', direction: 'asc' },
  profile: { field: 'name', direction: 'asc' },
  series: { field: 'name', direction: 'asc' },
  template: { field: 'name', direction: 'asc' },
};

// Utility function to get sort options for a specific card type
export function getSortOptions(cardType: CardType) {
  return SORT_OPTIONS[cardType] || [];
}

// Utility function to get default sort config for a specific card type
export function getDefaultSortConfig(cardType: CardType): SortConfig {
  return DEFAULT_SORT_CONFIGS[cardType];
} 