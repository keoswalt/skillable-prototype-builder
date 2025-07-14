/*************************
 * Sort Controls Component
 *************************/

import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs';
import { SortConfig, SortOption } from '@/types/sorting';

interface SortControlsProps {
  options: SortOption[];
  currentConfig: SortConfig;
  onFieldChange: (field: string) => void;
  onDirectionChange: () => void;
}

export function SortControls({ 
  options, 
  currentConfig, 
  onFieldChange, 
  onDirectionChange 
}: SortControlsProps) {
  return (
    <div className="flex items-center gap-2 text-body-sm text-_components-text-secondary shrink-0">
      <span>Sort by:</span>
      <DropdownSelect 
        size="small"
        options={options}
        value={currentConfig.field}
        onChange={(e) => onFieldChange(e.target.value)}
        maxWidth="sm"
      />
      <Button 
        variant="outline" 
        size="small"
        onClick={onDirectionChange}
        leftIcon={currentConfig.direction === 'asc' ? 'chevronUp' : 'chevronDown'}
        aria-label={`Sort ${currentConfig.direction === 'asc' ? 'descending' : 'ascending'}`}
      >
        {currentConfig.direction === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
    </div>
  );
} 