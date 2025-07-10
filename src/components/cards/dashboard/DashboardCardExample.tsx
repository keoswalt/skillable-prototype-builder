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
        title="Lab Profile Name (Kim Oswalt)"
        instanceId="1053453"
        labProfile="Lab Profile Name"
        series="Lab Series Name"
        user="Kim Oswalt"
        instructionSet="Base instruction set (en)"
        duration="1:10"
        lastActivity="June 5, 2025"
        state="Off"
        actions={dummyActions}
        metaLinks={{
          instanceId: '/instances/1053453',
          labProfile: '/profiles/Kim-Oswalt',
          series: '/series/lab-series-name',
          user: '/users/Kim-Oswalt',
        }}
      />

      {/* Profile */}
      <ProfileCard
        starred={starState['profile']}
        title="Lab Profile Name"
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
          number: '/instances/1053453',
          organization: '/profiles/Kim-Oswalt',
          seriesName: '/series/lab-series-name',
        }}
        onStarToggle={() => toggleStar('profile')}
      />

      {/* Series */}
      <SeriesCard
        starred={starState['series']}
        onStarToggle={() => toggleStar('series')}
        title="Lab Series Name"
        organization="Skillable – Production"
        labProfiles="2"
        virtualMachines="5"
        apiConsumers="3"
        created="June 2, 2025"
        modified="June 5, 2025"
        actions={[dummyActions[0], dummyActions[3], dummyActions[4]]}
        metaLinks={{
          labProfiles: '/instances/1053453',
          virtualMachines: '/profiles/Kim-Oswalt',
          apiConsumers: '/series/lab-series-name',
        }}
      />

      {/* Template */}
      <TemplateCard
        starred={starState['template']}
        onStarToggle={() => toggleStar('template')}
        title="Template Name"
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
          number: '/instances/1053453',
          organization: '/profiles/Kim-Oswalt',
          seriesName: '/series/lab-series-name',
        }}
      />
    </div>
  );
};

export default DashboardCardExample; 