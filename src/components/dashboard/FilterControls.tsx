/*************************
 * Filter Controls Component
 *************************/

import React, { useState, useRef } from 'react';
import { Button } from '@/components/buttons/Button';
import { Icon, Icons } from '@/components/Icon';
import { FilterMenu } from '@/components/menu/FilterMenu';

interface FilterControlsProps {
  columns: Array<{ label: string; value: string; type?: 'text' | 'select' | 'boolean'; options?: { label: string; value: string }[] }>;
  filters: Array<{ column: string; operator: string; value: any }>;
  onFiltersChange: (filters: Array<{ column: string; operator: string; value: any }>) => void;
  operatorsByType: Record<string, { label: string; value: string }[]>;
}

export function FilterControls({ 
  columns, 
  filters, 
  onFiltersChange,
  operatorsByType
}: FilterControlsProps) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleFilterMenuClose = () => {
    setIsFilterMenuOpen(false);
  };

  const handleFilterMenuToggle = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleClearFilters = () => {
    onFiltersChange([]);
  };

  return (
    <div className="flex items-center gap-2 text-body-sm text-_components-text-secondary shrink-0">
      <Button 
        variant="outline" 
        size="small"
        onClick={handleFilterMenuToggle}
        ref={triggerRef}
        leftIcon="listFilter"
        className={filters.length > 0 ? "border-primary-main text-primary-main" : ""}
      >
        {filters.length > 0 ? `${filters.length} active` : "Filters"}
      </Button>
      
      {filters.length > 0 && (
        <Button
          variant="text"
          color="primary"
          size="small"
          leftIcon="close"
          onClick={handleClearFilters}
          aria-label="Clear all filters"
        >
          Clear filters
        </Button>
      )}
      
      <FilterMenu
        columns={columns}
        filters={filters}
        onChange={onFiltersChange}
        operatorsByType={operatorsByType}
        isOpen={isFilterMenuOpen}
        onClose={handleFilterMenuClose}
        triggerRef={triggerRef}
        anchorEl={triggerRef.current}
      />
    </div>
  );
} 