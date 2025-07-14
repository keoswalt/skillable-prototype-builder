// src/components/cards/dashboard-cards/InstanceCard.tsx
// PURPOSE: A specialized card component for lab instances that wraps the base DashboardCard
// with instance-specific data structure and default styling.

import React from 'react';
import DashboardCard, { CardAction } from '../DashboardCard';
import { InstanceData } from '../DashboardCard';

export interface InstanceCardProps extends Omit<InstanceData, 'variant'> {
  /** Adds a colored star icon on the far-left */
  starred?: boolean;
  /** Toggle handler when star icon is clicked */
  onStarToggle?: () => void;
  /** Optional array of icon buttons displayed on the right-hand side */
  actions?: CardAction[];
  /** Map of data keys to URL strings. If provided, the corresponding value renders as an <a>. */
  metaLinks?: Record<string, string>;
  /** Additional CSS classes for the root element */
  className?: string;
}

export const InstanceCard: React.FC<InstanceCardProps> = ({
  starred,
  onStarToggle,
  actions,
  metaLinks,
  className,
  ...instanceData
}) => {
  return (
    <DashboardCard
      variant="instance"
      starred={starred}
      onStarToggle={onStarToggle}
      actions={actions}
      metaLinks={metaLinks}
      className={className}
      {...instanceData}
    />
  );
};

export default InstanceCard; 