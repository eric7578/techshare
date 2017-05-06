export function postMessage (message) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/post')
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xhr.onload = function (e) {
      if (e.target.status === 200) {
        resolve()
      } else {
        reject()
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.send(JSON.stringify({ message }))
  })
}

export function getMessages (timout) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/post')
    xhr.onload = function (e) {
      if (e.target.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject()
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.send()
  })
}

export function getMessagesWithTimeout (timeout) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.timeout = timeout
    xhr.open('GET', '/post/longpolling')
    xhr.onload = function (e) {
      if (e.target.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject()
      }
    }
    xhr.ontimeout = function () {
      reject()
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.send()
  })
}
