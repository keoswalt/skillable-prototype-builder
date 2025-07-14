import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from './useScrollLock';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
  anchorEl?: HTMLElement | null;
  preferredAlignment?: 'left' | 'right';
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  items,
  anchorEl,
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

  const menuContent = (
    <div
      ref={menuRef}
      className="z-50 min-w-[200px] py-1 rounded-md shadow-lg bg-_components-background-default border border-_components-text-primary"
      style={hasMeasured ? menuStyle : initialStyle}
      onClick={(e) => {
        console.log('[Menu] Menu container clicked:', e.target);
      }}
      onMouseDown={(e) => {
        console.log('[Menu] Menu container mousedown:', e.target);
      }}
    >
      {items.map((item, index) => {
        console.log('[Menu] Rendering item:', { index, label: item.label });
        return (
          <div
            key={index}
            onClick={(e) => {
              console.log('[Menu] Item clicked:', { index, label: item.label, target: e.target });
              e.stopPropagation();
              if (item.onClick) {
                console.log('[Menu] Calling item.onClick');
                item.onClick();
              }
              if (item.href) {
                console.log('[Menu] Navigating to href:', item.href);
                window.location.href = item.href;
              }
              console.log('[Menu] Closing menu');
              onClose();
            }}
            onMouseDown={(e) => {
              console.log('[Menu] Item mousedown:', { index, label: item.label, target: e.target });
              e.stopPropagation();
            }}
            className="px-4 py-2 text-body-sm text-_components-text-primary hover:bg-_components-background-contrast-sm cursor-pointer"
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );

  return typeof window !== 'undefined' && document.body
    ? createPortal(menuContent, document.body)
    : null;
};

export default Menu; 