const staticCacheName = "site-static-v-0.4";
const dynamicCacheName = "site-dynamic-v-0.2";
const assets = [
  "/",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap",
  "/static/js/vendors~main.chunk.js",
  "/static/js/3.chunk.js",
  "https://i.ibb.co/cvpntL1/hats.png",
  "https://i.ibb.co/px2tCc3/jackets.png",
  "https://i.ibb.co/0jqHpnp/sneakers.png",
  "https://i.ibb.co/GCCdy8t/womens.png",
  "https://i.ibb.co/R70vBrQ/men.png",
];
//== limit cach size =======================
const limitCachSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCachSize(name, size));
      }
    });
  });
};
//=== install ==============================
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//=== active ==================================
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//== fetch =====================================
self.addEventListener("fetch", (evt) => {
  if (!(evt.request.url.indexOf("http") === 0)) return;
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            limitCachSize(dynamicCacheName, 30);
            return fetchRes;
          });
        })
        /* .catch((err) => {
            if (evt.request.url.indexOf(".html") > -1) {
              return caxhes.match("./pages/offline.html");
            }
          }) */
      );
    })
  );
});
