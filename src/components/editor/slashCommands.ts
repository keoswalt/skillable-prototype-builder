import { Editor, Range } from '@tiptap/core';
import { SlashCommandItem, SlashCommandArgs } from './types';
import { 
  allCommands, 
  findCommand, 
  headingCommands, 
  listCommands, 
  blockCommands,
  basicFormattingCommands,
  tableCommands 
} from './commands';

// ============================================================================
// Slash Command Categories
// ============================================================================

export const SLASH_COMMAND_CATEGORIES = {
  TEXT: 'Text Formatting',
  HEADINGS: 'Headings',
  LISTS: 'Lists',
  BLOCKS: 'Blocks',
  TABLES: 'Tables',
  INSERT: 'Insert',
  UTILITY: 'Utility',
} as const;

// ============================================================================
// Basic Slash Commands
// ============================================================================

/**
 * Convert editor commands to slash command items
 */
export function createSlashCommandFromEditorCommand(
  editorCommand: any,
  category?: string
): SlashCommandItem {
  return {
    title: editorCommand.name,
    description: editorCommand.description,
    keywords: [editorCommand.name.toLowerCase(), ...(editorCommand.description?.toLowerCase().split(' ') || [])],
    category: category || SLASH_COMMAND_CATEGORIES.TEXT,
    command: ({ editor }: SlashCommandArgs) => {
      editorCommand.execute(editor);
    },
  };
}

/**
 * Create heading slash commands
 */
export const headingSlashCommands: SlashCommandItem[] = headingCommands.map(cmd =>
  createSlashCommandFromEditorCommand(cmd, SLASH_COMMAND_CATEGORIES.HEADINGS)
);

/**
 * Create list slash commands
 */
export const listSlashCommands: SlashCommandItem[] = listCommands.map(cmd =>
  createSlashCommandFromEditorCommand(cmd, SLASH_COMMAND_CATEGORIES.LISTS)
);

/**
 * Create block slash commands
 */
export const blockSlashCommands: SlashCommandItem[] = blockCommands.map(cmd =>
  createSlashCommandFromEditorCommand(cmd, SLASH_COMMAND_CATEGORIES.BLOCKS)
);

/**
 * Create table slash commands
 */
export const tableSlashCommands: SlashCommandItem[] = tableCommands.map(cmd =>
  createSlashCommandFromEditorCommand(cmd, SLASH_COMMAND_CATEGORIES.TABLES)
);

// ============================================================================
// Custom Slash Commands
// ============================================================================

/**
 * Insert divider slash command
 */
export const dividerSlashCommand: SlashCommandItem = {
  title: 'Divider',
  description: 'Insert a horizontal line',
  keywords: ['divider', 'line', 'hr', 'horizontal', 'separator'],
  category: SLASH_COMMAND_CATEGORIES.BLOCKS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .setNode('horizontalRule')
      .run();
  },
};

/**
 * Insert callout slash command
 */
export const calloutSlashCommand: SlashCommandItem = {
  title: 'Callout',
  description: 'Insert a callout box',
  keywords: ['callout', 'box', 'note', 'info', 'warning'],
  category: SLASH_COMMAND_CATEGORIES.BLOCKS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .insertContent('<div class="callout"><p>Callout content</p></div>')
      .run();
  },
};

/**
 * Insert image slash command
 */
export const imageSlashCommand: SlashCommandItem = {
  title: 'Image',
  description: 'Insert an image',
  keywords: ['image', 'img', 'picture', 'photo'],
  category: SLASH_COMMAND_CATEGORIES.INSERT,
  command: ({ editor, range }: SlashCommandArgs) => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setImage({ src: url })
        .run();
    }
  },
};

/**
 * Insert video slash command
 */
export const videoSlashCommand: SlashCommandItem = {
  title: 'Video',
  description: 'Insert a video',
  keywords: ['video', 'movie', 'clip'],
  category: SLASH_COMMAND_CATEGORIES.INSERT,
  command: ({ editor, range }: SlashCommandArgs) => {
    const url = window.prompt('Enter video URL:');
    if (url) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent(`<iframe src="${url}" width="100%" height="400"></iframe>`)
        .run();
    }
  },
};

/**
 * Insert code block with language slash command
 */
export const codeBlockSlashCommand: SlashCommandItem = {
  title: 'Code Block',
  description: 'Insert a code block with syntax highlighting',
  keywords: ['code', 'block', 'syntax', 'highlighting', 'programming'],
  category: SLASH_COMMAND_CATEGORIES.BLOCKS,
  command: ({ editor, range }: SlashCommandArgs) => {
    const language = window.prompt('Enter programming language (optional):', 'javascript');
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .setCodeBlock({ language: language || '' })
      .run();
  },
};

/**
 * Insert quote slash command
 */
export const quoteSlashCommand: SlashCommandItem = {
  title: 'Quote',
  description: 'Insert a blockquote',
  keywords: ['quote', 'blockquote', 'citation'],
  category: SLASH_COMMAND_CATEGORIES.BLOCKS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .setBlockquote()
      .run();
  },
};

/**
 * Insert bullet list slash command
 */
