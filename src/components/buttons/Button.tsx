'use client';

import React from 'react';
import { Icon, IconName, Icons } from '../Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'warning' | 'error' | 'success' | 'outline';
  leftIcon?: IconName;
  rightIcon?: IconName;
  children: React.ReactNode;
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
    ...props
  }, ref) => {
    const sizeClasses = {
      small: 'h-7 px-2 text-body-sm gap-1',
      medium: 'h-8 px-3 text-sm gap-1.5',
      large: 'h-10 px-4 text-body-md gap-2',
    };

    const variantClasses = {
      primary: 'bg-primary-main text-primary-contrast hover:bg-primary-dark',
      secondary: 'bg-secondary-main text-secondary-contrast hover:bg-secondary-dark',
      warning: 'bg-warning-main text-warning-contrast hover:bg-warning-dark',
      error: 'bg-error-main text-error-contrast hover:bg-error-dark',
      success: 'bg-success-main text-success-contrast hover:bg-success-dark',
      outline: 'border border-common-white-contrast bg-common-white-main text-common-white-contrast hover:bg-accent-light',
    };

    const iconSize = {
      small: 14,
      medium: 16,
      large: 18,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center rounded-[5px] font-primary font-medium
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
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
  }
);

Button.displayName = 'Button'; 