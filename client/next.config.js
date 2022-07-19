/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
        test: /\.ttf/,
        use: ['file-loader']
    })
    return config
  }
}

module.exports = nextConfig
