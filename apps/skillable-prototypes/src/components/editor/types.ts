import { Editor, Range, Extension } from '@tiptap/core';
import { ReactNode } from 'react';

// ============================================================================
// Core Editor Types
// ============================================================================

/**
 * Context value for the Tiptap editor
 */
export interface EditorContextValue {
  editor: ReturnType<typeof import('@tiptap/react').useEditor> | null;
}

/**
 * Props for the RichTextEditor component
 */
export interface RichTextEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  onUpdate?: (editor: Editor) => void;
  className?: string;
  children?: ReactNode;
  extensions?: Extension[];
  editable?: boolean;
  autofocus?: boolean;
}

// ============================================================================
// Slash Command Types
// ============================================================================

/**
 * Represents a slash command item that can be executed
 */
export interface SlashCommandItem {
  /** Display title for the command */
  title: string;
  /** Optional description for the command */
  description?: string;
  /** Icon name for the command (from Icon registry) */
  icon?: string;
  /** Keywords for filtering/searching */
  keywords?: string[];
  /** The command function to execute */
  command: (args: SlashCommandArgs) => void;
  /** Optional category for grouping commands */
  category?: string;
  /** Whether this command should be shown in the palette */
  visible?: boolean;
}

/**
 * Arguments passed to slash command functions
 */
export interface SlashCommandArgs {
  /** The Tiptap editor instance */
  editor: Editor;
  /** The range to replace with the command result */
  range: Range;
  /** Additional context data */
  context?: Record<string, any>;
}

/**
 * Props for the SlashCommandList component
 */
export interface SlashCommandListProps {
  /** Array of available commands */
  items: SlashCommandItem[];
  /** Function to execute when a command is selected */
  command: (item: SlashCommandItem) => void;
  /** Current search query */
  query?: string;
  /** Whether the list is visible */
  visible?: boolean;
}

/**
 * Ref interface for SlashCommandList component
 */
export interface SlashCommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  selectItem: (index: number) => void;
  getSelectedIndex: () => number;
}

// ============================================================================
// Toolbar Types
// ============================================================================

/**
 * Props for individual toolbar buttons
 */
export interface ToolbarButtonProps {
  /** Icon name from the Icon registry */
  icon: import('../Icon').IconName;
  /** Accessible label and tooltip text */
  label: string;
  /** Whether to show a dropdown indicator */
  hasDropdown?: boolean;
  /** Whether the button is in active state */
  active?: boolean;
  /** Click handler for the button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional tooltip content override */
  tooltip?: string;
}

/**
 * Props for the FormattingToolbar component
 */
export interface FormattingToolbarProps {
  /** Custom list of buttons to render */
  buttons?: (ToolbarButtonProps | 'separator')[];
  /** Additional CSS classes */
  className?: string;
  /** Whether the toolbar is compact */
  compact?: boolean;
  /** Whether to show labels alongside icons */
  showLabels?: boolean;
}

// ============================================================================
// Editor Command Types
// ============================================================================

/**
 * Base interface for editor commands. Use the discriminated union EditorCommand for most cases.
 */
export interface BaseEditorCommand {
  /** Unique identifier for the command */
  id: string;
  /** Display name */
  name: string;
  /** Description of what the command does */
  description: string;
  /** Keyboard shortcut (if any) */
  shortcut?: string;
  /** Whether the command is currently available */
  isAvailable: (editor: Editor) => boolean;
  /** Whether the command is currently active */
  isActive: (editor: Editor) => boolean;
  /** Execute the command */
  execute: (editor: Editor) => void;
}

/**
 * Command for inserting content
 */
export interface InsertCommand extends BaseEditorCommand {
  type: 'insert';
  /** Content to insert */
  content: string | (() => string);
  /** Whether to replace current selection */
  replaceSelection?: boolean;
}

/**
 * Command for toggling marks/nodes
 */
export interface ToggleCommand extends BaseEditorCommand {
  type: 'toggle';
  /** The mark or node to toggle */
  target: string;
  /** Attributes to apply when toggling on */
  attributes?: Record<string, any>;
}

/**
 * Command for applying formatting
 */
export interface FormatCommand extends BaseEditorCommand {
  type: 'format';
  /** The formatting to apply */
  format: string;
  /** Attributes for the format */
  attributes?: Record<string, any>;
}

