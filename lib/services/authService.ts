import { supabase } from '@/lib/supabaseClient';

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

/**
 * Authentication service for managing user login/logout
 */
export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        return {
          user: null,
          error: {
            message: error.message || 'Failed to sign in. Please check your credentials.',
            code: error.status?.toString(),
          },
        };
      }

      if (data.user) {
        return {
          user: {
            id: data.user.id,
            email: data.user.email || '',
          },
          error: null,
        };
      }

      return {
        user: null,
        error: {
          message: 'Unknown error occurred during sign in',
        },
      };
    } catch (err) {
      console.error('Sign in exception:', err);
      return {
        user: null,
        error: {
          message: 'An unexpected error occurred. Please try again.',
        },
      };
    }
  },

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email || '',
      };
    } catch (err) {
      console.error('Get current user exception:', err);
      return null;
    }
  },

  /**
   * Sign out the current user
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return {
          error: {
            message: error.message || 'Failed to sign out',
            code: error.status?.toString(),
          },
        };
      }

      return { error: null };
    } catch (err) {
      console.error('Sign out exception:', err);
      return {
        error: {
          message: 'An unexpected error occurred during sign out',
        },
      };
    }
  },

  /**
   * Get session information (useful for checking if user is authenticated)
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return null;
      }

      return data.session;
    } catch (err) {
      console.error('Get session exception:', err);
      return null;
    }
  },
};
