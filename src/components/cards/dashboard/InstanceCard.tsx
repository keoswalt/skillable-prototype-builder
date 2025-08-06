"use client";

import React from 'react';
import DashboardCard, { CardAction, InstanceData, MetaLinkConfig, CardClickConfig } from './DashboardCard';

// Props that can come from InstanceItem (dashboard data)
interface InstanceItemProps {
  id: number;
  name: string;
  instanceId: string;
  labProfile: string;
  series: string;
  student: string;
  instructionSet: string;
  duration: string;
  lastActivity: string;
  state: string;
}

// Props that can be passed directly to InstanceCard
interface InstanceCardDirectProps {
  actions?: CardAction[];
  metaLinks?: Record<string, MetaLinkConfig>;
  onClick?: CardClickConfig;
  className?: string;
}

export type InstanceCardProps = (InstanceItemProps | Omit<InstanceData, 'variant'>) & InstanceCardDirectProps & {
  // Note: InstanceCard does not support starring functionality
  // Explicitly exclude star-related props to prevent them from being passed through
  starred?: never;
  onStarToggle?: never;
};

const InstanceCardComponent: React.FC<InstanceCardProps> = React.memo((props) => {
  // Define default actions for instance cards
  const getDefaultActions = (): CardAction[] => {
    const actions: CardAction[] = [
      {
        icon: 'info',
        label: 'Details',
        onClick: () => {
          // Default implementation - can be overridden by passing custom actions
          alert('Opens lab instance details page');
        },
      }
    ];

    // Only show "Open" action for running instances
    if (props.state === 'Running') {
      actions.push({
        icon: 'externalLink',
        label: 'Launch',
        onClick: () => {
          // Default implementation - can be overridden by passing custom actions
          alert('Launches running lab instance');
        },
      });
    }

    return actions;
  };

  const defaultActions = getDefaultActions();

  // Define default metalinks for instance cards
  const defaultMetaLinks: Record<string, MetaLinkConfig> = {
    instanceId: { message: "Opens the lab instance details page" },
    labProfile: { message: "Opens the lab profile details page" },
    series: { message: "Opens the lab series details page" },
    student: { message: "Opens the student details page" },
    instructions: { message: "Opens the instruction editor with current set and language" },
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

  // Extract props and handle field mapping
  const { ...restProps } = props;
  
  // Check if this is an InstanceItem (has instructionSet) or InstanceData (has instructions)
  const hasInstructionSet = 'instructionSet' in restProps;
  
  // Map instructionSet to instructions if needed
  const mappedProps = hasInstructionSet 
    ? { ...restProps, instructions: restProps.instructionSet }
    : restProps;

  return <DashboardCard variant="instance" {...mappedProps} onClick={finalOnClick} actions={finalActions} metaLinks={finalMetaLinks} />;
});

InstanceCardComponent.displayName = 'InstanceCard';

export const InstanceCard = InstanceCardComponent;
export default InstanceCard; 