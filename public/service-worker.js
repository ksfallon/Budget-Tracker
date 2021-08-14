const STATIC_CACHE = "my-site-cache-v1"; // holds all of our webpages that will render
const DATA_CACHE_TIME = "data-cache-v1"; // hold all of the data thats entered - any changes to the Database goes inside here

const FILES_TO_CACHE = [   //const to cache are all the ones under PUBLIC
  "/",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // "/index.html",
  "/index.js",
  "/style.css",
  "/db.js",
  "/manifest.webmanifest",
];

// self points straight to service worker - when you add an event listener when its offline THEN, take all the files needed for statics use and activate them.
self.addEventListener("install", (event) => {
 //Perform install steps
  event.waitUntil(
    caches
      .open(STATIC_CACHE) //first get the static-cache - (line 11 for def)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE) //second get all of the files - homepage link (/), icons, index, style, database(db);
        .catch(err => console.log('ERROR: ', err));
      })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // cache all GET requests to/api routes
    if (event.request.url.includes("/api/")) {
      event.respondWith(
      // make network request and fallback to cache if network request fails (offline)
        caches
          .open(DATA_CACHE_TIME) // .. we will cache that data as the response
            .then((cache) => {
              return fetch(event.request)
                .then((response) => {
                  // If the response is good, clone it and store it in the cache
                  if (response.status === 200) {
                    cache.put(event.request.url, response.clone()); //saying not supported
                  }
                  return response;
                })
                .catch((err) => {
                  return caches.match(event.request)
                });
            })
            .catch(error => console.log(error))  
        );
        return;
    }

  // use cache first for all other requests for performance
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          }
          if (event.request.headers.get('accept').includes('text/html')) {
                      // return the cached home page for all requests for html pages
            return caches.match('/')
          }
        })
      })
    )
});

// self.addEventListener("activate", (event) => {
//   const currentCaches = [STATIC_CACHE, DATA_CACHE_TIME]
//   event.waitUntil(
//       caches.keys().then(cacheData => {
//           return cacheData.filter(
//               cacheData => !currentCaches.includes(cacheData)
//           );
//       }).then(cachesToDelete => {
//           return Promise.all(
//               cachesToDelete.map(deleteThisCache => {
//                   return caches.delete(deleteThisCache)
//               })
//           )
//       }).then(() => self.clients.claim())
//   )
// });
