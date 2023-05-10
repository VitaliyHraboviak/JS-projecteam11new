import { gallerysupport } from './gallery-support-Ukraine';


const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector(".track");


const cardsMarkup = createGalleryMarkup(gallerysupport);
track.insertAdjacentHTML('beforeend', cardsMarkup);


function createGalleryMarkup(images) {
  return images.map(({ title, url, img, img2 }) => {
      return `
            <li class="card-container"> 
                <a href="${url}"> 
                    <img 
                        class="card card1" 
                        srcset="${img} 1x, ${img2} 2x"
                        src="${img}" 
                    /> 
                </a> 
            </li>
        `;
    })
    .join('');
};

let height = carousel.offsetHeight;
let index = 0;
let isNextClick = false;

window.addEventListener("resize", function () {
  height = carousel.offsetHeight;
});

next.addEventListener("click", function (e) {
  e.preventDefault();
  index += 1;
  if (isNextClick && index > 1) {
    index = 0;
  }
  
  prev.classList.add("show");
  track.style.transform = "translateY(" + index * -height + "px)";
  
  if (track.offsetHeight - index * height < height * 1) {
    next.classList.add("hide");
    
  } index = 0;

if (index === 1) {
    isNextClick = true;
  } else {
    isNextClick = false;
  }

});

prev.addEventListener("click", function () {
 track.style.transform = "translateY(" + index * -height + "px)";
  
  if (track.offsetHeight - index * height < height * 1) {
    next.classList.add("hide");
    
  } index = 0;
  
  next.classList.remove("hide");
  if (index === 0) {
    prev.classList.remove("hide");
  }
  
});