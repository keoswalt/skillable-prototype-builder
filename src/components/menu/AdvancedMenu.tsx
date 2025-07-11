import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Switch } from '../inputs/Switch';
import { CheckboxItem } from '../inputs/CheckboxItem';
import { DropdownSelect } from '../inputs/DropdownSelect';
import { Icon, Icons } from '../Icon';
import { useScrollLock } from './useScrollLock';

/**
 * AdvancedMenu – A settings menu supporting sections, headers, dividers, and advanced menu items (Switch, CheckboxItem, DropdownSelect, slider, icon, helper text, etc.).
 *
 * Props:
 *  - isOpen: boolean – Whether the menu is open
 *  - onClose: () => void – Called when the menu should close
 *  - sections: Array<{
 *      header?: string;
 *      items: Array<AdvancedMenuItem>;
 *    }>
 *  - anchorEl?: HTMLElement | null – Anchor element for positioning
 *
 * AdvancedMenuItem = {
 *   type: 'switch' | 'checkbox' | 'dropdown' | 'slider' | 'custom';
 *   label: string;
 *   value?: any;
 *   onChange?: (value: any) => void;
 *   icon?: keyof typeof Icons;
 *   helperText?: string;
 *   disabled?: boolean;
 *   dropdownOptions?: { label: string; value: string | number; disabled?: boolean }[];
 *   min?: number; // for slider
 *   max?: number; // for slider
 *   step?: number; // for slider
 *   customNode?: React.ReactNode; // for custom
 * }
 *
 * Usage:
 * <AdvancedMenu isOpen={open} onClose={closeFn} sections={[{header: 'Settings', items: [...]}, ...]} anchorEl={el} />
 */

export type AdvancedMenuItem =
  | {
      type: 'switch';
      label: string;
      value: boolean;
      onChange: (checked: boolean) => void;
      icon?: keyof typeof Icons;
      helperText?: string;
      disabled?: boolean;
    }
  | {
      type: 'checkbox';
      label: string;
      value: boolean;
      onChange: (checked: boolean) => void;
      icon?: keyof typeof Icons;
      helperText?: string;
      disabled?: boolean;
    }
  | {
      type: 'dropdown';
      label: string;
      value: string | number;
      onChange: (value: string | number) => void;
      icon?: keyof typeof Icons;
      helperText?: string;
      disabled?: boolean;
      dropdownOptions: { label: string; value: string | number; disabled?: boolean }[];
    }
  | {
      type: 'slider';
      label: string;
      value: number;
      onChange: (value: number) => void;
      icon?: keyof typeof Icons;
      helperText?: string;
      disabled?: boolean;
      min: number;
      max: number;
      step?: number;
    }
  | {
      type: 'custom';
      customNode: React.ReactNode;
      key?: string | number;
    };

export interface AdvancedMenuSection {
  header?: string;
  items: AdvancedMenuItem[];
}

export interface AdvancedMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: AdvancedMenuSection[];
  anchorEl?: HTMLElement | null;
}

export const AdvancedMenu: React.FC<AdvancedMenuProps> = ({ isOpen, onClose, sections, anchorEl }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const [hasMeasured, setHasMeasured] = useState(false);

  // Lock scroll when menu is open
  useScrollLock(isOpen);

  React.useEffect(() => {
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

  useLayoutEffect(() => {
    if (!isOpen || !anchorEl || !menuRef.current) return;
    // On first render, menu is offscreen, so measure and reposition
    const anchorRect = anchorEl.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const spacing = 4;
    let top = anchorRect.bottom + spacing;
    let left = anchorRect.left;
    let minWidth = anchorRect.width;

    // Flip up if overflowing bottom
    if (top + menuRect.height > window.innerHeight) {
      top = anchorRect.top - menuRect.height - spacing;
    }
    // Flip left if overflowing right
    if (left + menuRect.width > window.innerWidth) {
      left = anchorRect.right - menuRect.width;
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
  }, [isOpen, anchorEl]);

  React.useEffect(() => {
    if (!isOpen) setHasMeasured(false);
  }, [isOpen]);

  if (!isOpen) return null;

  // On first open, render offscreen so we can measure
  const initialStyle = {
    position: 'fixed' as 'fixed',
    top: '-9999px',
    left: '-9999px',
    minWidth: anchorEl ? `${anchorEl.getBoundingClientRect().width}px` : undefined,
    zIndex: 9999,
  };

  const menuContent = (
    <div
      ref={menuRef}
      className="z-50 min-w-[260px] py-2 rounded-lg shadow-lg bg-_components-background-default border border-_components-text-primary"
      style={hasMeasured ? menuStyle : initialStyle}
    >
      {sections.map((section, sIdx) => (
        <div key={sIdx}>
          {section.header && (
            <div className="px-4 pt-2 pb-1 text-xs font-semibold text-_components-text-secondary tracking-wide uppercase">
              {section.header}
            </div>
          )}
          {section.items.map((item, iIdx) => {
            if (item.type === 'custom') {
              return (
                <div key={item.key ?? iIdx} className="px-4 py-2">
                  {item.customNode}
                </div>
              );
            }
            return (
              <div
                key={iIdx}
                className="flex items-center gap-3 px-4 py-2 hover:bg-_components-background-contrast-sm transition-colors rounded cursor-pointer group"
              >
                {item.icon && (
                  <Icon icon={Icons[item.icon]} className="w-4 h-4 text-_components-text-secondary" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-body-sm text-_components-text-primary font-primary truncate">{item.label}</span>
                    {item.type === 'dropdown' && (
                      <Icon icon={Icons.chevronDown} className="w-3 h-3 text-_components-text-secondary ml-1" />
                    )}
                  </div>
                  {item.helperText && (
                    <div className="text-body-xs text-_components-text-secondary mt-0.5">{item.helperText}</div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {item.type === 'switch' && (
                    <Switch
                      checked={item.value}
                      onChange={e => item.onChange(e.target.checked)}
                      disabled={item.disabled}
                      labelPlacement="right"
                    />
                  )}
                  {item.type === 'checkbox' && (
                    <CheckboxItem
                      checked={item.value}
                      onChange={e => item.onChange(e.target.checked)}
                      disabled={item.disabled}
                      labelPlacement="right"
                    />
                  )}
                  {item.type === 'dropdown' && (
                    <DropdownSelect
                      value={item.value}
                      onChange={e => item.onChange(e.target.value)}
                      options={item.dropdownOptions}
                      disabled={item.disabled}
                      orientation="horizontal"
                      maxWidth="xs"
                    />
                  )}
                  {item.type === 'slider' && (
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={item.step ?? 1}
                      value={item.value}
                      onChange={e => item.onChange(Number(e.target.value))}
                      disabled={item.disabled}
                      className="w-28 h-2 accent-accent-main bg-softgrey-main rounded-full outline-none"
                    />
                  )}
                </div>
              </div>
            );
          })}
          {sIdx < sections.length - 1 && (
            <div className="my-2 border-t border-_components-divider-main" />
          )}
        </div>
      ))}
    </div>
  );

  return typeof window !== 'undefined' && document.body
    ? createPortal(menuContent, document.body)
    : null;
};

export default AdvancedMenu; 