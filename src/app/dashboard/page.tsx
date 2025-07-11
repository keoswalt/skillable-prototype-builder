'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { FIND_MENU_ITEMS, CREATE_MENU_ITEMS, TAB_CONFIG } from '@/config/navigation';
import { getSortOptions } from '@/config/sorting';
import { getFilterOptions, OPERATORS_BY_TYPE } from '@/config/filtering';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useSorting } from '@/hooks/useSorting';
import { useFiltering } from '@/hooks/useFiltering';
import { generateMockInstances, generateMockProfiles, generateMockSeries, generateMockTemplates } from '@/data/mockData';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';

export default function DashboardPage() {
  const {
    activeTabIndex,
    setActiveTabIndex,
    starredItems,
    toggleStar,
    getCurrentCardType,
    isLoaded: isDashboardLoaded,
  } = useDashboardState();

  const {
    getCurrentSortConfig,
    updateSortConfig,
    toggleSortDirection,
    sortItems,
    isLoaded: isSortingLoaded,
  } = useSorting();

  const {
    getCurrentFilterConfig,
    updateFilterConfig,
    applyFilters,
    isLoaded: isFilteringLoaded,
  } = useFiltering();

  // Don't render until all data is loaded to prevent hydration mismatches
  if (!isDashboardLoaded || !isSortingLoaded || !isFilteringLoaded) {
    return (
      <div className="min-h-screen p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading Dashboard...</h2>
            <p className="text-gray-600">Please wait while we load your data.</p>
          </div>
        </div>
      </div>
    );
  }

  // Generate mock data with current starred state
  const mockInstances = generateMockInstances(starredItems, toggleStar);
  const mockProfiles = generateMockProfiles(starredItems, toggleStar);
  const mockSeries = generateMockSeries(starredItems, toggleStar);
  const mockTemplates = generateMockTemplates(starredItems, toggleStar);

  // Get current sort and filter configuration
  const currentCardType = getCurrentCardType();
  const currentSortConfig = getCurrentSortConfig(currentCardType);
  const sortOptions = getSortOptions(currentCardType);
  const currentFilters = getCurrentFilterConfig(currentCardType);
  const filterColumns = getFilterOptions(currentCardType);

  // Handle sort field changes
  const handleSortFieldChange = (field: string) => {
    updateSortConfig(currentCardType, field);
  };

  // Handle sort direction changes
  const handleSortDirectionChange = () => {
    toggleSortDirection(currentCardType);
  };

  // Handle filter changes
  const handleFiltersChange = (filters: Array<{ column: string; operator: string; value: any }>) => {
    // Convert FilterMenu Filter type to filtering config Filter type
    const convertedFilters = filters.map(filter => ({
      column: filter.column,
      operator: filter.operator as any,
      value: filter.value,
    }));
    updateFilterConfig(currentCardType, convertedFilters);
  };

  // Create tab items with sorted and filtered content
  const tabItems = [
    { 
      id: "lab-instances", 
      label: "Lab Instances", 
      content: applyFilters(sortItems(mockInstances, getCurrentSortConfig('instance')), getCurrentFilterConfig('instance')).map((instance) => (
        <InstanceCard key={instance.id} {...instance} />
      ))
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: applyFilters(sortItems(mockProfiles, getCurrentSortConfig('profile')), getCurrentFilterConfig('profile')).map((profile) => (
        <ProfileCard key={profile.id} {...profile} />
      ))
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: applyFilters(sortItems(mockSeries, getCurrentSortConfig('series')), getCurrentFilterConfig('series')).map((series) => (
        <SeriesCard key={series.id} {...series} />
      ))
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: applyFilters(sortItems(mockTemplates, getCurrentSortConfig('template')), getCurrentFilterConfig('template')).map((template) => (
        <TemplateCard key={template.id} {...template} />
      ))
    },
  ];

  return (
    <main className="min-h-screen p-8">
      <DashboardHeader 
        findMenuItems={FIND_MENU_ITEMS}
        createMenuItems={CREATE_MENU_ITEMS}
      />
      
      <DashboardGrid
        activeTabIndex={activeTabIndex}
        onTabChange={setActiveTabIndex}
        sortOptions={sortOptions}
        currentSortConfig={currentSortConfig}
        onSortFieldChange={handleSortFieldChange}
        onSortDirectionChange={handleSortDirectionChange}
        filterColumns={filterColumns}
        currentFilters={currentFilters.map(filter => ({
          column: filter.column,
          operator: filter.operator,
          value: filter.value,
        }))}
        onFiltersChange={handleFiltersChange}
        operatorsByType={OPERATORS_BY_TYPE}
        tabItems={tabItems}
      />
    </main>
  );
} 