const FILES_TO_CACHE = [
  //const to cache are all the ones under PUBLIC
  "/",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/index.html",
  "/index.js",
  "/style.css",
  "/db.js",
  "/manifest.webmanifest",
];

const STATIC_CACHE = "static-cache-v1"; // holds all of our webpages that will render
const DATA_CACHE_TIME = "data-cache-v1"; // hold all of the data thats entered - any changes to the Database goes inside here

// self points straight to service worker - when you add an event listener when its offline THEN, take all the files needed for statics use and activate them.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE) //first get the static-cache - (line 11 for def)
      .then((cache) => {
        cache.addAll(FILES_TO_CACHE); //second get all of the files - homepage link (/), icons, index, style, database(db),;
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    const currentCaches = [STATIC_CACHE, DATA_CACHE_TIME]
    event.waitUntil(
        caches.keys().then(cacheData => {
            return cacheData.filter(
                cacheData => !currentCaches.includes(cacheData)
            );
        }).then(cachesToDelete => {
            return Promise.all(
                cachesToDelete.map(deleteThisCache => {
                    return caches.delete(deleteThisCache)
                })
            )
        }).then(() => self.clients.claim())
    )
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("/api/")) {
    // if your request interacts with apis then..
        event.respondWith(
      // make network request and fallback to cache if network request fails (offline)
            caches
                .open(DATA_CACHE_TIME) // .. we will cache that data as the response
                .then((cache) => {
                    return fetch(event.request)
                        .then((response) => {
                            cache.put(event.request, response.clone());
                            return response;
                        })
                        .catch(() => caches.match(event.request));
          // caches.open(DATA_CACHE_TIME).then((response) => {
          //     cache.put(event.request, response.clone()).then(() => {
          //         console.log(response);
          //         return response;

          //     })
          // })
        })
    );
    return;
  }

  // use cache first for all other requests for performance
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

      // request is not in cache. make network request and cache the response
      return caches.open(DATA_CACHE_TIME).then((cache) => {
        return fetch(event.request).then((response) => {
          return cache.put(event.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  );
});
