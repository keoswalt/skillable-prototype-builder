'use client';

import React, { useState, useRef, useEffect } from 'react';
import Tabs, { TabItem } from '@/components/navigation/Tabs';
import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs/DropdownSelect';
import StateToggle from '@/components/navigation/StateToggle';
import { Switch } from '@/components/inputs/Switch';

export default function InstructionsEditorPage() {
  // Percentage width of the left pane
  const [leftWidth, setLeftWidth] = useState(50);
  const [isAutosave, setIsAutosave] = useState(true);
  const [viewMode, setViewMode] = useState<'code' | 'visual'>('code');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      // Constrain between 10% and 90%
      setLeftWidth(Math.min(90, Math.max(10, newLeftWidth)));
    };

    const stopDragging = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, []);

  // Tab definitions for header navigation
  const tabs: TabItem[] = [
    { id: 'editor', label: 'Editor', content: <></> },
    { id: 'activities', label: 'Activities', content: <></> },
    { id: 'help', label: 'Help', content: <></> },
  ];

  return (
    <div className="flex min-h-screen flex-col pt-14">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-14 shrink-0 bg-_components-background border-b border-softgrey-main text-_components-text-primary px-4 flex items-center justify-between shadow-md z-20">
        {/* Left side: Tabs + Settings */}
        <div className="flex items-baseline gap-2">
          <Tabs
            items={tabs}
            className="[&_[role=tabpanel]]:hidden" // Hide the panels when used inside header
          />
          <Button
            variant="icon"
            leftIcon="settings"
            aria-label="Settings"
          />
        </div>

        {/* Right side: Dropdown + Close */}
        <div className="flex items-center gap-2">
          <DropdownSelect
            options={[{ label: 'Base Instructions Set (en)', value: '' }]}
            maxWidth="sm"
          />
          <Button
            variant="icon"
            leftIcon="close"
            className="text-white"
            aria-label="Close"
          />
        </div>
      </header>

      {/* Body */}
      <main ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left Pane */}
        <section
          className="min-w-0 overflow-auto"
          style={{ width: `${leftWidth}%` }}
        >
          {/* Placeholder content */}
          <div className="p-4">Left Pane</div>
        </section>

        {/* Grabber */}
        <div
          className="w-2 cursor-col-resize bg-softgrey-dark hover:bg-softgrey-main"
          onPointerDown={() => {
            isDraggingRef.current = true;
          }}
        />

        {/* Right Pane */}
        <section className="flex-1 min-w-0 overflow-auto">
          {/* Placeholder content */}
          <div className="p-4">Right Pane</div>
        </section>
      </main>

      {/* Footer (fixed to viewport bottom) */}
      <footer className="fixed bottom-0 left-0 w-full h-14 bg-[var(--components-background-default)] border-t border-softgrey-main px-4 flex items-center justify-between z-20">
        {/* Left: StateToggle */}
        <StateToggle
          label="Editor"
          options={[
            { id: 'code', label: 'Code' },
            { id: 'visual', label: 'Visual' },
          ]}
          value={viewMode}
          onChange={(id) => setViewMode(id as 'code' | 'visual')}
        />

        {/* Right: Autosave Switch & Button */}
        <div className="flex items-center gap-4">
          <Switch
            label="Autosave"
            checked={isAutosave}
            onChange={(e) => setIsAutosave(e.currentTarget.checked)}
          />
          <Button
            variant="primary"
            disabled={isAutosave}
          >
            Save Changes
          </Button>
        </div>
      </footer>
    </div>
  );
}