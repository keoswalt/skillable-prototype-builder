import React from 'react';
import DashboardCard, { CardAction, TemplateData } from './DashboardCard';

export type TemplateCardProps = Omit<TemplateData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
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

export const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  return <DashboardCard variant="template" {...props} />;
};

export default TemplateCard; 