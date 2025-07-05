'use client';

import React from 'react';
import { Tabs } from './Tabs';

export default function TabsExample() {
  const baseTabs = Array.from({ length: 4 }).map((_, i) => ({
    id: `tab-${i + 1}`,
    label: `Tab ${i + 1}`,
    content: <div className="p-4">This is the content of Tab {i + 1}.</div>,
  }));

  const overflowTabs = Array.from({ length: 10 }).map((_, i) => ({
    id: `long-tab-${i + 1}`,
    label: `Tab ${i + 1}`,
    content: <div className="p-4">Overflow tab {i + 1} content.</div>,
  }));

  return (
    <div className="space-y-12 mx-auto mt-8">
      {/* Horizontal */}
      <div>
        <h2 className="text-heading-md font-headline mb-4">Horizontal Tabs</h2>
        <Tabs items={baseTabs} />
      </div>

      {/* Horizontal (overflow) */}
      <div>
        <h2 className="text-heading-md font-headline mb-4">Horizontal Tabs – Overflow</h2>
        <Tabs items={overflowTabs} />
      </div>

      {/* Vertical */}
      <div>
        <h2 className="text-heading-md font-headline mb-4">Vertical Tabs</h2>
        <div className="h-64">
          <Tabs items={baseTabs} orientation="vertical" className="h-full" />
        </div>
      </div>
    </div>
  );
} 