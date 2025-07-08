'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

// Core Tiptap Extensions
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Strike from '@tiptap/extension-strike';

// Additional Extensions
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';

// Custom Extensions and Types
import SlashCommand from './extensions/SlashCommand';
import { EditorContextValue, RichTextEditorProps } from './types';


// ----------------------
// Context
// ----------------------
const EditorContext = createContext<EditorContextValue>({ editor: null });

export const useTiptapEditor = () => useContext(EditorContext);

// ----------------------
// Main Component
// ----------------------
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content = '',
  placeholder = 'Type "/" for commands…',
  onChange,
  className = '',
  children,
}) => {
  const extensions = useMemo(
    () => [
      // --- Core Extensions (from StarterKit) ---
      Document,
      Paragraph,
      Text,
      Blockquote,
      Bold,
      BulletList,
      Code,
      CodeBlock,
      Dropcursor,
      Gapcursor,
      HardBreak,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      History,
      HorizontalRule,
      Italic,
      ListItem,
      OrderedList,
      Strike,
      // --- Additional Extensions ---
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // --- Custom Extensions ---
      SlashCommand,
    ],
    [placeholder]
  );

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
      {editor && (
        <div className={`prose max-w-none focus:outline-none ${className}`}>
          <EditorContent editor={editor} />
        </div>
      )}
    </EditorContext.Provider>
  );
};

export default RichTextEditor; 