function* fn () {
  for (let i = 0; i < 5; i++) {
    yield i
  }
  yield 'done'
}

const g = fn()

const int = setInterval(function () {
  const iterator = g.next()

  if (iterator.done) {
    clearInterval(int)
  } else {
    console.log('iterator value =', iterator.value)
  }
}, 100)