/**
 * A discriminated union of all possible editor commands.
 */
export type EditorCommand = InsertCommand | ToggleCommand | FormatCommand;

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Editor state information
 */
export interface EditorState {
  /** Whether the editor is focused */
  isFocused: boolean;
  /** Whether the editor is empty */
  isEmpty: boolean;
  /** Current selection range */
  selection: Range | null;
  /** Current content as HTML */
  content: string;
  /** Current content as JSON */
  contentJSON: any;
  /** Word count */
  wordCount: number;
  /** Character count */
  charCount: number;
}

/**
 * Autosave configuration
 */
export interface AutosaveConfig {
  /** Whether autosave is enabled */
  enabled: boolean;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Maximum save frequency in milliseconds */
  maxFrequencyMs?: number;
  /** Callback when content should be saved */
  onSave: (content: string) => void | Promise<void>;
  /** Callback when save fails */
  onError?: (error: Error) => void;
}

/**
 * Editor theme configuration
 */
export interface EditorTheme {
  /** CSS class for the editor container */
  containerClass?: string;
  /** CSS class for the content area */
  contentClass?: string;
  /** CSS class for the toolbar */
  toolbarClass?: string;
  /** CSS class for slash command palette */
  slashPaletteClass?: string;
  /** CSS class for slash command items */
  slashItemClass?: string;
  /** CSS class for active slash command item */
  slashItemActiveClass?: string;
}

// ============================================================================
// Event Types
// ============================================================================

/**
 * Editor update event
 */
export interface EditorUpdateEvent {
  /** The editor instance */
  editor: Editor;
  /** Previous content */
  previousContent: string;
  /** New content */
  newContent: string;
  /** Whether this was a user-initiated change */
  isUserChange: boolean;
  /** Timestamp of the update */
  timestamp: number;
}

/**
 * Slash command event
 */
export interface SlashCommandEvent {
  /** The triggered command */
  command: SlashCommandItem;
  /** Search query that triggered the command */
  query: string;
  /** Timestamp of the event */
  timestamp: number;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if a command is an insert command
 */
export function isInsertCommand(command: EditorCommand): command is InsertCommand {
  return command.type === 'insert';
}

/**
 * Type guard to check if a command is a toggle command
 */
export function isToggleCommand(command: EditorCommand): command is ToggleCommand {
  return command.type === 'toggle';
}

/**
 * Type guard to check if a command is a format command
 */
export function isFormatCommand(command: EditorCommand): command is FormatCommand {
  return command.type === 'format';
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a basic insert command
 */
export function createInsertCommand(
  id: string,
  name: string,
  content: string | (() => string),
  description?: string
): InsertCommand {
  return {
    id,
    name,
    description: description || `Insert ${name}`,
    type: 'insert',
    content,
    isAvailable: () => true,
    isActive: () => false,
    execute: (editor) => {
      const contentToInsert = typeof content === 'function' ? content() : content;
      editor.chain().focus().insertContent(contentToInsert).run();
    },
  };
}

/**
 * Create a toggle command for marks/nodes
 */
export function createToggleCommand(
  id: string,
  name: string,
  target: string,
  description?: string,
  attributes?: Record<string, any>
): ToggleCommand {
  return {
    id,
    name,
    description: description || `Toggle ${name}`,
    type: 'toggle',
    target,
    attributes,
    isAvailable: () => true,
    isActive: (editor) => editor.isActive(target),
    execute: (editor) => {
      editor.chain().focus().toggleMark(target, attributes).run();
    },
  };
}

/**
 * Filter slash commands based on query and visibility
 */
export function filterSlashCommands(
  commands: SlashCommandItem[],
  query: string = ''
): SlashCommandItem[] {
  return commands
    .filter((command) => command.visible !== false)
    .filter((command) => {
      if (!query) return true;
      
      const searchText = [
        command.title,
        command.description,
        ...(command.keywords || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      
      return searchText.includes(query.toLowerCase());
    });
}

/**
 * Get editor state information
 */
export function getEditorState(editor: Editor): EditorState {
  return {
    isFocused: editor.isFocused,
    isEmpty: editor.isEmpty,
    selection: editor.state.selection,
    content: editor.getHTML(),
    contentJSON: editor.getJSON(),
    wordCount: editor.storage.wordCount || 0,
    charCount: editor.storage.charCount || 0,
  };
} 