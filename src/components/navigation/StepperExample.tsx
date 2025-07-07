'use client';

import React, { useState } from 'react';
import Stepper from './Stepper';
import { Button } from '../buttons/Button';

export default function StepperExample() {
  const steps = [
    { label: 'Step title', description: 'Optional' },
    { label: 'Step title', description: 'Optional' },
    { label: 'Step title', description: 'Optional' },
    { label: 'Step title', description: 'Optional' },
  ];

  const [current, setCurrent] = useState(1);

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length));
  const prev = () => setCurrent((c) => Math.max(c - 1, 1));

  return (
    <div className="space-y-6 max-w-2xl">
      <Stepper steps={steps} currentStep={current} />

      <div className="flex gap-4">
        <Button onClick={prev} disabled={current === 1}>Back</Button>
        <Button onClick={next} disabled={current === steps.length}>Next</Button>
      </div>
    </div>
  );
} 