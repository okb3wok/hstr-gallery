import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const isProduction = process.env.NODE_ENV === 'production';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

// Исправляем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`isProduction: ${isProduction}`);

export default {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/hstr-gallery.js',
    environment: {
      arrowFunction: true,
    },
  },
  devServer: {
    static:{
      directory: path.join(__dirname, 'src'),
    },
    port: 8008,
    host: 'localhost',
    hot: true,
    open: true,
    compress: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss|css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },

    ],
  },

  devtool: isProduction ? false : 'inline-source-map',   // обязательно для отладки
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/hstr-gallery.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        // { from: path.resolve(__dirname, 'src/static'), to: path.resolve(__dirname, 'dist/assets') },
        { from: path.resolve(__dirname, 'src/php'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({ terserOptions: { format: { comments: false } }, extractComments: false })
    ]
  },
};
