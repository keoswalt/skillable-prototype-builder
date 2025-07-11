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
      {/* Instance */}
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
        metaLinks={{
          instanceId: { message: "Instance ID: 1053453 - This is a custom message!" },
          labProfile: true, // uses default alert (shows the value)
          series: { message: "Series link clicked! This is the lab series." },
          student: { message: "Student: Kim Oswalt - Clicked on student field" },
        }}
      />

      {/* Profile */}
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
        metaLinks={{
          number: { message: "Profile Number: KO_001" },
          organization: true, // uses default alert (shows the value)
          seriesName: { message: "Series Name: My Lab Series - Custom message!" },
        }}
        onStarToggle={() => toggleStar('profile')}
      />

      {/* Series */}
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
        metaLinks={{
          labProfiles: { message: "This series contains 2 lab profiles" },
          virtualMachines: { message: "Virtual Machines: 5 - Custom alert!" },
          apiConsumers: true, // uses default alert (shows the value)
        }}
      />

      {/* Template */}
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
        metaLinks={{
          number: { message: "Template Number: KO_001 - This is a template!" },
          organization: { message: "Organization: Skillable – Production" },
          seriesName: true, // uses default alert (shows the value)
        }}
      />
    </div>
  );
};

export default DashboardCardExample; 