/**
 * Tooltip component
 * --------------------------------------
 * A small, reusable overlay that appears when the user hovers (or focuses) on its child element.
 * 
 * Props:
 * - content: React.ReactNode – The text or JSX displayed inside the tooltip.
 * - direction?: 'none' | 'top' | 'bottom' | 'left' | 'right' (default: 'top')
 * - children: React.ReactNode – The element that triggers the tooltip on hover/focus.
 * - className?: string – Additional class names for the tooltip bubble (useful for width overrides, etc.).
 * 
 * Usage:
 * <Tooltip content="Save" direction="bottom">
 *   <IconButton icon={Icons.save} />
 * </Tooltip>
 * 
 * Accessibility:
 * The tooltip is given role="tooltip" and is only visible on hover/focus.
 * The wrapper sets aria-describedby automatically so that screen-readers can associate the
 * trigger with the tooltip content.
 */

import React, { useId } from 'react';

export type TooltipDirection = 'none' | 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  direction?: TooltipDirection;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  direction = 'top',
  className = '',
}) => {
  const id = useId();

  // Positioning classes for the tooltip bubble relative to the trigger
  const bubblePosition: Record<TooltipDirection, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    none: 'left-1/2 -translate-x-1/2 top-0 mt-2', // fallback center top if no arrow
  };

  // Arrow placement per direction
  const arrowBase =
    'absolute w-2 h-2 rotate-45 bg-inherit'; // square rotated 45° becomes a diamond
  const arrowPosition: Record<TooltipDirection, string> = {
    top: 'bottom-[-0.25rem] left-1/2 -translate-x-1/2',
    bottom: 'top-[-0.25rem] left-1/2 -translate-x-1/2',
    left: 'right-[-0.25rem] top-1/2 -translate-y-1/2',
    right: 'left-[-0.25rem] top-1/2 -translate-y-1/2',
    none: 'hidden',
  };

  return (
    <div className="relative inline-flex group">
      {/* Trigger element */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, { 'aria-describedby': id } as any)
        : children}

      {/* Tooltip bubble */}
      <div
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-_components-tooltip-fill px-3 py-1 text-body-xs text-_components-text-light opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 ${bubblePosition[direction]} ${className}`}
      >
        {content}
        {/* Arrow */}
        <span className={`${arrowBase} ${arrowPosition[direction]}`} />
      </div>
    </div>
  );
};

export default Tooltip; 