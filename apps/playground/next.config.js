const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

/**
 * @type {import('next').NextConfig}
 */
module.exports = withNextra({
  webpack: (config, {isServer}) => {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, ...config.experiments };

    // fix warnings for async functions in the browser (https://github.com/vercel/next.js/issues/64792#issuecomment-2148766770)
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }

    return config;
  }
})
 
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
