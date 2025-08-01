import React from 'react';
import StateToggle from '@/components/navigation/StateToggle';
import { Switch } from '@/components/inputs/Switch';
import { Button } from '@/components/buttons/Button';

interface InstructionsEditorFooterProps {
  isAutosave: boolean;
  onToggleAutosave: (value: boolean) => void;
  viewMode: 'code' | 'visual';
  onChangeViewMode: (id: 'code' | 'visual') => void;
}

const InstructionsEditorFooter: React.FC<InstructionsEditorFooterProps> = ({
  isAutosave,
  onToggleAutosave,
  viewMode,
  onChangeViewMode,
}) => (
  <footer className="fixed bottom-0 left-0 w-full h-14 bg-_components-background-contrast-sm  px-4 flex items-center justify-between z-20">
    {/* Left: StateToggle */}
    <StateToggle
      label="Editor"
      options={[
        { id: 'code', label: 'Code' },
        { id: 'visual', label: 'Visual' },
      ]}
      value={viewMode}
      onChange={(id) => onChangeViewMode(id as 'code' | 'visual')}
    />

    {/* Right: Autosave Switch & Button */}
    <div className="flex items-center gap-4">
      <Switch
        label="Autosave"
        checked={isAutosave}
        onChange={(e) => onToggleAutosave(e.currentTarget.checked)}
      />
      <Button variant="primary" disabled={isAutosave}>
        Save Changes
      </Button>
    </div>
  </footer>
);

export default InstructionsEditorFooter; 