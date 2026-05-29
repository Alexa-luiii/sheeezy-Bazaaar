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
      {
        protocol: 'https',
        hostname: 'www.jwpei.com',
      },
      {
        protocol: 'https',
        hostname: 'www.charleskeith.com',
      },
    ],
  },
};

module.exports = nextConfig;
