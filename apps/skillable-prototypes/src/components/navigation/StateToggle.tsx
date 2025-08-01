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

  return (
    <div ref={ref} className={cn('inline-flex items-center gap-3', className)}>
      {label && (
        <span id={`${groupId}-label`} className="font-primary text-body-sm select-none">
          {label}
        </span>
      )}

      <div
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        className="inline-flex rounded-[5px] border border-text-primary p-1 gap-1 bg-softgrey-light"
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
                'px-2 py-1 font-primary text-body-xs transition-colors rounded-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-main',
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