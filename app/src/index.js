const axios = require('axios')
const postRoute = 'http://localhost:9001/post/1'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(handleServiceWorkerActive)
}

function handleServiceWorkerActive (reg) {
  const button = document.querySelector('.cache-article')
  button.addEventListener('click', () => {
    navigator.serviceWorker.controller.postMessage('save_post_1')
  })
}

axios.get(postRoute)
  .then(function ({ data }) {
    const titleElement = document.getElementById('title')
    const contentElement = document.getElementById('content')
    titleElement.append(data.title)
    contentElement.innerHTML = data.content
  })
  .catch(() => {
    navigator.serviceWorker.controller.postMessage('error_loading_content')
  })
