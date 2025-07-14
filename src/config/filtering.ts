/*************************
 * Filter Types and Configuration
 *************************/

export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'isTrue' | 'isFalse';

export interface Filter {
  column: string;
  operator: FilterOperator;
  value: string | number | boolean;
}

import { type CardType } from './sorting';

// Filter field options for each card type (same as sort options)
export const FILTER_OPTIONS = {
  instance: [
    { label: 'Name', value: 'name', type: 'text' as const },
    { label: 'Instance ID', value: 'instanceId', type: 'text' as const },
    { label: 'Lab Profile', value: 'labProfile', type: 'text' as const },
    { label: 'Series', value: 'series', type: 'text' as const },
    { label: 'Student', value: 'student', type: 'text' as const },
    { label: 'State', value: 'state', type: 'select' as const, options: [
      { label: 'Running', value: 'running' },
      { label: 'Stopped', value: 'stopped' },
      { label: 'Paused', value: 'paused' },
      { label: 'Error', value: 'error' }
    ]},
    { label: 'Last Activity', value: 'lastActivity', type: 'text' as const },
    { label: 'Run Time', value: 'duration', type: 'text' as const },
  ],
  profile: [
    { label: 'Name', value: 'name', type: 'text' as const },
    { label: 'Number', value: 'number', type: 'text' as const },
    { label: 'Series Name', value: 'seriesName', type: 'text' as const },
    { label: 'Organization', value: 'organization', type: 'text' as const },
    { label: 'Platform', value: 'platform', type: 'select' as const, options: [
      { label: 'Windows', value: 'windows' },
      { label: 'Linux', value: 'linux' },
      { label: 'macOS', value: 'macos' }
    ]},
    { label: 'Status', value: 'statusLabel', type: 'select' as const, options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Draft', value: 'draft' }
    ]},
    { label: 'Created', value: 'created', type: 'text' as const },
    { label: 'Modified', value: 'modified', type: 'text' as const },
  ],
  series: [
    { label: 'Name', value: 'name', type: 'text' as const },
    { label: 'Organization', value: 'organization', type: 'text' as const },
    { label: 'Lab Profiles', value: 'labProfiles', type: 'text' as const },
    { label: 'Virtual Machines', value: 'virtualMachines', type: 'text' as const },
    { label: 'API Consumers', value: 'apiConsumers', type: 'text' as const },
    { label: 'Created', value: 'created', type: 'text' as const },
    { label: 'Modified', value: 'modified', type: 'text' as const },
  ],
  template: [
    { label: 'Name', value: 'name', type: 'text' as const },
    { label: 'Number', value: 'number', type: 'text' as const },
    { label: 'Series Name', value: 'seriesName', type: 'text' as const },
    { label: 'Organization', value: 'organization', type: 'text' as const },
    { label: 'Platform', value: 'platform', type: 'select' as const, options: [
      { label: 'Windows', value: 'windows' },
      { label: 'Linux', value: 'linux' },
      { label: 'macOS', value: 'macos' }
    ]},
    { label: 'Status', value: 'statusLabel', type: 'select' as const, options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Draft', value: 'draft' }
    ]},
    { label: 'Created', value: 'created', type: 'text' as const },
    { label: 'Modified', value: 'modified', type: 'text' as const },
  ],
};

// Default filter configurations for each card type (empty by default)
export const DEFAULT_FILTER_CONFIGS: Record<CardType, Filter[]> = {
  instance: [],
  profile: [],
  series: [],
  template: [],
};

// Operator options by field type
export const OPERATORS_BY_TYPE = {
  text: [
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts with', value: 'startsWith' },
    { label: 'Ends with', value: 'endsWith' },
  ],
  select: [
    { label: 'Equals', value: 'equals' },
  ],
  boolean: [
    { label: 'Is True', value: 'isTrue' },
    { label: 'Is False', value: 'isFalse' },
  ],
};

// Utility function to get filter options for a specific card type
export function getFilterOptions(cardType: CardType) {
  return FILTER_OPTIONS[cardType] || [];
}

// Utility function to get default filter config for a specific card type
export function getDefaultFilterConfig(cardType: CardType): Filter[] {
  return DEFAULT_FILTER_CONFIGS[cardType];
} 