# Dashboard Cards

A flexible card component system for the Skillable design system that renders four different data-card variants: lab instance, lab profile, lab series, and template.

## Overview

The `DashboardCard` component is the core card component that supports multiple variants through a discriminated union type system. Each variant has its own dedicated data shape and default behaviors.

## Props

- **variant** – Discriminator for the card content: `"instance" | "profile" | "series" | "template"`
- **Each variant has a dedicated data shape** (see interfaces below)
- **starred & onStarToggle** – Optional star functionality (both must be provided together). When provided, renders a star icon that toggles between filled (favorited) and outlined (not favorited). Note: Instance cards do not support starring functionality
- **actions?** – Optional cluster of icon–buttons on the right side of the header. Each card variant provides its own default actions, but these can be overridden
- **onClick?** – Optional card-level click behavior. Supports URL strings, boolean alerts, custom messages, or callback functions. When provided, the entire card becomes clickable with hover and active states

## Usage

```tsx
import { DashboardCard } from '@/components/cards/dashboard';

// With default actions (provided by each card variant)
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
/>

<DashboardCard
  variant="profile"
  name="Lab Profile Name"
  statusLabel="In Development"
  statusTone="warning"
  number="KO_001"
  seriesName="My Lab Series"
  organization="Skillable – Production"
  platform="Azure"
  created="June 2, 2025"
  modified="June 5, 2025"
  starred={true}
  onStarToggle={() => console.log('star toggled')}
/>
```

### With Custom Actions

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  actions={[{ icon: 'edit', label: 'Edit', onClick: () => console.log('edit') }]}
/>
```

## Card-Level Click Behavior

The card can be made clickable by providing an `onClick` prop:

### URL Navigation (opens in new tab)

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  onClick="/instances/1053453"
/>
```

### Simple Alert

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  onClick={true}
/>
```

### Custom Alert Message

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  onClick={{ message: "Custom card click message!" }}
/>
```

### Callback Function

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  onClick={() => console.log('Card clicked!')}
/>
```

## Clickable Metadata Values

Pass a `metaLinks` prop whose keys correspond to the data-property names and values can be:
- **URL strings** - renders as `<a>` tags
- **boolean values** - renders as clickable buttons that show an alert with the value
- **objects with message property** - renders as clickable buttons that show custom alert

```tsx
<DashboardCard
  variant="instance"
  name="Lab Profile Name (Kim Oswalt)"
  instanceId="1053453"
  labProfile="Lab Profile Name"
  series="Lab Series Name"
  student="Kim Oswalt"
  instructions="Advanced Blueprint (en)"
  duration="1:10"
  lastActivity="June 5, 2025"
  state="Off"
  metaLinks={{
    instanceId: '/instances/1053453', // URL - renders as <a>
    labProfile: true, // boolean - shows alert with value
    series: { message: "Series link clicked!" }, // object - shows custom alert
    instructions: '/instruction-sets/advanced-blueprint-en' // URL for instruction set
  }}
/>
```

## Data Interfaces

### InstanceData

```tsx
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
  instructions: string;
}
```

### ProfileData

```tsx
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
```

### SeriesData

```tsx
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
```

### TemplateData

```tsx
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
```

## Card Variants

### InstanceCard

A wrapper component for instance data that provides default behaviors and handles field mapping between `InstanceItem` (dashboard data) and `InstanceData` (card interface).

**Features:**
- Automatically maps `instructionSet` field to `instructions`
- Provides default clickable behavior for metadata fields
- Does not support starring functionality
- Includes default actions (Open)

### ProfileCard

A wrapper component for profile data with full starring support and comprehensive default actions.

**Features:**
- Supports starring functionality
- Multiple default actions (Open, Edit Instructions, Edit, Clone, Delete)
- Clickable metadata fields with informative messages

### SeriesCard

A wrapper component for series data with starring support and series-specific actions.

**Features:**
- Supports starring functionality
- Series-specific default actions
- Clickable metadata fields

### TemplateCard

A wrapper component for template data with starring support and template-specific actions.

**Features:**
- Supports starring functionality
- Template-specific default actions
- Clickable metadata fields

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation support (Enter/Space for card clicks)
- Focus management with visible focus rings
- Screen reader friendly metadata structure

## Styling

- Responsive grid layout for metadata
- Hover and active states for clickable elements
- Consistent spacing and typography
- Theme-aware colors and borders 