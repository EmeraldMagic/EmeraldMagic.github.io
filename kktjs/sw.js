// const url = 'http://localhost:8080';
const url = 'https://sumire.work';

const key = 'v1.2.8_10';

const cache_keys = [
  key
];
const file = [
  url + '/kktjs/',
  url + '/kktjs/css/style.css',
  url + '/kktjs/js/main_readable.js',
  url + '/kktjs/css/font-awesome.min.css',
  url + '/kktjs/sounds/boop.mp3',
  url + '/kktjs/fonts/roboto.ttf',
  url + '/kktjs/fonts/fontawesome-webfont.woff',
  url + '/kktjs/fonts/fontawesome-webfont.woff2',
  url + '/kktjs/img/sheet_64_indexed_128.png',
  url + '/kktjs/img/missing_icon.png',
  url + '/kktjs/img/favicon.ico',
  url + '/kktjs/img/touch/apple-touch-icon.png',
  url + '/kktjs/img/touch/chrome-touch-icon-192x192.png',
  url + '/kktjs/img/touch/icon-128x128.png',
  url + '/kktjs/img/touch/ms-touch-icon-144x144-precomposed.png',
  url + '/kktjs/img/touch/splashscreen-icon-512x512.png',
  url + '/kktjs/css/addtohomescreen.css',
  url + '/kktjs/css/emojipicker.css',
  url + '/kktjs/css/font-awesome.min.css',
  url + '/kktjs/js/addtohomescreen.min.js',
  url + '/kktjs/js/emojione.js',
  url + '/kktjs/js/inobounce.min.js',
  url + '/kktjs/js/lodash.min.js',
  url + '/kktjs/js/addtohomescreen.min.js',
  url + '/kktjs/js/vue.min.js',
  url + '/kktjs/js/picker.js',
  url + '/kktjs/js/manifest.json'
];

self.addEventListener('install', event => {
  // console.log("install");
  self.skipWaiting();
  event.waitUntil(
    caches.open(key).then(cache => {
      return Promise.all(
        file.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', event => {
  // console.log("activate");
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !cache_keys.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});