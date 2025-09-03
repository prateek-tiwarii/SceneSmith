// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {

//    serverExternalPackages: ['mongoose'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'im.runware.ai',
//         port: '',
//         pathname: '/image/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose', 'mongodb'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'im.runware.ai',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      kerberos: false,
      snappy: false,
      socks: false,
      aws4: false,
      "@aws-sdk/credential-providers": false,
      "gcp-metadata": false,
      "@mongodb-js/zstd": false,
    };
    // Prevent bundling of optional native deps of the MongoDB driver
    config.resolve.alias = {
      ...config.resolve.alias,
      'mongodb-client-encryption': false,
    };
    return config;
  },
};

export default nextConfig;

