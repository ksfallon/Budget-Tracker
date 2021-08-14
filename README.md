<h1 align ="center"> Budget Tracker </h1>

Link to [Heruko page](https://budget-tracker-221.herokuapp.com/).
<br>
Link to [Budget Track Github page](https://github.com/ksfallon/Budget-Tracker).

### **TABLE OF CONTENTS:**
1. [Overview of Budget PWA](#1-overview-of-budget-pwa)
2. [Manifest.webmanifest](#2-manifest)
3. [IndexedDB database: db.js](#3-indexeddb-database-db-js)
4. [Service Worker](#1-service-worker)
5. [Screen Shots](#5-screen-shots)

## 1. Overview of Budget PWA
The goal of this project is to add code to make this Budget webpage a PWA that also had complete functionality when offline. In order to do these steps several components need to be created: 

1. manifest.webmanifest - a manifest file for the PWA 
2. db.js - a database file for indexedDB
3. service-worker.js - for the manifest and the database.

I created these files and then I needed to call them in the index.html file. manifest is called in a link tag below the css link tag. The db.js and the service-worker are attached with script tags below the index.js script tag.

The following sections will explain what each file does and why it is necessary to have for the PWA to be created and work-offine successfully.

## 2. Manifest.webmanifest
## 3. IndexedDb database - db.js
## 4. Service Worker
- The service-worker runs separately from the main brower and is used to retrieve informtaion from the cache, to cache information or data and also for certain network requests. 
- That is why it is necessary for the PWA because it holds all of the information that appears while online, and can display that information while offline - this includes database information when connected to an online database and indexedDB for offline caching.

- A service-worker is necessary to create a PWA because it grabs the information from the webpage in 3 variables:
1. Files to cache
2. Static to cache
3. Data to cache.

1. The Files to cache are all of the files for the front-end of the website. Such as: icons, index.html, index.js, style.css, the "/", the manifest and any database. The paths to these files are held in an array equal to this const **FILES_TO_CACHE** (the name can be different, this is just a common variable name for this array.)

2. Static to cache holds all of the webpages that will render. My const name is **STATIC_CACHE**

3. Data to cache holds any data that is entered.My const name is **DATA_CACHE_TIME**

Service workers are asynchronous and rely on promises. All of the functions use then statements, (which could also be async awaits). Also most of the functions in the service worker start with *self* which is used to tell the service worker to do something.

- The first function `self.addEventListener("install"`... tells the service worker that if the website is offline, then open the **STATIC_CACHE** and load the webpages that way. Then add all of the files from ***FILES_TO_CACHE**

- The second function `self.addEventListener("activate"` ... checks to see if there are old caches that do not match the current caches of **STATIC_CACHE, DATA_CACHE_TIME** and if there are caches that are no longer current, they are mapped through and deleted.

- The third function `self.addEventListener("fetch",` ... is used to handle api routes when the GET, POST, PUT or DELETE happens offline. The data is cached as a response instead of being sent to the server or online database.

- the final function `event.respondWith` deals with all other requests, and what to do if a request is not in cache (need to make a network request and put that response in cache.)

-The service-worker has a special function within it's script tag in the index.html:
`(function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js", { scope: "/" })
            .then(() => console.log("Service Worker registered successfully."))
            .catch(error => console.log("Service Worker registration failed:", error));
    }
})`

This code registers the service worker to the server.

## 5. Screen Shots 

offline data caching.

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).
