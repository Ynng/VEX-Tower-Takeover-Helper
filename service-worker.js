// var cacheName = "cacheName_v4";
// // CODELAB: Add list of files to cache here.
// const FILES_TO_CACHE = [
//     '/',
//     '/index.html',
//     '/index.js',
//     '/index.webmanifest',
//     '/img/error_cube.png',
//     '/img/green_cube.png',
//     '/img/orange_cube.png',
//     '/img/purple_cube.png',
//     '/stylesheets/styles.css',
// ];

// // Install Service Worker
// self.addEventListener('install', function (event) {

//     console.log('Service Worker: Installing....');

//     event.waitUntil(

//         // Open the Cache
//         caches.open(cacheName).then(function (cache) {
//             console.log('Service Worker: Caching App Shell at the moment......');

//             // Add Files to the Cache
//             return cache.addAll(FILES_TO_CACHE.map(url => new Request(url, {credentials: 'same-origin'})));
//         })
//     );
// });

// // Fired when the Service Worker starts up
// self.addEventListener('activate', function (event) {

//     console.log('Service Worker: Activating....');

//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(cacheNames.map(function (key) {
//                 if (key !== cacheName) {
//                     console.log('Service Worker: Removing Old Cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
//     return self.clients.claim();
// });


// self.addEventListener('fetch', function(event) {

//     console.log('Service Worker: Fetch', event.request.url);

//     console.log("Url", event.request.url);

//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
// });