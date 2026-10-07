// A waiting service worker is applied only when the learner chooses to reload.
(function(){
 if(!('serviceWorker' in navigator))return;
 let reloading=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading)location.reload()});
 navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>{
   function offer(){if(!reg.waiting||document.getElementById('studioUpdate'))return;const button=document.createElement('button');button.id='studioUpdate';button.textContent='Update ready — save your drawing, then tap to reload';button.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;z-index:100;background:#292c25;color:white;border:1px solid white;border-radius:8px;padding:16px;font:14px system-ui';button.onclick=()=>{reloading=true;reg.waiting?.postMessage({type:'ACTIVATE'})};document.body.append(button)}
   offer();reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)offer()})});
   reg.update().catch(()=>{});
   navigator.serviceWorker.ready.then(()=>{document.dispatchEvent(new Event('studio-offline-ready'))});
 }).catch(()=>{const el=document.querySelector('#m-offline');if(el)el.textContent='Offline download failed. Reconnect and reopen the app to retry.'});
})();
