const VERSION="moony-20261007-1";
const CACHE='rakan-moony-'+VERSION;
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./updates.js",
  "./moony/app.js",
  "./moony/art/cliffs.jpg",
  "./moony/art/clouds.jpg",
  "./moony/art/dunes.jpg",
  "./moony/art/forest.jpg",
  "./moony/art/mountains.jpg",
  "./moony/art/oasis.jpg",
  "./moony/art/tree.jpg",
  "./moony/art/village.jpg",
  "./moony/catalog.json",
  "./moony/lessons/blend.json",
  "./moony/lessons/cliffs.json",
  "./moony/lessons/clouds.json",
  "./moony/lessons/cone.json",
  "./moony/lessons/cube.json",
  "./moony/lessons/cylinder.json",
  "./moony/lessons/dunes.json",
  "./moony/lessons/edges.json",
  "./moony/lessons/forest.json",
  "./moony/lessons/grip.json",
  "./moony/lessons/hatching.json",
  "./moony/lessons/mountains.json",
  "./moony/lessons/oasis.json",
  "./moony/lessons/onepoint.json",
  "./moony/lessons/sphere.json",
  "./moony/lessons/texture.json",
  "./moony/lessons/tree.json",
  "./moony/lessons/twopoint.json",
  "./moony/lessons/values.json",
  "./moony/lessons/village.json",
  "./moony/reference.js",
  "./moony/render.js",
  "./moony/storage.js",
  "./moony/style.css"
];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);try{await cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))}catch(error){await caches.delete(CACHE);throw error}})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{await self.clients.claim();const clients=await self.clients.matchAll();for(const client of clients)client.postMessage({type:'OFFLINE_READY'});const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('rakan-moony-')&&n!==CACHE).map(n=>caches.delete(n)))})())});
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE')self.skipWaiting()});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.endsWith('/version.json'))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);if(event.request.mode==='navigate'){const shell=await cache.match('./index.html');return shell||fetch(event.request)}return (await cache.match(event.request,{ignoreSearch:true}))||fetch(event.request)})())});
