"use client";

import { useState, useCallback, useEffect, type ChangeEvent } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";

export type BlogStatus = "draft" | "published";

export type BlogEditorPost = {
  id?: string;
  slug?: string;
  title: string;
  content: string;
  tag?: string | null;
  cover_url?: string | null;
  published?: boolean;
  published_at?: string | null;
  author?: string | null;
  updated_at?: string;
};

interface BlogEditorProps {
  post?: BlogEditorPost;
  onSave?: (post: BlogEditorPost) => void;
  onPublish?: (post: BlogEditorPost) => void;
}

export default function BlogEditor({ post, onSave, onPublish }: BlogEditorProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [tags, setTags] = useState(post?.tag || "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url || "");
  const [status, setStatus] = useState<BlogStatus>(post?.published ? "published" : "draft");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatSupabaseError = useCallback((err: unknown) => {
    const anyErr = err as any;
    const message = String(anyErr?.message || "");
    const details = String(anyErr?.details || "");
    const hint = String(anyErr?.hint || "");
    const code = String(anyErr?.code || "");
    const combined = `${message} ${details} ${hint} ${code}`.toLowerCase();

    if (!combined.trim()) return "Something went wrong. Please try again.";

    if (combined.includes("row-level security") || combined.includes("rls")) {
      return "Permission denied (RLS). Make sure you're logged in and you own this post.";
    }

    if (combined.includes("jwt expired") || combined.includes("session expired")) {
      return "Your session expired. Please log in again and retry.";
    }

    if (
      combined.includes("jwt") ||
      combined.includes("not authenticated") ||
      combined.includes("missing authorization") ||
      combined.includes("invalid token")
    ) {
      return "You're not logged in. Please log in and try again.";
    }

    if (
      combined.includes("duplicate key value") ||
      combined.includes("unique constraint") ||
      combined.includes("posts_slug_key")
    ) {
      return "That slug already exists. Try changing the title and publishing again.";
    }

    if (combined.includes("null value") && combined.includes("slug")) {
      return "Title is required before saving (slug is required).";
    }

    // Default to the original message (usually best detail from PostgREST)
    return message || "Something went wrong. Please try again.";
  }, []);

  const parseTags = useCallback(() => {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [tags]);

  const buildSlug = useCallback((rawTitle: string) => {
    const base = rawTitle
      .toLowerCase()
      .trim()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    const suffix = Math.random().toString(36).slice(2, 8);
    return (base || "post") + "-" + suffix;
  }, []);

  const getAccessToken = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.access_token) {
      throw new Error("You must be logged in. Please refresh and try again.");
    }
    return data.session.access_token;
  }, []);

  const apiCreate = useCallback(async (payload: Record<string, any>) => {
    const token = await getAccessToken();
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create post');
    return json;
  }, [getAccessToken]);

  const apiUpdate = useCallback(async (slug: string, payload: Record<string, any>) => {
    const token = await getAccessToken();
    const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update post');
    return json;
  }, [getAccessToken]);

  // Debounced autodraft
  const autoDraft = useCallback(
    debounce(async (content: string) => {
      // Avoid creating rows until we have a title (slug is required in DB).
      if (!post?.id && !title) return;
      if (!title && !content && !tags) return;

      setSaving(true);
      setError(null);

      try {
        const tagArr = parseTags();

        const slug = post?.slug || buildSlug(title);
        const mapped = {
          slug,
          title,
          content,
          tag: tagArr[0] || null,
          cover_url: coverUrl || null,
          published: false,
        };

        let saved;
        if (post?.slug) {
          saved = await apiUpdate(post.slug, mapped);
        } else {
          saved = await apiCreate(mapped);
        }

        if (onSave && saved) onSave(saved);
      } catch (e: any) {
        setError(formatSupabaseError(e));
      } finally {
        setSaving(false);
      }
    }, 1200),
    [title, tags, coverUrl, post, onSave, parseTags, buildSlug, apiCreate, apiUpdate, formatSupabaseError]
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
    setSuccess(null);

    try {
      if (!title) throw new Error("Title is required.");

      const tagArr = parseTags();

      const slug = post?.slug || buildSlug(title);
      const mapped = {
        slug,
        title,
        content: editor?.getHTML() || "",
        tag: tagArr[0] || null,
        cover_url: coverUrl || null,
        published: false,
      };

      let saved;
      if (post?.slug) {
        saved = await apiUpdate(post.slug, mapped);
      } else {
        saved = await apiCreate(mapped);
      }

      setSuccess("Draft saved");
      if (onSave && saved) onSave(saved);
    } catch (e: any) {
      setError(formatSupabaseError(e));
    } finally {
      setSaving(false);
    }
  };

  // Publish
  const handlePublish = async () => {
    setPublishing(true);
    setError(null);
    setSuccess(null);

    try {
      if (!title) throw new Error("Title is required.");

      const tagArr = parseTags();

      const slug = post?.slug || buildSlug(title);
      const mapped = {
        slug,
        title,
        content: editor?.getHTML() || "",
        tag: tagArr[0] || null,
        cover_url: coverUrl || null,
        published: true,
      };

      let saved;
      if (post?.slug) {
        saved = await apiUpdate(post.slug, mapped);
      } else {
        saved = await apiCreate(mapped);
      }

      setSuccess("Post published");
      setStatus("published");
      if (onPublish && saved) onPublish(saved);
    } catch (e: any) {
      setError(formatSupabaseError(e));
    } finally {
      setPublishing(false);
    }
  };

  // Image upload
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError(null);
    setSuccess(null);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(fileName, file, { upsert: true });
    if (uploadError) {
      setError(formatSupabaseError(uploadError));
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
