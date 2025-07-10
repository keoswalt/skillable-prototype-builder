import React from 'react';
import DashboardCard, { CardAction, InstanceData } from './DashboardCard';

export type InstanceCardProps = Omit<InstanceData, 'variant'> & {
  starred?: boolean;
  onStarToggle?: () => void;
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
};

export const InstanceCard: React.FC<InstanceCardProps> = (props) => {
  return <DashboardCard variant="instance" {...props} />;
};

export default InstanceCard; 