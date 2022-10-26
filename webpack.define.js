const { DefinePlugin } = require('webpack')

module.exports = new DefinePlugin({
  SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
})
