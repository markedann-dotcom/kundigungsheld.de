/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // ⚠️ лучше исправить ошибки, чем игнорировать
  },

  experimental: {
    browsersListForSwc: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.logo.dev' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },

  compress: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kundigungsheld.de' }],
        destination: 'https://www.kundigungsheld.de/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 👇 Новые заголовки
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://img.logo.dev https://i.pravatar.cc",
              "connect-src 'self'",
              "font-src 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig