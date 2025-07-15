"use client";

import React from 'react';
import DashboardCard, { CardAction, ProfileData, MetaLinkConfig, CardClickConfig } from './DashboardCard';

export type ProfileCardProps = Omit<ProfileData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, MetaLinkConfig>;
  onClick?: CardClickConfig;
  className?: string;
  // Default actions are automatically included unless overridden by the actions prop
} & (
  | {
      starred: boolean;
      onStarToggle: () => void;
    }
  | {
      starred?: never;
      onStarToggle?: never;
    }
);

const ProfileCardComponent: React.FC<ProfileCardProps> = React.memo((props) => {
  // Define default actions for profile cards
  const defaultActions: CardAction[] = [
    {
      icon: 'externalLink',
      label: 'Open',
      onClick: () => {
        alert('Launches lab client (if multiple instruction sets, shows dropdown to choose)');
      },
    },
    {
      icon: 'gradCap',
      label: 'Edit Instructions',
      onClick: () => {
        alert('If 1 instruction set, opens edit instructions page. If multiple, shows dropdown to choose instruction set.');
      },
    },
    {
      icon: 'edit',
      label: 'Edit',
      onClick: () => {
        alert('Opens edit profile page');
      },
    },
    {
      icon: 'saveAll',
      label: 'Clone',
      onClick: () => {
        alert('Navigates to edit profile page, opens "save as" dialog');
      },
    },
    {
      icon: 'delete',
      label: 'Delete',
      onClick: () => {
        alert('Opens confirmation dialog');
      },
    },
  ];

  // Define default metalinks for profile cards
  const defaultMetaLinks: Record<string, MetaLinkConfig> = {
    number: { message: "Opens lab profile details page" },
    seriesName: { message: "Opens lab series details page" },
    organization: { message: "Opens organization details page" },
  };

  // Define default click behavior for profile cards
  const defaultOnClick: CardClickConfig = { 
    message: "Opening lab profile details page" 
  };

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;
  
  // Merge custom metalinks with defaults (custom takes precedence)
  const finalMetaLinks = { ...defaultMetaLinks, ...props.metaLinks };

  // Use custom onClick if provided, otherwise use default
  const finalOnClick = props.onClick || defaultOnClick;

  return <DashboardCard variant="profile" {...props} onClick={finalOnClick} actions={finalActions} metaLinks={finalMetaLinks} />;
});

ProfileCardComponent.displayName = 'ProfileCard';

export const ProfileCard = ProfileCardComponent;
export default ProfileCard; 