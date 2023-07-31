/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    transpilePackages: ['@cloudscape-design/components']
    
}

module.exports = nextConfig