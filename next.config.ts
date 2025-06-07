import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yozbrydxdlcxghkphhtq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "www.renewableenergymarketing.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
