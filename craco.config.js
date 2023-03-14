const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { loaderByName, addAfterLoader, when, whenProd } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const path = require('path')
const smp = new SpeedMeasurePlugin()

const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true'
const isGzip = process.env.GZIP === 'true'
const isDev = process.env.dev === 'true'

module.exports = {
  devServer: {
    open: false
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#B2856C' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  babel: {
    plugins: [
      [
        'import', {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true
        }
      ],
      [
        'import', {
          libraryName: 'ahooks',
          camel2DashComponentName: false,
          libraryDirectory: 'es'
        }, 'ahooks'
      ],
      [
        '@emotion',
        {
          'sourceMap': true,
          'autoLabel': 'dev-only',
          'labelFormat': '[local]',
          'cssPropOptimization': true
        }
      ]
    ]
  },
  webpack: smp.wrap({
    plugins: [
      new WebpackBar(),
      ...whenProd(() => [
        new TerserPlugin({
          extractComments: false,
          // 多线程
          parallel: true,
          terserOptions: {
            ie8: true,
            // 删除注释
            output: {
              comments: false
            },
            //删除console 和 debugger
            compress: {
              drop_debugger: true,
              drop_console: false
            }
          }
        })
      ], []),
      ...when(isBuildAnalyzer, () => [
        new BundleAnalyzerPlugin()
      ], []),
      ...when(isGzip, () => [
        new CompressionPlugin({
          deleteOriginalAssets: true
        })
      ], [])
    ],
    configure: (webpackConfig, {env, paths}) => {
      paths.appBuild = isDev ? 'devBuild' : paths.appBuild
      webpackConfig.output = isDev ? {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'devBuild')
      } : webpackConfig.output
      webpackConfig.optimization.splitChunks = {
        chunks: 'async',
        minSize: 30000,
        maxAsyncRequests: 6,
        maxInitialRequests: 5,
        name: true,
        cacheGroups: {
          react: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-i18next)[\\/]/,
            name: 'react',
            minChunks: 1,
            priority: 10
          },
          antd: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
            name: 'antd',
            minChunks: 1,
            priority: 9
          },
          rc: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/](rc-select|rc-overflow|rc-drawer|rc-menu|rc-virtual-list|rc-field-form|rc-trigger|rc-motion|rc-util|rc-align|rc-notification)[\\/]/,
            name: 'rc',
            minChunks: 1,
            priority: 8
          },
          ethersproject: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@ethersproject|bn.js)[\\/]/,
            name: 'ethersproject',
            priority: 6,
            minChunks: 1
          },
          vendors: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 5,
            minChunks: 2,
            name: 'vendors',
            reuseExistingChunk: true
          },
          async: {
            chunks: 'async',
            priority: 4,
            minChunks: 2,
            name: 'async',
            reuseExistingChunk: true
          },
          default: {
            minChunks: 3,
            priority: 0,
            reuseExistingChunk: true
          }
        }
      }
      webpackConfig.plugins = [
        ...webpackConfig.plugins.filter((element) => {
          if (element.options) {
            return !element.options.hasOwnProperty("ignoreOrder");
          }
          return true;
        }),
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          moduleFilename: this.moduleFilename,
          ignoreOrder: true,
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        })
      ]
      const urlLoader = {
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024,
              name: 'static/media/[name].[hash:8].[ext]',
              esModule: false
            }
          }
        ]
      }
      addAfterLoader(webpackConfig, loaderByName('url-loader'), urlLoader)
      return webpackConfig
    }
  }),
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    }
  }
}
