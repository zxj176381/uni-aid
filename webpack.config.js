const path = require('path')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'

let projectPath = 'E:/ajy-mini/yjy-app/node_modules/uni-aid/dist'

if (process.env.ADDRESS === 'home') {
  projectPath = 'F:/uni/uniapp/node_modules/_uni-aid@1.0.6@uni-aid/dist'
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
}
