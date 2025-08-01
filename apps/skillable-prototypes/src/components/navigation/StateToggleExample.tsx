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
    <div className="space-y-6 space-x-4">
      {/* Uncontrolled */}
      <StateToggle label="Label" options={twoOptions} defaultValue="on" />

      {/* Controlled */}
      <StateToggle
        label="Status"
        options={threeOptions}
        value={selected}
        onChange={setSelected}
      />
      <p className="text-body-sm text-_components-text-secondary">Selected: {selected}</p>
    </div>
  );
} 