// Type definitions for Sassy Studio

export interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  excerpt: string;
  date: string;
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
}

export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}
