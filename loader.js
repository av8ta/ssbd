const debug = require('debug')('ssbd')

// recursively loads plugins
function loader (stack, plugin) {
  if (Array.isArray(plugin)) {
    debug('[loader] loading plugin array:', plugin)
    plugin.forEach(p => loader(stack, p))
  } else {
    try {
      debug('[loader] loading plugin:', plugin)
      stack.use(plugin)
    } catch (error) {
      console.error('Error loading plugin: ', plugin, error)
    }
  }
}

module.exports = loader
