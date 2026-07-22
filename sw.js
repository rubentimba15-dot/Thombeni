// Service worker mínimo — guarda a app em cache para: (1) o telemóvel a
// considerar "instalável" com ícone no ecrã principal, e (2) garantir que
// abre mesmo sem internet, mesmo depois de o browser limpar o cache normal.
const CACHE = 'ala-ruben-v1';
const FICHEIROS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FICHEIROS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resposta => resposta || fetch(event.request))
  );
});
