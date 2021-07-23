const path = require('path');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

let projectPath = '';

if (process.env.ADDRESS === 'home') {
  projectPath = 'F:/project/Calligraphy_App/node_modules/uni-aid/dist';
}

module.exports = {
  entry: './src/scripts/index',
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: isProduction ? path.resolve(__dirname, 'dist') : projectPath,
    libraryTarget: 'umd',
  },
  externals: [nodeExternals()],
};
