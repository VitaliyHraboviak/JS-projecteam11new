const e=document.querySelector(".modal"),o=e.querySelector(".modal-content"),t=e.querySelector(".js-modal-close");function l(){e.style.display="none"}let c,n;document.querySelector(".book-cover").addEventListener("click",(function(){e.style.display="block"})),t.addEventListener("click",l),o.addEventListener("click",(e=>{e.target===o&&l()})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&l()}));const s=document.querySelector(".scroll-to-top");function d(){c>0?(window.scrollTo(0,scroller),c-=20,n=setTimeout(d,20)):(clearTimeout(n),window.scrollTo(0,0),s.style.opacity=1)}s.addEventListener("click",(()=>{scroller=window.pageYOffset,window.scrollTo(0,0),d(),s.style.opacity=.5})),window.onscroll=function(){window.pageYOffset>0?s.style.display="block":s.style.display="none"};
//# sourceMappingURL=index.4b367dbd.js.map
