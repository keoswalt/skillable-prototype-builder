// src/components/cards/DashboardCardExample.tsx
// This file provides a simple showcase of the four DashboardCard variants.
// Import it into a page (e.g. designSystemDemo/page.tsx) to visually verify styling.

import React, { useState } from 'react';
import DashboardCard from './dashboard/DashboardCard';
import { CardAction } from './dashboard/DashboardCard';

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
  // Maintain independent "starred" state per card using an object keyed by a unique id
  const [starState, setStarState] = useState<Record<string, boolean>>({
    instance: false,
    profile: false,
    series: false,
    template: false,
  });

  const toggleStar = (id: string) => {
    setStarState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6 mx-auto">
      {/* Instance */}
      <DashboardCard
        variant="instance"
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
          instanceId: '/instances/1053453',
          labProfile: '/profiles/Kim-Oswalt',
          series: '/series/lab-series-name',
          student: '/users/Kim-Oswalt',
        }}
      />

      {/* Profile */}
      <DashboardCard
        starred={starState['profile']}
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
        actions={[dummyActions[0], dummyActions[1], dummyActions[2], dummyActions[3], dummyActions[4]]}
        metaLinks={{
          number: '/instances/1053453',
          organization: '/profiles/Kim-Oswalt',
          seriesName: '/series/lab-series-name'
        }}
        onStarToggle={() => toggleStar('profile')}
      />

      {/* Series */}
      <DashboardCard
        starred={starState['series']}
        onStarToggle={() => toggleStar('series')}
        variant="series"
        name="Lab Series Name"
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
          apiConsumers: '/series/lab-series-name'
        }}
      />

      {/* Template */}
      <DashboardCard
        starred={starState['template']}
        variant="template"
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
          number: '/instances/1053453',
          organization: '/profiles/Kim-Oswalt',
          seriesName: '/series/lab-series-name'
        }}
        onStarToggle={() => toggleStar('template')}
      />
    </div>
  );
};

export default DashboardCardExample; 