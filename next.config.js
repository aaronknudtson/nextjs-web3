const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      return {
        ...config,
        entry() {
          return config.entry().then((entry) => ({
            ...entry,
            // adding custom entry points
            worker: path.resolve(process.cwd(), "src/worker.ts"),
          }));
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
