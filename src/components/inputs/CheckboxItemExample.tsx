import React from 'react';
import { CheckboxItem } from './CheckboxItem';

/**
 * Demo grid for the CheckboxItem component showcasing various states.
 */
export const CheckboxItemExample: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 p-6 mx-auto">
      {/* Enabled states */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Enabled</h3>
        <CheckboxItem label="Empty" checked={false} onChange={() => {}} />
        <CheckboxItem label="Checked" checked={true} onChange={() => {}} />
        <CheckboxItem label="Indeterminate" indeterminate />
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Disabled</h3>
        <CheckboxItem label="Disabled empty" disabled />
        <CheckboxItem label="Disabled checked" checked disabled />
      </section>

      {/* Error */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Error</h3>
        <CheckboxItem label="Error" error helperText="Helper text" />
      </section>

    {/* Error */}
    <section className="flex flex-col gap-3 max-w-lg">
    <h3 className="font-headline text-heading-xs">Interactive</h3>
    <CheckboxItem label="Click me!" onChange={() => {}} />
  </section>
</div>
  );
};

export default CheckboxItemExample; 