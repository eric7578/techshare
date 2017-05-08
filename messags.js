const messages = []

exports.add = function (message) {
  messages.push({
    time: Date.now(),
    message
  })
}

exports.get = function () {
  return messages.slice()
}
