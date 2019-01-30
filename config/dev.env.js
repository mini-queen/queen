var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
// 8003
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"39.107.124.221:80"'
})
