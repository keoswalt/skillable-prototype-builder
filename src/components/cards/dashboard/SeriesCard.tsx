"use client";

import React from 'react';
import DashboardCard, { CardAction, SeriesData, MetaLinkConfig, CardClickConfig } from './DashboardCard';

export type SeriesCardProps = Omit<SeriesData, 'variant'> & {
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

const SeriesCardComponent: React.FC<SeriesCardProps> = React.memo((props) => {
  // Define default actions for series cards
  const defaultActions: CardAction[] = [
    {
      icon: 'edit',
      label: 'Edit',
      onClick: () => {
        alert('Opens edit series page');
      },
    },
    {
      icon: 'saveAll',
      label: 'Clone',
      onClick: () => {
        alert('Navigates to lab series page, opens "save as" dialog');
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

  // Define default metalinks for series cards
  const defaultMetaLinks: Record<string, MetaLinkConfig> = {
    organization: { message: "Opens organization details page" },
    labProfiles: { message: "Opens series details page, scrolls to lab profiles section" },
    virtualMachines: { message: "Opens series details page, scrolls to virtual machines section" },
    apiConsumers: { message: "Opens edit series page on 'Publish' tab" },
  };

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;
  
  // Merge custom metalinks with defaults (custom takes precedence)
  const finalMetaLinks = { ...defaultMetaLinks, ...props.metaLinks };

  return <DashboardCard variant="series" {...props} actions={finalActions} metaLinks={finalMetaLinks} />;
});

SeriesCardComponent.displayName = 'SeriesCard';

export const SeriesCard = SeriesCardComponent;
export default SeriesCard; 