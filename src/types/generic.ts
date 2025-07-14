/*************************
 * Generic Types
 * Reusable type definitions for the dashboard system
 *************************/

// ChipVariant is not used in this file, removed to fix linter

// Base types for dashboard items
export interface BaseItem {
  id: number;
  name: string;
  starred: boolean;
}

// Generic dashboard item with configurable properties
export type GenericDashboardItem<T = Record<string, unknown>> = BaseItem & {
  [key: string]: unknown;
} & T;

// Generic sort configuration
export interface GenericSortConfig<T extends string = string> {
  field: T;
  direction: 'asc' | 'desc';
}

// Generic filter configuration
export interface GenericFilter<T extends string = string> {
  column: T;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'isTrue' | 'isFalse';
  value: string | number | boolean;
}

// Generic pagination state
export interface GenericPaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Generic sort option
export interface GenericSortOption<T extends string = string> {
  label: string;
  value: T;
}

// Generic filter option
export interface GenericFilterOption<T extends string = string> {
  label: string;
  value: T;
  type: 'text' | 'select' | 'boolean';
  options?: Array<{ label: string; value: string | number | boolean }>;
}

// Generic card type
export type GenericCardType = 'instance' | 'profile' | 'series' | 'template';

// Generic tab configuration
export interface GenericTabConfiguration<T extends GenericCardType = GenericCardType> {
  id: string;
  label: string;
  cardType: T;
  defaultSortConfig: GenericSortConfig;
  defaultFilterConfig: GenericFilter[];
}

// Generic data transformation function
export type GenericTransformFunction<TInput, TOutput extends BaseItem> = (
  data: TInput[],
  starredItems: Record<string, boolean>,
  toggleStar: (itemType: string, itemId: number) => void
) => TOutput[];

// Generic CSV data hook
export type GenericCSVDataHook<T> = (options: { cache: boolean; clean: boolean }) => {
  data: T[] | null;
  loading: boolean;
  error: string | null;
};

// Generic card component
export type GenericCardComponent<T extends BaseItem = BaseItem> = React.ComponentType<T>;

// Generic dashboard state
export interface GenericDashboardState<T extends GenericCardType = GenericCardType> {
  activeTabIndex: number;
  starredItems: Record<string, boolean>;
  sortConfigs: Record<T, GenericSortConfig>;
  filterConfigs: Record<T, GenericFilter[]>;
  paginationState: GenericPaginationState;
}

// Generic sort and filter functions
export type GenericSortFunction<T extends BaseItem> = (
  items: T[],
  sortConfig: GenericSortConfig
) => T[];

export type GenericFilterFunction<T extends BaseItem> = (
  items: T[],
  filters: GenericFilter[]
) => T[];

// Generic event handlers
export type GenericSortFieldChangeHandler<T extends string = string> = (field: T) => void;
export type GenericSortDirectionChangeHandler = () => void;
export type GenericFilterChangeHandler<T extends string = string> = (filters: GenericFilter<T>[]) => void;
export type GenericPageChangeHandler = (page: number) => void;
export type GenericPageSizeChangeHandler = (pageSize: number) => void;

// Generic star toggle function
export type GenericStarToggleHandler = (itemType: string, itemId: number) => void;

// Utility types for better type inference
export type ExtractCardType<T> = T extends GenericTabConfiguration<infer U> ? U : never;
export type ExtractItemType<T> = T extends GenericDashboardItem<infer U> ? U : never;
export type ExtractSortField<T> = T extends GenericSortConfig<infer U> ? U : never;
export type ExtractFilterColumn<T> = T extends GenericFilter<infer U> ? U : never; 