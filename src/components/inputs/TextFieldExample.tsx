import React from 'react';
import { TextField } from './TextField';

/**
 * Demo grid for the TextField component showcasing standard, focus, disabled, error,
 * required, and horizontal / vertical layouts.
 */
export const TextFieldExample: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 p-6 mx-auto">
      {/* Default */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Default</h3>
        <TextField label="Label" placeholder="Value" helperText="Helper text" />
      </section>

      {/* Required */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Required</h3>
        <TextField label="Label" placeholder="Value" required helperText="Helper text" />
      </section>

      {/* Error */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Error</h3>
        <TextField label="Label" placeholder="Value" helperText="Helper text" error required />
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Disabled</h3>
        <TextField label="Label" placeholder="Value" disabled helperText="Helper text" />
      </section>

      {/* Without Label */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Without label</h3>
        <TextField placeholder="Value" helperText="Helper text" />
      </section>

      {/* Horizontal layout */}
      <section className="flex flex-col gap-3 max-w-lg">
        <h3 className="font-headline text-heading-xs">Horizontal layout</h3>
        <TextField orientation="horizontal" label="Label" placeholder="Value" helperText="Helper text" required />
      </section>
    </div>
  );
};

export default TextFieldExample; 