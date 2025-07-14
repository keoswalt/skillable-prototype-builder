import React from 'react';
import { InstanceCard } from '@/components/cards/dashboard/InstanceCard';
import { ProfileCard } from '@/components/cards/dashboard/ProfileCard';

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Test Page</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Instance Card Test</h2>
        <InstanceCard
          name="Test Instance"
          instanceId="12345"
          labProfile="Test Profile"
          series="Test Series"
          student="Test User"
          duration="1:00"
          lastActivity="Today"
          state="Running"
          actions={[
            { icon: "edit", label: "Edit", onClick: () => console.log('edit') }
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Profile Card Test</h2>
        <ProfileCard
          name="Test Profile"
          number="TEST_001"
          seriesName="Test Series"
          organization="Test Org"
          platform="Azure"
          created="Today"
          modified="Today"
          starred={true}
          onStarToggle={() => console.log('star toggled')}
          actions={[
            { icon: "edit", label: "Edit", onClick: () => console.log('edit') }
          ]}
        />
      </div>
    </div>
  );
} 