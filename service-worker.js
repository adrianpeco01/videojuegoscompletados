
const CACHE_NAME = 'mis-completados-v1';
const APP_URL = '/videojuegoscompletados/';

self.addEventListener('install', event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            cache.add(APP_URL)
        )
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key =>
                        key.startsWith('mis-completados-') &&
                        key !== CACHE_NAME
                    )
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const request = event.request;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.ok) {
                        const copy = response.clone();

                        caches.open(CACHE_NAME).then(cache =>
                            cache.put(request, copy)
                        );
                    }

                    return response;
                })
                .catch(async () => {
                    return (await caches.match(request)) ||
                           (await caches.match(APP_URL));
                })
        );
    }
});
