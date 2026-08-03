const CACHE = "giokri-energy-v2.1";

const FILES = [
"index.html",
"style.css",
"app.js",
"manifest.json"
];



/****************************************************
 * INSTALLAZIONE
 ****************************************************/

self.addEventListener(
"install",
event => {

  self.skipWaiting();


  event.waitUntil(

    caches.open(CACHE)

    .then(cache =>

      cache.addAll(FILES)

    )

  );

});




/****************************************************
 * ATTIVAZIONE
 ****************************************************/

self.addEventListener(
"activate",
event => {


  event.waitUntil(

    caches.keys()

    .then(keys =>

      Promise.all(

        keys.map(key => {

          if(key !== CACHE){

            return caches.delete(key);

          }

        })

      )

    )

  );


});





self.addEventListener(
"fetch",
event => {


const url = new URL(event.request.url);



/*
 Non intercettare chiamate esterne API
*/

if(
url.hostname.includes("script.google.com")
){

return;

}




event.respondWith(


caches.match(event.request)

.then(response =>

response || fetch(event.request)

)


);


});
