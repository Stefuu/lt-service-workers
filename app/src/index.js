const axios = require('axios')
const postRoute = 'http://localhost:9001/post/1'
const buttonContainer = document.querySelector('#button-container')

window.addEventListener('offline', () => {
  buttonContainer.style.display = 'none'
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(handleServiceWorkerActive)
}

function handleServiceWorkerActive () {
  if (navigator.onLine) {
    const button = document.createElement('button')
    button.innerText = 'Save for offline'
    buttonContainer.appendChild(button)
    button.addEventListener('click', () => {
      navigator.serviceWorker.controller.postMessage('save_post_1')
    })
  }
}

axios.get(postRoute)
  .then(function ({ data }) {
    const titleElement = document.getElementById('title')
    const contentElement = document.getElementById('content')
    titleElement.append(data.title)
    contentElement.innerHTML = data.content
  })
  .catch((err) => console.log(err))
