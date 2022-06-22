# ssbd
ssb (secure scuttlebutt) p2p daemon

# **installation**

```sh
npm install ssbd
```

# **usage**

```js
const sbot = ssbd(options)
```

# **config**

See https://github.com/ssbc/ssb-config#configuration for documentation on ssb config.

## **appname**

ssb uses [rc](https://www.npmjs.com/package/rc) under the hood to search for config in the usual os specific places and also merges user supplied config. The default ssb appname is `ssb` with application data at `~/.ssb`. Set the `appname` if you want to override the default path.

**ssbd sets the appname like so:**

```js
const appname = process.env.ssb_appname || options.appname || 'ssb'
```

**If you don't set the appname it will fallback to `ssb`.**

You may set `ssb_appname` in your shell to override the appname. Useful for testing or deployment controlled by environment variables.

```sh
export ssb_appname=whatever
```

**To set a default appame used by your application, pass it in with your other options.**
```sh
{ appname: 'whatever' }
```

## **plugins**

You will need an array of ssb plugins to load, as `ssbd` has no opinion on plugins; it provides only the [ssb-plugins](https://github.com/ssbc/ssb-plugins) plugin.

```js
const options = {
  ssbd: {
    plugins: [require('ssb-db'), require('ssb-master')]
  }
}
const sbot = ssbd(options)
```

## **user plugins**

See https://github.com/ssbc/ssb-plugins#load-user-configured-plugins for documentation on installing user supplied ssb plugins.

`ssbd` loads user plugins **before** the plugins array. `ssb-plugins` rejects plugins it has already loaded, therefore user plugins override your application's default plugins.

## **user config**

The ssb application data directory mentioned above may optionally have a json `config` file (no file extension) with ssb and ssbd config. This config overrides your application's ssb config, as well as the default config set by [ssb-config](https://github.com/ssbc/ssb-config#configuration). Because the user must be in control.

# example

```js
const ssbd = require('ssbd')
const plugins = require('@metacentre/shipyard-ssb')

const sbot = ssbd({ appname: 'ssb-test', ssbd: { plugins } })

console.log(sbot.address())
```

# cli

To interact with your ssb daemon from the command line, use [ssb-server](https://github.com/ssbc/ssb-server). For debugging, when starting the server, set `DEBUG=ssbd` to log to console. 

# acknowledgments

`ssbd` is inspired by `ssb-server`

## see also

- [`ssbc/ssb-server`](https://github.com/ssbc/ssb-server)
- [`secure scuttlebutt`](https://scuttlebot.io/more/protocols/secure-scuttlebutt.html)
- [`ssb whitepaper in 4 minutes (archived)`](http://web.archive.org/web/20190716152343/https://infourminutes.co/whitepaper/scuttlebutt)

## license

MIT
