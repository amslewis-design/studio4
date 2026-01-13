'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
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

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const buttonClass = (isActive: boolean) =>
    `px-3 py-2 text-xs uppercase tracking-widest font-bold transition-colors rounded-sm ${
      isActive
        ? 'bg-[#FC7CA4] text-black'
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="space-y-4">
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
          className={buttonClass(editor.isActive('heading', { level: 1 }))}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => setHeading(2)}
          className={buttonClass(editor.isActive('heading', { level: 2 }))}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => setHeading(3)}
          className={buttonClass(editor.isActive('heading', { level: 3 }))}
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
        <button
          onClick={addLink}
          className={buttonClass(editor.isActive('link'))}
          title="Add Link"
        >
          🔗 Link
        </button>
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
