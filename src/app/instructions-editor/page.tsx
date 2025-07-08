'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { TabItem } from '@/components/navigation/Tabs';
import InstructionsEditorHeader from '@/components/editor/InstructionsEditorHeader';
import InstructionsEditorFooter from '@/components/editor/InstructionsEditorFooter';
import FormattingToolbar from '@/components/editor/FormattingToolbar';

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
    { id: 'rules', label: 'Rules', content: <></> },
  ];

  return (
    <div className="flex min-h-screen flex-col pt-14">
      {/* Header */}
      <InstructionsEditorHeader tabs={tabs} />

      {/* Body */}
      <main ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* Left Pane */}
        <section
          className="min-w-0 overflow-auto"
          style={{ width: `${leftWidth}%` }}
        >
          {/* Editor Panel */}
          <div className="p-2 w-full sticky top-0 z-10">
            <FormattingToolbar />
          </div>
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

      {/* Footer */}
      <InstructionsEditorFooter
        isAutosave={isAutosave}
        onToggleAutosave={(value) => setIsAutosave(value)}
        viewMode={viewMode}
        onChangeViewMode={(id) => setViewMode(id as 'code' | 'visual')}
      />
    </div>
  );
}