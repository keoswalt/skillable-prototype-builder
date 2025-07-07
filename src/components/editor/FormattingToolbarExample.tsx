/**
 * FormattingToolbarExample
 * ---------------------------------------------------
 * Demonstrates the default FormattingToolbar in action and allows toggling
 * active state on click for illustration purposes.
 */

'use client';

import React, { useState } from 'react';
import FormattingToolbar, { ToolbarButtonProps } from './FormattingToolbar';

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

  // Insert, table, AI
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
  { icon: 'camera', label: 'Screenshot' },
];

const FormattingToolbarExample: React.FC = () => {
  return <FormattingToolbar buttons={defaultButtons} />;
};

export default FormattingToolbarExample; 