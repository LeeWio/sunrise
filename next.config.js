/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',  // ✅ 注意：是 `/api/` 开头
        destination: 'http://127.0.0.1:8080/api/:path*', // ✅ 保留 /api 前缀
      }
    ]
  }
};

module.exports = nextConfig;
