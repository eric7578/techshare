const api = require('./mockApi')

function userLogin (callback) {
  api.callAcAPI(function (err, text) {
    if (err) {
      return callback(err)
    }

    api.callPrivateAPI(function (err, text) {
      if (err) {
        return callback(err)
      }

      api.readUserData(function (err, text) {
        if (err) {
          return callback(err)
        }

        api.writeToDB(function (err, text) {
          if (err) {
            return callback(err)
          }

          api.writeToRedis(function (err, text) {
            if (err) {
              return callback(err)
            }

            callback('ok')
          })
        })
      })
    })
  })
}

userLogin(console.log)
