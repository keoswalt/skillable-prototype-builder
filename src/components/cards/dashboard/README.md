# Dashboard Cards

This directory contains flexible card components for the Skillable Studio user dashboard.

## Components

- `DashboardCard.tsx` - Base component with variant support
- `InstanceCard.tsx` - Lab instance cards
- `ProfileCard.tsx` - Lab profile cards  
- `SeriesCard.tsx` - Lab series cards
- `TemplateCard.tsx` - Template cards

## Default Actions

Each card variant comes with predefined default actions that are automatically included. These actions are defined at the component level and provide sensible defaults for each card type.

### Default Actions by Variant

**InstanceCard:**
- `Open` (externalLink icon) - Opens the lab instance

**ProfileCard:**
- `Open` (externalLink icon) - Launches lab client (if multiple instruction sets, shows dropdown to choose)
- `Edit Instructions` (gradCap icon) - If 1 instruction set, opens edit instructions page. If multiple, shows dropdown to choose instruction set
- `Edit` (edit icon) - Opens edit profile page
- `Clone` (saveAll icon) - Navigates to edit profile page, opens "save as" dialog
- `Delete` (delete icon) - Opens confirmation dialog

**SeriesCard:**
- `Edit` (edit icon) - Opens edit series page
- `Clone` (saveAll icon) - Navigates to lab series page, opens "save as" dialog
- `Delete` (delete icon) - Opens confirmation dialog

**TemplateCard:**
- `Open` (externalLink icon) - Launches preview of template
- `Preview` (eye icon) - Opens lab manual (what shows today when you click "details")
- `Edit` (edit icon) - Only shows for users with edit permissions. Opens edit profile page
- `Create` (squarePlus icon) - Opens creation dialog with template selected
- `Delete` (delete icon) - Only shows for users with edit permissions. Opens confirmation dialog

### Usage Examples

#### Default Actions (Automatic)
```tsx
// Default actions are automatically included
<InstanceCard
  title="Lab Instance"
  instanceId="12345"
  labProfile="My Profile"
  series="My Series"
  user="John Doe"
  instructionSet="Base instructions (en)"
  duration="1:30"
  lastActivity="2 hours ago"
  state="Running"
  // Open action is automatically included
/>

<ProfileCard
  title="Lab Profile"
  number="KO_001"
  seriesName="My Series"
  organization="Skillable - Production"
  platform="Azure"
  created="June 2, 2025"
  modified="June 5, 2025"
  // Open, Edit Instructions, Edit, Clone, Delete actions are automatically included
/>

<SeriesCard
  title="Lab Series"
  organization="Skillable - Production"
  labProfiles="5 Profiles"
  virtualMachines="3 VMs"
  apiConsumers="2 Consumers"
  created="June 2, 2025"
  modified="June 5, 2025"
  // Edit, Clone, Delete actions are automatically included
/>

<TemplateCard
  title="Template"
  number="TEMP_001"
  seriesName="Template Series"
  organization="Skillable - Production"
  platform="Azure"
  created="June 2, 2025"
  modified="June 5, 2025"
  // Open, Preview, Edit, Create, Delete actions are automatically included
/>
```

#### Custom Actions (Override Defaults)
```tsx
// Override default actions with custom ones
<InstanceCard
  title="Lab Instance"
  instanceId="12345"
  // ... other props
  actions={[
    { icon: 'eye', label: 'View Details', onClick: () => console.log('view') },
    { icon: 'settings', label: 'Configure', onClick: () => console.log('configure') },
    { icon: 'info', label: 'Info', onClick: () => console.log('info') }
  ]}
/>
```

## Benefits

1. **Zero Configuration** - Default actions are automatically included
2. **Consistency** - All cards of the same type have the same default actions
3. **Flexibility** - Still allows full customization via the `actions` prop
4. **Simplicity** - No need to pass callback props for common actions
5. **Maintainability** - Default actions are defined once per card type
6. **Type Safety** - Full TypeScript support
7. **Context-Aware** - Each card type has actions that make sense for that specific entity type

## Backward Compatibility

The implementation is fully backward compatible. Existing code using the `actions` prop will continue to work without changes.

## Implementation Details

Each card variant component defines its own `defaultActions` array that includes the appropriate actions for that card type. These actions are automatically passed to the underlying `DashboardCard` component unless custom actions are provided via the `actions` prop.

### Action Behavior Notes

- **Permission-based actions**: Some actions (like Edit and Delete on TemplateCard) only show for users with appropriate permissions
- **Context-sensitive actions**: Some actions (like Open on ProfileCard) behave differently based on the number of instruction sets
- **Navigation actions**: Many actions navigate to specific pages or open dialogs appropriate for the card type
- **Confirmation dialogs**: Delete actions typically open confirmation dialogs before proceeding 