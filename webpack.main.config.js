require('dotenv').config()

const webpack = require('webpack')

const rules = require('./webpack.rules')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules,
  },
  plugins: [
    new webpack.DefinePlugin({
      GITHUB_ISSUE_TOKEN: JSON.stringify(process.env.GITHUB_ISSUE_TOKEN),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
