'use client';

/**
 * StateToggle – Segmented control toggle component for switching between two or more states.
 *
 * Features
 *  • Controlled & uncontrolled usage via `value` / `defaultValue`.
 *  • Keyboard support: ArrowLeft / ArrowRight to move between options.
 *  • Optional label rendered to the left of the control.
 *  • Accessible – each segment is a toggle button with `aria-pressed`; group linked to label.
 *  • Fully styled with Skillable design tokens and Tailwind utilities.
 *
 * Props
 *  • options: Array<{ id: string; label: React.ReactNode }>
 *  • value?: string – controlled selected id
 *  • defaultValue?: string – uncontrolled initial id
 *  • onChange?: (id: string) => void
 *  • label?: React.ReactNode
 *  • className?: string – wrapper class overrides
 *
 * Usage example:
 * ```tsx
 * const [mode, setMode] = useState('grid');
 * <StateToggle
 *   label="View"
 *   options={[
 *     { id: 'list', label: 'List' },
 *     { id: 'grid', label: 'Grid' },
 *   ]}
 *   value={mode}
 *   onChange={setMode}
 * />
 * ```
 */

import React, { useState, useRef, useId } from 'react';

export interface StateToggleOption {
  id: string;
  label: React.ReactNode;
}

export interface StateToggleProps {
  /** Items shown in the control */
  options: StateToggleOption[];
  /** Selected option id (controlled) */
  value?: string;
  /** Initial value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when selection changes */
  onChange?(id: string): void;
  /** Optional label shown to the left */
  label?: React.ReactNode;
  /** Extra wrapper className */
  className?: string;
  /** Size variant to align with Button/DropdownSelect heights */
  size?: 'small' | 'medium';
}

// Utility – quick conditional concat
function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const StateToggle = React.forwardRef<HTMLDivElement, StateToggleProps>(({
  options,
  value,
  defaultValue,
  onChange,
  label,
  className = '',
  size = 'medium',
}, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue ?? options[0]?.id);
  const selectedId = isControlled ? value : internalValue;

  const groupId = useId();
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (id: string) => {
    if (!isControlled) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowLeft' ? -1 : 1;
    const nextIndex = (index + dir + options.length) % options.length;
    buttonsRef.current[nextIndex]?.focus();
    select(options[nextIndex].id);
  };

  // Size-aware styles
  const wrapperGap = size === 'small' ? 'gap-2' : 'gap-3';
  const groupSizing = size === 'small' ? 'h-7 p-0.5' : 'h-8 p-1';
  const buttonSizing = size === 'small' ? 'h-full px-2 text-body-xs' : 'h-full px-3 text-body-xs';

  return (
    <div ref={ref} className={cn('inline-flex items-center', wrapperGap, className)}>
      {label && (
        <span id={`${groupId}-label`} className="font-primary text-body-sm select-none">
          {label}
        </span>
      )}

      <div
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        className={cn(
          'inline-flex rounded-[5px] border border-_components-text-primary gap-1 bg-softgrey-light',
          groupSizing,
        )}
      >
        {options.map((opt, idx) => {
          const isSelected = opt.id === selectedId;
          return (
            <button
              key={opt.id}
              ref={(el) => {
                buttonsRef.current[idx] = el;
              }}
              type="button"
              aria-pressed={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                'font-primary transition-colors rounded-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-main',
                buttonSizing,
                isSelected
                  ? 'bg-primary-main text-primary-contrast'
                  : 'text-_components-text-primary hover:bg-softgrey-light',
              )}
              onClick={() => select(opt.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

StateToggle.displayName = 'StateToggle';

export default StateToggle; 