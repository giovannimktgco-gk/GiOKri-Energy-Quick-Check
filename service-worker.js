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





/****************************************************
 * GESTIONE RICHIESTE
 ****************************************************/

self.addEventListener(
"fetch",
event => {


event.respondWith(


  caches.match(event.request)

  .then(response =>

    response || fetch(event.request)

  )


);


});
