import React, { useState } from 'react';
import { RadioList } from './RadioList';

/**
 * Demo component showcasing the RadioList in various states.
 */
export const RadioListExample: React.FC = () => {
  const items = [
    { label: 'First', value: 'first' },
    { label: 'Second', value: 'second' },
    { label: 'Third', value: 'third' },
  ];

  // Controlled demo
  const [selected, setSelected] = useState<string>('second');

  return (
    <div className="flex flex-col gap-10 p-6 mx-auto">
      {/* Uncontrolled with helper */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline text-heading-xs">Uncontrolled</h3>
        <RadioList
          label="List Label"
          helperText="Helper text"
          items={items}
          defaultValue="first"
        />
      </section>

      {/* Controlled demo */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline text-heading-xs">Controlled</h3>
        <RadioList
          label="Choose one"
          items={items}
          value={selected}
          onChange={setSelected}
        />
        <p className="text-body-sm">Selected: {selected}</p>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <h3 className="font-headline text-heading-xs">Disabled</h3>
        <RadioList label="Disabled" items={items} defaultValue="third" disabled />
      </section>
    </div>
  );
};

export default RadioListExample; 