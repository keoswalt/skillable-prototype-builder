/*************************
 * App-wide Constants
 *************************/

export const APP_CONSTANTS = {
  STORAGE_KEYS: {
    SORT_CONFIGS: 'skillable-ds-sort-configs',
    FILTER_CONFIGS: 'skillable-ds-filter-configs',
    THEME: 'skillable-ds-theme',
  },
  DEFAULT_STARRED_ITEMS: {
    'profile-0': true,
    'profile-1': true,
    'series-0': true,
    'series-1': true,
    'template-0': true,
    'template-1': true,
  },
} as const;

export const CARD_TYPES = ['instance', 'profile', 'series', 'template'] as const; 