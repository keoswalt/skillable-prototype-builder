// src/components/cards/dashboard-cards/TemplateCard.tsx
// PURPOSE: A specialized card component for templates that wraps the base DashboardCard
// with template-specific data structure and default styling.

import React from 'react';
import DashboardCard, { CardAction } from '../DashboardCard';
import { TemplateData } from '../DashboardCard';

export interface TemplateCardProps extends Omit<TemplateData, 'variant'> {
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

export const TemplateCard: React.FC<TemplateCardProps> = ({
  starred,
  onStarToggle,
  actions,
  metaLinks,
  className,
  ...templateData
}) => {
  return (
    <DashboardCard
      variant="template"
      starred={starred}
      onStarToggle={onStarToggle}
      actions={actions}
      metaLinks={metaLinks}
      className={className}
      {...templateData}
    />
  );
};

export default TemplateCard; 