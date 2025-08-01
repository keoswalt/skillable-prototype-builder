// ============================================================================
// Core Components
// ============================================================================

export { default as RichTextEditor } from './RichTextEditor';
export { default as FormattingToolbar } from './FormattingToolbar';
export { default as InstructionsEditorHeader } from './InstructionsEditorHeader';
export { default as InstructionsEditorFooter } from './InstructionsEditorFooter';

// ============================================================================
// Extensions
// ============================================================================

export { default as SlashCommand } from './extensions/SlashCommand';
export { default as SlashCommandList } from './extensions/SlashCommandList';

// ============================================================================
// Types
// ============================================================================

export type {
  // Core Editor Types
  EditorContextValue,
  RichTextEditorProps,
  
  // Slash Command Types
  SlashCommandItem,
  SlashCommandArgs,
  SlashCommandListProps,
  SlashCommandListRef,
  
  // Toolbar Types
  ToolbarButtonProps,
  FormattingToolbarProps,
  
  // Editor Command Types
  EditorCommand,
  InsertCommand,
  ToggleCommand,
  FormatCommand,
  
  // Utility Types
  EditorState,
  AutosaveConfig,
  EditorTheme,
  
  // Event Types
  EditorUpdateEvent,
  SlashCommandEvent,
} from './types';

// ============================================================================
// Type Guards
// ============================================================================

export {
  isInsertCommand,
  isToggleCommand,
  isFormatCommand,
} from './types';

// ============================================================================
// Utility Functions
// ============================================================================

export {
  createInsertCommand,
  createToggleCommand,
  filterSlashCommands,
  getEditorState,
} from './types';

// ============================================================================
// Editor Commands
// ============================================================================

export {
  // Basic Formatting Commands
  boldCommand,
  italicCommand,
  strikethroughCommand,
  underlineCommand,
  codeInlineCommand,
  
  // Heading Commands
  heading1Command,
  heading2Command,
  heading3Command,
  heading4Command,
  heading5Command,
  heading6Command,
  createHeadingCommand,
  
  // List Commands
  bulletListCommand,
  orderedListCommand,
  taskListCommand,
  
  // Block Commands
  paragraphCommand,
  blockquoteCommand,
  codeBlockCommand,
  horizontalRuleCommand,
  
  // Link Commands
  linkCommand,
  removeLinkCommand,
  
  // Table Commands
  insertTableCommand,
  addTableRowCommand,
  addTableColumnCommand,
  
  // Indentation Commands
  increaseIndentCommand,
  decreaseIndentCommand,
  
  // Text Alignment Commands
  textAlignLeftCommand,
  textAlignCenterCommand,
  textAlignRightCommand,
  textAlignJustifyCommand,
  createTextAlignCommand,
  
  // Utility Commands
  clearFormattingCommand,
  selectAllCommand,
  undoCommand,
  redoCommand,
  
  // Command Collections
  basicFormattingCommands,
  headingCommands,
  listCommands,
  blockCommands,
  textAlignCommands,
  tableCommands,
  utilityCommands,
  allCommands,
  
  // Command Utilities
  getAvailableCommands,
  getActiveCommands,
  findCommand,
  executeCommand,
} from './commands';

// ============================================================================
// Slash Commands
// ============================================================================

export {
  SLASH_COMMAND_CATEGORIES,
  createSlashCommandFromEditorCommand,
  headingSlashCommands,
  listSlashCommands,
  blockSlashCommands,
  tableSlashCommands,
  
  // Custom Slash Commands
  dividerSlashCommand,
  calloutSlashCommand,
  imageSlashCommand,
  videoSlashCommand,
  codeBlockSlashCommand,
  quoteSlashCommand,
  bulletListSlashCommand,
  numberedListSlashCommand,
  taskListSlashCommand,
  tableSlashCommand,
  linkSlashCommand,
  clearFormattingSlashCommand,
  
  // All Slash Commands
  allSlashCommands,
  
  // Slash Command Utilities
  getSlashCommandsByCategory,
  searchSlashCommands,
  getSlashCommandsGrouped,
  findSlashCommand,
  executeSlashCommand,
  getPopularSlashCommands,
} from './slashCommands';

// ============================================================================
// Hooks
// ============================================================================

export { useTiptapEditor } from './RichTextEditor'; 