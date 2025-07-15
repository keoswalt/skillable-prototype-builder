"use client";

import React from 'react';
import DashboardCard, { CardAction, InstanceData, MetaLinkConfig, CardClickConfig } from './DashboardCard';

export type InstanceCardProps = Omit<InstanceData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, MetaLinkConfig>;
  onClick?: CardClickConfig;
  className?: string;
  // Note: InstanceCard does not support starring functionality
  // Default actions are automatically included unless overridden by the actions prop
} & {
  // Explicitly exclude star-related props to prevent them from being passed through
  starred?: never;
  onStarToggle?: never;
};

const InstanceCardComponent: React.FC<InstanceCardProps> = React.memo((props) => {
  // Define default actions for instance cards
  const defaultActions: CardAction[] = [
    {
      icon: 'externalLink',
      label: 'Open',
      onClick: () => {
        // Default implementation - can be overridden by passing custom actions
        alert('Opening lab instance');
      },
    }
  ];

  // Define default metalinks for instance cards
  const defaultMetaLinks: Record<string, MetaLinkConfig> = {
    instanceId: { message: "Opens the lab instance details page" },
    labProfile: { message: "Opens the lab profile details page" },
    series: { message: "Opens the lab series details page" },
    student: { message: "Opens the student details page" },
  };

  // Define default click behavior for instance cards
  const defaultOnClick: CardClickConfig = { 
    message: "Opening lab instance details page" 
  };

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;
  
  // Merge custom metalinks with defaults (custom takes precedence)
  const finalMetaLinks = { ...defaultMetaLinks, ...props.metaLinks };

  // Use custom onClick if provided, otherwise use default
  const finalOnClick = props.onClick || defaultOnClick;

  // Don't pass starred or onStarToggle props to hide the star completely
  const { actions, metaLinks, ...restProps } = props;
  return <DashboardCard variant="instance" {...restProps} onClick={finalOnClick} actions={finalActions} metaLinks={finalMetaLinks} />;
});

InstanceCardComponent.displayName = 'InstanceCard';

export const InstanceCard = InstanceCardComponent;
export default InstanceCard; 