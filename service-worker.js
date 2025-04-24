self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) =>
      cache.addAll([
        '/Cacher_Sys/',
        '/Cacher_Sys/index.html',
        '/Cacher_Sys/style/style.css',
        '/Cacher_Sys/js/main.js',
        '/Cacher_Sys/manifest.json',
        '/Cacher_Sys/assets/icons/icon-192.png',
        '/Cacher_Sys/assets/icons/icon-512.png'
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