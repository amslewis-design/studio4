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
          language: postData.language || 'es',
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
        console.error('Error fetching posts:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        });
        return [];
      }

      return (data || []).map(mapPostFromDatabase);
    } catch (err) {
      console.error('Exception fetching posts:', err);
      return [];
    }
  },

  /**
   * Get posts by language
   */
  async getPostsByLanguage(language: 'es' | 'en'): Promise<Post[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('language', language)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts by language:', error);
        return [];
      }

      return (data || []).map(mapPostFromDatabase);
    } catch (err) {
      console.error('Exception fetching posts by language:', err);
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
      const updatePayload: any = {};
      const resultData: any = { id };

      // Only include defined fields and track what we're updating
      if (postData.title !== undefined) {
        updatePayload.title = postData.title;
        const newSlug = generateSlug(postData.title);
        updatePayload.slug = newSlug;
        resultData.title = postData.title;
        resultData.slug = newSlug;
      }
      if (postData.content !== undefined) {
        updatePayload.content = postData.content;
        resultData.content = postData.content;
      }
      if (postData.image !== undefined) {
        updatePayload.cover_url = postData.image;
        resultData.image = postData.image;
      }
      if (postData.category !== undefined) {
        updatePayload.tag = postData.category;
        resultData.category = postData.category;
      }
      if (postData.excerpt !== undefined) {
        updatePayload.excerpt = postData.excerpt;
        resultData.excerpt = postData.excerpt;
      }
      if (postData.published !== undefined) {
        updatePayload.published = postData.published;
        const publishedAt = postData.published ? new Date().toISOString() : null;
        updatePayload.published_at = publishedAt;
        resultData.published = postData.published;
        resultData.published_at = publishedAt;
      }
      if (postData.language !== undefined) {
        updatePayload.language = postData.language;
        resultData.language = postData.language;
      }
      
      const now = new Date().toISOString();
      updatePayload.updated_at = now;
      resultData.updated_at = now;

      console.log('Updating post with payload:', { id, updatePayload });

      // Do the UPDATE operation
      const { error: updateError } = await supabase
        .from('posts')
        .update(updatePayload)
        .eq('id', id);

      if (updateError) {
        console.error('Error during update:', { code: updateError.code, message: updateError.message });
        return null;
      }

      console.log('Update operation completed successfully');

      // Try to fetch the updated post, but if it fails due to RLS, return constructed object
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        console.log('Successfully fetched updated post:', data);
        return mapPostFromDatabase(data);
      }

      // If fetch failed (likely due to RLS on unpublished posts), return the constructed result
      if (fetchError) {
        console.log('Fetch failed (likely RLS), returning constructed result:', { code: fetchError.code });
        return {
          id: resultData.id,
          title: resultData.title || postData.title || '',
          slug: resultData.slug || '',
          content: resultData.content || postData.content || '',
          image: resultData.image || postData.image || '',
          category: resultData.category || postData.category || '',
          excerpt: resultData.excerpt || postData.excerpt || '',
          published: resultData.published !== undefined ? resultData.published : postData.published,
          published_at: resultData.published_at || postData.published_at,
          created_at: postData.created_at,
          updated_at: resultData.updated_at,
        } as Post;
      }

      return null;
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
    language: record.language || 'es',
  };
}
/**
 * Save asset metadata to Supabase
 * Tracks Cloudinary assets for future reference and organization
 */
export const saveAssetMetadata = async (
  publicId: string,
  metadata: {
    name: string;
    url: string;
    type: string;
    version: number;
    folder?: string;
  }
): Promise<boolean> => {
  try {
    // Create cloudinary_assets table if it doesn't exist
    // This allows us to track which assets are being used
    const { error } = await supabase
      .from('cloudinary_assets')
      .insert({
        cloudinary_id: publicId,
        name: metadata.name,
        url: metadata.url,
        type: metadata.type,
        version: metadata.version,
        folder: metadata.folder,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving asset metadata:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveAssetMetadata:', error);
    return false;
  }
};

/**
 * Get asset metadata from Supabase
 */
export const getAssetMetadata = async (publicId: string) => {
  try {
    const { data, error } = await supabase
      .from('cloudinary_assets')
      .select('*')
      .eq('cloudinary_id', publicId)
      .single();

    if (error) {
      console.error('Error fetching asset metadata:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getAssetMetadata:', error);
    return null;
  }
};

/**
 * Delete asset metadata from Supabase
 */
export const deleteAssetMetadata = async (publicId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('cloudinary_assets')
      .delete()
      .eq('cloudinary_id', publicId);

    if (error) {
      console.error('Error deleting asset metadata:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAssetMetadata:', error);
    return false;
  }
};