self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) =>
      cache.addAll([
        '/',
        '/index.html',
        '/style/style.css',
        '/js/main.js',
        '/manifest.json',
        '/assets/icons/icon-192.png',
        '/assets/icons/icon-512.png'
      ])
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});