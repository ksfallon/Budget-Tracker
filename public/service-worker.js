//const to cache are all the ones under PUBLIC
const FILES_TO_CACHE = [
    '/',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/index.html',
    '/index.js',
    '/style.css',
    '/db.js',
    '/manifest.webmanifest'
]

const STATIC_CACHE = 'static-cache-v1'; // holds all of our webpages that will render
const DATA_TIME = 'data-cache-v1'; // hold all of the data thats entered - any changes to the Database goes inside here

// self points straight to service worker - when you add an event listener when its offline THEN, take all the files needed for statics use and activate them.
// 
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.open(DATA_TIME)
            .then(cache => {
                return caches.open(DATA_TIME).then((response) => {
                    cache.put(event.request, response.clone()).then(() => {
                        console.log(response);
                        return response;
                        
                    })
                })
            })
        )
    }
})