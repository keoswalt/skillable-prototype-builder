'use client';

import { useState } from 'react';
import SplitButton from '../components/buttons/SplitButton';
import { Icon, Icons } from '../components/Icon';
import { Chip, ChipVariant } from '../components/info/Chip';
import { Tabs } from '@/components/navigation';
import { ProfileCard, InstanceCard, SeriesCard, TemplateCard } from '@/components/cards/dashboard';
import { DropdownSelect } from "@/components/inputs";
import { Button } from '@/components/buttons/Button';

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
    { label: 'Lab instances', onClick: () => console.log('Find lab instance') },
    { label: 'Lab profiles', onClick: () => console.log('Find lab profile') },
    { label: 'Lab series', onClick: () => console.log('Find lab series') },
    { label: 'Organizations', onClick: () => console.log('Find organization') },
    { label: 'Users', onClick: () => console.log('Find user') },
  ];

  const createMenuItems = [
    { label: 'New lab profile', onClick: () => console.log('Create new lab profile') },
    { label: 'New lab series', onClick: () => console.log('Create new lab series') },
    { label: 'New virtual machine', onClick: () => console.log('Create new VM') },
    { label: 'New script template', onClick: () => console.log('Create new script template') },
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
    statusTone: 'warning' as ChipVariant,
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
    statusTone: (i % 2 === 0 ? 'success' : 'warning') as ChipVariant,
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
          actions={[
            { icon: "externalLink", label: "Open", onClick: () => {} },
            { icon: "edit", label: "Edit", onClick: () => {} },
            { icon: "delete", label: "Delete", onClick: () => {} },
          ]}
        />
      ))
    },
    { 
      id: "lab-profiles", 
      label: "Lab Profiles", 
      content: mockProfiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          {...profile}
          actions={[
            { icon: "externalLink", label: "Open", onClick: () => {} },
            { icon: "edit", label: "Edit", onClick: () => {} },
            { icon: "saveAll", label: "Clone", onClick: () => {} },
            { icon: "delete", label: "Delete", onClick: () => {} },
          ]}
        />
      ))
    },
    { 
      id: "lab-series", 
      label: "Lab Series", 
      content: mockSeries.map((series) => (
        <SeriesCard
          key={series.id}
          {...series}
          actions={[
            { icon: "externalLink", label: "Open", onClick: () => {} },
            { icon: "edit", label: "Edit", onClick: () => {} },
            { icon: "delete", label: "Delete", onClick: () => {} },
          ]}
        />
      ))
    },
    { 
      id: "templates", 
      label: "Templates", 
      content: mockTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          {...template}
          actions={[
            { icon: "externalLink", label: "Open", onClick: () => {} },
            { icon: "edit", label: "Edit", onClick: () => {} },
            { icon: "saveAll", label: "Clone", onClick: () => {} },
            { icon: "delete", label: "Delete", onClick: () => {} },
          ]}
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
          <Chip size="small" variant="warning">8 Lab Advisor Recommendations</Chip>
        </div>
        
        <div className="flex items-center gap-2">
          <SplitButton
            icon={<Icon icon={Icons.search} className="size-4" />}
            label="Find"
            onClick={() => console.log('Main find button clicked')}
            menuItems={findMenuItems}
          />
          <SplitButton
            icon={<Icon icon={Icons.add} className="size-4" />}
            label="Create"
            onClick={() => console.log('Main create button clicked')}
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
