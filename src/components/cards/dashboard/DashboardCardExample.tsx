"use client";

// src/components/cards/dashboard/DashboardCardExample.tsx
// Demonstrates each specialized Dashboard card wrapper component.

import React, { useState } from 'react';
import { CardAction } from './DashboardCard';
import { InstanceCard } from './InstanceCard';
import { ProfileCard } from './ProfileCard';
import { SeriesCard } from './SeriesCard';
import { TemplateCard } from './TemplateCard';

const dummyActions: CardAction[] = [
  { icon: 'externalLink', label: 'Open', onClick: () => alert('Open clicked') },
  { icon: 'gradCap', label: 'Training', onClick: () => alert('Training clicked') },
  { icon: 'edit', label: 'Edit', onClick: () => alert('Edit clicked') },
  { icon: 'saveAll', label: 'Duplicate', onClick: () => alert('Duplicate clicked') },
  { icon: 'delete', label: 'Delete', onClick: () => alert('Delete clicked') },
  { icon: 'eye', label: 'Preview', onClick: () => alert('Preview clicked') },
  { icon: 'squarePlus', label: 'Add', onClick: () => alert('Add clicked') },
];

export const DashboardCardExample: React.FC = () => {
  // Maintain independent "starred" state per card.
  const [starState, setStarState] = useState<Record<string, boolean>>({
    instance: false,
    profile: false,
    series: false,
    template: false,
  });

  const toggleStar = (id: string) => setStarState((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col gap-6 mx-auto">
      {/* Instance - Uses default click behavior (no onClick prop) */}
      <InstanceCard
        name="Lab Profile Name (Kim Oswalt)"
        instanceId="1053453"
        labProfile="Lab Profile Name"
        series="Lab Series Name"
        student="Kim Oswalt"
        duration="1:10"
        lastActivity="June 5, 2025"
        state="Off"
        actions={dummyActions}
        // No onClick prop - uses default behavior automatically
      />

      {/* Profile - Overrides default click behavior with custom alert */}
      <ProfileCard
        starred={starState['profile']}
        name="Lab Profile Name"
        statusLabel="In Development"
        statusTone="warning"
        number="KO_001"
        seriesName="My Lab Series"
        organization="Skillable – Production"
        platform="Azure"
        created="June 2, 2025"
        modified="June 5, 2025"
        actions={[dummyActions[0], dummyActions[1], dummyActions[2], dummyActions[3], dummyActions[4]]}
        onClick={{ message: "Profile card clicked! This could open a detail view." }} // Custom behavior overrides default
        metaLinks={{
          // Override default message for number
          number: { message: "Custom Profile Number Message: KO_001" },
          // Override default message for platform
          platform: { message: "Platform: Azure - Custom message!" },
          // Add a new clickable field that wasn't in defaults
          created: { message: "Created Date: June 2, 2025" },
        }}
        onStarToggle={() => toggleStar('profile')}
      />

      {/* Series - Uses default click behavior (no onClick prop) */}
      <SeriesCard
        starred={starState['series']}
        onStarToggle={() => toggleStar('series')}
        name="Lab Series Name"
        organization="Skillable – Production"
        labProfiles="2"
        virtualMachines="5"
        apiConsumers="3"
        created="June 2, 2025"
        modified="June 5, 2025"
        actions={[dummyActions[0], dummyActions[3], dummyActions[4]]}
        // No onClick prop - uses default behavior automatically
      />

      {/* Template - Overrides default click behavior with simple alert */}
      <TemplateCard
        starred={starState['template']}
        onStarToggle={() => toggleStar('template')}
        name="Template Name"
        statusLabel="Complete"
        statusTone="success"
        number="KO_001"
        seriesName="My Lab Series"
        organization="Skillable – Production"
        platform="Azure"
        created="June 2, 2025"
        modified="June 5, 2025"
        actions={[dummyActions[0], dummyActions[5], dummyActions[2], dummyActions[6]]}
        onClick={true} // Custom behavior overrides default
        metaLinks={{
          // Override default message for number
          number: { message: "Template Number: KO_001 - Custom template message!" },
          // Disable platform link by setting to false
          platform: false,
          // Add a new clickable field
          modified: { message: "Last Modified: June 5, 2025" },
        }}
      />
    </div>
  );
};

export default DashboardCardExample; 