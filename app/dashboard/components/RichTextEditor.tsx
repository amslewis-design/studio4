'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import React, { useState, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes (e.g., when editing a post)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return <div className="text-gray-400">Loading editor...</div>;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  
  const setHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const setTextAlign = (align: 'left' | 'center' | 'right' | 'justify') => {
    editor.chain().focus().setTextAlign(align).run();
  };

  const handleAddLink = () => {
    if (linkUrl.trim()) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddLink();
    } else if (e.key === 'Escape') {
      setShowLinkDialog(false);
      setLinkUrl('');
    }
  };

  const buttonClass = (isActive: boolean) =>
    `px-3 py-2 text-xs uppercase tracking-widest font-bold transition-colors rounded-sm ${
      isActive
        ? 'bg-[#FC7CA4] text-black'
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
    }`;

  const headingButtonClass = (level: 1 | 2 | 3) => {
    const isActive = editor.isActive('heading', { level });
    return `px-3 py-2 text-xs uppercase tracking-widest font-bold transition-colors rounded-sm ${
      isActive
        ? 'bg-[#FC7CA4] text-black ring-2 ring-[#FC7CA4]/50'
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
    }`;
  };

  return (
    <div className="space-y-4">
      <style>{`
        .ProseMirror a {
          color: #FC7CA4;
          text-decoration: underline;
          text-decoration-color: #FC7CA4;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
          pointer-events: none;
          cursor: text;
        }
        .ProseMirror a:hover {
          color: #FC7CA4;
        }
      `}</style>
      {/* Toolbar */}
      <div className="bg-black/40 border border-white/10 p-4 rounded-sm flex flex-wrap gap-2">
        {/* Text Styling */}
        <button
          onClick={toggleBold}
          className={buttonClass(editor.isActive('bold'))}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={toggleItalic}
          className={buttonClass(editor.isActive('italic'))}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          onClick={toggleUnderline}
          className={buttonClass(editor.isActive('underline'))}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>

        <div className="w-px bg-white/10" />

        {/* Headings */}
        <button
          onClick={() => setHeading(1)}
          className={headingButtonClass(1)}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => setHeading(2)}
          className={headingButtonClass(2)}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => setHeading(3)}
          className={headingButtonClass(3)}
          title="Heading 3"
        >
          H3
        </button>

        <div className="w-px bg-white/10" />

        {/* Lists */}
        <button
          onClick={toggleBulletList}
          className={buttonClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={toggleOrderedList}
          className={buttonClass(editor.isActive('orderedList'))}
          title="Ordered List"
        >
          1. List
        </button>

        <div className="w-px bg-white/10" />

        {/* Alignment */}
        <button
          onClick={() => setTextAlign('left')}
          className={buttonClass(editor.isActive({ textAlign: 'left' }))}
          title="Align Left"
        >
          ⬅ Left
        </button>
        <button
          onClick={() => setTextAlign('center')}
          className={buttonClass(editor.isActive({ textAlign: 'center' }))}
          title="Align Center"
        >
          ⬍ Center
        </button>
        <button
          onClick={() => setTextAlign('right')}
          className={buttonClass(editor.isActive({ textAlign: 'right' }))}
          title="Align Right"
        >
          Right ➡
        </button>
        <button
          onClick={() => setTextAlign('justify')}
          className={buttonClass(editor.isActive({ textAlign: 'justify' }))}
          title="Justify"
        >
          ⬌ Justify
        </button>

        <div className="w-px bg-white/10" />

        {/* Links */}
        <div className="relative">
          <button
            onClick={() => setShowLinkDialog(!showLinkDialog)}
            className={buttonClass(editor.isActive('link'))}
            title="Add Link"
          >
            🔗 Link
          </button>
          {showLinkDialog && (
            <div className="absolute top-full mt-2 left-0 bg-black border border-white/20 rounded-sm p-3 z-50 min-w-80 shadow-lg">
              <p className="text-xs text-gray-400 mb-2">Enter URL:</p>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://example.com"
                className="w-full bg-white/5 border border-white/10 p-2 text-sm text-white rounded-sm outline-none focus:border-[#FC7CA4] mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddLink}
                  className="flex-1 bg-[#FC7CA4] text-black px-2 py-1.5 text-xs uppercase font-bold rounded-sm hover:bg-[#FC7CA4]/90 transition-colors"
                >
                  Apply Link
                </button>
                <button
                  onClick={handleRemoveLink}
                  className="flex-1 bg-white/5 text-gray-400 px-2 py-1.5 text-xs uppercase font-bold rounded-sm hover:bg-white/10 transition-colors"
                >
                  Remove Link
                </button>
                <button
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                  }}
                  className="flex-1 bg-white/5 text-gray-400 px-2 py-1.5 text-xs uppercase font-bold rounded-sm hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="bg-black/40 border border-white/10 rounded-sm prose prose-invert max-w-none">
        <EditorContent
          editor={editor}
          className="p-4 text-white outline-none focus:outline-none min-h-96"
          style={{
            color: '#e5e7eb',
          }}
        />
      </div>

      {/* Info Text */}
      <p className="text-xs text-gray-500">
        Tip: Use keyboard shortcuts like Ctrl+B for bold, Ctrl+I for italic. Your content is auto-saved as HTML.
      </p>
    </div>
  );
}
