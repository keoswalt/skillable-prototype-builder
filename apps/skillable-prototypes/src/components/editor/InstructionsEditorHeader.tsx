import React, { useRef, useState } from 'react';
import Tabs, { TabItem } from '@/components/navigation/Tabs';
import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs/DropdownSelect';
import AdvancedMenu, { AdvancedMenuSection } from '@/components/menu/AdvancedMenu';

interface InstructionsEditorHeaderProps {
  tabs: TabItem[];
}

const initialSettings = {
  learnerPreview: true,
  syncPreview: false,
  visualEditorDefault: false,
  wordWrap: true,
  codeZoom: 100,
  trackProgress: true,
  requireOrder: true,
  autoCheck: true,
};

const InstructionsEditorHeader: React.FC<InstructionsEditorHeaderProps> = ({ tabs }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [menuOpen, setMenuOpen] = useState(false);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const sections: AdvancedMenuSection[] = [
    {
      header: 'Editor Settings',
      items: [
        {
          type: 'switch',
          label: 'Learner Preview',
          value: settings.learnerPreview,
          onChange: v => handleChange('learnerPreview', v),
        },
        {
          type: 'switch',
          label: 'Sync Learner Preview Location',
          value: settings.syncPreview,
          onChange: v => handleChange('syncPreview', v),
        },
        {
          type: 'switch',
          label: 'Set Visual Editor as Default',
          value: settings.visualEditorDefault,
          onChange: v => handleChange('visualEditorDefault', v),
          helperText: 'Set the visual editor as the default editing mode.',
        },
        {
          type: 'switch',
          label: 'Code Editor Word Wrap',
          value: settings.wordWrap,
          onChange: v => handleChange('wordWrap', v),
        },
        {
          type: 'slider',
          label: 'Code Editor Zoom',
          value: settings.codeZoom,
          onChange: v => handleChange('codeZoom', v),
          min: 50,
          max: 200,
          step: 10,
        },
      ],
    },
    {
      header: 'Lab Options',
      items: [
        {
          type: 'switch',
          label: 'Track Task Progress',
          value: settings.trackProgress,
          onChange: v => handleChange('trackProgress', v),
        },
        {
          type: 'switch',
          label: 'Require tasks to be completed in order',
          value: settings.requireOrder,
          onChange: v => handleChange('requireOrder', v),
        },
        {
          type: 'switch',
          label: 'Auto-Check Previous Tasks',
          value: settings.autoCheck,
          onChange: v => handleChange('autoCheck', v),
        },
      ],
    },
  ];

  return (
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
          tooltip="Help"
          tooltipDirection="bottom"
        />
      </div>

      {/* Right side: Dropdown + Close */}
      <div className="flex items-center gap-2 pr-2">
        <Button
          ref={settingsBtnRef}
          variant="icon"
          leftIcon="settings"
          aria-label="Settings"
          tooltip="Settings"
          tooltipDirection="bottom"
          onClick={() => setMenuOpen(open => !open)}
        />
        <DropdownSelect
          options={[{ label: 'Base Instructions Set (en)', value: '' }]}
          maxWidth="sm"
        />
        <Button
          variant="icon"
          leftIcon="close"
          aria-label="Close"
          tooltip="Close editor"
          tooltipDirection="left"
        />
        <AdvancedMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          sections={sections}
          anchorEl={settingsBtnRef.current}
        />
      </div>
    </header>
  );
};

export default InstructionsEditorHeader; 