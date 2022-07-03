const debug = require('debug')('ssbd')
const Config = require('ssb-config/inject')
const ssbPlugins = require('ssb-plugins')
const pkg = require('./package.json')
const Server = require('./create')
const loader = require('./loader')
const path = require('path')
const fs = require('fs')

/**
 * https://github.com/ssbc/ssb-config#configuration
 * */
function createServer (options = {}) {
  const plugins = options.ssbd?.plugins || []
  debug('[createServer] options:', JSON.stringify(options, null, 2))
  debug('[createServer] plugins:', JSON.stringify(plugins, null, 2))

  const appname = process.env.ssb_appname || options.appname || 'ssb'
  const config = Config(appname, { ...options, appname })

  debug('[createServer] ssb-config/inject:', config)
  console.info()
  console.info(`${pkg.name} v${pkg.version} ${appname} ${config.path}`)
  console.info()

  const createStack = Server.use(ssbPlugins)

  // load user supplied plugins
  if (config.plugins) {
    debug('loading user plugins', config.plugins, `from: ${config.path}/node_modules`)
    ssbPlugins.loadUserPlugins(createStack, config)
  }

  // load plugins from array
  if (plugins.length > 0) {
    plugins.forEach(plugin => {
      if (isString(plugin)) loader(createStack, require(plugin))
      else loader(createStack, plugin)
    })
  } else console.info('[ssbd] Did you forget to pass an array of plugins to load?')

  // start server
  const server = createStack(config)

  // write RPC manifest to ~/.ssb/manifest.json
  fs.writeFileSync(
    path.join(config.path, 'manifest.json'),
    JSON.stringify(server.getManifest(), null, 2)
  )

  // for testing
  if (process.env.ssbd_test === 'true') {
    global.sbot = server
    debug('global.sbot:', global.sbot)
  }

  return server
}

module.exports = createServer

function isString (s) {
  return !!(typeof s === 'string' || s instanceof String)
}
