/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    experimental: {
        runtime: 'experimental-edge',
    }
}

module.exports = nextConfig