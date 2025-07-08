import React from 'react';
import Tabs, { TabItem } from '@/components/navigation/Tabs';
import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs/DropdownSelect';

interface InstructionsEditorHeaderProps {
  tabs: TabItem[];
}

const InstructionsEditorHeader: React.FC<InstructionsEditorHeaderProps> = ({ tabs }) => (
  <header className="fixed top-0 left-0 w-full h-14 shrink-0 bg-_components-background-contrast-sm text-_components-text-primary flex items-center justify-between shadow-md z-20">
    {/* Left side: Tabs + Settings */}
    <div className="flex items-baseline">
      <Tabs
        items={tabs}
        className="[&_[role=tabpanel]]:hidden" // Hide the panels when used inside header
      />
       <Button
        variant="icon"
        leftIcon="circleQuestionMark"
        className="mt-4"
        aria-label="Help"
      />
    </div>

    {/* Right side: Dropdown + Close */}
    <div className="flex items-center gap-2 pr-2">
    <Button
        variant="icon"
        leftIcon="settings"
        aria-label="Settings"
      />
      <DropdownSelect
        options={[{ label: 'Base Instructions Set (en)', value: '' }]}
        maxWidth="sm"
      />
      <Button
        variant="icon"
        leftIcon="close"
        aria-label="Close"
      />
    </div>
  </header>
);

export default InstructionsEditorHeader; 