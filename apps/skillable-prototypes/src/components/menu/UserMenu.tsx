import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon, Icons } from '../Icon';
import { useScrollLock } from './useScrollLock';
import { RadioList } from '../inputs/RadioList';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  currentTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  preferredAlignment?: 'left' | 'right';
}

interface UserMenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: keyof typeof Icons;
}

const userMenuItems: UserMenuItem[] = [
  { 
    label: 'Edit Profile', 
    onClick: () => alert('Opens profile editor'),
    icon: 'user'
  },
  { 
    label: 'View Account', 
    onClick: () => alert('Opens account settings'),
    icon: 'settings'
  },
  { 
    label: 'Sign Out', 
    onClick: () => alert('Signs out user'),
    icon: 'logout'
  },
];

const themeItems = [
  {
    label: (
      <div className="flex items-center">
        <Icon 
          icon={Icons.sun} 
          className="mr-2 h-4 w-4 text-_components-text-secondary" 
        />
        <span>Light Mode</span>
      </div>
    ),
    value: 'light'
  },
  {
    label: (
      <div className="flex items-center">
        <Icon 
          icon={Icons.moon} 
          className="mr-2 h-4 w-4 text-_components-text-secondary" 
        />
        <span>Dark Mode</span>
      </div>
    ),
    value: 'dark'
  }
];

export const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onClose,
  anchorEl,
  currentTheme,
  onThemeChange,
  preferredAlignment = 'left',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const [hasMeasured, setHasMeasured] = useState(false);

  // Lock scroll when menu is open
  useScrollLock(isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !anchorEl?.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose, anchorEl]);

  useLayoutEffect(() => {
    if (!isOpen || !anchorEl || !menuRef.current) return;
    // On first render, menu is offscreen, so measure and reposition
    const anchorRect = anchorEl.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const spacing = 4;
    let top = anchorRect.bottom + spacing;
    const minWidth = anchorRect.width;
    let left = preferredAlignment === 'right'
      ? anchorRect.right - menuRect.width
      : anchorRect.left;

    // Flip up if overflowing bottom
    if (top + menuRect.height > window.innerHeight) {
      top = anchorRect.top - menuRect.height - spacing;
    }
    // Adjust left if overflowing right
    if (left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 8; // 8px margin
    }
    // Prevent negative left
    if (left < 0) left = 0;
    // Prevent negative top
    if (top < 0) top = 0;

    setMenuStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      minWidth: `${minWidth}px`,
      zIndex: 9999,
    });
    setHasMeasured(true);
  }, [isOpen, anchorEl, preferredAlignment]);

  useEffect(() => {
    if (!isOpen) setHasMeasured(false);
  }, [isOpen]);

  if (!isOpen) return null;

  // On first open, render offscreen so we can measure
  const initialStyle = {
    position: 'fixed' as const,
    top: '-9999px',
    left: '-9999px',
    minWidth: anchorEl ? `${anchorEl.getBoundingClientRect().width}px` : undefined,
    zIndex: 9999,
  };

  const handleItemClick = (item: UserMenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.href) {
      window.location.href = item.href;
    }
    onClose();
  };

  const menuContent = (
    <div
      ref={menuRef}
      className="z-50 min-w-[200px] py-1 rounded-md shadow-lg bg-_components-background-default border border-_components-divider-main"
      style={hasMeasured ? menuStyle : initialStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* User Actions */}
      {userMenuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => handleItemClick(item)}
          className="px-4 py-2 text-body-sm text-_components-text-primary hover:bg-_components-background-contrast-sm cursor-pointer flex items-center"
        >
          {item.icon && (
            <Icon 
              icon={Icons[item.icon]} 
              className="mr-3 h-4 w-4 text-_components-text-secondary" 
            />
          )}
          {item.label}
        </div>
      ))}
      
      {/* Divider */}
      <div className="border-t border-_components-divider-main my-1" />
      
      {/* Theme Section */}
      <div 
        className="px-4 py-2"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <RadioList
          label="Theme:"
          items={themeItems}
          value={currentTheme}
          onChange={(value) => onThemeChange(value as 'light' | 'dark')}
          className="gap-2"
        />
      </div>
    </div>
  );

  return typeof window !== 'undefined' && document.body
    ? createPortal(menuContent, document.body)
    : null;
};

export default UserMenu; 