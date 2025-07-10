'use client';

import { useState, useEffect } from 'react';
import SplitButton from '../components/buttons/SplitButton';
import { Icon, Icons } from '../components/Icon';
import { Chip, ChipVariant } from '../components/info/Chip';
import { Tabs } from '@/components/navigation';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';
import { DropdownSelect } from "@/components/inputs";
import { Button } from '@/components/buttons/Button';

/*
 * CARD COMPONENT USAGE EXAMPLES:
 * 
 * Default Actions (Automatic):
 * Each card variant comes with predefined default actions that are automatically included.
 * 
 * <InstanceCard
 *   title="Lab Instance"
 *   instanceId="12345"
 *   // ... other props
 *   // Default actions: Open, Edit, Delete (automatically included)
 * />
 * 
 * <ProfileCard
 *   title="Lab Profile"
 *   number="KO_001"
 *   // ... other props
 *   // Default actions: Open, Edit, Clone, Delete (automatically included)
 * />
 * 
 * Custom Actions (Override defaults):
 * <InstanceCard
 *   title="Lab Profile Name"
 *   instanceId="12345"
 *   // ... other props
 *   actions={[
 *     { icon: 'eye', label: 'View', onClick: () => console.log('view') },
 *     { icon: 'settings', label: 'Configure', onClick: () => console.log('configure') }
 *   ]}
 * />
 * 
 * Each card variant provides its own set of default actions:
 * - InstanceCard: Open, Edit, Delete
 * - ProfileCard: Open, Edit, Clone, Delete
 * - SeriesCard: Open, Edit, Delete
 * - TemplateCard: Open, Edit, Clone, Delete
 */

/*************************
 * Sort Types and Configuration
 *************************/

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

