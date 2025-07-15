import { Editor } from '@tiptap/core';
import { 
  EditorCommand, 
  InsertCommand, 
  ToggleCommand, 
  FormatCommand,
  createInsertCommand,
  createToggleCommand 
} from '../types';

// ============================================================================
// Basic Formatting Commands
// ============================================================================

/**
 * Bold formatting command
 */
export const boldCommand: ToggleCommand = createToggleCommand(
  'bold',
  'Bold',
  'bold',
  'Make text bold'
);

/**
 * Italic formatting command
 */
export const italicCommand: ToggleCommand = createToggleCommand(
  'italic',
  'Italic',
  'italic',
  'Make text italic'
);

/**
 * Strikethrough formatting command
 */
export const strikethroughCommand: ToggleCommand = createToggleCommand(
  'strikethrough',
  'Strikethrough',
  'strike',
  'Add strikethrough to text'
);

/**
 * Underline formatting command
 */
export const underlineCommand: ToggleCommand = createToggleCommand(
  'underline',
  'Underline',
  'underline',
  'Add underline to text'
);

/**
 * Code inline formatting command
 */
export const codeInlineCommand: ToggleCommand = createToggleCommand(
  'codeInline',
  'Inline Code',
  'code',
  'Format text as inline code'
);

// ============================================================================
// Heading Commands
// ============================================================================

/**
 * Create a heading command for a specific level
 */
export function createHeadingCommand(level: 1 | 2 | 3 | 4 | 5 | 6): EditorCommand {
  return {
    id: `heading-${level}`,
    name: `Heading ${level}`,
    description: `Create a level ${level} heading`,
    type: 'format',
    format: 'heading',
    attributes: { level },
    isAvailable: () => true,
    isActive: (editor) => editor.isActive('heading', { level }),
    execute: (editor) => {
      editor.chain().focus().toggleHeading({ level }).run();
    },
  };
}

export const heading1Command = createHeadingCommand(1);
export const heading2Command = createHeadingCommand(2);
export const heading3Command = createHeadingCommand(3);
export const heading4Command = createHeadingCommand(4);
export const heading5Command = createHeadingCommand(5);
export const heading6Command = createHeadingCommand(6);

// ============================================================================
// List Commands
// ============================================================================

/**
 * Bullet list command
 */
export const bulletListCommand: ToggleCommand = createToggleCommand(
  'bulletList',
  'Bullet List',
  'bulletList',
  'Create a bulleted list'
);

/**
 * Ordered list command
 */
export const orderedListCommand: ToggleCommand = createToggleCommand(
  'orderedList',
  'Numbered List',
  'orderedList',
  'Create a numbered list'
);

/**
 * Task list command
 */
export const taskListCommand: ToggleCommand = createToggleCommand(
  'taskList',
  'Task List',
  'taskList',
  'Create a task list'
);

// ============================================================================
// Block Commands
// ============================================================================

/**
 * Paragraph command
 */
export const paragraphCommand: EditorCommand = {
  id: 'paragraph',
  name: 'Paragraph',
  description: 'Convert to paragraph',
  type: 'format',
  format: 'paragraph',
  isAvailable: () => true,
  isActive: (editor) => editor.isActive('paragraph'),
  execute: (editor) => {
    editor.chain().focus().setParagraph().run();
  },
};

/**
 * Blockquote command
 */
export const blockquoteCommand: ToggleCommand = createToggleCommand(
  'blockquote',
  'Blockquote',
  'blockquote',
  'Create a blockquote'
);

/**
 * Code block command
 */
export const codeBlockCommand: ToggleCommand = createToggleCommand(
  'codeBlock',
  'Code Block',
  'codeBlock',
  'Create a code block'
);

/**
 * Horizontal rule command
 */
export const horizontalRuleCommand: InsertCommand = createInsertCommand(
  'horizontalRule',
  'Horizontal Rule',
  '<hr>',
  'Insert a horizontal rule'
);

// ============================================================================
// Link Commands
// ============================================================================

/**
 * Link command
 */
export const linkCommand: EditorCommand = {
  id: 'link',
  name: 'Link',
  description: 'Add or edit link',
  type: 'format',
  format: 'link',
  isAvailable: (editor) => editor.isActive('link'),
  isActive: (editor) => editor.isActive('link'),
  execute: (editor) => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  },
};

/**
 * Remove link command
 */
export const removeLinkCommand: EditorCommand = {
  id: 'removeLink',
  name: 'Remove Link',
  description: 'Remove link formatting',
  type: 'format',
  format: 'link',
  isAvailable: (editor) => editor.isActive('link'),
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().unsetLink().run();
  },
};

// ============================================================================
// Table Commands
// ============================================================================

/**
 * Insert table command
 */
export const insertTableCommand: InsertCommand = createInsertCommand(
  'insertTable',
  'Insert Table',
  () => {
    const rows = window.prompt('Number of rows:', '3');
    const cols = window.prompt('Number of columns:', '3');
    if (rows && cols) {
      return `<table><tbody>${Array(parseInt(rows))
        .fill('<tr>')
        .map(() => `<td>Cell</td>`)
        .join('')}</tbody></table>`;
    }
    return '';
  },
  'Insert a table'
);

/**
 * Add table row command
 */
export const addTableRowCommand: EditorCommand = {
  id: 'addTableRow',
  name: 'Add Row',
  description: 'Add a new row to the table',
  type: 'format',
  format: 'table',
  isAvailable: (editor) => editor.isActive('table'),
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().addRowAfter().run();
  },
};

/**
 * Add table column command
 */
export const addTableColumnCommand: EditorCommand = {
  id: 'addTableColumn',
  name: 'Add Column',
  description: 'Add a new column to the table',
  type: 'format',
  format: 'table',
  isAvailable: (editor) => editor.isActive('table'),
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().addColumnAfter().run();
  },
};

