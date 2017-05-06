import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(logger, sagaMiddleware)
)

sagaMiddleware.run(sagas)

function reducer (state = [], action) {
  switch (action.type) {
    case 'onGetMessages':
      return onGetMessages(state, action)
    default:
      return state
  }
}

function onGetMessages (state, action) {
  return action.messages
}

export default store
