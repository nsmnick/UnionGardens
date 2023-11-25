const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const resolvePath = (...args) => path.resolve(path.join(__dirname, ...args));

module.exports = {
  entry: {
    app: './assets/index.js',
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve('../wp-content', 'themes', 'uniongardens', 'assets'),
    publicPath: '../',
    assetModuleFilename: 'images/[contenthash][ext][query]',
  },
  devtool: 'hidden-source-map',
  resolve: {
    alias: {
      '@': resolvePath('frontend'),
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
    },
    extensions: ['.js', '.json', '.vue'],
  },
  mode: 'development',
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'vue'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  'preset-default',
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'addAttributesToSVGElement',
                    params: {
                      attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    new VueLoaderPlugin(),
    new WebpackAssetsManifest(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new LiveReloadPlugin(),
  ],
};
