const CACHE_NAME = 'edo-kuruwita-v4';
const urlsToCache = [
  '/edo-Kuruwita-/',
  '/edo-Kuruwita-/index.html',
  '/edo-Kuruwita-/manifest.json',
  '/edo-Kuruwita-/Gemini_Generated_Image_j0n8wuj0n8wuj0n8%20(1).jpeg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
