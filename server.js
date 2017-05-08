const config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const session = require('express-session')
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./build/webpack.dev.conf')
const ws = require('ws')

const port = process.env.PORT || config.dev.port
const wsport = process.env.WSPORT || config.dev.wsport
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const proxyTable = config.dev.proxyTable

const app = express()

app.use(bodyParser())

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  cookie: { secure: true }
}))

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + port + '\n')
})

const messages = require('./messags')

// add a new message
app.post('/post', function (req, res) {
  messages.add(req.body.message)
  res.status(200).end()
})

// get messages with ajax
app.get('/post', function (req, res) {
  res.status(200).json(messages.get())
})

// get message with login polling
app.get('/post/longpolling', function (req, res) {
  const initMessagesLength = messages.get().length

  const intervalId = setInterval(function () {
    const latestMessages = messages.get()
    if (initMessagesLength !== latestMessages.length) {
      clearInterval(intervalId)
      res.status(200).json(latestMessages)
    }
  }, 500)
})

const server = app.listen(port)

// get message with websocket
const wss = new ws.Server({
  perMessageDeflate: false,
  port: wsport
})

wss.on('connection', function (ws) {
  const initMessagesLength = messages.get().length

  const intervalId = setInterval(function () {
    const latestMessages = messages.get()
    if (initMessagesLength !== latestMessages.length) {
      ws.send(JSON.stringify(latestMessages))
    }
  }, 500)

  ws.on('close', function () {
    clearInterval(intervalId)
  })
})
