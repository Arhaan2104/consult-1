import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
