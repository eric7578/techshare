import moment from 'moment'
import store from './store'

const $createForm = document.querySelector('#create-form')
const $updateMode = document.querySelector('#update-mode')
const $message = document.querySelector('#message')
const $messageList = document.querySelector('#message-list')

$createForm.addEventListener('submit', onSubmit)
$updateMode.addEventListener('change', onUpdateModeChange)
store.subscribe(onMessagesChange)

function onSubmit (e) {
  e.preventDefault()
  store.dispatch({
    type: 'submitMessage',
    message: $message.value
  })
  $message.value = ''
}

function onUpdateModeChange (e) {
  const mode = e.target.value
  store.dispatch({
    type: 'changeUpdateMode',
    mode
  })
}

function onMessagesChange (getState) {
  const state = store.getState()
  $messageList.innerHTML = ''
  state.forEach(function (messageObject) {
    const $li = document.createElement('li')
    $li.classList.add('message')

    const $message = document.createElement('div')
    $message.classList.add('messageContent')
    $message.textContent = messageObject.message

    const $time = document.createElement('div')
    $time.classList.add('time')
    $time.textContent = moment(messageObject.time).format('YYYY-MM-DD HH:mm:ss')

    $li.appendChild($message)
    $li.appendChild($time)

    $messageList.insertBefore($li, $messageList.firstChild)
  })
}

