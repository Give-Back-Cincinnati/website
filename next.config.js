const withPlugins = require('next-compose-plugins');
const withTranspileModules = require('next-transpile-modules');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
}

module.exports = withPlugins([
    withTranspileModules(['@cloudscape-design/components'])
], nextConfig)
