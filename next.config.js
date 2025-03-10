// const path = require('path');
// const dotenv = require("dotenv");
require("dotenv").config();
const port = process.env.PORT || 3000; // Mặc định dùng 3000 nếu không có PORT

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, /// server client render
  experimental: {
    appDir: true,
    nextScriptWorkers: true,
  },
  compiler: {
    styledComponents: true,
  },
  serverRuntimeConfig: {
    APP_PORT: process.env.APP_PORT,
  },
  publicRuntimeConfig: {
    ORIGIN_URL: process.env.ORIGIN_URL,
    ORIGIN_API: process.env.ORIGIN_API,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    PORT: port,
    ORIGIN_API: process.env.ORIGIN_API,
  },
  devServer: {
    port: port, // Áp dụng port từ .env vào Next.js server
    ORIGIN_API: process.env.ORIGIN_API,
  },
};

module.exports = nextConfig;
