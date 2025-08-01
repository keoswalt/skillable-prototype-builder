import React from 'react';
import SplitButton from './SplitButton';
import { Icon, Icons } from '../Icon';

export const SplitButtonExample: React.FC = () => {
  const handleClick = () => {
    console.log('Main button clicked');
  };

  // Example menu items for different button types
  const searchMenuItems = [
    { label: 'Search all', onClick: () => console.log('Search all clicked') },
    { label: 'Recent searches', onClick: () => console.log('Recent searches clicked') },
    { label: 'Advanced search', onClick: () => console.log('Advanced search clicked') },
  ];

  const filterMenuItems = [
    { label: 'Filter by date', onClick: () => console.log('Filter by date clicked') },
    { label: 'Filter by status', onClick: () => console.log('Filter by status clicked') },
    { label: 'Filter by type', onClick: () => console.log('Filter by type clicked') },
  ];

  const settingsMenuItems = [
    { label: 'General settings', onClick: () => console.log('General settings clicked') },
    { label: 'Account settings', onClick: () => console.log('Account settings clicked') },
    { label: 'Preferences', onClick: () => console.log('Preferences clicked') },
  ];

  const createMenuItems = [
    { label: 'New project', onClick: () => console.log('New project clicked') },
    { label: 'New document', onClick: () => console.log('New document clicked') },
    { label: 'New folder', onClick: () => console.log('New folder clicked') },
  ];

  const accountMenuItems = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Sign out', onClick: () => console.log('Sign out clicked') },
  ];

  const notificationMenuItems = [
    { label: 'Mark all as read', onClick: () => console.log('Mark all as read clicked') },
    { label: 'Notification settings', onClick: () => console.log('Notification settings clicked') },
  ];

  const helpMenuItems = [
    { label: 'Documentation', onClick: () => console.log('Documentation clicked') },
    { label: 'FAQs', onClick: () => console.log('FAQs clicked') },
    { label: 'Contact support', onClick: () => console.log('Contact support clicked') },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h3 className="font-headline text-heading-xs mb-4">Default Variant</h3>
        <div className="flex flex-wrap gap-4">
          {/* With icon */}
          <SplitButton
            icon={<Icon icon={Icons.search} className="size-4" />}
            label="Search"
            onClick={handleClick}
            menuItems={searchMenuItems}
          />
          
          {/* Without icon */}
          <SplitButton
            label="Filter"
            onClick={handleClick}
            menuItems={filterMenuItems}
          />

          {/* With different icon */}
          <SplitButton
            icon={<Icon icon={Icons.settings} className="size-4" />}
            label="Settings"
            onClick={handleClick}
            menuItems={settingsMenuItems}
          />
        </div>
      </div>

      <div>
        <h3 className="font-headline text-heading-xs mb-4">Primary Variant</h3>
        <div className="flex flex-wrap gap-4">
          {/* With icon */}
          <SplitButton
            icon={<Icon icon={Icons.add} className="size-4" />}
            label="Create"
            onClick={handleClick}
            menuItems={createMenuItems}
            variant="primary"
          />
          
          {/* Without icon */}
          <SplitButton
            label="Submit"
            onClick={handleClick}
            menuItems={createMenuItems}
            variant="primary"
          />

          {/* With different icon */}
          <SplitButton
            icon={<Icon icon={Icons.edit} className="size-4" />}
            label="Edit"
            onClick={handleClick}
            menuItems={settingsMenuItems}
            variant="primary"
          />
        </div>
      </div>

      <div>
        <h3 className="font-headline text-heading-xs mb-4">Common Use Cases</h3>
        <div className="flex flex-wrap gap-4">
          <SplitButton
            icon={<Icon icon={Icons.user} className="size-4" />}
            label="Account"
            onClick={handleClick}
            menuItems={accountMenuItems}
          />
          
          <SplitButton
            icon={<Icon icon={Icons.bell} className="size-4" />}
            label="Notifications"
            onClick={handleClick}
            menuItems={notificationMenuItems}
          />

          <SplitButton
            icon={<Icon icon={Icons.info} className="size-4" />}
            label="Help"
            onClick={handleClick}
            menuItems={helpMenuItems}
          />
        </div>
      </div>
    </div>
  );
};

export default SplitButtonExample;