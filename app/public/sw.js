/* global self caches clients fetch */
const version = 11
const cacheName = 'myCache'

console.log('Service Worker code:' + version)

self.addEventListener('install', function (event) {
  console.log('WORKER: install event in progress.')
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/styles.css',
          '/public/bundle.js',
          '/offline.json'
        ])
      })
      .then(function () {
        console.log('WORKER: install completed.')
      })
      .catch(err => console.log('WORKER: install event error', err))
  )
})

self.addEventListener('activate', event => {
  console.log('WORKER: activate event in progress.')
  event.waitUntil(
    clients.claim()
      .then(() => console.log('WORKER: activate completed.'))
      .catch(err => console.log('WORKER: activate event error', err))
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(async () => {
      if (await cacheExists(event.request)) {
        return caches.match(event.request)
      }
      return caches.match('/offline.json')
    })
  )
})

self.addEventListener('message', (event) => {
  console.log('event message', event)
  if (event.data === 'save_post_1') {
    event.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => cache.addAll(['http://localhost:9001/post/1']))
        .then(() => console.log('WORKER: added post to cache.'))
        .catch(err => console.log('WORKER: error adding post to cache', err))
    )
  }
})

const cacheExists = (request) => {
  return caches.open(cacheName)
    .then(function (cache) {
      return cache.match(request)
        .then(function (response) {
          return !!response
        })
    })
}
