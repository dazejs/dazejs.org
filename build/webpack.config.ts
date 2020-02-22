import * as path from 'path';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { Configuration } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: { 
    app: ['../src/index']
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    filename: '[name].[hash].js',
    publicPath: '/assets/'
  },
  module: {
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
        loader: [
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
          'less-loader'
        ]
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=1200&name=[hash].[ext]'
      }
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
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
    modules: [
      'node_modules',
      'src',
    ]
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
    ]
  }
};

if (isDev) {
  config.devServer = {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/assets/',
    hot: true,
    port: 9898
  }
}

export default config;