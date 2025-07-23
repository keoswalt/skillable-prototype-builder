'use client';

import React, { useState, useRef } from 'react';
import Menu from '../menu/Menu';

interface SplitButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  menuItems?: {
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
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
  menuItems,
  className = '',
  variant = 'default',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const colorClasses = {
    default: {
      container: 'border-_components-text-primary bg-_components-background-default text-_components-text-primary',
      hover: 'hover:bg-_components-background-contrast-sm',
    },
    primary: {
      container: 'bg-primary-main text-primary-contrast',
      hover: 'hover:bg-primary-dark',
    },
  }[variant];

  return (
    <>
      <div 
        className={`
          inline-flex h-8 items-center rounded-[5px] text-sm
          ${variant === 'default' ? 'border' : ''}
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
          ref={dropdownButtonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-full px-4 rounded-r-[5px] flex items-center ${colorClasses.hover}`}
        >
          <ArrowDropDownIcon />
        </button>
      </div>

      {menuItems && (
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          items={menuItems}
          anchorEl={dropdownButtonRef.current}
          preferredAlignment="right"
        />
      )}
    </>
  );
};

export default SplitButton; 