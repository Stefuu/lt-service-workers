const buttonEl = document.querySelector('.calculate-button')
const changeColorEl = document.querySelector('.change-color')
const resultEl = document.querySelector('.result')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(handleServiceWorkerActive)
}

function handleServiceWorkerActive () {
  buttonEl.addEventListener('click', () => {
    const num = document.querySelector('.num').value
    if (num > 40) return

    // SW
    // navigator.serviceWorker.controller.postMessage({
    //   msg: 'calculate',
    //   num
    // })

    // Local
    const result = fibonacci(num)
    resultEl.innerHTML = result
  })

  changeColorEl.addEventListener('click', () => {
    const currentColor = document.body.style.backgroundColor
    document.body.style.backgroundColor = currentColor === 'gray' ? 'white' : 'gray'
  })

  navigator.serviceWorker.addEventListener('message', event => {
    resultEl.innerHTML = event.data.msg
  })
}

// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
function fibonacci (num) {
  if (num <= 1) return 1

  return fibonacci(num - 1) + fibonacci(num - 2)
}
