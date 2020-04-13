const axios = require('axios')
const postRoute = 'http://localhost:9001/post/1'
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
    document.body.style.backgroundColor = currentColor === 'lightgray' ? 'white' : 'lightgray'
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

axios.get(postRoute)
  .then(function ({ data }) {
    const titleElement = document.getElementById('title')
    const contentElement = document.getElementById('content')
    titleElement.append(data.title)
    contentElement.innerHTML = data.content
  })
  .catch((err) => console.log(err))
