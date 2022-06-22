const ssbd = require('../index.js')
const plugins = require('@metacentre/shipyard-ssb')

const sbot = ssbd({
  appname: 'ssb-test',
  ssbd: { plugins },
  logging: { level: 'info' }
})

console.log(sbot.address())
