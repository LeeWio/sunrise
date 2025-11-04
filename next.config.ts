import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["ui-avatars.com", "heroui.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // ✅ 注意：是 `/api/` 开头
        destination: "http://127.0.0.1:8080/api/:path*", // ✅ 保留 /api 前缀
      },
    ];
  },
};

export default withNextIntl(nextConfig);
