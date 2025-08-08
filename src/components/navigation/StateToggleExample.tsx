'use client';

import React, { useState } from 'react';
import StateToggle from './StateToggle';

export default function StateToggleExample() {
  const twoOptions = [
    { id: 'on', label: 'Toggle Item' },
    { id: 'off', label: 'Toggle Item' },
  ];

  const [selected, setSelected] = useState<string>('on');

  const threeOptions = [
    { id: 'draft', label: 'Draft' },
    { id: 'published', label: 'Published' },
    { id: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-6">
      {/* Uncontrolled – small size */}
      <div className="flex items-center gap-4">
        <StateToggle label="Label" options={twoOptions} defaultValue="on" size="small" />
        <span className="text-body-xs text-_components-text-secondary">Small size</span>
      </div>

      {/* Controlled – default (medium) size */}
      <div className="flex items-center gap-4">
        <StateToggle
          label="Status"
          options={threeOptions}
          value={selected}
          onChange={setSelected}
        />
        <span className="text-body-xs text-_components-text-secondary">Selected: {selected}</span>
      </div>
    </div>
  );
} 