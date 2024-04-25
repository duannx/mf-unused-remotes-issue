/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

function getRemotes(isSsr) {
  const mfe1URL = 'http://localhost:5001';
  const mfe2URL = 'http://localhost:5002';
  const location = isSsr ? 'ssr' : 'chunks';

  return {
    MFE1: `MFE1@${mfe1URL}/_next/static/${location}/remoteEntry.js`,
    MFE2: `MFE2@${mfe2URL}/_next/static/${location}/remoteEntry.js`,
  };
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    const moduleFederationConfig = {
      name: 'SHELL',
      filename: 'static/chunks/remoteEntry.js',
      exposes: {},
      remotes: getRemotes(isServer),
    };
    config.plugins.push(new NextFederationPlugin(moduleFederationConfig));

    return config;
  },
};

module.exports = nextConfig;
