// src/components/cards/dashboard-cards/SeriesCard.tsx
// PURPOSE: A specialized card component for lab series that wraps the base DashboardCard
// with series-specific data structure and default styling.

import React from 'react';
import DashboardCard, { CardAction } from '../DashboardCard';
import { SeriesData } from '../DashboardCard';

export interface SeriesCardProps extends Omit<SeriesData, 'variant'> {
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

export const SeriesCard: React.FC<SeriesCardProps> = ({
  starred,
  onStarToggle,
  actions,
  metaLinks,
  className,
  ...seriesData
}) => {
  return (
    <DashboardCard
      variant="series"
      starred={starred}
      onStarToggle={onStarToggle}
      actions={actions}
      metaLinks={metaLinks}
      className={className}
      {...seriesData}
    />
  );
};

export default SeriesCard; 