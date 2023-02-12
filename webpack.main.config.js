const DefinePlugin = require('./webpack.define')
const rules = require('./webpack.rules')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules,
  },
  plugins: [DefinePlugin],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
