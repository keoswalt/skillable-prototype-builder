// src/components/cards/DashboardCard.tsx
// PURPOSE: A flexible card component for the Skillable design system that renders four
// different data-card variants: lab instance, lab profile, lab series, and template.
//
// PROPS
// ---------------------------------------------------------------------------
// • variant – Discriminator for the card content: "instance" | "profile" | "series" | "template".
// • Each variant has a dedicated data shape (see interfaces below).
// • starred? – Whether the card is marked as a favorite (renders a star icon on the left).
// • onStarToggle? – Callback when the star icon is toggled.
// • actions? – Optional cluster of icon–buttons on the right side of the header.
//
// USAGE
// ---------------------------------------------------------------------------
// import { DashboardCard } from '../cards/DashboardCard';
//
// <DashboardCard
//   variant="profile"
//   title="Lab Profile Name"
//   statusLabel="In Development"
//   statusTone="warning"
//   number="KO_001"
//   seriesName="My Lab Series"
//   organization="Skillable – Production"
//   platform="Azure"
//   created="June 2, 2025"
//   modified="June 5, 2025"
//   actions={[{ icon: 'edit', label: 'Edit', onClick: () => console.log('edit') }]}
// />
//
// -- Linking metadata values -------------------------------------------------
// Pass a `metaLinks` prop whose keys correspond to the data-property names and
// values are URLs.  Any matching metadata value will render as an <a> element.
//
// <DashboardCard
//   variant="instance"
//   title="Lab Profile Name (Kim Oswalt)"
//   instanceId="1053453"
//   labProfile="Lab Profile Name"
//   series="Lab Series Name"
//   user="Kim Oswalt"
//   instructionSet="Base instruction set (en)"
//   duration="1:10"
//   lastActivity="June 5, 2025"
//   state="Off"
//   metaLinks={{
//     instanceId: '/instances/1053453',
//     labProfile: '/profiles/Kim-Oswalt',
//     series: '/series/lab-series-name'
//   }}
// />
//
// The accompanying DashboardCardExample.tsx file shows concrete examples for each variant.
// ---------------------------------------------------------------------------

import React from 'react';
import { Icon, IconName, Icons } from '../Icon';
import { Chip, ChipVariant } from '../info/Chip';

/*************************
 * Type & Prop Definitions
 *************************/

// Shared action icon button type
export interface CardAction {
  icon: IconName;
  label: string;
  onClick: () => void;
}

// Base props shared by all variants
interface BaseCardProps {
  /** Adds a colored star icon on the far-left */
  starred?: boolean;
  /** Toggle handler when star icon is clicked */
  onStarToggle?: () => void;
  /** Optional array of icon buttons displayed on the right-hand side */
  actions?: CardAction[];
  /** Map of data keys (e.g. "instanceId", "series") to URL strings. If provided, the corresponding value renders as an <a>. */
  metaLinks?: Record<string, string>;
  /** Additional CSS classes for the root element */
  className?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Variant-specific data props – kept separate so we get exhaustive typing.
// The `variant` key is used as a discriminant.
// ────────────────────────────────────────────────────────────────────────────

export type DashboardCardProps =
  | InstanceData & BaseCardProps
  | ProfileData & BaseCardProps
  | SeriesData & BaseCardProps
  | TemplateData & BaseCardProps;

/* ======================= Instance ======================= */
export interface InstanceData {
  variant: 'instance';
  /** Card title – typically the lab profile name with user */
  title: string;
  instanceId: string;
  labProfile: string;
  series: string;
  user: string;
  instructionSet: string;
  duration: string;
  lastActivity: string;
  state: string;
}

/* ======================= Profile ======================== */
export interface ProfileData {
  variant: 'profile';
  title: string;
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
  title: string;
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
  title: string;
  statusLabel?: string;
  statusTone?: ChipVariant;
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
  href?: string;
}

const MetaItem: React.FC<MetaItemProps> = ({ label, value, href }) => (
  <div className="flex flex-col gap-0.5">
    <dt className="uppercase text-body-xxs text-_components-text-secondary tracking-wider">{label}</dt>
    <dd className="text-body-sm text-_components-text-primary break-words">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-main hover:underline focus:outline-none focus:ring-2 focus:ring-primary-main/40"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </dd>
  </div>
);

/*********************
 * Main Component
 *********************/

export const DashboardCard: React.FC<DashboardCardProps> = (props) => {
  // Extract common props first
  const { starred, onStarToggle, actions, metaLinks, className = '' } = props;

  /* --------------------------- Build header --------------------------- */
  const renderHeader = () => {
    const headerChildren: React.ReactNode[] = [];

    // Optional star
    if (typeof starred !== 'undefined' || onStarToggle) {
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

    // Title + optional chip (for profile / template)
    const titleContent: React.ReactNode[] = [];
    titleContent.push(
      <span key="title" className="font-semibold text-h6 text-_components-text-primary">
        {props.title}
      </span>
    );

    if ('statusLabel' in props && props.statusLabel) {
      titleContent.push(
        <Chip
          key="status"
          size="small"
          variant={props.statusTone || 'secondary'}
          className="ml-2"
        >
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
  const buildMeta = (): { key: string; label: string; value: React.ReactNode; href?: string }[] => {
    switch (props.variant) {
      case 'instance': {
        const p = props as InstanceData;
        const i = (key: keyof InstanceData, label: string, val: React.ReactNode) => ({
          key,
          label,
          value: val,
          href: metaLinks?.[key as string],
        });
        return [
          i('instanceId', 'Instance ID', p.instanceId),
          i('labProfile', 'Lab Profile', p.labProfile),
          i('series', 'Series', p.series),
          i('user', 'User', p.user),
          i('instructionSet', 'Instruction Set', p.instructionSet),
          i('duration', 'Duration', p.duration),
          i('lastActivity', 'Last Activity', p.lastActivity),
          i('state', 'State', p.state),
        ];
      }
      case 'profile': {
        const p = props as ProfileData;
        const i = (key: keyof ProfileData, label: string, val: React.ReactNode) => ({
          key,
          label,
          value: val,
          href: metaLinks?.[key as string],
        });
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
        const i = (key: keyof SeriesData, label: string, val: React.ReactNode) => ({
          key,
          label,
          value: val,
          href: metaLinks?.[key as string],
        });
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
        const i = (key: keyof TemplateData, label: string, val: React.ReactNode) => ({
          key,
          label,
          value: val,
          href: metaLinks?.[key as string],
        });
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
  return (
    <div
      className={`w-full rounded-lg border border-_components-divider-main bg-_components-background-default p-4 shadow-sm ${className}`}
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
        <dl className="mt-4 grid gap-y-3 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {metaItems.map(({ key, label, value, href }) => (
            <MetaItem key={key} label={label} value={value} href={href} />
          ))}
        </dl>
      )}
    </div>
  );
};

export default DashboardCard; 