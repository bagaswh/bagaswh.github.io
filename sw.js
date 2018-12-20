const CACHE_NAME = 'v1.1';

function clearCache(event) {
  let cacheKeeplist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
}

self.addEventListener('install', event => {
  clearCache(event);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const crossOriginAssets = [new Request('https://use.fontawesome.com/releases/v5.6.1/css/all.css', {
        mode: 'cors'
      })];
      return cache.addAll([
        './',
        './index.html',
        './dist/css/style.min.css',
        './dist/js/bundle.js',
        './dist/lib/css/animate.min.css',
        './dist/lib/css/bulma.min.css',
        './dist/lib/css/normalize.css',
        'https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,700',
        ...crossOriginAssets
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }, err => {
        console.log('Failed to fetch. ' + err);
      });
    })
  );
});


self.addEventListener('activate', (event) => {
  clearCache(event);
});