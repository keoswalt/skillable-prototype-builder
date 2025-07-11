/*************************
 * Sort Controls Component
 *************************/

import { Button } from '@/components/buttons/Button';
import { DropdownSelect } from '@/components/inputs';
import { Icon, Icons } from '@/components/Icon';
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
        options={options}
        value={currentConfig.field}
        onChange={(e) => onFieldChange(e.target.value)}
        maxWidth="sm"
      />
      <Button 
        variant="icon" 
        size="small"
        onClick={onDirectionChange}
        aria-label={`Sort ${currentConfig.direction === 'asc' ? 'descending' : 'ascending'}`}
      >
        <Icon 
          icon={currentConfig.direction === 'asc' ? Icons.chevronUp : Icons.chevronDown} 
          className="text-primary-main" 
        />
      </Button>
    </div>
  );
} 