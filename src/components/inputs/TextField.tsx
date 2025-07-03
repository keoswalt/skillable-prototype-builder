'use client';

import React, { forwardRef, useId } from 'react';

/**
 * TextField – Reusable text input component for Skillable Design System.
 *
 * Features
 *  • Optional label and helper text.
 *  • Required, error, and disabled visual states.
 *  • Vertical (label above) or horizontal (label left) orientations.
 *  • Configurable max-width via Tailwind's `max-w-*` utilities.
 *  • Fully accessible: proper linking via `htmlFor`, `aria-describedby`, `aria-required`, and `aria-invalid`.
 *
 * Props
 *  • label?: React.ReactNode – Text/element shown as the field's label.
 *  • required?: boolean – Adds "*" after label and sets `aria-required`.
 *  • helperText?: React.ReactNode – Secondary text under the input (info or error message).
 *  • error?: boolean – Shows error styling and sets `aria-invalid`.
 *  • disabled?: boolean – Greys out the field and blocks interaction.
 *  • orientation?: 'vertical' | 'horizontal' (default 'vertical').
 *  • maxWidth?: one of Tailwind's max-width keys ('none' | 'xs' | 'sm' | ... | '7xl' | 'full').
 *  • className?: string – Additional classes for the outer wrapper.
 *  • ...rest – All native <input> props (type, placeholder, onChange, etc.).
 *
 * Basic usage
 * ```tsx
 * <TextField label="First Name" placeholder="John" required />
 *
 * // Horizontal layout with helper text
 * <TextField
 *   orientation="horizontal"
 *   label="Email"
 *   placeholder="you@example.com"
 *   helperText="We'll never share your email."
 * />
 *
 * // Custom max-width & disabled
 * <TextField label="Disabled" value="Test" disabled maxWidth="sm" />
 * ```
 */

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label displayed next to / above the input */
  label?: React.ReactNode;
  /** Display * after label and set aria-required */
  required?: boolean;
  /** Helper text shown below the field */
  helperText?: React.ReactNode;
  /** Shows error styles & sets aria-invalid */
  error?: boolean;
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Pass custom className to the outer wrapper */
  className?: string;
  /**
   * Convenience max-width setting mapped to Tailwind's `max-w-*` utilities.
   * Example: <TextField maxWidth="md" /> will apply `max-w-md` to the wrapper.
   * Accepted values: none | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | 6xl | 7xl | full
   */
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
}


export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  label,
  required = false,
  helperText,
  error = false,
  disabled = false,
  orientation = 'vertical',
  className,
  maxWidth,
  id,
  ...rest
}, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedById = helperText ? `${inputId}-helper` : undefined;

  const labelBase = 'font-primary text-body-sm';
  const labelColor = error
    ? 'text-error-main'
    : 'text-[var(--components-text-secondary)]';
  const labelClasses = cn(labelBase, labelColor, 'block');

  // Input classes
  const baseInput = 'block w-full px-3 py-2 font-primary text-body-sm rounded-[var(--borderradius)] border transition-colors duration-200 outline-none';

  const colorClasses = (() => {
    if (disabled) {
      return 'bg-transparent border-softgrey-light text-hardgrey-light placeholder-hardgrey-light cursor-not-allowed';
    }
    if (error) {
      return 'border-error-main text-[var(--components-text-primary)] placeholder-error-light focus:border-error-main focus:ring-1 focus:ring-error-main';
    }
    return 'border-softgrey-light text-[var(--components-text-primary)] placeholder-[var(--components-text-secondary)] focus:border-accent-main focus:ring-1 focus:ring-accent-main';
  })();

  const inputClasses = cn(baseInput, colorClasses);

  const helperBase = 'mt-1 text-body-xs';
  const helperColor = error ? 'text-error-textonly' : 'text-[var(--components-text-secondary)]';
  const helperClasses = cn(helperBase, helperColor);

  // Utility to join class names conditionally without the need for an external dependency
  function cn(...classes: Array<string | false | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
  }

  const maxWidthClasses: Record<Required<TextFieldProps>['maxWidth'], string> = {
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

  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'flex items-start gap-2'
          : 'flex flex-col gap-1',
        disabled && 'opacity-50',
        wrapperMaxWidth,
        className,
      )}
    >
      {label && (
        <label htmlFor={inputId} className={cn(labelClasses, orientation === 'horizontal' && 'pt-2')}> {/* pt aligns text with input */}
          {label}{required && <span className="text-inherit">*</span>}
        </label>
      )}

      <div className={orientation === 'horizontal' ? 'flex-1' : undefined}>
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-required={required || undefined}
          aria-invalid={error || undefined}
          aria-describedby={describedById}
          className={inputClasses}
          {...rest}
        />
        {helperText && (
          <p id={describedById} className={helperClasses}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
});

TextField.displayName = 'TextField'; 