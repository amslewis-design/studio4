import { useEffect, useState, useCallback } from 'react';
import { authService, AuthUser } from '@/lib/services/authService';

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

/**
 * Hook for managing authentication state in client components
 * Provides user data, loading state, and authentication methods
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load user');
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle sign out
  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error: signOutError } = await authService.signOut();
      if (signOutError) {
        setError(signOutError.message);
      } else {
        setUser(null);
      }
    } catch (err) {
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signOut: handleSignOut,
    isAuthenticated: !!user,
  };
}
