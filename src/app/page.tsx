'use client';

import { useState } from 'react';
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
 *   title="Lab Instance"
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

// Utility function to sort items by starred status (starred items first)
const sortByStarredStatus = <T extends { starred?: boolean }>(items: T[]): T[] => {
  return [...items].sort((a, b) => {
    const aStarred = a.starred || false;
    const bStarred = b.starred || false;
    
    if (aStarred && !bStarred) return -1; // a comes first
    if (!aStarred && bStarred) return 1;  // b comes first
    return 0; // maintain original order for items with same starred status
  });
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

  const toggleStar = (itemType: string, itemId: number) => {
    const key = `${itemType}-${itemId}`;
    setStarredItems(prev => ({
      ...prev,
      [key]: !prev[key]
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

  // Mock data for each card type
  const mockInstances = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Lab Profile Name (User ${i + 1})`,
    instanceId: `10${i}3453`,
    labProfile: "Lab Profile Name",
    series: "Lab Series Name",
    user: `User ${i + 1}`,
    instructionSet: "Base instruction set (en)",
    duration: "1:10",
    lastActivity: "June 5, 2025",
    state: i % 2 === 0 ? "Running" : "Off"
  }));

  const mockProfiles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: "Lab Profile Name",
    number: `KO_00${i + 1}`,
    seriesName: "My Lab Series",
    organization: "Skillable - Production",
    platform: "Azure",
    created: "June 2, 2025",
    modified: "June 5, 2025",
    statusLabel: "In Development",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`profile-${i}`] || false,
    onStarToggle: () => toggleStar('profile', i),
  }));

  const mockSeries = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Lab Series ${i + 1}`,
    organization: "Skillable - Production",
    labProfiles: `${i + 3} Profiles`,
    virtualMachines: `${i + 2} VMs`,
    apiConsumers: `${i} Consumers`,
    created: "June 2, 2025",
    modified: "June 5, 2025",
    starred: starredItems[`series-${i}`] || false,
    onStarToggle: () => toggleStar('series', i),
  }));

  const mockTemplates = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: `Template ${i + 1}`,
    number: `TEMP_00${i + 1}`,
    seriesName: "Template Series",
    organization: "Skillable - Production",
    platform: "Azure",
    created: "June 2, 2025",
    modified: "June 5, 2025",
    statusLabel: i % 2 === 0 ? "Active" : "Draft",
    statusTone: 'default' as ChipVariant,
    starred: starredItems[`template-${i}`] || false,
    onStarToggle: () => toggleStar('template', i),
  }));

  const tabItems = [
    { 
      id: "lab-instances", 
      label: "Lab Instances", 
      content: mockInstances.map((instance) => (
        <InstanceCard
          key={instance.id}
          {...instance}
        />
      ))
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: sortByStarredStatus(mockProfiles).map((profile) => (
        <ProfileCard
          key={profile.id}
          {...profile}
        />
      ))
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: sortByStarredStatus(mockSeries).map((series) => (
        <SeriesCard
          key={series.id}
          {...series}
        />
      ))
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: sortByStarredStatus(mockTemplates).map((template) => (
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
         {/* Tabs */}
         <Tabs 
           items={tabItems} 
           defaultIndex={activeIndex} 
           onChange={(index) => setActiveIndex(index)} 
           className="mb-4" 
           panelClassName="space-y-4"
         />
         {/* Card List is now rendered by Tabs with correct spacing */}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-body-sm text-_components-text-secondary">
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
      </section>

    </main>
  );
}
