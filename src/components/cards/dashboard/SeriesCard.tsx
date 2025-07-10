import React from 'react';
import DashboardCard, { CardAction, SeriesData } from './DashboardCard';

export type SeriesCardProps = Omit<SeriesData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
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

export const SeriesCard: React.FC<SeriesCardProps> = (props) => {
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

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;

  return <DashboardCard variant="series" {...props} actions={finalActions} />;
};

export default SeriesCard; 