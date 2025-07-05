import React, { useEffect, useRef } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: {
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
  anchorEl?: HTMLElement | null;
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  onClose,
  items,
  anchorEl,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorEl]);

  if (!isOpen) return null;

  const rect = anchorEl?.getBoundingClientRect();
  const menuStyle = rect ? {
    position: 'fixed' as const,
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  } : {};

  return (
    <div
      ref={menuRef}
      className="z-50 min-w-[200px] py-1 rounded-md shadow-lg bg-_components-background-default border border-_components-text-primary   
      "
      style={menuStyle}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (item.onClick) item.onClick();
            if (item.href) window.location.href = item.href;
            onClose();
          }}
          className="px-4 py-2 text-body-sm text-_components-text-primary hover:bg-_components-background-contrast-sm cursor-pointer"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Menu; 