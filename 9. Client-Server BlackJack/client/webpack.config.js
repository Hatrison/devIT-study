const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (_, argv) => {
  const production = argv.mode === 'production';
  const envPath = path.resolve(__dirname, '.env');
  const envVars = require('dotenv').config({ path: envPath }).parsed || {};

  return {
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
      path: path.join(__dirname, '..', 'server', 'public', 'static'),
      filename: production ? '[name].[contenthash].js' : '[name].js',
    },
    mode: production ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(svg|png|jpg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: production ? '[name].[contenthash].[ext]' : '[name].[ext]',
              outputPath: 'images',
            },
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(envVars),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        pages: path.resolve(__dirname, './src/pages'),
        components: path.resolve(__dirname, './src/components'),
        services: path.resolve(__dirname, './src/services'),
        hooks: path.resolve(__dirname, './src/hooks'),
      },
    },
    devServer: {
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
