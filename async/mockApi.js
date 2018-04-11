function getRandomMicroseconds () {
  return Math.random() * 1500 >> 0
}

// 模擬呼叫AC API
exports.callAcAPI = function (callback) {
  setTimeout(function () {
    const text = `呼叫AC API...`
    console.log(text)
    callback(null, text)
  }, getRandomMicroseconds())
}

// 模擬呼叫Private API
exports.callPrivateAPI = function (callback) {
  setTimeout(function () {
    const text = `呼叫Private API...`
    console.log(text)
    callback(null, text)
  }, getRandomMicroseconds())
}

// 模擬從DB取出資料
exports.readUserData = function (callback) {
  setTimeout(function () {
    const text = `從DB取出User資料...`
    console.log(text)
    callback(null, text)
  }, getRandomMicroseconds())
}

// 模擬寫入DB
exports.writeToDB = function (callback) {
  setTimeout(function () {
    const text = `寫入DB...`
    console.log(text)
    callback(null, text)
  }, getRandomMicroseconds())
}

// 模擬寫入Redis
exports.writeToRedis = function (callback) {
  setTimeout(function () {
    const text = `寫入Redis...`
    console.log(text)
    callback(null, text)
  }, getRandomMicroseconds())
}
