import React, { forwardRef, useId, useState } from 'react';

/**
 * RadioList – A list (group) of radio buttons with a shared label and optional helper text.
 *
 * Features
 *  • Fully accessible – rendered with native <input type="radio"> elements and a shared `name` attribute.
 *  • Supports both controlled (`value` / `onChange`) and uncontrolled (`defaultValue`) usage patterns.
 *  • One item is **always** selected. If no `value` or `defaultValue` is provided, the first item will be selected by default.
 *  • Optional list `label` (rendered as the fieldset legend) and `helperText` under the group.
 *  • Disabled state for the whole list (greys out & prevents interaction).
 *  • Focus-visible ring for each radio control.
 *
 * Props
 *  • items – Array<{ label: React.ReactNode; value: string }> – The radio options to display.
 *  • label?: React.ReactNode – Group label shown above the radios.
 *  • helperText?: React.ReactNode – Secondary explanatory text shown below the radios.
 *  • value?: string – Currently selected value (controlled mode).
 *  • defaultValue?: string – Initial value (uncontrolled mode).
 *  • onChange?: (value: string) => void – Callback invoked when selection changes.
 *  • disabled?: boolean – Disables the whole group.
 *  • className?: string – Additional classes for the outer wrapper.
 *
 * Basic usage
 * ```tsx
 * <RadioList
 *   label="Preferred contact method"
 *   helperText="We'll use this to reach you."
 *   items={[
 *     { label: 'Email', value: 'email' },
 *     { label: 'Phone', value: 'phone' },
 *     { label: 'Text', value: 'text' },
 *   ]}
 *   defaultValue="email"
 *   onChange={(val) => console.log(val)}
 * />
 * ```
 */

export interface RadioListProps {
  /** Array of radio options */
  items: Array<{ label: React.ReactNode; value: string }>;
  /** Optional group label */
  label?: React.ReactNode;
  /** Optional helper text displayed underneath */
  helperText?: React.ReactNode;
  /** Controlled selected value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  /** Fires when selection changes */
  onChange?: (value: string) => void;
  /** Disable entire group */
  disabled?: boolean;
  /** Extra class names for the wrapper */
  className?: string;
}

export const RadioList = forwardRef<HTMLDivElement, RadioListProps>((props, ref) => {
  const {
    items,
    label,
    helperText,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled = false,
    className,
  } = props;

  // Ensure there is at least one item.
  if (items.length === 0) {
    console.error('RadioList: `items` array must contain at least one item.');
  }

  const generatedId = useId();
  const groupName = `radio-${generatedId}`;

  // Controlled vs uncontrolled logic
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(() => {
    if (defaultValue !== undefined) return defaultValue;
    // Fall back to first item value so one option is always selected
    return items[0]?.value ?? '';
  });

  const selectedValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onChange?.(val);
  };

  // Utility to join class names without external dependency
  function cn(...classes: Array<string | false | undefined | null>): string {
    return classes.filter(Boolean).join(' ');
  }

  /* --------------------- Styling helpers --------------------- */
  const groupWrapperCN = cn('flex flex-col items-start gap-3', disabled && 'opacity-50 cursor-not-allowed', className);
  const labelCN = 'font-primary text-body-sm text-[var(--components-text-primary)] font-medium';
  const helperCN = 'text-body-xs text-[var(--components-text-secondary)]';

  const radioOuterBase = 'relative w-5 h-5 rounded-full border transition-colors duration-200 flex items-center justify-center';
  const radioOuterEnabled = 'border-[var(--components-text-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-accent-main';
  const radioOuterDisabled = 'border-softgrey-light';

  const radioInnerBase = 'absolute inset-0 flex items-center justify-center';
  const radioDotBase = 'absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary-main transform transition-transform duration-200 scale-0';
  const radioDotChecked = 'peer-checked:scale-100';

  /* --------------------- Markup composition --------------------- */
  const radios = items.map(({ label: itemLabel, value }) => {
    const inputId = `${groupName}-${value}`;

    return (
      <div key={value} className={cn("flex items-center gap-2", !disabled && "cursor-pointer")}>
        {/* Control */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            id={inputId}
            type="radio"
            name={groupName}
            value={value}
            disabled={disabled}
            className="peer sr-only"
            checked={selectedValue === value}
            onChange={() => handleChange(value)}
          />
          {/* Visual circle */}
          <div className={cn(radioOuterBase, disabled ? radioOuterDisabled : radioOuterEnabled)} />
          {/* Filled dot overlay */}
          <div className={cn(radioDotBase, radioDotChecked)} />
        </label>
        {/* Item label */}
        <label htmlFor={inputId} className="font-primary text-body-sm text-[var(--components-text-primary)] select-none cursor-pointer">
          {itemLabel}
        </label>
      </div>
    );
  });

  return (
    <div ref={ref} className={groupWrapperCN}>
      {label && <p className={labelCN}>{label}</p>}
      {/* Radios */}
      <div className="flex flex-col gap-3">
        {radios}
      </div>
      {helperText && <p className={helperCN}>{helperText}</p>}
    </div>
  );
});

RadioList.displayName = 'RadioList'; 