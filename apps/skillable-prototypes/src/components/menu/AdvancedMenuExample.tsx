import React, { useRef, useState } from 'react';
import AdvancedMenu, { AdvancedMenuItem, AdvancedMenuSection } from './AdvancedMenu';
import { Button } from '../buttons/Button';

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

export const AdvancedMenuExample: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

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
    <div className="flex flex-col items-start gap-4">
      <Button
        ref={anchorRef}
        variant="primary"
        onClick={() => setOpen(o => !o)}
      >
        Open Advanced Menu
      </Button>
      <AdvancedMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        sections={sections}
        anchorEl={anchorRef.current}
      />
    </div>
  );
};

export default AdvancedMenuExample; 