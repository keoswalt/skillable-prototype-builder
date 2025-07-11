import React, { useRef, useState } from 'react';
import { FilterMenu } from './FilterMenu';
import { Button } from '../buttons/Button';

const columns = [
  { label: 'Number', value: 'number', type: 'text' as const },
  { label: 'Series', value: 'series', type: 'text' as const },
  { label: 'Favorite', value: 'favorite', type: 'boolean' as const },
];

const operatorsByType = {
  text: [
    { label: 'contains', value: 'contains' },
    { label: 'is', value: 'is' },
    { label: 'is not', value: 'is_not' },
  ],
  boolean: [
    { label: 'is', value: 'is' },
  ],
};

export default function FilterMenuExample() {
  const [filters, setFilters] = useState([
    { column: 'number', operator: 'contains', value: '' },
    { column: 'series', operator: 'contains', value: '' },
    { column: 'favorite', operator: 'is', value: 'true' },
  ]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="max-w-2xl mx-auto my-8">
      <Button
        ref={buttonRef}
        variant="primary"
        onClick={() => setOpen(o => !o)}
      >
        Open Filters Menu
      </Button>
      <FilterMenu
        columns={columns}
        filters={filters}
        onChange={setFilters}
        operatorsByType={operatorsByType}
        isOpen={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
        triggerRef={buttonRef}
      />
    </div>
  );
} 