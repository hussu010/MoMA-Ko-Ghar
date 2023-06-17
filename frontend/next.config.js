/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.moma.org",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
