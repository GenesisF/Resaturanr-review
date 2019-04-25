var staticCacheName = 'restaurant-cache-1';
 
// each file caches a new number so the user dont lose the page

 let urlToCache = [
  '/',
  './restaurant.html',
  './css/styles.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js',

];

//  Adding the cache with our URL location

self.addEventListener('install', function(event) {
  
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log(cache);
      return cache.addAll(urlToCache);

    }).catch(error => {
      console.error(error);
    })
  );

});

// Activate the service worker, and evry time it get register delate the old cache 

self.addEventListener('activate', function (event) {
  
  event.waitUntil((async function (){
    
    try{
      const cacheNames = await caches.keys();
      
      return Promise.all(cacheNames.filter(function (cacheName) {
        return cacheName.startsWith('restaurant-') &&
          cacheName != staticCacheName;
      }).map(function (cacheName) {
        return caches.delate(cacheName);
      }));
      
    }
    catch (error) {
      console.error(error);
    }

  })());
   
  // I wrote this promise before use asyn fucntion  
  
  /* event.waitUntil(
    caches.keys().then(async function (cacheNames) {
      try {
        return Promise.all(cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delate(cacheName);
        }));
      }
      catch (error) {
        console.error(error);
      }
    })
  ); */
});

// If is Offline it will handle the return request of the main page

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  )
});


