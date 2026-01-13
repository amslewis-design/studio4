// Storage Service - handles localStorage operations

const STORAGE_KEYS = {
  POSTS: 'sassy_posts',
  PORTFOLIO: 'sassy_portfolio',
  ASSETS: 'sassy_assets',
  SETTINGS: 'sassy_settings',
} as const;

const DEFAULT_SETTINGS = {
  primaryColor: '#1a1a1a',
  secondaryColor: '#FC7CA4',
  backgroundColor: '#0a0a0a',
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070',
  galleryImages: [],
};

export const storageService = {
  // Posts
  getPosts: () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  savePosts: (posts: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error('Error saving posts:', e);
    }
  },

  // Portfolio
  getPortfolio: () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  savePortfolio: (portfolio: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
    } catch (e) {
      console.error('Error saving portfolio:', e);
    }
  },

  // Assets
  getAssets: () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ASSETS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveAssets: (assets: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
    } catch (e) {
      console.error('Error saving assets:', e);
    }
  },

  // Settings
  getSettings: () => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: (settings: any) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },
};
