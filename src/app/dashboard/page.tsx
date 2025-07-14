'use client';

import { useMemo, useCallback } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { FIND_MENU_ITEMS, CREATE_MENU_ITEMS } from '@/config/navigation';
import { getSortOptions } from '@/config/sorting';
import { getFilterOptions, OPERATORS_BY_TYPE } from '@/config/filtering';
import { getAllTabConfigurations, getTabConfigurationByIndex } from '@/config/tabs';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useSorting } from '@/hooks/useSorting';
import { useFiltering } from '@/hooks/useFiltering';
import { useDataTransformation } from '@/hooks/useDataTransformation';
import { usePerTabPagination } from '@/hooks/usePagination';
import { useLabProfileData, useLabSeriesData, useLabInstanceData, useTemplateData } from '@/hooks/useCSVData';
import type { BaseItem } from '@/types/generic';
import type { Filter, FilterOperator } from '@/config/filtering';

export default function DashboardPage() {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL LOGIC

  const {
    activeTabIndex,
    setActiveTabIndex,
    starredItems,
    toggleStar,
    // Per-tab pagination methods
    getCurrentTabId,
    getCurrentTabPagination,
    updateCurrentTabPagination,
    updateTabPagination,
    getTabPagination,
    resetCurrentTabPagination,
    resetAllTabPagination,
    // Backward compatibility
    paginationState,
    updatePagination,
    getCurrentCardType,
    isLoaded: isDashboardStateLoaded,
  } = useDashboardState();

  const {
    getCurrentSortConfig,
    getSynchronizedSortConfig,
    updateSortConfig,
    toggleSortDirection,
    sortItems,
    isLoaded: isSortingLoaded,
  } = useSorting();

  const {
    getCurrentFilterConfig,
    getSynchronizedFilterConfig,
    updateFilterConfig,
    applyFilters,
    isLoaded: isFilteringLoaded,
  } = useFiltering();

  // Get current tab configuration - MUST be called before any conditional returns
  const currentTabConfig = useMemo(() => getTabConfigurationByIndex(activeTabIndex), [activeTabIndex]);
  const currentTabId = useMemo(() => getCurrentTabId(), [getCurrentTabId]);
  
  // Load CSV data for all card types - MUST be called before any conditional returns
  const { data: csvProfiles, error: profilesError } = useLabProfileData({
    cache: true,
    clean: true
  });

  const { data: csvSeries, error: seriesError } = useLabSeriesData({
    cache: true,
    clean: true
  });

  const { data: csvInstances, error: instancesError } = useLabInstanceData({
    cache: true,
    clean: true
  });

  const { data: csvTemplates, error: templatesError } = useTemplateData({
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
  const sortOptions = useMemo(() => getSortOptions(currentCardType), [currentCardType]);
  const filterColumns = useMemo(() => getFilterOptions(currentCardType), [currentCardType]);

  // Get current tab data for pagination - MUST be called before any conditional returns
  const processedTabData = useMemo(() => {
    if (!currentTabConfig) return [];
    
    const cardType = currentTabConfig.cardType;
    let data: BaseItem[] = [];
    
    switch (cardType) {
      case 'instance':
        data = mockInstances;
        break;
      case 'profile':
        data = mockProfiles;
        break;
      case 'series':
        data = mockSeries;
        break;
      case 'template':
        data = mockTemplates;
        break;
      default:
        data = [];
    }
    
    // Use synchronized sort and filter configurations
    const synchronizedSortConfig = getSynchronizedSortConfig(cardType, data);
    const synchronizedFilterConfig = getSynchronizedFilterConfig(cardType, data);
    
    return applyFilters(sortItems(data, synchronizedSortConfig), synchronizedFilterConfig);
  }, [currentTabConfig, mockInstances, mockProfiles, mockSeries, mockTemplates, getSynchronizedSortConfig, getSynchronizedFilterConfig]);

  const totalItems = useMemo(() => processedTabData.length, [processedTabData]);

  // Calculate pagination using per-tab pagination hook - MUST be called before any conditional returns
  const { paginatedData, validCurrentPage, totalPages } = usePerTabPagination({
    data: processedTabData,
    tabId: currentTabId,
    getTabPagination,
    updateTabPagination
  });

  // Handle sort field changes - MUST be called before any conditional returns
  const handleSortFieldChange = useCallback((field: string) => {
    updateSortConfig(currentCardType, field);
  }, [currentCardType, updateSortConfig]);

  // Handle sort direction changes - MUST be called before any conditional returns
  const handleSortDirectionChange = useCallback(() => {
    toggleSortDirection(currentCardType);
  }, [currentCardType, toggleSortDirection]);

  // Handle filter changes - MUST be called before any conditional returns
  const handleFiltersChange = useCallback((filters: Array<{ column: string; operator: string; value: unknown }>) => {
    // Convert FilterMenu Filter type to filtering config Filter type
    const convertedFilters: Filter[] = filters.map(filter => ({
      column: filter.column,
      operator: filter.operator as FilterOperator,
      value: filter.value as string | number | boolean,
    }));
    updateFilterConfig(currentCardType, convertedFilters);
    // Reset to first page when filters change
    updateTabPagination(currentTabId, { currentPage: 1 });
  }, [currentCardType, updateFilterConfig, updateTabPagination, currentTabId]);

  // Handle pagination changes - MUST be called before any conditional returns
  const handlePageChange = useCallback((page: number) => {
    updateTabPagination(currentTabId, { currentPage: page });
  }, [updateTabPagination, currentTabId]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    updateTabPagination(currentTabId, { pageSize: newPageSize, currentPage: 1 });
  }, [updateTabPagination, currentTabId]);

  // Create paginated tab items using tab configuration - MUST be called before any conditional returns
  const createPaginatedContent = useCallback((data: BaseItem[], CardComponent: React.ComponentType<BaseItem>) => {
    return paginatedData.map((item) => (
      <CardComponent key={item.id} {...item} />
    ));
  }, [paginatedData]);

  const tabItems = useMemo(() => {
    return getAllTabConfigurations().map(tabConfig => ({
      id: tabConfig.id,
      label: tabConfig.label,
      content: createPaginatedContent(paginatedData, tabConfig.cardComponent)
    }));
  }, [createPaginatedContent, paginatedData]);

  // Get current filter config for UI (not synchronized)
  const currentFilters = useMemo(
    () => getCurrentFilterConfig(currentCardType),
    [getCurrentFilterConfig, currentCardType]
  );

  // NOW we can have conditional logic and early returns
  if (!isDashboardStateLoaded || !isSortingLoaded || !isFilteringLoaded) {
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

  // Get current tab pagination state for display
  const currentTabPagination = getCurrentTabPagination();

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
        currentSortConfig={getCurrentSortConfig(currentCardType)}
        onSortFieldChange={handleSortFieldChange}
        onSortDirectionChange={handleSortDirectionChange}
        filterColumns={filterColumns}
        currentFilters={currentFilters}
        onFiltersChange={handleFiltersChange}
        operatorsByType={OPERATORS_BY_TYPE}
        tabItems={tabItems}
        currentPage={validCurrentPage}
        pageSize={currentTabPagination.pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </main>
  );
} 