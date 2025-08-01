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

import React, { useMemo } from 'react';
import { Icon, Icons, IconName } from '../Icon';
import Tooltip from '../info/Tooltip';
import { useTiptapEditor } from './RichTextEditor';
import { ToolbarButtonProps, FormattingToolbarProps } from './types';

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon,
  label,
  hasDropdown = false,
  active = false,
  onClick,
}) => {
  const baseClasses = `relative inline-flex h-8 min-w-8 px-2 items-center justify-center rounded transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-main`;
  const stateClasses = active
    ? 'bg-primary-main text-primary-contrast'
    : 'text-_components-text-secondary hover:bg-primary-soft hover:text-primary-contrast';

  return (
    <Tooltip content={label} direction="bottom">
      <button
        type="button"
        aria-label={label}
        className={`${baseClasses} ${stateClasses}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-center w-full h-full gap-1">
          <Icon icon={Icons[icon]} size={16} strokeWidth={1.8} />
          {hasDropdown && (
            <Icon
              icon={Icons['chevronDown']}
              size={10}
              className="relative"
              strokeWidth={2}
            />
          )}
        </div>
      </button>
    </Tooltip>
  );
};

export const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  buttons,
  className = '',
}) => {
  const { editor } = useTiptapEditor();

  const defaultButtons: (ToolbarButtonProps | 'separator')[] = useMemo(() => {
    return [
      // Basic formatting
      {
        icon: 'bold',
        label: 'Bold',
        active: !!editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        icon: 'italic',
        label: 'Italic',
        active: !!editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        icon: 'strikethrough',
        label: 'Strikethrough',
        active: !!editor?.isActive('strike'),
        onClick: () => editor?.chain().focus().toggleStrike().run(),
      },
      'separator',

      // Headings & blocks
      { icon: 'heading', label: 'Heading', hasDropdown: true },
      { icon: 'layout', label: 'Blocks', hasDropdown: true },
      { icon: 'link', label: 'Link' },
      { icon: 'code', label: 'Code', hasDropdown: true },
      'separator',

      // Lists & indent
      {
        icon: 'list',
        label: 'Bulleted List',
        active: !!editor?.isActive('bulletList'),
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
      },
      {
        icon: 'listOrdered',
        label: 'Numbered List',
        active: !!editor?.isActive('orderedList'),
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      },
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
  }, [editor]);

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