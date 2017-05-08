const express = require('express')
const bodyParser = require('body-parser')
const messages = require('./messags')
const cors = require('cors')

const port = process.env.API_PORT
const app = express()
app.use(cors())
app.use(bodyParser.json())

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

app.listen(port, function () {
  console.log(`> Api server listen on ${port}`)
})