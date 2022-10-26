const DefinePlugin = require('./webpack.define')
const rules = require('./webpack.rules')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

module.exports = {
  module: {
    rules,
  },
  plugins: [DefinePlugin],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  optimization: {
    // TODO: Why is this being true breakin my production builds?
    minimize: false,
  },
}
