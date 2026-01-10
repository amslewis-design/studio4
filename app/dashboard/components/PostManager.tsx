import dynamic from "next/dynamic";
import { BlogEditorPost } from "./BlogEditor";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostManager() {
  const [posts, setPosts] = useState<BlogEditorPost[]>([]);
  const [selected, setSelected] = useState<BlogEditorPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
    if (!error && data) setPosts(data);
    setLoading(false);
  }

  function handleSave(post: BlogEditorPost) {
    fetchPosts();
    setSelected(post);
  }
  function handlePublish(post: BlogEditorPost) {
    fetchPosts();
    setSelected(post);
  }

  return (
    <div>
      <div className="mb-8 flex gap-4 flex-wrap">
        <button
          className="bg-[var(--accent)] text-white px-4 py-2 rounded font-bold"
          onClick={() => setSelected(null)}
        >
          + New Post
        </button>
        {loading ? (
          <span className="text-gray-400 ml-4">Loading posts...</span>
        ) : (
          posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelected(post)}
              className={
                "px-4 py-2 rounded border text-sm font-bold mr-2 " +
                (selected?.id === post.id
                  ? "bg-white text-[var(--accent)] border-[var(--accent)]"
                  : "bg-neutral-800 text-white border-white/10 hover:bg-[var(--accent)] hover:text-black")
              }
            >
              {post.title || "Untitled"}{" "}
              <span className="ml-2 text-xs">[{post.published ? "published" : "draft"}]</span>
            </button>
          ))
        )}
      </div>
      {/** Dynamically loaded BlogEditor to ensure client-only rendering */}
      {DynamicBlogEditor && (
      <DynamicBlogEditor
        key={selected?.id || "new"}
        post={selected || undefined}
        onSave={handleSave}
        onPublish={handlePublish}
      />)}
    </div>
  );
}

// Dynamic import declared after component to avoid SSR
const DynamicBlogEditor = dynamic(() => import("./BlogEditor"), {
  ssr: false,
  loading: () => (
    <div className="max-w-2xl mx-auto bg-neutral-900 border border-white/10 rounded-md p-8 mt-8 text-gray-400">
      Loading editor...
    </div>
  ),
});
