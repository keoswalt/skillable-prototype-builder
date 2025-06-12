'use client';

import SplitButton from '../components/buttons/SplitButton';
import { Icon, Icons } from '../components/Icon';
import { Chip } from '../components/info/Chip';
import DataTableExample from '../components/data/DataTableExample';

export default function Home() {
  const findMenuItems = [
    { label: 'Lab profiles', onClick: () => console.log('Find lab profile') },
    { label: 'Lab instances', onClick: () => console.log('Find lab instance') },
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

  return (
    <main className="min-h-screen p-8">
     
      <section className="flex flex-row justify-between items-center py-6">
        <div className="flex items-center gap-2">
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

      <section className="py-4">
        <DataTableExample />
      </section>

    </main>
  );
}
