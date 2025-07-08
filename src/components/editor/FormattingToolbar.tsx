/**
 * FormattingToolbar component
 * ---------------------------------------------------
 * A compact ribbon/toolbar that shows a row of icon buttons for rich-text
 * formatting actions (bold, italic, lists, table, etc.).
 * 
 * Props:
 * - buttons?: (ToolbarButtonProps | 'separator')[] – Optional custom list of
 *   buttons to render. When omitted, a sensible default list is shown.
 * - className?: string – Additional utility classes for the toolbar wrapper.
 * 
 * ToolbarButtonProps (for each button object):
 * - icon: IconName – Name of the icon (from Icon.tsx registry).
 * - label: string – Accessible name + Tooltip text.
 * - hasDropdown?: boolean – Shows a small chevron indicator in the corner.
 * - active?: boolean – Toggles the active state styling.
 * - onClick?: React.MouseEventHandler<HTMLButtonElement> – Click handler.
 * 
 * Usage:
 * <FormattingToolbar />
 * // or custom
 * <FormattingToolbar
 *   buttons={[{ icon: 'bold', label: 'Bold', active: true, onClick: () => {} }]}
 * />
 */

'use client';

import React from 'react';
import { Icon, Icons, IconName } from '../Icon';
import Tooltip from '../info/Tooltip';

export interface ToolbarButtonProps {
  icon: IconName;
  label: string;
  hasDropdown?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface FormattingToolbarProps {
  buttons?: (ToolbarButtonProps | 'separator')[];
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hasDropdown = false,
  onClick,
}) => {
  const baseClasses = `relative inline-flex h-8 w-8 items-center justify-center rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main`;
  const stateClasses =
    'text-_components-text-secondary hover:bg-primary-soft hover:text-primary-contrast';

  return (
    <Tooltip content={label} direction="bottom">
      <button
        type="button"
        aria-label={label}
        className={`${baseClasses} ${stateClasses}`}
        onClick={onClick}
      >
        <Icon icon={Icons[icon]} size={16} strokeWidth={1.8} />
        {hasDropdown && (
          <Icon
            icon={Icons['chevronDown']}
            size={10}
            className="absolute bottom-0.5 right-0.5"
            strokeWidth={2}
          />
        )}
      </button>
    </Tooltip>
  );
};

export const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  buttons,
  className = '',
}) => {
  const defaultButtons: (ToolbarButtonProps | 'separator')[] = [
    // Basic formatting
    { icon: 'bold', label: 'Bold' },
    { icon: 'italic', label: 'Italic' },
    { icon: 'strikethrough', label: 'Strikethrough' },
    'separator',

    // Headings & blocks
    { icon: 'heading', label: 'Heading', hasDropdown: true },
    { icon: 'layout', label: 'Blocks', hasDropdown: true },
    { icon: 'link', label: 'Link' },
    { icon: 'code', label: 'Code', hasDropdown: true },
    'separator',

    // Lists & indent
    { icon: 'list', label: 'Bulleted List' },
    { icon: 'listOrdered', label: 'Numbered List' },
    { icon: 'listChecks', label: 'Task List' },
    { icon: 'outdent', label: 'Decrease Indent' },
    { icon: 'indent', label: 'Increase Indent' },
    'separator',

    // Insert menu, table, AI
    { icon: 'filePlus', label: 'Insert', hasDropdown: true },
    { icon: 'table', label: 'Table', hasDropdown: true },
    { icon: 'sparkles', label: 'AI', hasDropdown: true },
    'separator',

    // Authoring widgets
    { icon: 'type', label: 'Type Text', hasDropdown: true },
    { icon: 'input', label: 'Input Field' },
    { icon: 'comment', label: 'Author Comment' },
    { icon: 'book', label: 'Include Instructions' },
    { icon: 'upload', label: 'Upload Media' },
  ];

  const items = buttons ?? defaultButtons;

  return (
    <div
      className={`flex flex-wrap items-center gap-1 rounded bg-_components-background-contrast-sm p-1 w-full ${className}`}
    >
      {items.map((item, idx) => {
        if (item === 'separator') {
          return (
            <div
              key={`sep-${idx}`}
              className="mx-1 h-4 w-px bg-_components-divider-main"
            />
          );
        }
        return <ToolbarButton key={item.label} {...item} />;
      })}
    </div>
  );
};

export default FormattingToolbar; 