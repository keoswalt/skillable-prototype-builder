/*************************
 * Dashboard Header Component
 *************************/

import { Button } from '@/components/buttons/Button';
import { SplitButton } from '@/components/buttons/SplitButton';
import { Icon, Icons } from '@/components/Icon';
import { MenuItem } from '@/config/navigation';

interface DashboardHeaderProps {
  findMenuItems: MenuItem[];
  createMenuItems: MenuItem[];
}

export function DashboardHeader({ findMenuItems, createMenuItems }: DashboardHeaderProps) {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6 gap-4 lg:gap-0">
      <div className="flex items-center gap-3">
        <h1 className="font-headline text-heading-md">Welcome back, Kim.</h1>
        <Button 
          size="small" 
          variant="warning" 
          onClick={() => alert('Opens lab advisor home page')}
          className="hidden sm:inline-flex"
        >
          View Recommendations (8)
        </Button>
      </div>
      
      <div className="flex items-center gap-2 w-full lg:w-auto">
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