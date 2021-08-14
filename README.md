<h1 align ="center"> Budget Tracker </h1>

Link to [Heruko page](https://budget-tracker-221.herokuapp.com/).
<br>
Link to [Budget Track Github page](https://github.com/ksfallon/Budget-Tracker).

### **TABLE OF CONTENTS:**
1. [Overview of Budget PWA](#1-overview-of-budget-pwa)
2. [Manifest.webmanifest](#2-manifest)
3. [IndexedDB database: db.js](#3-indexeddb-database-db-js)
4. [Service Worker](#1-service-worker)

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
The service-worker runs separately from the main brower and is used to retrieve informtaion from the cache, to cache information or data and also for certain network requests. 

A service-worker is necessary to create a PWA because it grabs the information from the webpage in 3 variables:
1. Files to cache
2. Static to cache
3. Data to cache.

1. The Files to cache are all of the files for the front-end of the website. Such as: icons, index.html, index.js, style.css, the "/", the manifest and any database. The paths to these files are held in an array equal to this const FILES_TO_CACHE (the name can be different, this is just a common variable name for this array.)

2. 
The service-worker has a special function within it's script tag in the index.html:
`(function () {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js", { scope: "/" })
            .then(() => console.log("Service Worker registered successfully."))
            .catch(error => console.log("Service Worker registration failed:", error));
    }
})`

This code registers the service worker to the server.

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).
