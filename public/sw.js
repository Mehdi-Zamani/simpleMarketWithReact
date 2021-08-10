const version = 0.4;

const staticCacheName = `site-static-v-${version}`;
const fontCacheName = `font-cache-v-${version}`;
const imageCacheName = `imageCache-v-${version}`;
const dynamicCacheName = "site-dynamic";

const assets = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/3.chunk.js",
  "/manifest.json",
];
const imageAssets = [
  "/logo192.png",
  "/favicon.ico",
  "https://i.ibb.co/cvpntL1/hats.png",
  "https://i.ibb.co/px2tCc3/jackets.png",
  "https://i.ibb.co/0jqHpnp/sneakers.png",
  "https://i.ibb.co/GCCdy8t/womens.png",
  "https://i.ibb.co/R70vBrQ/men.png",
];
const fontAssets = [
  "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap",
  "https://fonts.gstatic.com/s/opensanscondensed/v15/z7NFdQDnbTkabZAIOl9il_O6KJj73e7Ff1GhDuXMR7eS2Ao.woff2",
  "https://fonts.gstatic.com/s/opensanscondensed/v15/z7NFdQDnbTkabZAIOl9il_O6KJj73e7Ff1GhDuXMRw.woff2 ",
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
    caches
      .open(staticCacheName)
      .then((cache) => {
        cache.addAll(assets).catch((err) => {
          console.warn(`failed to update ${staticCacheName}.`, err);
        });
      })
      .then(() => {
        caches.open(imageCacheName).then((cache) => {
          cache.addAll(imageAssets).catch((err) => {
            console.warn(`failed to update ${imageCacheName}.`, err);
          });
        });
      })
      .then(() => {
        caches.open(fontCacheName).then((cache) => {
          cache.addAll(fontAssets).catch((err) => {
            console.warn(`failed to update ${imageCacheName}.`, err);
          });
        });
      })
      .then(() => {
        IDB();
      })
  );
});

//=== active ==================================
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(
            (key) =>
              key !== staticCacheName &&
              key !== imageCacheName &&
              key !== fontCacheName
          )
          .map((key) => caches.delete(key))
      );
    })
  );
});

//== fetch =====================================
self.addEventListener("fetch", (e) => {
  if (!(e.request.url.indexOf("http") === 0)) {
    return fetch(e.request.url);
  }
  let opts = {
    cache: "no-cache",
  };
  if (!e.request.url.startsWith(location.origin)) {
    //not on the same domain as my html file
    opts.mode = "cors";
    opts.credentials = "omit"; // prevent to send data such as cookie to other host
  }

  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(e.request.url, opts).then((fetchRes) => {
          //== indexed DB ================================
          //******* add dynamic data to indexed db later*********************************
          //=========== error =============================
          //not ok 404 error
          /*  if (fetchRes.status == 404) {
            if (e.request.url.match(/\.html/i)) {
              return caches.open(staticCacheName).then((cache) => {
                return cache.match("/404.html"); //define this file in static cache
              });
            }
            if (
              e.request.url.match(/\.jpg$/i) ||
              e.request.url.match(/\.png$/i)
            ) {
              return caches.open(imageCacheName).then((cache) => {
                return cache.match("/img/replacedIMG.jpg"); //define a picture for when pic did n't upload
              });
            }
          } */
          // =============== do default ========================
          let type = fetchRes.headers.get("Content-Type");
          if (type && type.match(/^image\//i)) {
            //save in image cache
            return caches.open(imageCacheName).then((cache) => {
              cache.put(e.request, fetchRes.clone());
              return fetchRes;
            });
          } else {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(e.request, fetchRes.clone());
              return fetchRes;
            });
          }
        })
        /* .catch((err) => {
            //this is the network failure
            //return the 404.html file if it is a request for an html file
            if (e.request.url.match(/\.html/i)) {
              return caches.open(staticCacheName).then((cache) => {
                return cache.match("/404.html");
              });
            }
          }) */
      );
    })
  );
});
