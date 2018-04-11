const api = require('./mockApi')
const util = require('util')

const promiseCallAcAPI = util.promisify(api.callAcAPI)
const promiseCallPrivateAPI = util.promisify(api.callPrivateAPI)
const promiseReadUserData = util.promisify(api.readUserData)
const promiseWriteToDB = util.promisify(api.writeToDB)
const promiseWriteToRedis = util.promisify(api.writeToRedis)

async function userLogin () {
  try {
    await promiseCallAcAPI()
    await promiseCallPrivateAPI()
    await promiseReadUserData()
    await promiseWriteToDB()
    await promiseWriteToRedis()
    console.log('ok')
  } catch (err) {
    console.log('Ops.............', err.message)
  }
}

userLogin()