export const bulletListSlashCommand: SlashCommandItem = {
  title: 'Bullet List',
  description: 'Create a bulleted list',
  keywords: ['bullet', 'list', 'ul', 'unordered'],
  category: SLASH_COMMAND_CATEGORIES.LISTS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .toggleBulletList()
      .run();
  },
};

/**
 * Insert numbered list slash command
 */
export const numberedListSlashCommand: SlashCommandItem = {
  title: 'Numbered List',
  description: 'Create a numbered list',
  keywords: ['numbered', 'list', 'ol', 'ordered'],
  category: SLASH_COMMAND_CATEGORIES.LISTS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .toggleOrderedList()
      .run();
  },
};

/**
 * Insert task list slash command
 */
export const taskListSlashCommand: SlashCommandItem = {
  title: 'Task List',
  description: 'Create a task list',
  keywords: ['task', 'todo', 'checklist', 'checkbox'],
  category: SLASH_COMMAND_CATEGORIES.LISTS,
  command: ({ editor, range }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .toggleTaskList()
      .run();
  },
};

/**
 * Insert table slash command
 */
export const tableSlashCommand: SlashCommandItem = {
  title: 'Table',
  description: 'Insert a table',
  keywords: ['table', 'grid', 'rows', 'columns'],
  category: SLASH_COMMAND_CATEGORIES.TABLES,
  command: ({ editor, range }: SlashCommandArgs) => {
    const rows = window.prompt('Number of rows:', '3');
    const cols = window.prompt('Number of columns:', '3');
    
    if (rows && cols) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: parseInt(rows), cols: parseInt(cols), withHeaderRow: true })
        .run();
    }
  },
};

/**
 * Insert link slash command
 */
export const linkSlashCommand: SlashCommandItem = {
  title: 'Link',
  description: 'Insert a link',
  keywords: ['link', 'url', 'hyperlink'],
  category: SLASH_COMMAND_CATEGORIES.TEXT,
  command: ({ editor, range }: SlashCommandArgs) => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run();
    }
  },
};

/**
 * Clear formatting slash command
 */
export const clearFormattingSlashCommand: SlashCommandItem = {
  title: 'Clear Formatting',
  description: 'Remove all formatting from selected text',
  keywords: ['clear', 'formatting', 'remove', 'plain'],
  category: SLASH_COMMAND_CATEGORIES.UTILITY,
  command: ({ editor }: SlashCommandArgs) => {
    editor
      .chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run();
  },
};

// ============================================================================
// All Slash Commands
// ============================================================================

/**
 * All available slash commands
 */
export const allSlashCommands: SlashCommandItem[] = [
  // Headings
  ...headingSlashCommands,
  
  // Lists
  bulletListSlashCommand,
  numberedListSlashCommand,
  taskListSlashCommand,
  
  // Blocks
  dividerSlashCommand,
  calloutSlashCommand,
  codeBlockSlashCommand,
  quoteSlashCommand,
  
  // Insert
  imageSlashCommand,
  videoSlashCommand,
  tableSlashCommand,
  linkSlashCommand,
  
  // Utility
  clearFormattingSlashCommand,
];

// ============================================================================
// Slash Command Utilities
// ============================================================================

/**
 * Filter slash commands by category
 */
export function getSlashCommandsByCategory(category: string): SlashCommandItem[] {
  return allSlashCommands.filter(cmd => cmd.category === category);
}

/**
 * Search slash commands by query
 */
export function searchSlashCommands(query: string): SlashCommandItem[] {
  if (!query) return allSlashCommands;
  
  const lowerQuery = query.toLowerCase();
  return allSlashCommands.filter(cmd => {
    const searchText = [
      cmd.title,
      cmd.description,
      ...(cmd.keywords || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    
    return searchText.includes(lowerQuery);
  });
}

/**
 * Get slash commands grouped by category
 */
export function getSlashCommandsGrouped(): Record<string, SlashCommandItem[]> {
  const grouped: Record<string, SlashCommandItem[]> = {};
  
  allSlashCommands.forEach(cmd => {
    const category = cmd.category || SLASH_COMMAND_CATEGORIES.TEXT;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(cmd);
  });
  
  return grouped;
}

/**
 * Find a slash command by title
 */
export function findSlashCommand(title: string): SlashCommandItem | undefined {
  return allSlashCommands.find(cmd => cmd.title.toLowerCase() === title.toLowerCase());
}

/**
 * Execute a slash command by title
 */
export function executeSlashCommand(editor: Editor, title: string): boolean {
  const command = findSlashCommand(title);
  if (command) {
    command.command({ editor, range: editor.state.selection });
    return true;
  }
  return false;
}

/**
 * Get popular/frequently used slash commands
 */
export function getPopularSlashCommands(): SlashCommandItem[] {
  const popularTitles = [
    'Heading 1',
    'Bullet List',
    'Numbered List',
    'Table',
    'Image',
    'Link',
    'Code Block',
    'Quote',
  ];
  
  return allSlashCommands.filter(cmd => 
    popularTitles.includes(cmd.title)
  );
} 