// Sort field options for each card type
export const SORT_OPTIONS = {
  instance: [
    { label: 'Title', value: 'title' },
    { label: 'Instance ID', value: 'instanceId' },
    { label: 'Lab Profile', value: 'labProfile' },
    { label: 'Series', value: 'series' },
    { label: 'User', value: 'user' },
    { label: 'State', value: 'state' },
    { label: 'Last Activity', value: 'lastActivity' },
    { label: 'Duration', value: 'duration' },
  ],
  profile: [
    { label: 'Title', value: 'title' },
    { label: 'Number', value: 'number' },
    { label: 'Series Name', value: 'seriesName' },
    { label: 'Organization', value: 'organization' },
    { label: 'Platform', value: 'platform' },
    { label: 'Status', value: 'statusLabel' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
  series: [
    { label: 'Title', value: 'title' },
    { label: 'Organization', value: 'organization' },
    { label: 'Lab Profiles', value: 'labProfiles' },
    { label: 'Virtual Machines', value: 'virtualMachines' },
    { label: 'API Consumers', value: 'apiConsumers' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
  template: [
    { label: 'Title', value: 'title' },
    { label: 'Number', value: 'number' },
    { label: 'Series Name', value: 'seriesName' },
    { label: 'Organization', value: 'organization' },
    { label: 'Platform', value: 'platform' },
    { label: 'Status', value: 'statusLabel' },
    { label: 'Created', value: 'created' },
    { label: 'Modified', value: 'modified' },
  ],
};

// Default sort configurations for each card type
export const DEFAULT_SORT_CONFIGS: Record<string, SortConfig> = {
  instance: { field: 'lastActivity', direction: 'desc' },
  profile: { field: 'modified', direction: 'desc' },
  series: { field: 'modified', direction: 'desc' },
  template: { field: 'modified', direction: 'desc' },
};



export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // State for managing starred items
  const [starredItems, setStarredItems] = useState<Record<string, boolean>>({
    'profile-0': true,
    'profile-1': true,
    'series-0': true,
    'series-1': true,
    'template-0': true,
    'template-1': true,
  });

  // State for managing sort configurations per tab with localStorage persistence
  const [sortConfigs, setSortConfigs] = useState<Record<string, SortConfig>>({
    instance: DEFAULT_SORT_CONFIGS.instance,
    profile: DEFAULT_SORT_CONFIGS.profile,
    series: DEFAULT_SORT_CONFIGS.series,
    template: DEFAULT_SORT_CONFIGS.template,
  });

  // Load sort configs from localStorage after component mounts
  useEffect(() => {
    const saved = localStorage.getItem('skillable-ds-sort-configs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all required keys exist
        setSortConfigs({
          instance: { ...DEFAULT_SORT_CONFIGS.instance, ...parsed.instance },
          profile: { ...DEFAULT_SORT_CONFIGS.profile, ...parsed.profile },
          series: { ...DEFAULT_SORT_CONFIGS.series, ...parsed.series },
          template: { ...DEFAULT_SORT_CONFIGS.template, ...parsed.template },
        });
      } catch (e) {
        console.warn('Failed to parse saved sort configs:', e);
      }
    }
  }, []);

  // Save sort configs to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('skillable-ds-sort-configs', JSON.stringify(sortConfigs));
    }
  }, [sortConfigs]);

  const toggleStar = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setStarredItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Enhanced sorting function that respects starred status first, then applies user-selected sorting
  const sortItems = <T extends { starred?: boolean; [key: string]: any }>(
    items: T[], 
    sortConfig: SortConfig
  ): T[] => {
    return [...items].sort((a, b) => {
      // First, sort by starred status (starred items always come first)
      const aStarred = a.starred || false;
      const bStarred = b.starred || false;
      
      if (aStarred && !bStarred) return -1;
      if (!aStarred && bStarred) return 1;
      
      // If both items have the same starred status, apply the user-selected sort
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      // Handle different data types
      let comparison = 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // Fallback to string comparison
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      // Apply sort direction
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  };

  // Utility function to get current sort options based on active tab
  const getCurrentSortOptions = (activeTabIndex: number) => {
    const tabTypes = ['instance', 'profile', 'series', 'template'];
    const currentType = tabTypes[activeTabIndex];
    return SORT_OPTIONS[currentType as keyof typeof SORT_OPTIONS] || [];
  };

  // Utility function to get current sort config based on active tab
  const getCurrentSortConfig = (activeTabIndex: number) => {
    const tabTypes = ['instance', 'profile', 'series', 'template'];
    const currentType = tabTypes[activeTabIndex];
    return sortConfigs[currentType] || DEFAULT_SORT_CONFIGS[currentType];
  };

  // Handler for sort field changes
  const handleSortFieldChange = (field: string) => {
    const tabTypes = ['instance', 'profile', 'series', 'template'];
    const currentType = tabTypes[activeIndex];
    
    setSortConfigs(prev => ({
      ...prev,
      [currentType]: {
        ...prev[currentType],
        field,
      }
    }));
  };

  // Handler for sort direction changes
  const handleSortDirectionChange = () => {
    const tabTypes = ['instance', 'profile', 'series', 'template'];
    const currentType = tabTypes[activeIndex];
    
    setSortConfigs(prev => ({
      ...prev,
      [currentType]: {
        ...prev[currentType],
        direction: prev[currentType].direction === 'asc' ? 'desc' : 'asc',
      }
    }));
  };

  const findMenuItems = [
    { label: 'Lab instances', onClick: () => alert('Opens find lab instance page') },
    { label: 'Lab profiles', onClick: () => alert('Opens find lab profile page') },
    { label: 'Lab series', onClick: () => alert('Opens find lab series page') },
    { label: 'Organizations', onClick: () => alert('Opens find organizations page') },
    { label: 'Users', onClick: () => alert('Opens find users page') },
  ];

  const createMenuItems = [
    { label: 'New lab profile', onClick: () => alert('Opens template gallery to start lab profile creation') },
    { label: 'New lab series', onClick: () => alert('Opens create lab series page') },
    { label: 'New virtual machine', onClick: () => alert('Opens create new VM page') },
    { label: 'New script template', onClick: () => alert('Opens create new script template page') },
  ];

  // Mock data for each card type with varied values for better sorting testing
  const mockInstances = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Lab Profile ${String.fromCharCode(65 + i)} (User ${i + 1})`,
    instanceId: `10${i}3453`,
    labProfile: `Profile ${String.fromCharCode(65 + i)}`,
    series: `Series ${String.fromCharCode(65 + i)}`,
    user: `User ${String.fromCharCode(65 + i)}`,
    instructionSet: "Base instruction set (en)",
    duration: `${(i % 3) + 1}:${((i * 7) % 60).toString().padStart(2, '0')}`,
    lastActivity: `June ${(i % 30) + 1}, 2025`,
    state: i % 2 === 0 ? "Running" : "Off"
  }));

  const mockProfiles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Lab Profile ${String.fromCharCode(65 + i)}`,
    number: `KO_00${i + 1}`,
    seriesName: `Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    platform: i % 2 === 0 ? "Azure" : "AWS",
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 3) % 30) + 1}, 2025`,
    statusLabel: i % 3 === 0 ? "In Development" : i % 3 === 1 ? "Active" : "Draft",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`profile-${i}`] || false,
    onStarToggle: () => toggleStar('profile', i),
  }));

  const mockSeries = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Lab Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    labProfiles: `${i + 3} Profiles`,
    virtualMachines: `${i + 2} VMs`,
    apiConsumers: `${i} Consumers`,
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 5) % 30) + 1}, 2025`,
    starred: starredItems[`series-${i}`] || false,
    onStarToggle: () => toggleStar('series', i),
  }));

  const mockTemplates = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Template ${String.fromCharCode(65 + i)}`,
    number: `TEMP_00${i + 1}`,
    seriesName: `Template Series ${String.fromCharCode(65 + i)}`,
    organization: `Organization ${String.fromCharCode(65 + i)}`,
    platform: i % 2 === 0 ? "Azure" : "AWS",
    created: `June ${(i % 30) + 1}, 2025`,
    modified: `June ${((i * 7) % 30) + 1}, 2025`,
    statusLabel: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Draft" : "Archived",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`template-${i}`] || false,
    onStarToggle: () => toggleStar('template', i),
  }));

  const tabItems = [
    { 
      id: "lab-instances", 
      label: "Lab Instances", 
      content: sortItems(mockInstances, getCurrentSortConfig(0)).map((instance) => (
        <InstanceCard
          key={instance.id}
          {...instance}
        />
      ))
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: sortItems(mockProfiles, getCurrentSortConfig(1)).map((profile) => (
        <ProfileCard
          key={profile.id}
          {...profile}
        />
      ))
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: sortItems(mockSeries, getCurrentSortConfig(2)).map((series) => (
        <SeriesCard
          key={series.id}
          {...series}
        />
      ))
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: sortItems(mockTemplates, getCurrentSortConfig(3)).map((template) => (
        <TemplateCard
          key={template.id}
          {...template}
        />
      ))
    },
  ];

  const activeTabContent = tabItems[activeIndex]?.content;

  return (
    <main className="min-h-screen p-8">
     
      <section className="flex flex-row justify-between items-center py-6">
        <div className="flex items-center gap-3">
          <h1 className="font-headline text-heading-md">Welcome back, Kim.</h1>
          <Chip size="small" variant="warning" onClick={() => alert('Opens lab advisor home page')}>8 Lab Advisor Recommendations</Chip>
        </div>
        
        <div className="flex items-center gap-2">
          <SplitButton
            icon={<Icon icon={Icons.search} className="size-4" />}
            label="Find"
            onClick={() => alert('Opens find lab instances page')}
            menuItems={findMenuItems}
          />
          <SplitButton
            icon={<Icon icon={Icons.add} className="size-4" />}
            label="Create"
            onClick={() => alert('Opens template gallery to start lab profile creation')}
            menuItems={createMenuItems}
            variant={'primary'}
          />
        </div>
      </section>

      <section>
        {/* Tabs with inline sort controls */}
        <div className="mb-4">
          {/* Tab list with sort controls inline */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Tabs container - takes available space */}
            <div className="flex-1 min-w-0">
              <Tabs 
                items={tabItems} 
                defaultIndex={activeIndex} 
                onChange={(index) => setActiveIndex(index)} 
                className="[&_[role=tabpanel]]:hidden" // Hide panels since we'll render content separately
                panelClassName="space-y-4"
              />
            </div>
            
            {/* Sort Controls - aligned right with responsive wrapping */}
            <div className="flex items-center gap-2 text-body-sm text-_components-text-secondary shrink-0">
              <span>Sort by:</span>
              <DropdownSelect 
                options={getCurrentSortOptions(activeIndex)}
                value={getCurrentSortConfig(activeIndex).field}
                onChange={(e) => handleSortFieldChange(e.target.value)}
                maxWidth="sm"
              />
              <Button 
                variant="icon" 
                size="small"
                onClick={handleSortDirectionChange}
                aria-label={`Sort ${getCurrentSortConfig(activeIndex).direction === 'asc' ? 'descending' : 'ascending'}`}
              >
                <Icon 
                  icon={getCurrentSortConfig(activeIndex).direction === 'asc' ? Icons.chevronUp : Icons.chevronDown} 
                  className="text-primary-main" 
                />
              </Button>
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

    </main>
  );
}
