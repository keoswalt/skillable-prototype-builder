'use client';

import React, { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { Icon, Icons } from '../Icon';
import Menu from '../menu/Menu';

/**
 * DropdownSelect – Reusable select (dropdown) component for the Skillable Design System.
 *
 * Features
 *  • Optional label and helper text (info or error message).
 *  • Required, error, and disabled visual states matching TextField.
 *  • Vertical (label above) or horizontal (label left) orientations.
 *  • Configurable max-width via Tailwind's `max-w-*` utilities (same keys as TextField).
 *  • Accepts native <select> props and either `children` or an `options` array.
 *  • Embedded chevron icon that rotates on focus and adapts color per state.
 *  • Fully accessible: proper `htmlFor`, `aria-describedby`, `aria-required`, and `aria-invalid` links.
 *
 * Props
 *  • label?: React.ReactNode – Text or element shown as the field label.
 *  • required?: boolean – Adds "*" after label and sets `aria-required`.
 *  • helperText?: React.ReactNode – Secondary text under the select (info / error).
 *  • error?: boolean – Shows error styling and sets `aria-invalid`.
 *  • disabled?: boolean – Greys out the field and blocks interaction.
 *  • orientation?: 'vertical' | 'horizontal' (default 'vertical').
 *  • size?: 'small' | 'medium' | 'large' (default 'medium') – Size variant matching Button component.
 *  • maxWidth?: one of Tailwind's max-width keys ('none' | 'xs' | 'sm' | ... | '7xl' | 'full').
 *  • options?: { label: React.ReactNode; value: string | number; disabled?: boolean }[] – Convenience list of options. Ignored if `children` are provided.
 *  • className?: string – Additional classes for the outer wrapper.
 *  • ...rest – All native <select> props (onChange, value, etc.).
 */

export interface DropdownSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  orientation?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  maxWidth?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';
  /**
   * Convenience prop to pass an array of options instead of explicit <option> children.
   */
  options?: { label: React.ReactNode; value: string | number; disabled?: boolean }[];
  className?: string;
}

export const DropdownSelect = forwardRef<HTMLSelectElement, DropdownSelectProps>(({
  label,
  required = false,
  helperText,
  error = false,
  disabled = false,
  orientation = 'vertical',
  size = 'medium',
  className,
  maxWidth,
  options,
  id,
  children,
  ...rest
}, ref) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const describedById = helperText ? `${selectId}-helper` : undefined;

  // Determine if component is controlled
  const isControlled = rest.value !== undefined;
  const [internalValue, setInternalValue] = useState(rest.defaultValue ?? '');
  const currentValue = isControlled ? rest.value : internalValue;

  // Refs & state for menu handling
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handler);
    }
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Utility to join class names conditionally without an external dependency
  function cn(...classes: Array<string | false | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
  }

  // Helpers to map option arrays when children used
  const normalizedOptions: { label: React.ReactNode; value: string | number; disabled?: boolean }[] =
    options ??
    React.Children.toArray(children).map((child) => {
      if (React.isValidElement(child) && child.type === 'option') {
        const el = child as React.ReactElement<{ value: string | number; disabled?: boolean; children?: React.ReactNode }>;
        return {
          label: el.props.children,
          value: el.props.value,
          disabled: el.props.disabled,
        };
      }
      return { label: String(child), value: String(child) };
    });

  // Size classes that match Button component
  const sizeClasses = {
    small: 'h-7 px-2 text-body-xs',
    medium: 'h-8 px-2 text-body-sm',
    large: 'h-10 px-3 text-body-md',
  } as const;

  // Icon sizes that match Button component
  const iconSize = {
    small: 14,
    medium: 16,
    large: 18,
  } as const;

  const labelBase = 'font-primary text-body-sm';
  const labelColor = error ? 'text-error-main' : 'text-[var(--components-text-secondary)]';
  const labelClasses = cn(labelBase, labelColor, 'block');

  const baseField = `flex w-full items-center font-primary rounded-[5px] border transition-colors duration-200 outline-none pr-8 ${sizeClasses[size]}`; // pr-8 for icon space

  const colorClasses = (() => {
    if (disabled) {
      return 'bg-transparent border-softgrey-light text-hardgrey-light placeholder-hardgrey-light cursor-not-allowed';
    }
    if (error) {
      return 'border-error-main text-[var(--components-text-primary)] placeholder-error-light';
    }
    if (isOpen) {
      return 'border-accent-main text-[var(--components-text-primary)] ring-1 ring-accent-main';
    }
    return 'border-_components-border-primary text-[var(--components-text-primary)] placeholder-[var(--components-text-secondary)] hover:border-accent-main';
  })();

  const fieldClasses = cn(baseField, colorClasses, 'relative');

  const helperBase = 'mt-1 text-body-xs';
  const helperColor = error ? 'text-error-textonly' : 'text-[var(--components-text-secondary)]';
  const helperClasses = cn(helperBase, helperColor);

  const iconColor = (() => {
    if (disabled) return 'text-hardgrey-light';
    if (error) return 'text-error-main';
    return 'text-[var(--components-text-secondary)]';
  })();

  const maxWidthClasses: Record<Required<DropdownSelectProps>['maxWidth'], string> = {
    none: 'max-w-none',
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  } as const;

  const wrapperMaxWidth = maxWidth ? maxWidthClasses[maxWidth] : undefined;

  // Helper to get label for current value
  const currentOption = normalizedOptions.find((o) => o.value === currentValue);
  const displayText = currentOption ? currentOption.label : 'Value';

  // Handle selection from menu
  const handleSelect = (val: string | number) => {
    if (!isControlled) setInternalValue(val);

    // Fire onChange similar to native select
    if (rest.onChange && typeof rest.onChange === 'function') {
      const syntheticEvent = {
        target: { value: val },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      rest.onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'flex items-start gap-2' : 'flex flex-col gap-1',
        disabled && 'opacity-50',
        wrapperMaxWidth,
        className,
      )}
    >
      {label && (
        <label htmlFor={selectId} className={cn(
          labelClasses,
          orientation === 'horizontal' ? 'inline-block align-middle' : 'block'
        )}>
          {label}{required && <span className="ml-1 text-inherit">*</span>}
        </label>
      )}

      <div className={orientation === 'horizontal' ? 'flex-1' : undefined}>
        {/* Hidden select for form compatibility */}
        <select
          ref={ref}
          id={selectId}
          name={rest.name}
          value={currentValue}
          onChange={() => { /* handled via handleSelect */ }}
          disabled={disabled}
          className="hidden"
          aria-hidden
        >
          {normalizedOptions.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>

        {/* Visible field */}
        <button
          type="button"
          ref={anchorRef}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={fieldClasses}
        >
          <span className={currentValue ? undefined : 'text-[var(--components-text-secondary)]'}>
            {displayText}
          </span>
          <Icon
            icon={Icons.chevronDown}
            size={iconSize[size]}
            className={cn(
              'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 transition-transform duration-200',
              isOpen && '-rotate-180',
              iconColor,
            )}
          />
        </button>

        {/* Helper text */}
        {helperText && (
          <p id={describedById} className={helperClasses}>
            {helperText}
          </p>
        )}

        {/* Menu dropdown */}
        <Menu
          isOpen={isOpen && !disabled}
          onClose={() => setIsOpen(false)}
          anchorEl={anchorRef.current}
          items={normalizedOptions.map((o) => ({
            label: String(o.label),
            onClick: () => !o.disabled && handleSelect(o.value),
          }))}
        />
      </div>
    </div>
  );
});

DropdownSelect.displayName = 'DropdownSelect'; 