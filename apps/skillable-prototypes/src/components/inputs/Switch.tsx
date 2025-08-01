import React, { forwardRef, useId } from 'react';

/**
 * Switch – Reusable toggle component for the Skillable Design System.
 *
 * Features
 *  • Controlled & uncontrolled usage (`checked`, `defaultChecked`, `onChange`).
 *  • Optional label that can be positioned: `top`, `bottom`, `left`, `right`.
 *  • Optional helper text below the control.
 *  • Disabled state.
 *  • Fully accessible: underlying <input type="checkbox"> with role="switch", proper `htmlFor`, `aria-checked`, and `aria-describedby` wiring.
 *  • Focus-visible ring and smooth transitions.
 *
 * Props
 *  • label?: React.ReactNode – Text/element shown as the switch label.
 *  • helperText?: React.ReactNode – Text shown below the switch (info / hint).
 *  • labelPlacement?: 'top' | 'bottom' | 'left' | 'right' (default 'right').
 *  • disabled?: boolean – Greys out & blocks interaction.
 *  • className?: string – Additional classes for the outer wrapper.
 *  • ...rest – All native <input> props except `type` & `children`.
 *
 * Basic usage
 * ```tsx
 * <Switch label="Notifications" />
 * <Switch label="Email alerts" helperText="We'll email you once a week." defaultChecked />
 * <Switch label="Auto-renew" labelPlacement="left" checked={state} onChange={toggle} />
 * ```
 */

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Optional label displayed near the switch */
  label?: React.ReactNode;
  /** Helper text displayed underneath */
  helperText?: React.ReactNode;
  /** Position of the label relative to the switch */
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /** Pass custom className to the outer wrapper */
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  helperText,
  labelPlacement = 'right',
  disabled = false,
  className,
  id,
  ...rest
}, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedById = helperText ? `${inputId}-helper` : undefined;

  // Utility to join class names conditionally without an external dependency
  function cn(...classes: Array<string | false | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
  }

  const isVertical = labelPlacement === 'top' || labelPlacement === 'bottom';
  const flexDirection = isVertical
    ? labelPlacement === 'top'
      ? 'flex-col'
      : 'flex-col-reverse'
    : labelPlacement === 'left'
      ? 'flex-row'
      : 'flex-row-reverse';

  // Nodes for clarity
  const labelNode = label ? (
    <label htmlFor={inputId} className="font-primary text-body-sm select-none cursor-pointer">
      {label}
    </label>
  ) : null;

  // Switch control (without helper)
  const switchControl = (
    <label className="relative inline-flex items-center">
      {/* Hidden native checkbox */}
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        aria-describedby={describedById}
        className="peer sr-only"
        {...rest}
      />
      {/* Track */}
      <div
        className={cn(
          'w-10 h-6 rounded-full border transition-colors duration-200',
          'bg-softgrey-main border-common-black-main',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-accent-main',
          'peer-checked:bg-success-main peer-checked:border-success-main',
          disabled && 'pointer-events-none'
        )}
      />
      {/* Knob */}
      <div
        className={cn(
          'absolute left-[0.125rem] top-[0.125rem] w-5 h-5 rounded-full transition-transform duration-200',
          'bg-common-black-main',
          'peer-checked:translate-x-4 peer-checked:bg-common-white-main'
        )}
      />
    </label>
  );

  const helperNode = helperText ? (
    <p id={describedById} className={cn('mt-1 text-body-xs text-[var(--components-text-secondary)]')}>
      {helperText}
    </p>
  ) : null;

  const switchWithHelper = (
    <div className="flex flex-col items-start">
      {switchControl}
      {helperNode}
    </div>
  );

  let content: React.ReactNode;

  switch (labelPlacement) {
    case 'top':
      content = (
        <div className="flex flex-col items-start gap-1">
          {labelNode}
          {switchWithHelper}
        </div>
      );
      break;
    case 'bottom':
      content = (
        <div className="flex flex-col items-start gap-1">
          {switchControl}
          {labelNode}
          {helperNode}
        </div>
      );
      break;
    case 'left': {
      // Arrange label & switch horizontally, helper below
      content = (
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-2">
            {labelNode}
            {switchControl}
          </div>
          {helperNode}
        </div>
      );
      break;
    }
    case 'right':
    default: {
      content = (
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-2">
            {switchControl}
            {labelNode}
          </div>
          {helperNode}
        </div>
      );
      break;
    }
  }

  return (
    <div className={cn(disabled && 'opacity-50 cursor-not-allowed', className)}>
      {content}
    </div>
  );
});

Switch.displayName = 'Switch'; 