import { gallerysupport } from './gallery-support-Ukraine';


const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector(".track");


const cardsMarkup = createGalleryMarkup(gallerysupport);
track.insertAdjacentHTML('beforeend', cardsMarkup);


function createGalleryMarkup(images) {
  return images.map(({ title, url, img }) => {
      return `
            <li class="card-container"> 
                <a href="${url}"> 
                    <img 
                        class="card card1" 
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
  console.log('click');
  console.log(isNextClick);
  console.log(index);
  e.preventDefault();
  index += 1;
  if (isNextClick && index > 1) {
    index = 0;
  }
  console.log(index);
  prev.classList.add("show");
  track.style.transform = "translateY(" + index * -height + "px)";
  
  if (track.offsetHeight - index * height < height * 1) {
    next.classList.add("hide");
    
  } index = 0;
    console.log(isNextClick);
  console.log(index);
if (index === 1) {
    isNextClick = true;
  } else {
    isNextClick = false;
  }
    console.log(isNextClick);
  console.log(index);
});

prev.addEventListener("click", function () {
  console.log('click 2');
  console.log(isNextClick);
  console.log(index);
  index -= 1;
  next.classList.remove("hide");
  if (index === 0) {
    prev.classList.remove("hide");
  }
  
});