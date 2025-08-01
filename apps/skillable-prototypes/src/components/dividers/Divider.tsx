/**
 * Divider Component
 * 
 * A simple divider component with horizontal and vertical variants.
 * Uses the design system's divider color token for consistent theming.
 * 
 * @param variant - 'horizontal' | 'vertical' - The orientation of the divider
 * @param className - Additional CSS classes to apply
 * @param ...props - Additional HTML attributes
 * 
 * @example
 * <Divider variant="horizontal" />
 * <Divider variant="vertical" /> // Stretches to match sibling heights
 * <Divider variant="vertical" className="h-8" /> // Custom height override
 */
import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'horizontal' | 'vertical';
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-[var(--components-divider-main)]';
  
  const variantClasses = {
    horizontal: 'w-full h-px',
    vertical: 'self-stretch w-px' // Use self-stretch to match sibling heights
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
      role="separator"
      aria-orientation={variant}
      {...props}
    />
  );
};

export default Divider; 