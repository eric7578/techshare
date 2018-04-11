const api = require('./mockApi')
const util = require('util')

// 全部轉為promise
const promiseCallAcAPI = function () {
  return new Promise(function (resolve, reject) {
    api.callAcAPI(function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 也可以透過node內建function
const promiseCallPrivateAPI = util.promisify(api.callPrivateAPI)
const promiseReadUserData = util.promisify(api.readUserData)
const promiseWriteToDB = util.promisify(api.writeToDB)
const promiseWriteToRedis = util.promisify(api.writeToRedis)

function userLogin () {
  promiseCallAcAPI().then(function () {
    return promiseCallPrivateAPI()
  }).then(function () {
    return promiseReadUserData()
  }).then(function () {
    return promiseWriteToDB()
  }).then(function () {
    return promiseWriteToRedis()
  }).then(function (result) {
    return 'ok'
  }).then(function (result) {
    console.log(result)
  }).catch(function (err) {
    console.log('Ops..........', err.message)
  })
}

userLogin()
