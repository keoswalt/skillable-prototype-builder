"use client";

// src/components/cards/dashboard/DashboardCard.tsx
// PURPOSE: A flexible card component for the Skillable design system that renders four
// different data-card variants: lab instance, lab profile, lab series, and template.
//
// PROPS
// ---------------------------------------------------------------------------
// • variant – Discriminator for the card content: "instance" | "profile" | "series" | "template".
// • Each variant has a dedicated data shape (see interfaces below).
// • starred & onStarToggle – Optional star functionality (both must be provided together).
//   When provided, renders a star icon that toggles between filled (favorited) and outlined (not favorited).
//   Note: Instance cards do not support starring functionality.
// • actions? – Optional cluster of icon–buttons on the right side of the header.
//   Each card variant provides its own default actions, but these can be overridden.
// • onClick? – Optional card-level click behavior. Supports URL strings, boolean alerts, 
//   custom messages, or callback functions. When provided, the entire card becomes clickable
//   with hover and active states.
//
// USAGE
// ---------------------------------------------------------------------------
// import { DashboardCard } from '@/components/cards/dashboard';
//
// // With default actions (provided by each card variant)
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   statusLabel="In Development"
//   statusTone="warning"
//   number="KO_001"
//   seriesName="My Lab Series"
//   organization="Skillable – Production"
//   platform="Azure"
//   created="June 2, 2025"
//   modified="June 5, 2025"
//   starred={true}
//   onStarToggle={() => console.log('star toggled')}
// />
//
// // With custom actions
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   // ... other props
//   actions={[{ icon: 'edit', label: 'Edit', onClick: () => console.log('edit') }]}
// />
//
// -- Card-level click behavior -------------------------------------------------
// The card can be made clickable by providing an `onClick` prop:
//
// // URL navigation (opens in new tab)
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   // ... other props
//   onClick="/profiles/123"
// />
//
// // Simple alert
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   // ... other props
//   onClick={true}
// />
//
// // Custom alert message
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   // ... other props
//   onClick={{ message: "Custom card click message!" }}
// />
//
// // Callback function
// <DashboardCard
//   variant="profile"
//   name="Lab Profile Name"
//   // ... other props
//   onClick={() => console.log('Card clicked!')}
// />
//
// -- Clickable metadata values -------------------------------------------------
// Pass a `metaLinks` prop whose keys correspond to the data-property names and
// values can be:
// • URL strings - renders as <a> tags
// • boolean values - renders as clickable buttons that show an alert with the value
// • objects with message property - renders as clickable buttons that show custom alert
//
// <DashboardCard
//   variant="instance"
//   name="Lab Profile Name (Kim Oswalt)"
//   instanceId="1053453"
//   labProfile="Lab Profile Name"
//   series="Lab Series Name"
//   student="Kim Oswalt"
//   duration="1:10"
//   lastActivity="June 5, 2025"
//   state="Off"
//   metaLinks={{
//     instanceId: '/instances/1053453', // URL - renders as <a>
//     labProfile: true, // boolean - shows alert with value
//     series: { message: "Series link clicked!" } // object - shows custom alert
//   }}
// />
//
// ---------------------------------------------------------------------------

import React from 'react';
import { Icon, IconName, Icons } from '../../Icon';
import { Chip, ChipVariant } from '../../info/Chip';

/*************************
 * Type & Prop Definitions
 *************************/

// Shared action icon button type
export interface CardAction {
  icon: IconName;
  label: string;
  onClick: () => void;
}

// MetaLink configuration type - supports URLs, booleans, and custom messages
export type MetaLinkConfig = string | boolean | { message: string };

// Card click configuration type - supports URLs, booleans, custom messages, and callback functions
export type CardClickConfig = string | boolean | { message: string } | (() => void);

// Base props shared by all variants
interface BaseCardProps {
  /** Optional array of icon buttons displayed on the right-hand side */
  actions?: CardAction[];
  /** Map of data keys (e.g. "instanceId", "series") to URL strings, boolean values, or custom message objects. 
      If string: renders as <a> tag. If boolean/object: renders as clickable button that shows an alert. */
  metaLinks?: Record<string, MetaLinkConfig>;
  /** Card-level click behavior - supports URL strings, boolean alerts, custom messages, or callback functions */
  onClick?: CardClickConfig;
  /** Additional CSS classes for the root element */
  className?: string;
}

