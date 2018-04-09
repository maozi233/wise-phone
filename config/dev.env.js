'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG:true,
  USER_KEY:'"wiseSYuser"',
  PAGE_SIZE:20,
  API_DOMAIN:'"test.api.zpkoo.com"',
  // API_DOMAIN:'"wise-s-api.ketongtx.com"',
  API_CONTEXT:'"wise-wises/rs/client/"',
  // API_CONTEXT:'"test.api.zpkoo.com"',
  DEBUG_STR: '""',
});
