// Example usage for the DropdownSelect component

'use client';

import { DropdownSelect } from './DropdownSelect';
import { Button } from '../buttons/Button';

export default function DropdownSelectExample() {
  return (
    <div className="flex flex-col gap-8 max-w-xs p-4">
      {/* Size variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Variants</h3>
        
        {/* Small size */}
        <div className="flex items-end gap-2">
          <DropdownSelect
            size="small"
            label="Small"
            defaultValue="1"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
          <Button size="small">Small</Button>
        </div>

        {/* Medium size (default) */}
        <div className="flex items-end gap-2">
          <DropdownSelect
            size="medium"
            label="Medium"
            defaultValue="1"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
          <Button size="medium">Medium</Button>
        </div>

        {/* Large size */}
        <div className="flex items-end gap-2">
          <DropdownSelect
            size="large"
            label="Large"
            defaultValue="1"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
          <Button size="large">Large</Button>
        </div>
      </div>

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