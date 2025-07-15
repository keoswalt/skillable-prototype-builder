/**
 * Alert Component
 * 
 * A flexible alert/notification component with multiple variants and optional properties.
 * 
 * Props:
 * - variant: 'filled' | 'outlined' - Visual style (default: 'filled')
 * - state: 'error' | 'warning' | 'success' | 'info' - Semantic state (default: 'info')
 * - title: string - Optional title text
 * - description: string - Optional description text
 * - icon: ReactNode - Optional custom icon (uses default state icons if not provided)
 * - onClose: function - Optional close handler (hides close button if not provided)
 * - className: string - Optional additional CSS classes
 * 
 * Usage:
 * <Alert state="error" title="Error" description="Something went wrong" />
 * <Alert variant="outlined" state="success" description="Operation completed" />
 * <Alert state="warning" title="Warning" onClose={() => setShow(false)} />
 */
import React from 'react';
import { Icon, Icons } from '../Icon';

export type AlertVariant = 'filled' | 'outlined';
export type AlertState = 'error' | 'warning' | 'success' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  state?: AlertState;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const stateConfig = {
  error: {
    filled: {
      bg: 'bg-_components-alert-critical-background',
      icon: Icons.alert,
      iconColor: 'text-error-main',
      closeColor: 'text-error-main hover:text-error-dark',
      border: 'border-error-main',
      titleColor: 'text-_components-alert-critical-color',
      descriptionColor: 'text-_components-alert-critical-color'
    },
    outlined: {
      bg: 'bg_components-background-default',
      icon: Icons.alert,
      iconColor: 'text-error-main',
      closeColor: 'text-error-main hover:text-error-dark',
      border: 'border-error-main',
      titleColor: 'text_components-text-primary',
      descriptionColor: 'text_components-text-primary'
    }
  },
  warning: {
    filled: {
      bg: 'bg-_components-alert-high-background',
      icon: Icons.bell,
      iconColor: 'text-critical-main',
      closeColor: 'text-critical-main hover:text-critical-dark',
      border: 'border-critical-main',
      titleColor: 'text-_components-alert-high-color',
      descriptionColor: 'text-_components-alert-high-color'
    },
    outlined: {
      bg: 'bg_components-background-default',
      icon: Icons.bell,
      iconColor: 'text-critical-main',
      closeColor: 'text-critical-main hover:text-critical-dark',
      border: 'border-critical-main',
      titleColor: 'text_components-text-primary',
      descriptionColor: 'text_components-text-primary'
    }
  },
  success: {
    filled: {
      bg: 'bg-_components-alert-success-background',
      icon: Icons.check,
      iconColor: 'text-success-dark',
      closeColor: 'text-success-dark hover:text-success-dark',
      border: 'border-green-200',
      titleColor: 'text-_components-alert-success-color',
      descriptionColor: 'text-_components-alert-success-color'
    },
    outlined: {
      bg: 'bg_components-background-default',
      icon: Icons.check,
      iconColor: 'text-success-main',
      closeColor: 'text-success-main hover:text-success-dark',
      border: 'border-success-dark',
      titleColor: 'text_components-text-primary',
      descriptionColor: 'text_components-text-primary'
    }
  },
  info: {
    filled: {
      bg: 'bg-secondary-soft',
      icon: Icons.info,
      iconColor: 'text-secondary-dark',
      closeColor: 'text-secondary-dark hover:text-secondary-dark',
      border: 'border-secondary-dark',
      titleColor: 'text-secondary-contrast',
      descriptionColor: 'text-secondary-contrast'
    },
    outlined: {
      bg: 'bg_components-background-default',
      icon: Icons.info,
      iconColor: 'text-secondary-main',
      closeColor: 'text-secondary-main hover:text-secondary-dark',
      border: 'border-secondary-main',
      titleColor: 'text_components-text-primary',
      descriptionColor: 'text_components-text-primary'
    }
  }
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'filled',
  state = 'info',
  title,
  description,
  icon,
  onClose,
  className = ''
}) => {
  const config = stateConfig[state][variant];
  const DefaultIcon = config.icon;

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-md border max-w-[400px] w-full
        ${config.bg} ${config.border}
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {icon || (
          <Icon
            icon={DefaultIcon}
            className={`w-5 h-5 ${config.iconColor}`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.titleColor}`}>
            {title}
          </h4>
        )}
        {description && (
          <p className={config.descriptionColor}>
            {description}
          </p>
        )}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={`
            flex-shrink-0 p-1 rounded-md transition-colors
            ${config.closeColor}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
          `}
          aria-label="Close alert"
        >
          <Icon
            icon={Icons.close}
            className="w-4 h-4"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}; 