import { take, takeLatest, call, put, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from './api'

export default function* () {
  yield takeLatest('changeUpdateMode', changeUpdateMode)
  yield takeLatest('submitMessage', submitMessage)
  yield takeLatest('postFailed', postFailed)
}

function* submitMessage (action) {
  try {
    yield call(api.postMessage, action.message)
  } catch (err) {
    yield put({
      type: 'postFailed'
    })
  }
}

function* postFailed (action) {
  yield call(window.alert, 'You shall not pass!')
}

function* changeUpdateMode (action) {
  switch (action.mode) {
    case 'polling':
      return yield call(doPolling)
    case 'longPolling':
      return yield call(doLongPolling)
    case 'websocket':
      return yield call(doWebsocket)
  }
}

function* doPolling () {
  while (true) {
    const messages = yield call(api.getMessages)
    yield call(onGetMessages, messages)
    yield call(delay, 1000)
  }
}

function* doLongPolling () {
  while (true) {
    let messages
    try {
      messages = yield call(api.getMessagesWithTimeout, 30000)
    } catch (err) {
      continue
    }
    yield call(onGetMessages, messages)
  }
}

function* doWebsocket () {
  const wsChannel = yield call(api.getMessagesFromWebsocket)
  try {
    while (true) {
      const messages = yield take(wsChannel)
      yield call(onGetMessages, messages)
    }
  } catch (err) {
    // ignore
  } finally {
    if (yield cancelled()) {
      wsChannel.close()
    }
  }
}

function* onGetMessages (messages) {
  yield put({
    type: 'onGetMessages',
    messages
  })
}
