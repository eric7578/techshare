const express = require('express')

const router = express.Router()

const sessions = {}

const messages = []

router.post('/', function (req, res) {
  messages.push({
    time: Date.now(),
    message: req.body.message
  })
  res.status(200).end()
})

router.get('/', function (req, res) {
  res.status(200).json(messages)
})

router.get('/longpolling', function (req, res) {
  const lenMessages = messages.length

  const intervalId = setInterval(function () {
    if (lenMessages !== messages.length) {
      clearInterval(intervalId)
      res.status(200).json(messages)
    }
  }, 500)
})

module.exports = {
  router,
  messages
}