// Star functionality props - must be provided together or not at all
interface StarProps {
  /** Whether the card is marked as a favorite (renders a filled star icon) */
  starred: boolean;
  /** Toggle handler when star icon is clicked */
  onStarToggle: () => void;
}

// Combined base props with optional star functionality
type BaseCardPropsWithStar = BaseCardProps & Partial<StarProps>;

// ────────────────────────────────────────────────────────────────────────────
// Variant-specific data props – kept separate so we get exhaustive typing.
// The `variant` key is used as a discriminant.
// ────────────────────────────────────────────────────────────────────────────

export type DashboardCardProps =
  | (InstanceData & BaseCardPropsWithStar)
  | (ProfileData & BaseCardPropsWithStar)
  | (SeriesData & BaseCardPropsWithStar)
  | (TemplateData & BaseCardPropsWithStar);

/* ======================= Instance ======================= */
export interface InstanceData {
  variant: 'instance';
  /** Card name – typically the lab profile name with student */
  name: string;
  instanceId: string;
  labProfile: string;
  series: string;
  student: string;
  duration: string;
  lastActivity: string;
  state: string;
}

/* ======================= Profile ======================== */
export interface ProfileData {
  variant: 'profile';
  name: string;
  /** Optional colored status chip */
  statusLabel?: string;
  /** Chip variant (color) – defaults to 'default' */
  statusTone?: ChipVariant;
  number: string;
  seriesName: string;
  organization: string;
  platform: string;
  created: string;
  modified: string;
}

/* ======================== Series ======================== */
export interface SeriesData {
  variant: 'series';
  name: string;
  organization: string;
  labProfiles: string;
  virtualMachines: string;
  apiConsumers: string;
  created: string;
  modified: string;
}

/* ======================= Template ======================= */
export interface TemplateData {
  variant: 'template';
  name: string;
  number: string;
  seriesName: string;
  organization: string;
  platform: string;
  created: string;
  modified: string;
}

/*********************
 * Helper Components
 *********************/

interface MetaItemProps {
  label: string;
  value: React.ReactNode;
  isClickable?: boolean;
  alertMessage?: string;
  href?: string;
}

const MetaItem: React.FC<MetaItemProps> = ({ label, value, isClickable, alertMessage, href }) => {
  const handleClick = () => {
    if (alertMessage) {
      alert(alertMessage);
    } else if (typeof value === 'string') {
      alert(value);
    } else {
      alert('Clickable metadata value');
    }
  };

  return (
    <div className="flex flex-col gap-0.5 text-left">
      <dt className="uppercase text-body-xxs text-_components-text-secondary tracking-wider">{label}</dt>
      <dd className="text-body-xs text-_components-text-primary text-left line-clamp-2">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-main hover:underline focus:outline-none focus:ring-2 focus:ring-primary-main/40 text-left line-clamp-2"
          >
            {value}
          </a>
        ) : isClickable ? (
          <button
            onClick={handleClick}
            className="text-primary-main hover:underline focus:outline-none focus:ring-2 focus:ring-primary-main/40 cursor-pointer text-left line-clamp-2"
          >
            {value}
          </button>
        ) : (
          value
        )}
      </dd>
    </div>
  );
};

/*********************
 * Main Component
 *********************/

