import React from 'react';
import { Icon } from '../Icon';
import { IconName, Icons } from '../Icon';
import { LucideIcon } from 'lucide-react';

export type ChipVariant = 'default' | 'primary' | 'secondary' | 'warning' | 'error' | 'success';
export type ChipSize = 'default' | 'small';

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: IconName | LucideIcon;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  default: 'bg-softgrey-main text-hardgrey-main',
  primary: 'bg-primary-main text-primary-contrast',
  secondary: 'bg-secondary-main text-secondary-contrast',
  warning: 'bg-warning-main text-warning-contrast',
  error: 'bg-error-main text-error-contrast',
  success: 'bg-success-main text-success-contrast',
};

const sizeStyles: Record<ChipSize, {
  container: string,
  icon: string,
  closeIcon: string
}> = {
  default: {
    container: 'gap-1.5 px-3 py-1 text-body-sm',
    icon: 'w-4 h-4',
    closeIcon: 'w-3.5 h-3.5'
  },
  small: {
    container: 'gap-1 px-2 py-0.5 text-body-xs',
    icon: 'w-3 h-3',
    closeIcon: 'w-3 h-3'
  }
};

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'default',
  icon,
  onClick,
  onDelete,
  className = '',
}) => {
  // Handle both IconName string and LucideIcon component
  const IconComponent = typeof icon === 'string' ? Icons[icon] : icon;
  const sizeStyle = sizeStyles[size];

  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center rounded-full font-medium
        ${sizeStyle.container}
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer hover:opacity-90' : ''}
        ${className}
      `}
    >
      {IconComponent && (
        <Icon icon={IconComponent} className={sizeStyle.icon} />
      )}
      <span>{children}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-1 p-0.5 hover:bg-whiteblack-contrast/10 rounded-full transition-colors"
          aria-label="Remove"
        >
          <Icon icon={Icons.close} className={sizeStyle.closeIcon} />
        </button>
      )}
    </div>
  );
};

export default Chip; 