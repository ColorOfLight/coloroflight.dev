/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(wgsl)$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    });

    return config;
  }
};

export default nextConfig;
