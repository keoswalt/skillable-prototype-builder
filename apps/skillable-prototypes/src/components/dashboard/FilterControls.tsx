/*************************
 * Filter Controls Component
 *************************/

import React, { useState, useRef } from 'react';
import { Button } from '@/components/buttons/Button';
import { FilterMenu } from '@/components/menu/FilterMenu';

interface FilterControlsProps {
  columns: Array<{ label: string; value: string; type?: 'text' | 'select' | 'boolean'; options?: { label: string; value: string }[] }>;
  filters: Array<{ column: string; operator: string; value: unknown }>;
  onFiltersChange: (filters: Array<{ column: string; operator: string; value: unknown }>) => void;
  operatorsByType: Record<string, { label: string; value: string }[]>;
}

export function FilterControls({ 
  columns, 
  filters, 
  onFiltersChange,
  operatorsByType
}: FilterControlsProps) {
  // Debug: Log filters prop on every render with full object structure
  console.log('[FilterControls] Render, filters:', JSON.stringify(filters, null, 2));
  console.log('[FilterControls] Render, filters array length:', filters.length);
  if (filters.length > 0) {
    console.log('[FilterControls] First filter details:', {
      column: filters[0].column,
      operator: filters[0].operator,
      value: filters[0].value,
      columnType: typeof filters[0].column,
      operatorType: typeof filters[0].operator,
      valueType: typeof filters[0].value
    });
  }
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

  // Debug: Wrap onFiltersChange to log new filters
  const handleFiltersChange = (newFilters: Array<{ column: string; operator: string; value: unknown }>) => {
    console.log('[FilterControls] onFiltersChange, newFilters:', JSON.stringify(newFilters, null, 2));
    onFiltersChange(newFilters);
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
        onChange={handleFiltersChange}
        operatorsByType={operatorsByType}
        isOpen={isFilterMenuOpen}
        onClose={handleFilterMenuClose}
        triggerRef={triggerRef}
        anchorEl={triggerRef.current}
      />
    </div>
  );
} 