/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/es/blog/visual-storytelling-por-qu-el-sitio-web-de-tu-hotel-necesita-ms-que-solo-fotos-de-las-habitaciones',
        destination: '/es/blog',
        permanent: true,
      },
      {
        source: '/es/blog/visual-storytelling-why-your-hotel-website-needs-more-than-just-room-photos',
        destination: '/es/blog',
        permanent: true,
      },
      {
        source: '/es/blog/cmo-el-contenido-visual-influye-en-la-decisin-de-reserva',
        destination: '/es/blog',
        permanent: true,
      },
      {
        source: '/es/blog/por-qu-el-storytelling-vende-ms-habitaciones-que-los-descuentos',
        destination: '/es/blog',
        permanent: true,
      },
      {
        source: '/en/blog/por-qu-el-storytelling-vende-ms-habitaciones-que-los-descuentos',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog/visual-storytelling-why-your-hotel-website-needs-more-than-just-room-photos',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog/cmo-el-contenido-visual-influye-en-la-decisin-de-reserva',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog/visual-storytelling-por-qu-el-sitio-web-de-tu-hotel-necesita-ms-que-solo-fotos-de-las-habitaciones',
        destination: '/en/blog',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Image optimization and caching headers
      {
        source: '/:path(og-.*\\.jpg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:filename(.*\\.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security headers for all routes
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Enable XSS protection (legacy, but good defense in depth)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Force HTTPS and prevent downgrade attacks
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Restrict access to browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // Content Security Policy - restrict resource loading
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com https://googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' https: data:; media-src 'self' https: data: blob:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.googletagmanager.com https://googletagmanager.com https://consent.cookiebot.com https://consentcdn.cookiebot.com; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
