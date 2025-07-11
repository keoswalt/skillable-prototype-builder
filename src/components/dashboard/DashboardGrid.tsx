/*************************
 * Dashboard Grid Component
 *************************/

import { Tabs } from '@/components/navigation';
import { SortControls } from './SortControls';
import { FilterControls } from './FilterControls';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';
import { DropdownSelect } from '@/components/inputs';
import { Button } from '@/components/buttons/Button';
import { Icon, Icons } from '@/components/Icon';
import { SortConfig, SortOption } from '@/types/sorting';
import { Filter } from '@/config/filtering';
import { DashboardItem } from '@/types/dashboard';

interface DashboardGridProps {
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  sortOptions: SortOption[];
  currentSortConfig: SortConfig;
  onSortFieldChange: (field: string) => void;
  onSortDirectionChange: () => void;
  filterColumns: Array<{ label: string; value: string; type?: 'text' | 'select' | 'boolean'; options?: { label: string; value: string }[] }>;
  currentFilters: Array<{ column: string; operator: string; value: any }>;
  onFiltersChange: (filters: Array<{ column: string; operator: string; value: any }>) => void;
  operatorsByType: Record<string, { label: string; value: string }[]>;
  tabItems: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
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
      <div className="flex items-center justify-between mt-6 text-body-sm text-_components-text-secondary">
        <div className="flex items-center gap-4">
          <span>
            Items per page: <DropdownSelect options={[{label: '10', value: '10'}]} value="10" />
          </span>
          <span>1-5 of 13</span>
          <div className="flex gap-1">
            <Button variant="icon" size="small">
              <Icon icon={Icons.chevronLeft} className="text-primary-main" />
            </Button>
            <Button variant="icon" size="small">
              <Icon icon={Icons.chevronRight} className="text-primary-main" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 