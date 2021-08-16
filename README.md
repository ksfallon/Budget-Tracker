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
- The manifest is needed to make sure that the PWA is discoverable in the brower.
- It is a file that is composed of an object that gives the parameters for the layout/look of the Progressive Web App (PWA) - how it will appear to the user.
- This includes the app name, a short name (nick name), and the icons that will give it the app look.
- You can also set the orientation and display. I chose portrait (for orientation) and standalone (for display) because these two parameters give the PWA the look and the layout of an app and different to just a regular webpage in a browser.
- I gave a brief "description" about what the Budget App does, and I also chose "background_color" and "theme_color". That give a top border to distinguish it from a regular browser page.

## 3. IndexedDB database - db.js
The indexedDB is a place to store incoming data in the cache instead of local storage. Service workers cannot work with local storage but can work with indexedDB.

- For this webpage the indexedDB is only needed to cache data when the webpage is offline. While its offline the user can input budget information that is first held in indexedDB and then added to the online database (MongoDB) when the webpage is back online.

- The first portion of the code is to open the *"budget"* database and create an object store inside the indexedDB called *"BudgetNew"* with a keypath called *listID*.

- The two main functions in the db.js file are: 

- The *saveRecord()* function which: 
    - creates a transaction on the pending db with readwrite access. 
    - access the pending object store. 
    - Add record to your store with add method.
- The *checkDatabase()* 
    - open a transaction on your pending db
    - access your pending object store and get all records from store and set to a variable
    - if successful, open a transaction on your pending db access your pending object store clear all items in your store

The last line is a window event listener to check when the app goes back online, go to the checkDatabase function.
## 4. Service Worker
- The service-worker runs separately from the main brower and is used to retrieve informtaion from the cache, to cache information or data and also for certain network requests. 
- That is why it is necessary for the PWA because it holds all of the information that appears while online, and can display that information while offline - this includes database information when connected to an online database and indexedDB for offline caching.

- A service-worker is necessary to create a PWA because it grabs the information from the webpage in 3 variables:
1. Files to cache
2. Static to cache
3. Data to cache.

1. The Files to cache are all of the files for the front-end of the website. Such as: icons, index.html, index.js, style.css, the "/", the manifest and any database. The paths to these files are held in an array equal to this const **urlsToCache** (the name can be different, this is just a common variable name for this array.)

2. Static to cache holds all of the webpages that will render. My const name is **CACHE_NAME**

3. Data to cache holds any data that is entered.My const name is **DATA_CACHE_NAME**

Service workers are asynchronous and rely on promises. All of the functions use then statements, (which could also be async awaits). Also most of the functions in the service worker start with *self* which is used to tell the service worker to do something.

- The first function `self.addEventListener("install"`... tells the service worker that if the website is offline, then open the **CACHE_NAME** and load the webpages that way. Then add all of the files from ***urlsToCache**

<!-- - The second function `self.addEventListener("activate"` ... checks to see if there are old caches that do not match the current caches of **CACHE_NAME**, **DATA_CACHE_NAME** and if there are caches that are no longer current, they are mapped through and deleted. -->

- The second function `self.addEventListener("fetch",` ... is used to handle api routes when the GET, POST, PUT or DELETE happens offline. The data is cached as a response instead of being sent to the server or online database.

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
- Here is a Screen Shot when the PWA is Offline and items are being stored in the IndexedDB
![Offline](https://github.com/ksfallon/Budget-Tracker/blob/main/assets/offline_with_indexDB.png?raw=true)

- Here is a Screen Shot when the PWA is back Online and items are being stored in the MongoDB now
![Online](https://github.com/ksfallon/Budget-Tracker/blob/main/assets/online_added_data.png?raw=true)

offline data caching.

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).
