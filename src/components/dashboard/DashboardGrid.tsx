/*************************
 * Dashboard Grid Component
 *************************/

import { Tabs } from '@/components/navigation';
import { SortControls } from './SortControls';
import { FilterControls } from './FilterControls';
import { PaginationControls } from './PaginationControls';
import { SortConfig, SortOption } from '@/types/sorting';

interface DashboardGridProps {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  sortOptions: SortOption[];
  currentSortConfig: SortConfig;
  onSortFieldChange: (field: string) => void;
  onSortDirectionChange: () => void;
  filterColumns: Array<{ label: string; value: string; type?: 'text' | 'select' | 'boolean'; options?: { label: string; value: string }[] }>;
  currentFilters: Array<{ column: string; operator: string; value: unknown }>;
  onFiltersChange: (filters: Array<{ column: string; operator: string; value: unknown }>) => void;
  operatorsByType: Record<string, { label: string; value: string }[]>;
  tabItems: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  // Pagination props
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: Array<{ label: string; value: number }>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  paginationDisabled?: boolean;
}

export function DashboardGrid({
  activeTabIndex,
  onTabChange,
  sortOptions,
  currentSortConfig,
  onSortFieldChange,
  onSortDirectionChange,
  filterColumns,
  currentFilters,
  onFiltersChange,
  operatorsByType,
  tabItems,
  currentPage,
  pageSize,
  totalItems,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  paginationDisabled = false,
}: DashboardGridProps) {
  const activeTabContent = tabItems[activeTabIndex]?.content;

  return (
    <section>
      <div className="mb-4">
        {/* Tab list with sort controls inline */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Tabs container - takes available space */}
          <div className="flex-1 min-w-0">
            <Tabs 
              items={tabItems} 
              defaultIndex={activeTabIndex} 
              onChange={onTabChange} 
              className="[&_[role=tabpanel]]:hidden" // Hide panels since we'll render content separately
              panelClassName="space-y-4"
            />
          </div>
          
          {/* Sort and Filter Controls - aligned right with responsive wrapping */}
          <div className="flex items-center gap-4">
          <SortControls
              options={sortOptions}
              currentConfig={currentSortConfig}
              onFieldChange={onSortFieldChange}
              onDirectionChange={onSortDirectionChange}
            />
            <FilterControls
              columns={filterColumns}
              filters={currentFilters}
              onFiltersChange={onFiltersChange}
              operatorsByType={operatorsByType}
            />
          </div>
        </div>
        
        {/* Tab content rendered separately */}
        <div className="mt-4 space-y-4">
          {activeTabContent}
        </div>
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        disabled={paginationDisabled}
      />
    </section>
  );
} 