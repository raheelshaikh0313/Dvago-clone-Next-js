/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dvago.pk",
      },
      {
        protocol: "https",
        hostname: "dvago-assets.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
