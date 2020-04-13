/* global self clients */
const version = 11

console.log('Service Worker code:' + version)

self.addEventListener('activate', event => {
  console.log('WORKER: activate event in progress.')
  event.waitUntil(
    clients.claim()
      .then(() => console.log('WORKER: activate completed.'))
      .catch(err => console.log('WORKER: activate event error', err))
  )
})

self.addEventListener('message', (event) => {
  if (event.data.msg === 'calculate') {
    self.clients.matchAll().then(function (client) {
      client[0].postMessage({
        msg: fibonacci(event.data.num)
      })
    })
  }
})

// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
function fibonacci (num) {
  if (num <= 1) return 1

  return fibonacci(num - 1) + fibonacci(num - 2)
}
