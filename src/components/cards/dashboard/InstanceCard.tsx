import React from 'react';
import DashboardCard, { CardAction, InstanceData } from './DashboardCard';

export type InstanceCardProps = Omit<InstanceData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
  // Note: InstanceCard does not support starring functionality
  // Default actions are automatically included unless overridden by the actions prop
};

export const InstanceCard: React.FC<InstanceCardProps> = (props) => {
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

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;

  // Don't pass starred or onStarToggle props to hide the star completely
  return <DashboardCard variant="instance" {...props} actions={finalActions} />;
};

export default InstanceCard; 