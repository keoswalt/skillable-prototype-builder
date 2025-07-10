import React from 'react';
import DashboardCard, { CardAction, SeriesData } from './DashboardCard';

export type SeriesCardProps = Omit<SeriesData, 'variant'> & {
  starred?: boolean;
  onStarToggle?: () => void;
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
};

export const SeriesCard: React.FC<SeriesCardProps> = (props) => {
  return <DashboardCard variant="series" {...props} />;
};

export default SeriesCard; 