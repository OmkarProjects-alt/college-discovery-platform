import type { NextConfig } from "next";

const nextConfig: NextConfig = {

   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      // Add any other image hosts you use
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },
  /* config options here */
};

export default nextConfig;
