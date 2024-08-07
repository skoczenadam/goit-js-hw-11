import{i as p,S as u}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const f=document.querySelector("form"),c=document.querySelector("input[type=text]"),a=document.querySelector("ul"),n=document.querySelector("div"),d=()=>{a.innerHTML="",c.value=""},m=l=>{l.preventDefault();const r=c.value;d(),a.innerHTML!==""?n.classList.add("disable"):n.classList.remove("disable");const i=new URLSearchParams({key:"33296379-dab9a6cf136214dcc7548d115",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`https://pixabay.com/api/?${i}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{const e=t.hits.map(o=>`<li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img class="gallery-image"
          src="${o.webformatURL}" 
          alt="${o.tags}"
          /><div class="info">
          <p class="info-group"><span class="info-text">Likes</span> <span class="info-number">${o.likes}</span></p>
          <p class="info-group"><span class="info-text">Views</span> <span class="info-number">${o.views}</span></p>
          <p class="info-group"><span class="info-text">Comments</span> <span class="info-number">${o.comments}</span></p>
          <p class="info-group"><span class="info-text">Downloads</span> <span class="info-number">${o.downloads}</span></p>
          </div>
          </a>
        </li>`).join("");a.insertAdjacentHTML("beforeend",e),a.innerHTML!==""?n.classList.add("disable"):n.classList.remove("disable"),t.total===0&&(n.classList.add("disable"),p.show({message:"❌Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"})),new u(".gallery a",{captionDelay:250}).refresh()}).catch(t=>console.log(t))};f.addEventListener("submit",m);
//# sourceMappingURL=commonHelpers.js.map
