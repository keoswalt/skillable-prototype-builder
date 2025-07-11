// FilterMenu – A reusable, configurable filter builder menu for data tables.
//
// Props:
// - columns: Array<{ label: string; value: string; type?: 'text' | 'select' | 'boolean'; options?: { label: string; value: string }[] }>
//      The columns available for filtering. Each column can specify its type and options for select/boolean fields.
// - filters: Array<{ column: string; operator: string; value: any }>
//      The current list of filters. Controlled by parent.
// - onChange: (filters: Filter[]) => void
//      Callback when filters change (add, remove, update).
// - operatorsByType: Record<string, { label: string; value: string }[]>
//      Map of operator options by column type (e.g., text, select, boolean).
//
// Usage:
// <FilterMenu
//   columns={[{ label: 'Name', value: 'name', type: 'text' }, ...]}
//   filters={filters}
//   onChange={setFilters}
//   operatorsByType={{ text: [...], select: [...], boolean: [...] }}
// />

'use client';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { DropdownSelect } from '../inputs/DropdownSelect';
import { TextField } from '../inputs/TextField';
import { Button } from '../buttons/Button';
import { Icon, Icons } from '../Icon';
import { useScrollLock } from './useScrollLock';

type ColumnOption = {
  label: string;
  value: string;
  type?: 'text' | 'select' | 'boolean';
  options?: { label: string; value: string }[];
};

type Filter = {
  column: string;
  operator: string;
  value: any;
};

type OperatorOption = { label: string; value: string };

export type FilterMenuProps = {
  columns: ColumnOption[];
  filters: Filter[];
  onChange: (filters: Filter[]) => void;
  operatorsByType: Record<string, OperatorOption[]>;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

export const FilterMenu: React.FC<FilterMenuProps> = ({
  columns,
  filters,
  onChange,
  operatorsByType,
  className = '',
  isOpen,
  onClose,
  anchorEl,
  triggerRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock scroll when menu is open
  useScrollLock(isOpen);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
        && !(triggerRef && triggerRef.current && triggerRef.current.contains(e.target as Node))
      ) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, anchorEl]);

  // Positioning
  let menuStyle: React.CSSProperties = { minWidth: 320 };
  if (anchorEl) {
    const rect = anchorEl.getBoundingClientRect();
    menuStyle = {
      position: 'fixed',
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      minWidth: `${rect.width}px`,
      zIndex: 9999,
    };
  }

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [isOpen]);

  // Add a new filter row
  const handleAdd = () => {
    const firstCol = columns[0];
    const colType = firstCol?.type || 'text';
    const firstOp = operatorsByType[colType]?.[0]?.value || '';
    onChange([
      ...filters,
      {
        column: firstCol?.value || '',
        operator: firstOp,
        value: '',
      },
    ]);
  };

  // Remove a filter row
  const handleRemove = (idx: number) => {
    onChange(filters.filter((_, i) => i !== idx));
  };

  // Update a filter row
  const handleUpdate = (idx: number, key: keyof Filter, value: any) => {
    const updated = filters.map((f, i) =>
      i === idx ? { ...f, [key]: value } : f
    );
    // If column changes, reset operator and value
    if (key === 'column') {
      const col = columns.find((c) => c.value === value);
      const colType = col?.type || 'text';
      const firstOp = operatorsByType[colType]?.[0]?.value || '';
      updated[idx] = {
        column: value,
        operator: firstOp,
        value: '',
      };
    }
    // If operator changes, reset value if needed
    if (key === 'operator') {
      updated[idx] = {
        ...updated[idx],
        value: '',
      };
    }
    onChange(updated);
  };

  // Clear all filters
  const handleClear = () => onChange([]);

  if (!isOpen) return null;

  const menuContent = (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      className={`bg-_components-background-default border border-_components-text-primary rounded-xl p-4 flex flex-col gap-4 w-full max-w-lg shadow-xl ${className}`}
      style={menuStyle}
      tabIndex={-1}
    >
      {filters.length === 0 && (
        <div className="text-center text-body-md text-[var(--components-text-secondary)]">No filters applied.</div>
      )}
      <div className="flex flex-col gap-3 flex-wrap">
        {filters.map((filter, idx) => {
          const col = columns.find((c) => c.value === filter.column) || columns[0];
          const colType = col?.type || 'text';
          const operatorOptions = operatorsByType[colType] || [];
          // Value input: text, select, or boolean
          let valueInput = null;
          if (colType === 'select' && col.options) {
            valueInput = (
              <DropdownSelect
                options={col.options}
                value={filter.value}
                onChange={(e) => handleUpdate(idx, 'value', e.target.value)}
                maxWidth="sm"
              />
            );
          } else if (colType === 'boolean') {
            valueInput = (
              <DropdownSelect
                options={[
                  { label: 'True', value: 'true' },
                  { label: 'False', value: 'false' },
                ]}
                value={filter.value}
                onChange={(e) => handleUpdate(idx, 'value', e.target.value)}
                maxWidth="sm"
              />
            );
          } else {
            valueInput = (
              <TextField
                value={filter.value}
                onChange={(e) => handleUpdate(idx, 'value', e.target.value)}
                placeholder="Filter value"
                maxWidth="sm"
              />
            );
          }
          return (
            <div
              key={idx}
              className="flex flex-wrap items-center gap-3 w-full"
            >
              <Button
                variant="icon"
                size="small"
                onClick={() => handleRemove(idx)}
                aria-label="Remove filter"
                className="mt-6"
              >
                <Icon icon={Icons.close} />
              </Button>
              <div className="flex flex-col gap-1">
                <span className="text-body-xs text-[var(--components-text-secondary)]">Columns</span>
                <DropdownSelect
                  options={columns.map((c) => ({ label: c.label, value: c.value }))}
                  value={filter.column}
                  onChange={(e) => handleUpdate(idx, 'column', e.target.value)}
                  maxWidth="sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-body-xs text-[var(--components-text-secondary)]">Operator</span>
                <DropdownSelect
                  options={operatorOptions}
                  value={filter.operator}
                  onChange={(e) => handleUpdate(idx, 'operator', e.target.value)}
                  maxWidth="sm"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                <span className="text-body-xs text-[var(--components-text-secondary)]">Value</span>
                {valueInput}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="text"
          size="small"
          color="primary"
          onClick={handleAdd}
          leftIcon="add"
        >
          Add Filter
        </Button>
        <Button
          variant="text"
          size="small"
          color="primary"
          onClick={handleClear}
          leftIcon="delete"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );

  return typeof window !== 'undefined' && document.body
    ? createPortal(menuContent, document.body)
    : null;
};

export default FilterMenu; 