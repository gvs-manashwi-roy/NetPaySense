const CACHE_NAME = 'netpaysense-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=4.5',
  './app.js?v=4.5',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Install event: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event: Network-first strategy for dynamic, Cache-first for static
self.addEventListener('fetch', event => {
  // Do not intercept API calls (/predict, /test-download, /feedback, etc.)
  if (event.request.url.includes('/predict') || 
      event.request.url.includes('/test-download') || 
      event.request.url.includes('/feedback') ||
      event.request.url.includes('/bank-status') ||
      event.request.url.includes('speed.cloudflare.com') ||
      event.request.url.includes('ipapi.co')) {
    return; // Let the browser handle these normally (with our app.js abort controllers)
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found, otherwise fetch from network
        return cachedResponse || fetch(event.request).then(response => {
          // Add dynamically fetched assets to cache
          return caches.open(CACHE_NAME).then(cache => {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      }).catch(() => {
        // If both cache and network fail (offline), fallback to index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
