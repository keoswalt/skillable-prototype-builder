// @ts-nocheck
'use client';

import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { Icon, Icons } from '../Icon';

/**
 * Accordion – Collapsible content wrapper built on native <details>/<summary>.
 *
 * Features
 *  • Accepts any number of children as plain <details> elements (basic HTML ✨).
 *  • Consistent Skillable Design System styling (borders, typography, iconography).
 *  • Smooth chevron rotation / open-close animation using Tailwind `group-open` variant.
 *  • Optional `maxWidth` prop (mirrors TextField implementation) maps to Tailwind `max-w-*` utilities.
 *  • Fully accessible out of the box thanks to native semantics.
 *
 * Props
 *  • maxWidth?: Tailwind max-width key – 'none' | 'xs' | 'sm' | … | 'full'
 *  • className?: string – Additional wrapper classes.
 *  • ...rest – All native <div> props (id, style, etc.).
 *
 * Basic usage
 * ```tsx
 * <Accordion maxWidth="md">
 *   <details>
 *     <summary>Typography</summary>
 *     <p>Body content…</p>
 *   </details>
 *   <details>
 *     <summary>Colors</summary>
 *     <p>More body content…</p>
 *   </details>
 * </Accordion>
 * ```
 */

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Convenience max-width mapped to Tailwind's `max-w-*` utilities */
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
  /** Additional wrapper classes */
  className?: string;
}

// Utility to join class names conditionally without an external dependency
function cn(...classes: Array<string | false | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}

const maxWidthClasses: Record<NonNullable<AccordionProps['maxWidth']>, string> = {
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
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, maxWidth, className, ...rest }, ref) => {
    // Ensure we work with an array of children
    const childArray = React.Children.toArray(children) as ReactElement[];

    const styledChildren = childArray.map((child, index) => {
      const detailsElement = child as ReactElement<any>;
      // Only enhance native <details> elements
      if (!React.isValidElement(detailsElement) || detailsElement.type !== 'details') {
        return child;
      }

      const isFirst = index === 0;
      const isLast = index === childArray.length - 1;

      // Extract the existing <summary> (first child of <details>)
      const originalSummary = React.Children.toArray(detailsElement.props.children).find(
        (c) => React.isValidElement(c) && (c as ReactElement).type === 'summary',
      ) as ReactElement | undefined;

      const bodyChildren = React.Children.toArray(detailsElement.props.children).filter(
        (c) => !(React.isValidElement(c) && (c as ReactElement).type === 'summary'),
      );

      // Build styled <summary>
      const summary = originalSummary
        ? React.cloneElement(originalSummary, {
            className: cn(
              'flex items-center justify-between cursor-pointer select-none py-4 px-6 font-primary text-body-md text-[var(--components-text-primary)]',
              originalSummary.props.className,
            ),
            children: (
              <>
                {originalSummary.props.children}
                <Icon
                  icon={Icons.chevronDown}
                  className="ml-2 h-4 w-4 text-[var(--components-text-light)] transition-transform duration-200 group-open:-rotate-180" // rotate icon when open
                  aria-hidden
                />
              </>
            ),
          })
        : null;

      // Wrap body content with padding & top border
      const contentWrapper: ReactNode = bodyChildren.length ? (
        <div className="px-6 py-4 text-body-sm text-[var(--components-text-primary)]">
          {bodyChildren}
        </div>
      ) : null;

      // Compose final <details>
      return React.cloneElement(detailsElement as ReactElement<any>, {
        key: index,
        className: cn(
          'group bg-[var(--components-background-default)] border border-[var(--components-divider-main)]',
          isFirst && 'rounded-t-[var(--borderradius)]',
          isLast && 'rounded-b-[var(--borderradius)]',
          detailsElement.props.className,
        ),
        children: (
          <>
            {summary}
            {contentWrapper}
          </>
        ),
      });
    });

    return (
      <div
        ref={ref}
        className={cn('w-full', maxWidth ? maxWidthClasses[maxWidth] : undefined, className)}
        {...rest}
      >
        {styledChildren}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion'; 