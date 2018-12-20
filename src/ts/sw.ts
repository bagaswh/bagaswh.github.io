export function setupServiceWorker() {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .then(registration => {
          registration.update();

          registration.addEventListener('updatefound', e => {
            let worker = registration.installing;

            worker &&
              worker.addEventListener('statechange', e => {
                if (worker) {
                  switch (worker.state) {
                    case 'installed': {
                      resolve('Done installing.');
                    }
                  }
                }
              });
          });
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}
