// Service Worker para la versión web (en la APK no se usa: los archivos ya van dentro).
// Primero intenta la red (así siempre tienes la última versión) y, si no hay internet,
// usa la copia guardada. Las peticiones a Firebase no se tocan.
const CACHE_NAME = 'nuestra-compra-v9';
const SHELL = [
  './', './index.html', './firebase-config.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './vendor/ok.js', './vendor/tailwind.css', './vendor/fontawesome/css/all.min.css',
  './vendor/firebase-app-compat.js', './vendor/firebase-auth-compat.js',
  './vendor/firebase-firestore-compat.js', './vendor/confetti.browser.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Firebase, CDNs, WhatsApp: directo a la red

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
