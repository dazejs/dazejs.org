import * as path from 'path';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import { Configuration } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: { 
    app: [
      path.resolve(__dirname, '../src/index.tsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    filename: isDev ? 'bundle.js' : '[name].[hash].js',
    publicPath: isDev ? '/assets/' : 'https://dazejs.zewail.cn/assets/'
  },
  module: {
    exprContextCritical: false,
    // 文件中如果缺少exports时会直接报错而不是警告
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          isDev && 'style-loader',
          isProd && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009',
                  overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                }),
                // require('cssnano')()
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#f94628',
              }
            }
          }
        ].filter(Boolean)
      },
      {
        test: /\.css$/,
        use: [
          isDev && 'style-loader',
          isProd && {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009',
                  overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                }),
                // require('cssnano')()
              ],
            },
          },
        ].filter(Boolean)
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader?limit=1200&name=[hash].[ext]'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[chunkhash:5].chunk.css"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, './tpl/index.html'),
      inject: true,
      alwaysWriteToDisk: true,
      minify: isProd ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : undefined,
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', '.css'],
    modules: [
      'node_modules',
      'src',
    ],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@docs': path.resolve(__dirname, '../docs'),
    }
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: process.env.NODE_ENV === 'devlopment' ? {} : {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        buildup: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ],
  },

};

if (isDev) {
  config.devServer = {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
    hot: true,
    port: 9966,
    historyApiFallback: true
  }
}

export default config;