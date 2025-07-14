'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { FIND_MENU_ITEMS, CREATE_MENU_ITEMS } from '@/config/navigation';
import { getSortOptions } from '@/config/sorting';
import { getFilterOptions, OPERATORS_BY_TYPE } from '@/config/filtering';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useSorting } from '@/hooks/useSorting';
import { useFiltering } from '@/hooks/useFiltering';
import { useDataTransformation } from '@/hooks/useDataTransformation';
import { usePagination } from '@/hooks/usePagination';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';
import { useLabProfileData, useLabSeriesData, useLabInstanceData, useTemplateData } from '@/hooks/useCSVData';

export default function DashboardPage() {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL LOGIC

  const {
    activeTabIndex,
    setActiveTabIndex,
    starredItems,
    toggleStar,
    paginationState,
    updatePagination,
    getCurrentCardType,
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

  // Load CSV data for all card types - MUST be called before any conditional returns
  const { data: csvProfiles, loading: profilesLoading, error: profilesError } = useLabProfileData({
    cache: true,
    clean: true
  });

  const { data: csvSeries, loading: seriesLoading, error: seriesError } = useLabSeriesData({
    cache: true,
    clean: true
  });

  const { data: csvInstances, loading: instancesLoading, error: instancesError } = useLabInstanceData({
    cache: true,
    clean: true
  });

  const { data: csvTemplates, loading: templatesLoading, error: templatesError } = useTemplateData({
    cache: true,
    clean: true
  });

  // Transform CSV data to dashboard item format using custom hook - MUST be called before any conditional returns
  const { profiles: mockProfiles, series: mockSeries, instances: mockInstances, templates: mockTemplates } = useDataTransformation({
    csvProfiles,
    csvSeries,
    csvInstances,
    csvTemplates,
    starredItems,
    toggleStar
  });

  // Get current sort and filter configuration - MUST be called before any conditional returns
  const currentCardType = getCurrentCardType();
  const currentSortConfig = getCurrentSortConfig(currentCardType);
  const sortOptions = getSortOptions(currentCardType);
  const currentFilters = getCurrentFilterConfig(currentCardType);
  const filterColumns = getFilterOptions(currentCardType);

  // Get current tab data for pagination - MUST be called before any conditional returns
  const getCurrentTabData = (): unknown[] => {
    switch (currentCardType) {
      case 'instance':
        return applyFilters(sortItems(mockInstances, getCurrentSortConfig('instance')), getCurrentFilterConfig('instance'));
      case 'profile':
        return applyFilters(sortItems(mockProfiles, getCurrentSortConfig('profile')), getCurrentFilterConfig('profile'));
      case 'series':
        return applyFilters(sortItems(mockSeries, getCurrentSortConfig('series')), getCurrentFilterConfig('series'));
      case 'template':
        return applyFilters(sortItems(mockTemplates, getCurrentSortConfig('template')), getCurrentFilterConfig('template'));
      default:
        return [];
    }
  };

  const currentTabData = getCurrentTabData();
  const totalItems = currentTabData.length;

  // Calculate pagination using custom hook - MUST be called before any conditional returns
  const { paginatedData, validCurrentPage } = usePagination({
    data: currentTabData,
    paginationState,
    updatePagination
  });

  // NOW we can have conditional logic and early returns
  if (!isSortingLoaded || !isFilteringLoaded) {
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
    // Reset to first page when filters change
    updatePagination({ currentPage: 1 });
  };

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    updatePagination({ currentPage: page });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    updatePagination({ pageSize: newPageSize, currentPage: 1 });
  };

  // Create paginated tab items
  const createPaginatedContent = (data: unknown[], CardComponent: React.ComponentType<any>) => {
    return paginatedData.map((item) => (
      <CardComponent key={(item as any).id} {...(item as any)} />
    ));
  };

  const tabItems = [
    { 
      id: "lab-instances", 
      label: "Lab Instances", 
      content: createPaginatedContent(paginatedData, InstanceCard)
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: createPaginatedContent(paginatedData, ProfileCard)
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: createPaginatedContent(paginatedData, SeriesCard)
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: createPaginatedContent(paginatedData, TemplateCard)
    },
  ];

  // Handle CSV data loading error - after all hooks have been called
  if (profilesError || seriesError || instancesError || templatesError) {
    return (
      <div className="min-h-screen p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-600">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">Failed to load dashboard data.</p>
            {profilesError && <p className="text-sm text-gray-500">Profiles: {profilesError}</p>}
            {seriesError && <p className="text-sm text-gray-500">Series: {seriesError}</p>}
            {instancesError && <p className="text-sm text-gray-500">Instances: {instancesError}</p>}
            {templatesError && <p className="text-sm text-gray-500">Templates: {templatesError}</p>}
          </div>
        </div>
      </div>
    );
  }

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
        currentPage={validCurrentPage}
        pageSize={paginationState.pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </main>
  );
} 