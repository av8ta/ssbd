// from ssb-server
const SecretStack = require('secret-stack')
const caps = require('ssb-caps')

/**
 * create an sbot with default caps.
 * these can be overridden again when you call create.
 *
 * caps are 'capabilities': the network key that makes
 * the scuttleverse into one space.
 * this is the only singleton in the ssb protocol design.
 *
 * @returns SecretStack with default scuttleverse caps
 */
function createSsbServer () {
  return SecretStack({ caps })
}
module.exports = createSsbServer()
