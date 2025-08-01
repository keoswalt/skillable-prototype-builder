import React from 'react';
import { Icon, Icons } from '../Icon';

/**
 * Stepper – Displays progress through a sequence of steps.
 *
 * Props
 *  • steps: Array<{ label: string; description?: string }>
 *      Ordered list of step metadata.
 *  • currentStep: number (1-based)
 *      Index of the active step. Steps with an index lower than this are
 *      considered "completed". Values greater than steps.length will mark all
 *      steps completed; values < 1 mark all as upcoming.
 *  • orientation?: 'horizontal' | 'vertical' (default 'horizontal') – layout
 *  • className?: string – optional wrapper class overrides
 *
 * Visual design follows Skillable DS tokens:
 *  • Inactive indicator  – bg-softgrey-main / text-softgrey-contrast
 *  • Active + completed – bg-primary-main / text-primary-contrast
 *  • Completed indicator shows a check icon, active shows the step number.
 *  • Connectors between items are colored primary for completed portions and
 *    var(--components-stepper-connector) for the rest.
 *
 * Usage example:
 * ```tsx
 * <Stepper
 *   steps={[{ label: 'Account' }, { label: 'Profile' }, { label: 'Confirm' }]}
 *   currentStep={2}
 * />
 * ```
 */

export type Step = {
  label: string;
  description?: string;
};

export interface StepperProps {
  steps: Step[];
  /** 1-based index of the active step */
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

// Utility – conditional class concat (defined inline to avoid dep)
function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}

export default function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <ol
      className={cn(
        'font-primary',
        isHorizontal ? 'flex items-center w-full' : 'flex flex-col',
        className
      )}
    >
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        const indicatorBg = isCompleted || isActive
          ? 'bg-primary-main'
          : 'bg-softgrey-main';
        const indicatorText = isCompleted || isActive
          ? 'text-primary-contrast'
          : 'text-softgrey-contrast';

        const connectorBg = isCompleted
          ? 'bg-primary-main'
          : 'bg-_components-stepper-connector';

        return (
          <React.Fragment key={idx}>
            {/* Step item */}
            <li className={cn('flex', isHorizontal ? 'flex-row items-center flex-none gap-3' : 'flex-row items-start py-2')}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-body-sm flex-shrink-0',
                  indicatorBg,
                  indicatorText
                )}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${step.label} – ${isCompleted ? 'completed' : isActive ? 'current' : 'upcoming'}`}
              >
                {isCompleted ? (
                  <Icon icon={Icons.check} className="w-4 h-4" />
                ) : (
                  stepNumber
                )}
              </div>

              {/* Label & description */}
              <div className={cn(isHorizontal ? 'text-left' : 'ml-3')}>
                <p className="text-body-sm font-medium text-[var(--components-text-primary)]">
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-body-xs text-[var(--components-text-secondary)]">
                    {step.description}
                  </p>
                )}
              </div>
            </li>

            {/* Connector (not rendered after last step) */}
            {idx < steps.length - 1 && (
              isHorizontal ? (
                <div className={cn('flex-auto h-0.5 mx-4', connectorBg)} aria-hidden="true" />
              ) : (
                <div className={cn('w-0.5 h-6 ml-4 my-2', connectorBg)} aria-hidden="true" />
              )
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
} 