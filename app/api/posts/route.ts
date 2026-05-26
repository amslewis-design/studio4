import { NextRequest, NextResponse } from 'next/server';
import { filePostService } from '@/lib/services/filePostService';
import { checkRateLimit, getClientIP } from '@/lib/utils/rateLimit';
import { RATE_LIMITS, isRateLimitingEnabled } from '@/lib/config/rateLimits';

export async function GET(request: NextRequest) {
  try {
    // Check rate limit by IP address
    if (isRateLimitingEnabled()) {
      const clientIP = getClientIP(request);
      const rateLimit = RATE_LIMITS.POSTS_GET;
      const limitCheck = checkRateLimit(
        `posts:${clientIP}`,
        rateLimit.requests,
        rateLimit.windowMs
      );

      if (!limitCheck.allowed && limitCheck.response) {
        return limitCheck.response;
      }
    }

    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format');
    const locale = searchParams.get('locale');

    // Full response mode for blog listing pages.
    if (format === 'full') {
      if (locale === 'es' || locale === 'en') {
        const localizedPosts = await filePostService.getPostsByLanguage(locale);
        return NextResponse.json({
          success: true,
          posts: localizedPosts,
        });
      }

      const allPosts = await filePostService.getPosts();
      return NextResponse.json({
        success: true,
        posts: allPosts,
      });
    }

    // Default mode for homepage: 3 recent posts formatted for cards.
    const posts = await filePostService.getPosts();

    // Filter for published posts only
    const publishedPosts = posts.filter((post) => post.published === true);

    // Sort by published_at date (most recent first)
    const sortedPosts = publishedPosts.sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at || 0).getTime();
      const dateB = new Date(b.published_at || b.created_at || 0).getTime();
      return dateB - dateA;
    });

    // Take only the 3 most recent posts
    const recentPosts = sortedPosts.slice(0, 3);

    // Transform to match BlogPost interface (title, date, tag, image, excerpt)
    const formattedPosts = recentPosts.map((post) => {
      // Format date as "DD Mon YYYY" (e.g., "12 Apr 2026")
      const publishDate = new Date(post.published_at || post.created_at || '');
      const formattedDate = publishDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      return {
        title: post.title,
        date: formattedDate,
        tag: post.category || 'Updates',
        image: post.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600',
        excerpt: post.excerpt || '',
        slug: post.slug,
      };
    });

    return NextResponse.json({
      success: true,
      posts: formattedPosts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return empty posts array on error (UI will show no posts)
    return NextResponse.json({
      success: true,
      posts: [],
    });
  }
}
