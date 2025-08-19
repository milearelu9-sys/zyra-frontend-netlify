/** @type {import('next').NextConfig} */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  async rewrites() {
    return [
      // Serve new static NFT/DeFi landing page at root
      { source: '/', destination: '/index.html' },
      // Serve static explorer from /explorer
      { source: '/explorer', destination: '/explorer.html' },
      { source: '/explorer/', destination: '/explorer.html' },
      // Proxy API to backend
      { source: '/api/:path*', destination: `${API_BASE}/api/:path*` },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Allow basic cross-origin for API when hosted elsewhere
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