// ============================================================================
// Indentation Commands
// ============================================================================

/**
 * Increase indent command
 */
export const increaseIndentCommand: EditorCommand = {
  id: 'increaseIndent',
  name: 'Increase Indent',
  description: 'Increase text indentation',
  type: 'format',
  format: 'indent',
  isAvailable: () => true,
  isActive: () => false,
  execute: (editor) => {
    (editor.chain().focus() as any).indent().run();
  },
};

/**
 * Decrease indent command
 */
export const decreaseIndentCommand: EditorCommand = {
  id: 'decreaseIndent',
  name: 'Decrease Indent',
  description: 'Decrease text indentation',
  type: 'format',
  format: 'indent',
  isAvailable: () => true,
  isActive: () => false,
  execute: (editor) => {
    (editor.chain().focus() as any).outdent().run();
  },
};

// ============================================================================
// Text Alignment Commands
// ============================================================================

/**
 * Create text alignment command
 */
export function createTextAlignCommand(align: 'left' | 'center' | 'right' | 'justify'): EditorCommand {
  return {
    id: `textAlign-${align}`,
    name: `Align ${align.charAt(0).toUpperCase() + align.slice(1)}`,
    description: `Align text to the ${align}`,
    type: 'format',
    format: 'textAlign',
    attributes: { align },
    isAvailable: () => true,
    isActive: (editor) => editor.isActive({ textAlign: align }),
    execute: (editor) => {
      editor.chain().focus().setTextAlign(align).run();
    },
  };
}

export const textAlignLeftCommand = createTextAlignCommand('left');
export const textAlignCenterCommand = createTextAlignCommand('center');
export const textAlignRightCommand = createTextAlignCommand('right');
export const textAlignJustifyCommand = createTextAlignCommand('justify');

// ============================================================================
// Utility Commands
// ============================================================================

/**
 * Clear formatting command
 */
export const clearFormattingCommand: EditorCommand = {
  id: 'clearFormatting',
  name: 'Clear Formatting',
  description: 'Remove all formatting from selected text',
  type: 'format',
  format: 'clear',
  isAvailable: () => true,
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  },
};

/**
 * Select all command
 */
export const selectAllCommand: EditorCommand = {
  id: 'selectAll',
  name: 'Select All',
  description: 'Select all content',
  shortcut: 'Ctrl+A',
  type: 'format',
  format: 'select',
  isAvailable: () => true,
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().selectAll().run();
  },
};

/**
 * Undo command
 */
export const undoCommand: EditorCommand = {
  id: 'undo',
  name: 'Undo',
  description: 'Undo last action',
  shortcut: 'Ctrl+Z',
  type: 'format',
  format: 'undo',
  isAvailable: (editor) => editor.can().undo(),
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().undo().run();
  },
};

/**
 * Redo command
 */
export const redoCommand: EditorCommand = {
  id: 'redo',
  name: 'Redo',
  description: 'Redo last undone action',
  shortcut: 'Ctrl+Y',
  type: 'format',
  format: 'redo',
  isAvailable: (editor) => editor.can().redo(),
  isActive: () => false,
  execute: (editor) => {
    editor.chain().focus().redo().run();
  },
};

// ============================================================================
// Command Collections
// ============================================================================

/**
 * All basic formatting commands
 */
export const basicFormattingCommands: EditorCommand[] = [
  boldCommand,
  italicCommand,
  strikethroughCommand,
  underlineCommand,
  codeInlineCommand,
];

/**
 * All heading commands
 */
export const headingCommands: EditorCommand[] = [
  heading1Command,
  heading2Command,
  heading3Command,
  heading4Command,
  heading5Command,
  heading6Command,
];

/**
 * All list commands
 */
export const listCommands: EditorCommand[] = [
  bulletListCommand,
  orderedListCommand,
  taskListCommand,
];

/**
 * All block commands
 */
export const blockCommands: EditorCommand[] = [
  paragraphCommand,
  blockquoteCommand,
  codeBlockCommand,
  horizontalRuleCommand,
];

/**
 * All text alignment commands
 */
export const textAlignCommands: EditorCommand[] = [
  textAlignLeftCommand,
  textAlignCenterCommand,
  textAlignRightCommand,
  textAlignJustifyCommand,
];

/**
 * All table commands
 */
export const tableCommands: EditorCommand[] = [
  insertTableCommand,
  addTableRowCommand,
  addTableColumnCommand,
];

/**
 * All utility commands
 */
export const utilityCommands: EditorCommand[] = [
  clearFormattingCommand,
  selectAllCommand,
  undoCommand,
  redoCommand,
];

/**
 * All available commands
 */
export const allCommands: EditorCommand[] = [
  ...basicFormattingCommands,
  ...headingCommands,
  ...listCommands,
  ...blockCommands,
  ...textAlignCommands,
  ...tableCommands,
  ...utilityCommands,
];

// ============================================================================
// Command Utilities
// ============================================================================

/**
 * Get commands that are currently available for the editor
 */
export function getAvailableCommands(editor: Editor): EditorCommand[] {
  return allCommands.filter(command => command.isAvailable(editor));
}

/**
 * Get commands that are currently active in the editor
 */
export function getActiveCommands(editor: Editor): EditorCommand[] {
  return allCommands.filter(command => command.isActive(editor));
}

/**
 * Find a command by ID
 */
export function findCommand(id: string): EditorCommand | undefined {
  return allCommands.find(command => command.id === id);
}

/**
 * Execute a command by ID
 */
export function executeCommand(editor: Editor, id: string): boolean {
  const command = findCommand(id);
  if (command && command.isAvailable(editor)) {
    command.execute(editor);
    return true;
  }
  return false;
} 