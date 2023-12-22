/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8081",
        pathname: "/",
      },
    ],
  },
};

// const withPWA = require("next-pwa")({ dest: "public" });
// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
