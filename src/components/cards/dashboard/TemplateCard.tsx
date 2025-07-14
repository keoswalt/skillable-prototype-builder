import React from 'react';
import DashboardCard, { CardAction, TemplateData, MetaLinkConfig } from './DashboardCard';

export type TemplateCardProps = Omit<TemplateData, 'variant'> & {
  actions?: CardAction[];
  metaLinks?: Record<string, MetaLinkConfig>;
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

export const TemplateCard: React.FC<TemplateCardProps> = React.memo((props) => {
  // Define default actions for template cards
  const defaultActions: CardAction[] = [
    {
      icon: 'externalLink',
      label: 'Open',
      onClick: () => {
        alert('Launches preview of template');
      },
    },
    {
      icon: 'eye',
      label: 'Preview',
      onClick: () => {
        alert('Opens lab manual(what shows today when you click "details")');
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

  // Use custom actions if provided, otherwise use defaults
  const finalActions = props.actions || defaultActions;
  
  // Merge custom metalinks with defaults (custom takes precedence)
  const finalMetaLinks = { ...defaultMetaLinks, ...props.metaLinks };

  return <DashboardCard variant="template" {...props} actions={finalActions} metaLinks={finalMetaLinks} />;
});

export default TemplateCard; 