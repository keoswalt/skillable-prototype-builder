import React from 'react';
import { Icon, Icons } from '../Icon';

interface TabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    isActive?: boolean;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onMenuClick: () => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onMenuClick,
}) => {
  return (
    <div className="bg-_components-background-contrast-sm rounded-t-lg flex justify-between items-center border-b border-_components-divider">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              mb-[-1px] pt-5 pr-4 pl-4 pb-4 border-b-2 font-primary font-medium text-body-sm transition-colors
              ${tab.id === activeTab
                ? 'border-primary-main text-_components-text-primary'
                : 'border-transparent text-_components-text-primary hover:text-hardgrey-dark'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        onClick={onMenuClick}
        className="p-2 m-2 hover:bg-softgrey-light rounded-[5px] transition-colors"
        aria-label="Menu"
      >
        <Icon 
          icon={Icons.menu} 
          size={20}
          className="text-hardgrey-main" 
        />
      </button>
    </div>
  );
};

export default TabNavigation; 