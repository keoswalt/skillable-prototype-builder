import React from 'react';
import { Switch } from './Switch';

/**
 * Demo grid showcasing various states and label placements for the Switch component.
 */
export const SwitchExample: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 p-6 mx-auto">
      {/* Default (unchecked) */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline text-heading-xs">Default</h3>
        <Switch label="Enable notifications" />
      </section>

      {/* Checked by default */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline text-heading-xs">Checked</h3>
        <Switch label="Auto-sync" defaultChecked helperText="Keeps data in sync automatically." />
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline text-heading-xs">Disabled</h3>
        <Switch label="Location access" disabled />
      </section>

      {/* Label placements */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline text-heading-xs">Label placements</h3>
        <div className="flex flex-col gap-2">
          <Switch label="Top label" labelPlacement="top" />
          <Switch label="Bottom label" labelPlacement="bottom" />
          <Switch label="Left label" labelPlacement="left" />
          <Switch label="Right label" labelPlacement="right" />
        </div>
      </section>
    </div>
  );
};

export default SwitchExample; 