'use client';

import React from 'react';
import { Icon, IconName, Icons } from '../Icon';
import { Tooltip, TooltipDirection } from '../info/Tooltip';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  /**
   * Button stylistic variants.
   * - primary, secondary, warning, error, success: colored buttons with text (default)
   * - outline: transparent background with border
   * - icon: square icon-only button (no text required)
   * - text: text-only button (no background or border)
   */
  variant?: 'primary' | 'secondary' | 'warning' | 'error' | 'success' | 'outline' | 'icon' | 'text';
  /**
   * For the 'text' variant, specify the color style (primary, secondary, warning, error, success)
   */
  color?: 'primary' | 'secondary' | 'warning' | 'error' | 'success' | 'outline';
  leftIcon?: IconName;
  rightIcon?: IconName;
  children?: React.ReactNode; // text is optional for icon-only buttons
  /**
   * Optional tooltip content to display on hover
   */
  tooltip?: React.ReactNode;
  /**
   * Direction for the tooltip (default: 'top')
   */
  tooltipDirection?: TooltipDirection;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    size = 'medium',
    variant = 'primary',
    leftIcon,
    rightIcon,
    children,
    className = '',
    disabled,
    tooltip,
    tooltipDirection = 'top',
    ...props
  }, ref) => {
    // Standard button dimensions
    const sizeClasses = {
      small: 'h-7 px-2 text-body-xs gap-1',
      medium: 'h-8 px-3 text-body-sm gap-1.5',
      large: 'h-10 px-4 text-body-md gap-2',
    };

    // Square dimensions for icon-only buttons
    const iconOnlySizeClasses = {
      small: 'h-7 w-7 aspect-square p-0',
      medium: 'h-8 w-8 aspect-square p-0',
      large: 'h-10 w-10 aspect-square p-0',
    } as const;

    const variantClasses = {
      primary: 'bg-primary-main text-primary-contrast hover:bg-primary-dark',
      secondary: 'bg-secondary-main text-secondary-contrast hover:bg-secondary-dark',
      warning: 'bg-warning-main text-warning-contrast hover:bg-warning-dark',
      error: 'bg-error-main text-error-contrast hover:bg-error-dark',
      success: 'bg-success-main text-success-contrast hover:bg-success-dark',
      outline: 'border border-_components-text-primary bg-_components-background-default text-_components-text-primary hover:bg-_components-background-contrast-sm',
      icon: 'bg-transparent text-primary-main hover:bg-primary-contrast',
      text: {
        primary: 'bg-transparent border-none text-primary-main hover:text-primary-dark',
        secondary: 'bg-transparent border-none text-secondary-main hover:text-secondary-dark',
        warning: 'bg-transparent border-none text-warning-main hover:text-warning-dark',
        error: 'bg-transparent border-none text-error-main hover:text-error-dark',
        success: 'bg-transparent border-none text-success-main hover:text-success-dark',
        outline: 'bg-transparent border-none text-_components-text-primary hover:text-primary-main',
      },
    } as const;

    const iconSize = {
      small: 14,
      medium: 16,
      large: 18,
    };

    // Determine text color for text variant
    let textVariantColor = '';
    if (variant === 'text') {
      // Default to primary if not specified
      const color = (props.color as keyof typeof variantClasses.text) || 'primary';
      textVariantColor = variantClasses.text[color];
    }

    const buttonElement = (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center rounded-[5px] font-primary
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${(variant === 'icon' ? iconOnlySizeClasses[size] : sizeClasses[size])}
          ${variant === 'text'
            ? textVariantColor
            : variantClasses[variant as keyof typeof variantClasses]}
          ${className}
        `}
        {...props}
      >
        {leftIcon && (
          <Icon
            icon={Icons[leftIcon]}
            size={iconSize[size]}
            className="shrink-0"
          />
        )}
        {children}
        {rightIcon && (
          <Icon
            icon={Icons[rightIcon]}
            size={iconSize[size]}
            className="shrink-0"
          />
        )}
      </button>
    );

    // Wrap with tooltip if tooltip content is provided
    if (tooltip) {
      return (
        <Tooltip content={tooltip} direction={tooltipDirection}>
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
);

Button.displayName = 'Button'; 