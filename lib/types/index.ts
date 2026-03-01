// Type definitions for Sassy Studio

export interface Post {
  id?: string;
  slug?: string;
  translation_group_id?: string | null;
  title: string;
  content: string;
  image: string;
  category: string;
  excerpt: string;
  date?: string;
  published?: boolean;
  published_at?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  language?: 'es' | 'en';
}

export interface PortfolioItem {
  id: string;
  clientName: string;
  category: 'Hotel' | 'Restaurant' | 'Lifestyle';
  imageUrl: string;
  description: string;
}

export interface Asset {
  id?: string;
  _id?: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
  // Cloudinary metadata
  cloudinaryId?: string; // public_id from Cloudinary
  cloudinaryVersion?: number; // Version number for cache busting
  transformations?: Record<string, string>; // Stored transformation URLs
  folderId?: string; // Associated folder/category
}

export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  heroImage?: string;
  galleryImages?: string[];
  heroMode?: 'static' | 'carousel' | 'slideshow';
  heroCarouselInterval?: number;
}
