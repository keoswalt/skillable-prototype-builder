// Example usage for the DropdownSelect component

'use client';

import { DropdownSelect } from './DropdownSelect';

export default function DropdownSelectExample() {
  return (
    <div className="flex flex-col gap-8 max-w-xs p-4">
      {/* Default state */}
      <DropdownSelect
        label="Label"
        required
        helperText="Helper text"
        defaultValue=""
        options={[
          { label: 'Value', value: '' },
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />

      {/* Active / focus state (autoFocus to show focus ring) */}
      <DropdownSelect
        label="Label"
        required
        helperText="Helper text"
        defaultValue="1"
        autoFocus
        options={[
          { label: 'Value', value: '' },
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />

      {/* Error state */}
      <DropdownSelect
        label="Label"
        required
        error
        helperText="Helper text"
        options={[
          { label: 'Value', value: '' },
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />

      {/* Disabled state */}
      <DropdownSelect
        label="Label"
        required
        disabled
        helperText="Helper text"
        options={[
          { label: 'Value', value: '' },
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
      />
    </div>
  );
} 