/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require('@zeit/next-sass')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV
const isProductionDeployment = env === 'production'

module.exports = withSass({
  webpack(config, { buildId, dev, isServer, defaultLoaders, dir, },) {
    const nextBabelLoader = config.module.rules[0].use
    config.module.rules[0].use = [
      nextBabelLoader,
      {
        loader: 'linaria/loader',
        options: {
          sourceMap: !isProductionDeployment,
        },
      },
    ]
    config.module.rules.push({
      test: /\.css$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // only enable hot in development
            hmr: !isProductionDeployment,
            // if hmr does not work, this is a forceful method.
            reloadAll: true,
          },
        },
        {
          loader: 'css-loader',
          options: { sourceMap: !isProductionDeployment, },
        },
      ],
    },)
    if (isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name]-[contenthash].css',
        },),
      )
    }
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: [dir,],
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    },)
    config.resolve.extensions = ['.tsx', '.ts', '.js',]
    /* eslint-disable @typescript-eslint/camelcase */
    config.node = { fs: 'empty', net: 'empty', child_process: 'empty', }
    return config
  },
},)
