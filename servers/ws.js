/**
 * set up websocket server
 */
const ws = require('ws')
const messages = require('./messags')

const port = process.env.WS_PORT
const wss = new ws.Server({
  perMessageDeflate: false,
  port
}, function () {
  console.log(`> Websocket is listening on ${port}`)
})

// get message with websocket
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
