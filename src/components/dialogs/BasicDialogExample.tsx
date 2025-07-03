'use client';

import React, { useState } from 'react';
import { BasicDialog } from './BasicDialog';
import { Button } from '../buttons/Button';

/**
 * Demonstrates the `BasicDialog` component in its three variants.
 * This file is not imported by production code – it is purely for local story/demo purposes.
 */
export const BasicDialogExample: React.FC = () => {
  const [openVariant, setOpenVariant] = useState<null | 'default' | 'warning' | 'destructive'>(null);

  const close = () => setOpenVariant(null);

  return (
    <div className="flex flex-row gap-4">
      <Button onClick={() => setOpenVariant('default')}>Open Default Dialog</Button>
      <Button variant="warning" onClick={() => setOpenVariant('warning')}>
        Open Warning Dialog
      </Button>
      <Button variant="error" onClick={() => setOpenVariant('destructive')}>
        Open Destructive Dialog
      </Button>

      {/* Render a single dialog based on currently selected variant */}
      <BasicDialog
        open={openVariant !== null}
        variant={openVariant ?? 'default'}
        onClose={close}
        onConfirm={() => {
          alert('Confirmed!');
          close();
        }}
      />
    </div>
  );
};

export default BasicDialogExample; 