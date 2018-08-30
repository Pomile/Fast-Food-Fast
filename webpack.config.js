const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'UI/src'),
  entry: {
    main: './index.js',
  },
  devtool: devMode ? 'inline-source-map' : '',
  devServer: {
    contentBase: './dist',
  },
  optimization: devMode ? {} : {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: devMode ? '[name].bundle.[ext]' : '[hash].[ext]',
              outputPath: 'images',
              publicPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      publicPath: '../images/',
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Signup',
      filename: 'signup.html',
      template: 'signup.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Signin',
      filename: 'signin.html',
      template: 'signin.html',
    }),

    new HtmlWebpackPlugin({
      title: 'user',
      filename: 'user.html',
      template: 'user.html',
    }),
    new CleanWebpackPlugin(['dist']) ,
    devMode ? new webpack.NamedModulesPlugin() : '',
    devMode ? new webpack.HotModuleReplacementPlugin() : '',
  ],
};
