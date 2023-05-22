/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
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

module.exports = nextConfig;
