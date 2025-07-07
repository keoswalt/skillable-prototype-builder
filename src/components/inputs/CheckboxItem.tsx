'use client';

import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';

/**
 * CheckboxItem – Reusable checkbox control for the Skillable Design System.
 *
 * Features
 *  • Three checkbox states: unchecked (default), checked, and indeterminate (mixed).
 *  • Three visual item states: enabled, disabled, and error.
 *  • Optional label & helper text with flexible placement (`top`, `bottom`, `left`, `right`).
 *  • Supports both controlled & uncontrolled patterns (`checked`, `defaultChecked`, `onChange`).
 *  • Fully accessible via an underlying <input type="checkbox"> – sets `aria-checked` "mixed" for indeterminate,
 *    wires `htmlFor`, `aria-describedby`, and `aria-invalid` when `error` is true.
 *  • Exposes `indeterminate` prop; updates the native checkbox `indeterminate` property via ref.
 *  • Focus-visible ring and smooth transitions consistent with other inputs.
 *
 * Props
 *  • label?: React.ReactNode – Text/element shown as the checkbox label.
 *  • helperText?: React.ReactNode – Secondary text under the control (info or error message).
 *  • labelPlacement?: 'top' | 'bottom' | 'left' | 'right' (default 'right').
 *  • indeterminate?: boolean – Shows the mixed state; sets aria-checked="mixed".
 *  • error?: boolean – Error styling for control, label, helper.
 *  • className?: string – Additional classes for the outer wrapper.
 *  • ...rest – All native <input> props except `type` & `children`.
 *
 * Basic usage
 * ```tsx
 * <CheckboxItem label="Terms" />
 * <CheckboxItem label="I agree" indeterminate />
 * <CheckboxItem label="Subscribe" helperText="We'll send you updates" error />
 * ```
 */

export interface CheckboxItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  indeterminate?: boolean;
  error?: boolean;
  className?: string;
}

export const CheckboxItem = forwardRef<HTMLInputElement, CheckboxItemProps>((props, refPassed) => {
  // Extract specific props then rest
  const {
    label,
    helperText,
    labelPlacement = 'right',
    indeterminate = false,
    error = false,
    disabled = false,
    className,
    id,
    checked: controlledChecked,
    defaultChecked: uncontrolledDefault,
    onChange: onChangeProp,
    ...rest
  } = props;
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedById = helperText ? `${inputId}-helper` : undefined;

  // Need a ref to manipulate indeterminate property
  const internalRef = useRef<HTMLInputElement>(null);
  const combinedRef = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof refPassed === 'function') {
      refPassed(node);
    } else if (refPassed) {
      (refPassed as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  // Determine controlled vs uncontrolled usage
  const isControlled = controlledChecked !== undefined;
  // Preserve the initial defaultChecked value across re-renders
  const defaultCheckedRef = useRef<boolean>(uncontrolledDefault ?? false);
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultCheckedRef.current);

  const currentChecked = isControlled ? !!controlledChecked : uncontrolledChecked;

  // Keep indeterminate prop synced with DOM element
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Change handler wrapper to support uncontrolled state while forwarding event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }
    onChangeProp?.(e);
  };

  // Utility to join class names without external lib
  function cn(...classes: Array<string | false | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
  }

  /* ------------------------ Styling helpers ------------------------ */
  const labelBase = 'font-primary text-body-sm';
  const labelColor = error ? 'text-error-main' : 'text-[var(--components-text-primary)]';
  const labelClasses = cn(labelBase, labelColor, 'select-none cursor-pointer');

  const helperBase = 'mt-1 text-body-xs';
  const helperColor = error ? 'text-error-textonly' : 'text-[var(--components-text-secondary)]';
  const helperClasses = cn(helperBase, helperColor);

  const controlBase = 'w-5 h-5 rounded-[var(--borderradius)] border transition-colors duration-200 flex items-center justify-center';
  const controlColors = (() => {
    if (disabled) {
      return 'bg-transparent border-softgrey-light text-hardgrey-light';
    }
    if (error) {
      return 'border-error-main text-error-main peer-focus-visible:ring-error-main';
    }
    return 'bg-transparent border-[var(--components-text-primary)] text-[var(--components-text-primary)] peer-focus-visible:ring-accent-main';
  })();
  const controlClasses = cn(controlBase, controlColors,
    'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent');

  /* ------------------------ Control markup ------------------------ */
  const checkboxControl = (
    <label className="relative inline-flex items-center">
      {/* Hidden native checkbox */}
      <input
        ref={combinedRef}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={describedById}
        aria-checked={indeterminate ? 'mixed' : undefined}
        className="peer sr-only"
        {...rest}
        {...(isControlled
          ? { checked: controlledChecked }
          : { defaultChecked: defaultCheckedRef.current })}
        onChange={handleChange}
      />
      {/* Visual square */}
      <div className={controlClasses}>
        {/* Icons rendered based on component state */}
        {indeterminate && (
          <Minus className="w-4 h-4" />
        )}
        {!indeterminate && currentChecked && (
          <Check className="w-4 h-4" />
        )}
      </div>
    </label>
  );

  /* ------------------------ Layout composition ------------------------ */
  const helperNode = helperText ? <p id={describedById} className={helperClasses}>{helperText}</p> : null;
  const labelNode = label ? <label htmlFor={inputId} className={labelClasses}>{label}</label> : null;

  let content: React.ReactNode = null;

  switch (labelPlacement) {
    case 'top':
      content = (
        <div className="flex flex-col items-start gap-1">
          {labelNode}
          {checkboxControl}
          {helperNode}
        </div>
      );
      break;
    case 'bottom':
      content = (
        <div className="flex flex-col items-start gap-1">
          {checkboxControl}
          {labelNode}
          {helperNode}
        </div>
      );
      break;
    case 'left':
      content = (
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-2">
            {labelNode}
            {checkboxControl}
          </div>
          {helperNode}
        </div>
      );
      break;
    case 'right':
    default:
      content = (
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex items-center gap-2">
            {checkboxControl}
            {labelNode}
          </div>
          {helperNode}
        </div>
      );
      break;
  }

  return (
    <div className={cn(disabled && 'opacity-50 cursor-not-allowed', className)}>
      {content}
    </div>
  );
});

CheckboxItem.displayName = 'CheckboxItem'; 