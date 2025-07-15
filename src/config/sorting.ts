/*************************
 * Sort Types and Configuration
 *************************/

export type SortDirection = 'asc' | 'desc';

export type FieldType = 'string' | 'number' | 'date' | 'duration' | 'custom';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface SortFieldOption {
  label: string;
  value: string;
  type: FieldType;
  customOrder?: readonly string[];
}

export type CardType = 'instance' | 'profile' | 'series' | 'template';

// Custom sort orders for specific fields
export const CUSTOM_SORT_ORDERS = {
  state: ['Running', 'Saved', 'Building', 'Off', 'Tearing Down'],
  statusLabel: ['In Development', 'Awaiting Verification', 'Complete'],
} as const;

// Enhanced sort field options with type information
export const SORT_OPTIONS: Record<CardType, SortFieldOption[]> = {
  instance: [
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Instance ID', value: 'instanceId', type: 'number' },
    { label: 'Lab Profile', value: 'labProfile', type: 'string' },
    { label: 'Series', value: 'series', type: 'string' },
    { label: 'Student', value: 'student', type: 'string' },
    { label: 'State', value: 'state', type: 'custom', customOrder: CUSTOM_SORT_ORDERS.state },
    { label: 'Last Activity', value: 'lastActivity', type: 'date' },
    { label: 'Run Time', value: 'duration', type: 'duration' },
  ],
  profile: [
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Number', value: 'number', type: 'string' }, // Keep as string since it's alphanumeric
    { label: 'Series Name', value: 'seriesName', type: 'string' },
    { label: 'Organization', value: 'organization', type: 'string' },
    { label: 'Platform', value: 'platform', type: 'string' },
    { label: 'Status', value: 'statusLabel', type: 'custom', customOrder: CUSTOM_SORT_ORDERS.statusLabel },
    { label: 'Created', value: 'created', type: 'date' },
    { label: 'Modified', value: 'modified', type: 'date' },
  ],
  series: [
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Organization', value: 'organization', type: 'string' },
    { label: 'Lab Profiles', value: 'labProfiles', type: 'number' },
    { label: 'Virtual Machines', value: 'virtualMachines', type: 'number' },
    { label: 'API Consumers', value: 'apiConsumers', type: 'number' },
    { label: 'Created', value: 'created', type: 'date' },
    { label: 'Modified', value: 'modified', type: 'date' },
  ],
  template: [
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Number', value: 'number', type: 'string' }, // Keep as string since it's alphanumeric
    { label: 'Series Name', value: 'seriesName', type: 'string' },
    { label: 'Organization', value: 'organization', type: 'string' },
    { label: 'Platform', value: 'platform', type: 'string' },
    { label: 'Status', value: 'statusLabel', type: 'custom', customOrder: CUSTOM_SORT_ORDERS.statusLabel },
    { label: 'Created', value: 'created', type: 'date' },
    { label: 'Modified', value: 'modified', type: 'date' },
  ],
};

// Default sort configurations for each card type
export const DEFAULT_SORT_CONFIGS: Record<CardType, SortConfig> = {
  instance: { field: 'state', direction: 'asc' }, // Sort by state to see running instances first
  profile: { field: 'name', direction: 'asc' },
  series: { field: 'name', direction: 'asc' },
  template: { field: 'name', direction: 'asc' },
};

// Utility function to get sort options for a specific card type
export function getSortOptions(cardType: CardType): SortFieldOption[] {
  return SORT_OPTIONS[cardType] || [];
}

// Utility function to get default sort config for a specific card type
export function getDefaultSortConfig(cardType: CardType): SortConfig {
  return DEFAULT_SORT_CONFIGS[cardType];
}

// Utility function to get field type for a specific field
export function getFieldType(cardType: CardType, field: string): FieldType {
  const options = getSortOptions(cardType);
  const option = options.find(opt => opt.value === field);
  return option?.type || 'string';
}

// Utility function to get custom sort order for a field
export function getCustomSortOrder(cardType: CardType, field: string): readonly string[] | undefined {
  const options = getSortOptions(cardType);
  const option = options.find(opt => opt.value === field);
  return option?.customOrder;
} 