import React from 'react';
import DashboardCard, { CardAction, TemplateData } from './DashboardCard';

export type TemplateCardProps = Omit<TemplateData, 'variant'> & {
  starred?: boolean;
  onStarToggle?: () => void;
  actions?: CardAction[];
  metaLinks?: Record<string, string>;
  className?: string;
};

export const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  return <DashboardCard variant="template" {...props} />;
};

export default TemplateCard; 