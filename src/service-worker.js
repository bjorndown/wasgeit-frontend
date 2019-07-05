const CACHE_NAME = 'wasgeit-cache';
let urlsToCache = [
    '/vendors.bundle.js',
    '/runtime.bundle.js',
    '/main.bundle.js',
    '/rest/agenda',
    '/rest/news',
    '/manifest.json',
    '/assets/apple-touch-icon.png',
    '/assets/apple-touch-icon-120x120.png',
    '/assets/icon-48.png',
    '/assets/icon-96.png',
    '/assets/icon-144.png',
    '/assets/icon-192.png'
];

self.addEventListener('install', function(evt) {
    console.debug('The service worker is being installed.');
    evt.waitUntil(precache());
    return self.skipWaiting();
});

self.addEventListener('activate', function() {
    return self.clients.claim();
});

function shouldBeCached(url) {
    return urlsToCache.some(pathToCache => url.endsWith(pathToCache));
}

self.addEventListener('fetch', function(evt) {
    if (shouldBeCached(evt.request.url)) {
        console.debug('serving from cache: ' + evt.request.url);
        evt.respondWith(fromCache(evt.request));
        console.debug('updating cacheable request: ' + evt.request.url);
        evt.waitUntil(update(evt.request));
    } else {
        console.debug('fetching not-to-cache request: ' + evt.request.url);
        evt.waitUntil(fetch(evt.request))
    }
});

function precache() {
    return caches.delete(CACHE_NAME).then(function() {
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        });
    });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request.url).then(function (matching) {
            if (!matching) {
                console.debug(request.url + ' not cached yet.')
                return Promise.reject('cache-miss')
            }
            return matching
        });
    });

}
function update(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request.url, response.clone());
        });
    });
}
