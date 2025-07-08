'use client';

import SplitButton from '../components/buttons/SplitButton';
import { Icon, Icons } from '../components/Icon';
import { Chip } from '../components/info/Chip';
import { Tabs } from '@/components/navigation';
import { DashboardCard } from '@/components/cards/DashboardCard';
import { DropdownSelect } from "@/components/inputs";
import { Button } from '@/components/buttons/Button';

export default function Home() {
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

  const tabItems = [
    { id: "lab-instances", label: "Lab Instances", content: null },
    { id: "lab-profiles", label: "Lab Profiles", content: null },
    { id: "lab-series", label: "Lab Series", content: null },
    { id: "templates", label: "Templates", content: null },
  ];

  const labProfiles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    name: "Lab Profile Name",
    number: "KO_001",
    series: "My Lab Series",
    org: "Skillable - Production",
    platform: "Azure",
    created: "June 2, 2025",
    modified: "June 5, 2025",
    status: "In Development",
    starred: i < 2,
  }));

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
         <Tabs items={tabItems} className="mb-4" />
         {/* Lab Profiles List */}
        <div className="space-y-4">
          {labProfiles.map((profile, idx) => (
            <DashboardCard
              key={profile.id}
              variant="profile"
              title={profile.name}
              statusLabel={profile.status}
              statusTone="default"
              number={profile.number}
              seriesName={profile.series}
              organization={profile.org}
              platform={profile.platform}
              created={profile.created}
              modified={profile.modified}
              starred={profile.starred}
              actions={[
                { icon: "externalLink", label: "Open", onClick: () => {} },
                { icon: "edit", label: "Edit", onClick: () => {} },
                { icon: "saveAll", label: "Clone", onClick: () => {} },
                { icon: "delete", label: "Delete", onClick: () => {} },
              ]}
              className="bg-_components-background-default border border-_components-divider-main shadow"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-body-sm text-_components-text-secondary">
          <span>
            Profiles per page: <DropdownSelect options={[{label: '10', value: '10'}]} value="10" />
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
