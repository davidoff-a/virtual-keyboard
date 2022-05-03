const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
console.log('####: =>', mode);
module.exports = {
  mode: mode,
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  devServer: !isDev
    ? {}
    : {
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
        static: { directory: path.join(__dirname, 'public') },
      },
  entry: './src/index.js',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        // use: 'eslint-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      title: 'Virtual  Keyboard',
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: path.resolve(__dirname, './src/assets/movies'), to: '/public' }],
    // }),
    new ESLintWebpackPlugin({
      fix: true,
      exclude: './node_modules',
    }),
  ].filter(Boolean),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[chunkhash].js',
    assetModuleFilename: 'assets/[contenthash][ext][query]',
  },
};
