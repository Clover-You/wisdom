/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/index',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8840/api/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig
