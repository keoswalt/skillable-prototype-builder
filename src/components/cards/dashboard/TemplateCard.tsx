"use client";

import React from 'react';
import DashboardCard, { CardAction, TemplateData, MetaLinkConfig, CardClickConfig } from './DashboardCard';

export type TemplateCardProps = Omit<TemplateData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, MetaLinkConfig>;
  onClick?: CardClickConfig;
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

const TemplateCardComponent: React.FC<TemplateCardProps> = React.memo((props) => {
  // Define default actions for template cards
  const defaultActions: CardAction[] = [
    {
      icon: 'eye',
      label: 'Preview',
      onClick: () => {
        alert('Launches preview of template');
      },
    },
    {
      icon: 'circleQuestionMark',
      label: 'Details',
      onClick: () => {
        alert('Opens lab manual (what shows from template gallery when you click "details")');
      },
    },
    {
      icon: 'edit',
      label: 'Edit',
      onClick: () => {
        alert('Only shows for users with edit permissions. Opens edit profile page.');
      },
    },
    {
      icon: 'squarePlus',
      label: 'Create',
      onClick: () => {
        alert('Opens creation dialog with template selected');
      },
    },
    {
      icon: 'delete',
      label: 'Delete',
      onClick: () => {
        alert('Only shows for users with edit permissions. Opens confirmation dialog.');
      },
    },
  ];

  // Define default metalinks for template cards
  const defaultMetaLinks: Record<string, MetaLinkConfig> = {
    number: { message: "Opens lab profile detail page" },
    seriesName: { message: "Opens series detail page" },
    organization: { message: "Opens organization detail page" },
  };

  // Define default click behavior for template cards
  const defaultOnClick: CardClickConfig = { 
    message: "Opens creation dialog using selected template" 
  };

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;
  
  // Merge custom metalinks with defaults (custom takes precedence)
  const finalMetaLinks = { ...defaultMetaLinks, ...props.metaLinks };

  // Use custom onClick if provided, otherwise use default
  const finalOnClick = props.onClick || defaultOnClick;

  return <DashboardCard variant="template" {...props} onClick={finalOnClick} actions={finalActions} metaLinks={finalMetaLinks} />;
});

TemplateCardComponent.displayName = 'TemplateCard';

export const TemplateCard = TemplateCardComponent;
export default TemplateCard; 