import React from 'react';
import SplitButton from './SplitButton';
import { Icon, Icons } from '../Icon';

export const SplitButtonExample: React.FC = () => {
  const handleClick = () => {
    console.log('Main button clicked');
  };

  const handleDropdownClick = () => {
    console.log('Dropdown clicked');
  };

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
            onDropdownClick={handleDropdownClick}
          />
          
          {/* Without icon */}
          <SplitButton
            label="Filter"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
          />

          {/* With different icon */}
          <SplitButton
            icon={<Icon icon={Icons.settings} className="size-4" />}
            label="Settings"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
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
            onDropdownClick={handleDropdownClick}
            variant="primary"
          />
          
          {/* Without icon */}
          <SplitButton
            label="Submit"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
            variant="primary"
          />

          {/* With different icon */}
          <SplitButton
            icon={<Icon icon={Icons.edit} className="size-4" />}
            label="Edit"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
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
            onDropdownClick={handleDropdownClick}
          />
          
          <SplitButton
            icon={<Icon icon={Icons.bell} className="size-4" />}
            label="Notifications"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
          />

          <SplitButton
            icon={<Icon icon={Icons.info} className="size-4" />}
            label="Help"
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SplitButtonExample; 