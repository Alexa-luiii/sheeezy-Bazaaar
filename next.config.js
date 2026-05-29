/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'stylo.pk',
      },
      {
        protocol: 'https',
        hostname: 'insignia.com.pk',
      },
    ],
  },
};

module.exports = nextConfig;
