self.addEventListener('install', e => {
  e.waitUntil(caches.open('v2').then(cache => {
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

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => {
    return res || fetch(e.request).then(resp => {
      return caches.open('v2').then(cache => {
        cache.put(e.request, resp.clone());
        return resp;
      });
    });
  }));
});

self.addEventListener('activate', e => {
  let cacheKeepList = ['v2'];

  e.waitUntil(caches.keys().then(keyList => {
    return Promise.all(keyList.map(key => {
      if (!cacheKeepList.includes(key)) {
        return caches.delete(key);
      }
    }));
  }));
});