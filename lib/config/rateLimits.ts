/**
 * Rate limiting configuration for all API endpoints
 * Defines request limits and time windows for each endpoint
 */

export const RATE_LIMITS = {
  // Public endpoints (tracked by IP)
  LEADS_SUBMIT: {
    requests: 5,
    windowMs: 3600000, // 1 hour
    description: '5 requests per hour',
  },

  POSTS_GET: {
    requests: 60,
    windowMs: 60000, // 1 minute
    description: '60 requests per minute',
  },

  // Authenticated endpoints (tracked by user ID)
  CLOUDINARY_SIGNATURE: {
    requests: 100,
    windowMs: 3600000, // 1 hour
    description: '100 requests per hour',
  },

  CLOUDINARY_ASSET_DELETE: {
    requests: 100,
    windowMs: 3600000, // 1 hour
    description: '100 deletions per hour',
  },

  CLOUDINARY_FOLDERS_GET: {
    requests: 200,
    windowMs: 60000, // 1 minute
    description: '200 requests per minute',
  },

  CLOUDINARY_FOLDERS_POST: {
    requests: 50,
    windowMs: 3600000, // 1 hour
    description: '50 creations per hour',
  },

  CLOUDINARY_FOLDERS_PATCH: {
    requests: 100,
    windowMs: 3600000, // 1 hour
    description: '100 updates per hour',
  },

  CLOUDINARY_FOLDERS_DELETE: {
    requests: 50,
    windowMs: 3600000, // 1 hour
    description: '50 deletions per hour',
  },
} as const;

/**
 * Check if rate limiting should be disabled
 * Currently disabled in development for easier testing
 */
export function isRateLimitingEnabled(): boolean {
  // Disable rate limiting in development for easier testing
  if (process.env.NODE_ENV === 'development') {
    const enforceInDev = process.env.ENFORCE_RATE_LIMITS === 'true';
    return enforceInDev;
  }

  // Always enabled in production
  return true;
}
