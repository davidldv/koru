import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "koru-storage.sandmor.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
