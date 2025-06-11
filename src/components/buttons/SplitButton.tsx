'use client';

import React from 'react';

interface SplitButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  onDropdownClick?: () => void;
  className?: string;
  variant?: 'default' | 'primary';
}

const ArrowDropDownIcon = () => (
  <svg
    className="size-2"
    viewBox="0 0 10 5"
    fill="none"
  >
    <path
      d="M0 0L5 5L10 0H0Z"
      fill="currentColor"
    />
  </svg>
);

export const SplitButton: React.FC<SplitButtonProps> = ({
  icon,
  label,
  onClick,
  onDropdownClick,
  className = '',
  variant = 'default',
}) => {
  const colorClasses = {
    default: {
      container: 'border-common-white-contrast bg-common-white-main text-common-white-contrast',
      hover: 'hover:bg-accent-light',
    },
    primary: {
      container: 'border-primary-contrast bg-primary-main text-primary-contrast',
      hover: 'hover:bg-primary-dark',
    },
  }[variant];

  return (
    <div 
      className={`
        inline-flex h-8 items-center rounded-[5px] border text-sm
        ${colorClasses.container}
        ${className}
      `}
    >
      {/* Main button */}
      <button
        onClick={onClick}
        className={`flex h-full items-center px-3 gap-1.5 rounded-l-[5px] ${colorClasses.hover}`}
      >
        {icon && (
          <span className="size-4 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span className="font-primary font-medium">
          {label}
        </span>
      </button>

      {/* Divider */}
      <div className="h-full w-[1px] bg-current self-stretch" />

      {/* Dropdown button */}
      <button
        onClick={onDropdownClick}
        className={`h-full px-4 rounded-r-[5px] flex items-center ${colorClasses.hover}`}
      >
        <ArrowDropDownIcon />
      </button>
    </div>
  );
};

export default SplitButton; 