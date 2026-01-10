"use client";

import { useState, useCallback, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";

export type BlogStatus = "draft" | "published";

export type BlogEditorPost = {
  id?: string;
  title: string;
  content: string;
  // Database currently stores a single tag (text). We'll store
  // a single comma-split value and map it appropriately on write.
  tags?: string[];
  cover_url?: string;
  status: BlogStatus;
  updated_at?: string;
};


interface BlogEditorProps {
  post?: BlogEditorPost; // If editing, pass post
  onSave?: (post: BlogEditorPost) => void;
  onPublish?: (post: BlogEditorPost) => void;
}

export default function BlogEditor({ post, onSave, onPublish }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url || "");
  const [status, setStatus] = useState<BlogStatus>(post?.status || "draft");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debounced autodraft
  const autoDraft = useCallback(
    debounce(async (content: string) => {
      if (!title && !content && !tags) return;
      setSaving(true);
      setError(null);
      const tagArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const payload: BlogEditorPost = {
        ...post,
        title,
        content,
        tags: tagArr,
        cover_url: coverUrl,
        status: "draft",
      };
      const mapped = {
        ...payload,
        tag: (payload.tags && payload.tags[0]) || null,
        published: false,
        published_at: null,
      } as any;
      let res;
      if (post?.id) {
        res = await supabase
          .from("posts")
          .update(mapped)
          .eq("id", post.id)
          .select();
      } else {
        res = await supabase
          .from("posts")
          .insert([mapped])
          .select();
      }
      if (res.error) setError(res.error.message);
      setSaving(false);
      if (onSave && res.data && res.data[0]) onSave(res.data[0]);
    }, 1200),
    [title, tags, coverUrl, post, onSave]
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: mounted ? post?.content || "" : "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      if (mounted) autoDraft(editor.getHTML());
    },
  });

  // Save (manual)
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const tagArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
    const payload: BlogEditorPost = {
      ...post,
      title,
      content: editor?.getHTML() || "",
      tags: tagArr,
      cover_url: coverUrl,
      status: "draft",
    };
    const mapped = {
      ...payload,
      tag: (payload.tags && payload.tags[0]) || null,
      published: false,
      published_at: null,
    } as any;
    let res;
    if (post?.id) {
      res = await supabase
        .from("posts")
        .update(mapped)
        .eq("id", post.id)
        .select();
    } else {
      res = await supabase
        .from("posts")
        .insert([mapped])
        .select();
    }
    setSaving(false);
    if (res.error) setError(res.error.message);
    else {
      setSuccess("Draft saved");
      if (onSave && res.data && res.data[0]) onSave(res.data[0]);
    }
  };

  // Publish
  const handlePublish = async () => {
    setPublishing(true);
    setError(null);
    const tagArr = tags.split(",").map((t) => t.trim()).filter(Boolean);
    const payload: BlogEditorPost = {
      ...post,
      title,
      content: editor?.getHTML() || "",
      tags: tagArr,
      cover_url: coverUrl,
      status: "published",
    };
    const mapped = {
      ...payload,
      tag: (payload.tags && payload.tags[0]) || null,
      published: true,
      published_at: new Date().toISOString(),
    } as any;
    let res;
    if (post?.id) {
      res = await supabase
        .from("posts")
        .update(mapped)
        .eq("id", post.id)
        .select();
    } else {
      res = await supabase
        .from("posts")
        .insert([mapped])
        .select();
    }
    setPublishing(false);
    if (res.error) setError(res.error.message);
    else {
      setSuccess("Post published");
      setStatus("published");
      if (onPublish && res.data && res.data[0]) onPublish(res.data[0]);
    }
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError(null);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(fileName, file, { upsert: true });
    if (uploadError) {
      setError(uploadError.message);
      setImageUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage
      .from("blog-covers")
      .getPublicUrl(fileName);
    setCoverUrl(urlData.publicUrl);
    setImageUploading(false);
  };

  // UI
  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 border border-white/10 rounded-md p-8 mt-8">
      <div className="mb-6">
        <input
          className="w-full bg-black/40 border border-white/10 p-4 text-xl font-bold mb-2 outline-none focus:border-[var(--accent)] transition-colors duration-300"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full bg-black/40 border border-white/10 p-2 text-sm mb-2 outline-none focus:border-[var(--accent)] transition-colors duration-300"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex items-center gap-4 mb-2">
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={imageUploading} />
          {coverUrl && (
            <Image src={coverUrl} alt="Cover" width={80} height={48} className="rounded" />
          )}
          {imageUploading && <span className="text-xs text-gray-400">Uploading...</span>}
        </div>
      </div>
      <div className="mb-6">
        {mounted ? (
          <EditorContent editor={editor} className="bg-black/40 border border-white/10 rounded p-4 min-h-[200px] text-white" />
        ) : (
          <div className="bg-black/40 border border-white/10 rounded p-4 min-h-[200px] text-gray-400">Loading editor...</div>
        )}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--accent)] text-white px-6 py-3 rounded font-bold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={handlePublish}
          disabled={publishing || !title || !editor?.getHTML()}
          className="bg-green-600 text-white px-6 py-3 rounded font-bold disabled:opacity-50"
        >
          {publishing ? "Publishing..." : status === "published" ? "Published" : "Publish"}
        </button>
      </div>
      {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
      {success && <div className="mt-4 text-green-400 text-sm">{success}</div>}
    </div>
  );
}

// Debounce util
function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}
