/*************************
 * Dashboard Header Component
 *************************/

import { Chip } from '@/components/info/Chip';
import { SplitButton } from '@/components/buttons/SplitButton';
import { Icon, Icons } from '@/components/Icon';
import { MenuItem } from '@/config/navigation';

interface DashboardHeaderProps {
  findMenuItems: MenuItem[];
  createMenuItems: MenuItem[];
}

export function DashboardHeader({ findMenuItems, createMenuItems }: DashboardHeaderProps) {
  return (
    <section className="flex flex-row justify-between items-center py-6">
      <div className="flex items-center gap-3">
        <h1 className="font-headline text-heading-md">Welcome back, Kim.</h1>
        <Chip 
          size="small" 
          variant="warning" 
          onClick={() => alert('Opens lab advisor home page')}
        >
          8 Lab Advisor Recommendations
        </Chip>
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
  );
} 