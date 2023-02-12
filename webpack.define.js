const { DefinePlugin } = require('webpack')

module.exports = new DefinePlugin({
  API_URL: JSON.stringify(process.env.API_URL),
  SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
})
