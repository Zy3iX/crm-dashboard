import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "192.168.0.110",
    "172.20.10.3",
    "iko-BOM-WXX9.local"
  ],
};

export default nextConfig;
