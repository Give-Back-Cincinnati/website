/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    transpilePackages: ['@cloudscape-design/components']
    
}

module.exports = nextConfig