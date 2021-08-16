const CACHE_NAME = 'my-site-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const urlsToCache = [
  '/',
  '/db.js',
  '/index.js',
  '/manifest.json',
  '/styles.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch(err => console.log('err!!!!!! ', err));
    })
  );
});

self.addEventListener('fetch', function (event) {
  // cache all get requests to /api routes
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }

              return response;
            })
            .catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(event.request);
            });
        })
        .catch((err) => console.log(err))
    );
    
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
        if (event.request.headers.get('accept').includes('text/html')) {
          // return the cached home page for all requests for html pages
          return caches.match('/');
        }
      });
    })
  );
});

// const CACHE_NAME = 'static-cache-v1'; //had v2, changed to v1
// const DATA_CACHE_NAME = 'data-cache-v1';
// const urlsToCache = [
//   '/',
//   '/db.js',
//   '/index.html',
//   '/index.js',
//   '/manifest.json',
//   '/service-worker.js', //added, maybe its the problem
//   '/styles.css',
//   '/icons/icon-192x192.png',
//   '/icons/icon-512x512.png',
// ];
// ​
// self.addEventListener('install', (event) => {
//   // Perform install steps
//   // should i add an event.waitUntil for the DATA_CACHE_NAME ?
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log('Successfully Opened Cache');
//       return cache.addAll(urlsToCache)
//       .catch(err => console.log('There is an error! ', err));
//     })
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   // const currentCaches = [STATIC_CACHE, DATA_CACHE_TIME]
//   event.waitUntil(
//       caches.keys().then(cacheData => {
//           return Promise.all(
//             cacheData.map(data => {
//               if (data !== DATA_CACHE_NAME && data !== CACHE_NAME) {
//                 //map through to delete old data
//                 console.log("old cached data is REMOVED", data)
//                 return caches.delete(data)
//               }
//             })
//         );
//     })
// );
// self.clients.claim();
// });
// ​
// self.addEventListener('fetch', (event) => {
//   // cache all get requests to /api routes
//   if (event.request.url.includes('/api/')) {
//     event.respondWith(
//       caches
//         .open(DATA_CACHE_NAME)
//         .then((cache) => {
//           return fetch(event.request)
//             .then((response) => {
//               // If the response was good, clone it and store it in the cache.
//               if (response.status === 200) {
//                 cache.put(event.request.url, response.clone());
//               }
// ​
//               return response;
//             })
//             .catch((err) => {
//               // Network request failed, try to get it from the cache.
//               return cache.match(event.request);
//             });
//         })
//         .catch((err) => console.log("Error from fetch function", err))
//     );
// ​
//     return;
//   }
// ​
//   event.respondWith(
//     fetch(event.request).catch(() => {
//       return caches.match(event.request).then((response) => {
//         if (response) {
//           return response;
//         }
//         if (event.request.headers.get('accept').includes('text/html')) {
//           // return the cached home page for all requests for html pages
//           return caches.match('/');
//         }
//       });
//     })
//   );
// });

//changed
// line 1 - 'static-cache-v2'
// line 7 - added 'index.html'
// line 15 - es 6 function
// line 18 - es 6 function
// line 24 - added self.skipWaiting()
// line 27 - put "activate" function back in

