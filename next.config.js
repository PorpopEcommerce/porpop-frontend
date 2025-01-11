/** @type {import('next').NextConfig} */


const { createProxyMiddleware } = require("http-proxy-middleware");


const nextConfig = {
    images: {
        domains: [
            'm.media-amazon.com',
            'lh3.googleusercontent.com',
            'porpop.com',
            'ae-pic-a1.aliexpress-media.com'
        ],
    },
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "https://backend-porpop.onrender.com/api/:path*",
          },
        ];
      },
}; 

module.exports = nextConfig
