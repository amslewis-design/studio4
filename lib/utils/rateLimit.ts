/**
 * In-memory rate limiting utility
 * Tracks requests by key (IP or User ID) and enforces rate limits
 * Automatically cleans up old entries to prevent memory leaks
 */

interface RateLimitEntry {
  timestamps: number[];
  cleanup?: NodeJS.Timeout;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval = 60000; // 1 minute cleanup interval

  /**
   * Check if a request is allowed based on rate limit
   * @param key - Unique identifier (IP address or user ID)
   * @param maxRequests - Maximum allowed requests in the time window
   * @param windowMs - Time window in milliseconds
   * @returns Object with allowed status and retry-after seconds
   */
  isAllowed(
    key: string,
    maxRequests: number,
    windowMs: number
  ): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    // First request from this key
    if (!entry) {
      this.store.set(key, {
        timestamps: [now],
      });
      return { allowed: true };
    }

    // Remove timestamps outside the time window
    const windowStart = now - windowMs;
    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

    // Check if request is allowed
    if (entry.timestamps.length < maxRequests) {
      entry.timestamps.push(now);
      return { allowed: true };
    }

    // Rate limit exceeded - calculate retry-after
    const oldestTimestamp = entry.timestamps[0];
    const retryAfter = Math.ceil(
      (oldestTimestamp + windowMs - now) / 1000
    );

    return {
      allowed: false,
      retryAfter: Math.max(1, retryAfter),
    };
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string): void {
    this.store.delete(key);
  }

  /**
   * Clear all rate limits (useful for testing)
   */
  clear(): void {
    // Clear any pending cleanup timers
    for (const entry of this.store.values()) {
      if (entry.cleanup) {
        clearTimeout(entry.cleanup);
      }
    }
    this.store.clear();
  }

  /**
   * Get current store size (for monitoring)
   */
  getSize(): number {
    return this.store.size;
  }

  /**
   * Cleanup old entries periodically
   * Called automatically on first use
   */
  private startCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (const [key, entry] of this.store.entries()) {
        // Remove entries with no recent activity
        if (entry.timestamps.length === 0) {
          this.store.delete(key);
        } else {
          const lastTimestamp = entry.timestamps[entry.timestamps.length - 1];
          if (now - lastTimestamp > maxAge) {
            this.store.delete(key);
          }
        }
      }
    }, this.cleanupInterval);
  }

  constructor() {
    // Start cleanup on initialization
    this.startCleanup();
  }
}

// Global singleton instance
let rateLimiterInstance: RateLimiter | null = null;

/**
 * Get or create the global rate limiter instance
 */
export function getRateLimiter(): RateLimiter {
  if (!rateLimiterInstance) {
    rateLimiterInstance = new RateLimiter();
  }
  return rateLimiterInstance;
}

/**
 * Extract client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (in order of preference)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback to undefined (localhost in dev)
  return 'unknown';
}

/**
 * Helper to check rate limit and return error response if exceeded
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; response?: Response } {
  const limiter = getRateLimiter();
  const result = limiter.isAllowed(key, maxRequests, windowMs);

  if (!result.allowed) {
    const response = new Response(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
        retryAfter: result.retryAfter,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(result.retryAfter || 60),
        },
      }
    );
    return { allowed: false, response };
  }

  return { allowed: true };
}
