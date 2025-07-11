'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { FIND_MENU_ITEMS, CREATE_MENU_ITEMS, TAB_CONFIG } from '@/config/navigation';
import { getSortOptions } from '@/config/sorting';
import { useDashboardState } from '@/hooks/useDashboardState';
import { useSorting } from '@/hooks/useSorting';
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

  // Don't render until all data is loaded to prevent hydration mismatches
  if (!isDashboardLoaded || !isSortingLoaded) {
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

  // Get current sort configuration
  const currentCardType = getCurrentCardType();
  const currentSortConfig = getCurrentSortConfig(currentCardType);
  const sortOptions = getSortOptions(currentCardType);

  // Handle sort field changes
  const handleSortFieldChange = (field: string) => {
    updateSortConfig(currentCardType, field);
  };

  // Handle sort direction changes
  const handleSortDirectionChange = () => {
    toggleSortDirection(currentCardType);
  };

  // Create tab items with sorted content
  const tabItems = [
    { 
      id: "lab-instances", 
      label: "Lab Instances", 
      content: sortItems(mockInstances, getCurrentSortConfig('instance')).map((instance) => (
        <InstanceCard key={instance.id} {...instance} />
      ))
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: sortItems(mockProfiles, getCurrentSortConfig('profile')).map((profile) => (
        <ProfileCard key={profile.id} {...profile} />
      ))
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: sortItems(mockSeries, getCurrentSortConfig('series')).map((series) => (
        <SeriesCard key={series.id} {...series} />
      ))
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: sortItems(mockTemplates, getCurrentSortConfig('template')).map((template) => (
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
        tabItems={tabItems}
      />
    </main>
  );
} 