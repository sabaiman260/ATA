/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable Next.js built-in image optimization in dev to avoid upstream
    // fetch failures for S3-hosted assets that return redirects (301).
    // This lets the browser request images directly from S3.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        // Allow Cloudinary-hosted images from the official CDN
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
