'use client';

import SplitButton from '../components/buttons/SplitButton';
import { Icon, Icons } from '../components/Icon';
import { Chip } from '../components/info/Chip';

export default function Home() {
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
            onClick={() => console.log('Main button clicked')}
            onDropdownClick={() => console.log('Dropdown clicked')}
          />
          <SplitButton
            icon={<Icon icon={Icons.add} className="size-4" />}
            label="Create"
            onClick={() => console.log('Main button clicked')}
            onDropdownClick={() => console.log('Dropdown clicked')}
            variant={'primary'}
          />
        </div>
      </section>

    </main>
  );
}
