import { supabase } from '@/lib/supabaseClient';
import { Post } from '@/lib/types';

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 100);
}

export const supabaseService = {
  /**
   * Create a new post in the database
   */
  async createPost(postData: Omit<Post, 'id' | 'slug' | 'created_at' | 'updated_at'>): Promise<Post | null> {
    try {
      const slug = generateSlug(postData.title);
      
      const { data, error } = await supabase
        .from('posts')
        .insert({
          slug,
          title: postData.title,
          content: postData.content,
          cover_url: postData.image,
          tag: postData.category,
          excerpt: postData.excerpt,
          published: postData.published ?? false,
          published_at: postData.published ? new Date().toISOString() : null,
          author: null, // Anonymous user
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        });
        return null;
      }

      return mapPostFromDatabase(data);
    } catch (err) {
      console.error('Exception creating post:', err);
      return null;
    }
  },

  /**
   * Get all posts from the database
   */
  async getPosts(): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      }

      return (data || []).map(mapPostFromDatabase);
    } catch (err) {
      console.error('Exception fetching posts:', err);
      return [];
    }
  },

  /**
   * Get a single post by ID
   */
  async getPostById(id: string): Promise<Post | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return null;
      }

      return data ? mapPostFromDatabase(data) : null;
    } catch (err) {
      console.error('Exception fetching post:', err);
      return null;
    }
  },

  /**
   * Update an existing post
   */
  async updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
    try {
      const updatePayload: any = {
        title: postData.title,
        content: postData.content,
        cover_url: postData.image,
        tag: postData.category,
        excerpt: postData.excerpt,
        published: postData.published,
        updated_at: new Date().toISOString(),
      };

      // Generate new slug if title changed
      if (postData.title) {
        updatePayload.slug = generateSlug(postData.title);
      }

      // Update published_at if publishing status changed
      if (postData.published !== undefined) {
        updatePayload.published_at = postData.published ? new Date().toISOString() : null;
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post:', error);
        return null;
      }

      return data ? mapPostFromDatabase(data) : null;
    } catch (err) {
      console.error('Exception updating post:', err);
      return null;
    }
  },

  /**
   * Delete a post
   */
  async deletePost(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting post:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Exception deleting post:', err);
      return false;
    }
  },

  /**
   * Subscribe to real-time updates (optional for future use)
   * Note: Using realtime subscriptions with the new API requires different approach
   */
  subscribeToPostChanges(_callback?: (posts: Post[]) => void) {
    // TODO: Implement realtime subscriptions using the new Supabase Realtime API
    // For now, this is a placeholder that can be called manually
    return null;
  },
};

/**
 * Map database record to Post interface
 */
function mapPostFromDatabase(record: any): Post {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    content: record.content,
    image: record.cover_url,
    category: record.tag,
    excerpt: record.excerpt,
    date: new Date(record.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    published: record.published,
    published_at: record.published_at,
    author: record.author,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}