export const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  // Extract common props first
  const { actions, metaLinks, onClick, className = '' } = props;
  
  // Extract star props if they exist
  const starred = 'starred' in props ? props.starred : undefined;
  const onStarToggle = 'onStarToggle' in props ? props.onStarToggle : undefined;

  /* --------------------------- Handle card click --------------------------- */
  const handleCardClick = (event: React.MouseEvent) => {
    console.log('Card clicked!', { onClick, variant: props.variant, name: props.name });
    
    // Prevent if clicking on actual interactive elements (buttons, links, etc.)
    const target = event.target as Element;
    const isInteractiveElement = target.closest('button, a') || 
                                (target.closest('[role="button"]') && !target.closest('[data-card-wrapper]'));
    
    if (isInteractiveElement) {
      console.log('Click prevented - interactive element detected');
      return;
    }
    
    // Handle different click behavior types
    if (typeof onClick === 'string') {
      window.open(onClick, '_blank');
    } else if (typeof onClick === 'boolean') {
      alert('Card clicked');
    } else if (typeof onClick === 'object' && onClick?.message) {
      alert(onClick.message);
    } else if (typeof onClick === 'function') {
      onClick();
    }
  };

  /* --------------------------- Handle keyboard events --------------------------- */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (typeof onClick === 'string') {
        window.open(onClick, '_blank');
      } else if (typeof onClick === 'boolean') {
        alert('Card clicked');
      } else if (typeof onClick === 'object' && onClick?.message) {
        alert(onClick.message);
      } else if (typeof onClick === 'function') {
        onClick();
      }
    }
  };

  /* --------------------------- Build header --------------------------- */
  const renderHeader = () => {
    const headerChildren: React.ReactNode[] = [];

    // Optional star - only show when both starred state and toggle handler are provided
    if (typeof starred !== 'undefined' && onStarToggle) {
      const StarIcon = Icons.star;
      headerChildren.push(
        <button
          key="star"
          onClick={onStarToggle}
          aria-label={starred ? 'Unstar' : 'Star'}
          className={`text-primary-main transition-colors focus:outline-none focus:ring-2 focus:ring-primary-main/40 ${
            starred ? '' : 'opacity-30 hover:opacity-60'
          }`}
        >
          <Icon icon={StarIcon} className={`w-5 h-5 ${starred ? 'fill-current' : ''}`} />
        </button>
      );
    }

    // Name + optional chip (for profile / template)
    const titleContent: React.ReactNode[] = [];
    titleContent.push(
      <span key="title" className="font-regular text-body-sm text-_components-text-primary">
        {props.name}
      </span>
    );

    if ('statusLabel' in props && props.statusLabel && props.variant === 'profile') {
      titleContent.push(
        <Chip key="status" size="extra-small" variant={props.statusTone || 'secondary'} className="ml-2">
          {props.statusLabel}
        </Chip>
      );
    }

    headerChildren.push(
      <div key="titleBlock" className="flex items-center flex-wrap gap-y-1">
        {titleContent}
      </div>
    );

    return <div className="flex items-center gap-2 flex-wrap">{headerChildren}</div>;
  };

  /* --------------------------- Build metadata --------------------------- */
  const buildMeta = (): { key: string; label: string; value: React.ReactNode; isClickable?: boolean; alertMessage?: string; href?: string }[] => {
    switch (props.variant) {
      case 'instance': {
        const p = props as InstanceData;
        const i = (key: keyof InstanceData, label: string, val: React.ReactNode) => {
          const metaLinkConfig = metaLinks?.[key as string];
          const isUrl = typeof metaLinkConfig === 'string';
          const isClickable = Boolean(metaLinkConfig) && !isUrl;
          const alertMessage = typeof metaLinkConfig === 'object' && metaLinkConfig !== null ? metaLinkConfig.message : undefined;
          
          return {
            key,
            label,
            value: val,
            isClickable,
            alertMessage,
            href: isUrl ? metaLinkConfig : undefined,
          };
        };
        return [
          i('instanceId', 'Instance ID', p.instanceId),
          i('labProfile', 'Lab Profile', p.labProfile),
          i('series', 'Series', p.series),
          i('student', 'Student', p.student),
          i('duration', 'Run Time', p.duration),
          i('lastActivity', 'Last Activity', p.lastActivity),
          i('state', 'State', p.state),
        ];
      }
      case 'profile': {
        const p = props as ProfileData;
        const i = (key: keyof ProfileData, label: string, val: React.ReactNode) => {
          const metaLinkConfig = metaLinks?.[key as string];
          const isUrl = typeof metaLinkConfig === 'string';
          const isClickable = Boolean(metaLinkConfig) && !isUrl;
          const alertMessage = typeof metaLinkConfig === 'object' && metaLinkConfig !== null ? metaLinkConfig.message : undefined;
          
          return {
            key,
            label,
            value: val,
            isClickable,
            alertMessage,
            href: isUrl ? metaLinkConfig : undefined,
          };
        };
        return [
          i('number', 'Number', p.number),
          i('seriesName', 'Series Name', p.seriesName),
          i('organization', 'Organization', p.organization),
          i('platform', 'Platform', p.platform),
          i('created', 'Created', p.created),
          i('modified', 'Modified', p.modified),
        ];
      }
      case 'series': {
        const p = props as SeriesData;
        const i = (key: keyof SeriesData, label: string, val: React.ReactNode) => {
          const metaLinkConfig = metaLinks?.[key as string];
          const isUrl = typeof metaLinkConfig === 'string';
          const isClickable = Boolean(metaLinkConfig) && !isUrl;
          const alertMessage = typeof metaLinkConfig === 'object' && metaLinkConfig !== null ? metaLinkConfig.message : undefined;
          
          return {
            key,
            label,
            value: val,
            isClickable,
            alertMessage,
            href: isUrl ? metaLinkConfig : undefined,
          };
        };
        return [
          i('organization', 'Organization', p.organization),
          i('labProfiles', 'Lab Profiles', p.labProfiles),
          i('virtualMachines', 'Virtual Machines', p.virtualMachines),
          i('apiConsumers', 'API Consumers', p.apiConsumers),
          i('created', 'Created', p.created),
          i('modified', 'Modified', p.modified),
        ];
      }
      case 'template': {
        const p = props as TemplateData;
        const i = (key: keyof TemplateData, label: string, val: React.ReactNode) => {
          const metaLinkConfig = metaLinks?.[key as string];
          const isUrl = typeof metaLinkConfig === 'string';
          const isClickable = Boolean(metaLinkConfig) && !isUrl;
          const alertMessage = typeof metaLinkConfig === 'object' && metaLinkConfig !== null ? metaLinkConfig.message : undefined;
          
          return {
            key,
            label,
            value: val,
            isClickable,
            alertMessage,
            href: isUrl ? metaLinkConfig : undefined,
          };
        };
        return [
          i('number', 'Number', p.number),
          i('seriesName', 'Series Name', p.seriesName),
          i('organization', 'Organization', p.organization),
          i('platform', 'Platform', p.platform),
          i('created', 'Created', p.created),
          i('modified', 'Modified', p.modified),
        ];
      }
      default:
        return [];
    }
  };

  const metaItems = buildMeta();

  /* --------------------------- Render --------------------------- */
  const cardContent = (
    <div
      className={`w-full rounded-lg border border-_components-divider-main bg-_components-background-default p-2 space-y-1 shadow-sm ${
        onClick ? 'cursor-pointer transition-all duration-200 hover:border-primary-main hover:shadow-md active:bg-_components-background-contrast-sm focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2' : ''
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {renderHeader()}

        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            {actions.map(({ icon, label, onClick }) => {
              const ActionIcon = Icons[icon];
              return (
                <button
                  key={label}
                  onClick={onClick}
                  aria-label={label}
                  className="text-primary-main opacity-80 hover:opacity-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-main/40"
                >
                  <Icon icon={ActionIcon} className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Metadata grid */}
      {metaItems.length > 0 && (
        <dl className="mt-4 grid gap-y-2 gap-x-2 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 2xl:grid-cols-8">
          {metaItems.map(({ key, label, value, isClickable, alertMessage, href }) => (
            <MetaItem key={key} label={label} value={value} isClickable={isClickable} alertMessage={alertMessage} href={href} />
          ))}
        </dl>
      )}
    </div>
  );

  // If onClick is provided, wrap in appropriate interactive element
  if (onClick) {
    const isUrl = typeof onClick === 'string';
    
    if (isUrl) {
      return (
        <a 
          href={onClick}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${props.name} in new tab`}
          className="block w-full no-underline"
          tabIndex={0}
        >
          {cardContent}
        </a>
      );
    } else {
      return (
        <div
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
          aria-label={`Click to interact with ${props.name}`}
          className="block w-full cursor-pointer"
          role="button"
          tabIndex={0}
          data-card-wrapper
        >
          {cardContent}
        </div>
      );
    }
  }

  // Return card content directly if no onClick behavior
  return cardContent;
};

export default DashboardCard; 