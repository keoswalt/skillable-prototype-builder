import React from 'react';
import DashboardCard, { CardAction, InstanceData } from './DashboardCard';

export type InstanceCardProps = Omit<InstanceData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
  // Note: InstanceCard does not support starring functionality
};

export const InstanceCard: React.FC<InstanceCardProps> = (props) => {
  // Don't pass starred or onStarToggle props to hide the star completely
  return <DashboardCard variant="instance" {...props} />;
};

export default InstanceCard; 