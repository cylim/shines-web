/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: '/create',
        destination: '/create/step1',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
