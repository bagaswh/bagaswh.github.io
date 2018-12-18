var CACHE_NAME = 'v4';

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll([
      './',
      './index.html',
      './dist/css/style.min.css',
      './dist/js/bundle.js',
      './dist/lib/css/animate.min.css',
      './dist/lib/css/normalize.css'
    ]);
  }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (res) {
    return res || fetch(e.request).then(function (resp) {
      return caches.open(CACHE_NAME).then(function (cache) {
        cache.put(e.request, resp.clone());
        return resp;
      });
    });
  }));
});

self.addEventListener('activate', e => {
  let cacheKeepList = [CACHE_NAME];

  e.waitUntil(caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      if (!cacheKeepList.includes(key)) {
        return caches.delete(key);
      }
    }));
  }));
});