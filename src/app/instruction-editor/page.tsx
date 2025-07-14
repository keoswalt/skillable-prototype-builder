'use client';

import { useState } from 'react';
import PrimaryNav from '@/components/navigation/PrimaryNav';
import FormattingToolbar from '@/components/editor/FormattingToolbar';

const InstructionEditorPage = () => {
  const [content, setContent] = useState<string>('@lab.Title\n');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation */}
      <PrimaryNav />

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor pane */}
        <div className="flex w-1/2 flex-col border-r border-_components-divider-main">
          {/* Toolbar */}
          <div className="border-b border-_components-divider-main p-2">
            <FormattingToolbar />
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-_components-background-default p-4 font-mono text-_components-text-primary focus:outline-none"
          />
        </div>

        {/* Preview pane */}
        <div className="flex w-1/2 flex-col">
          <div className="border-b border-_components-divider-main px-4 py-2">
            <h2 className="font-headline text-heading-sm text-_components-text-primary">
              Preview
            </h2>
          </div>
          <div className="prose flex-1 overflow-auto p-4">
            {content.split('\n').map((line, idx) => (
              <p key={idx} className="whitespace-pre-wrap break-words">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionEditorPage; 