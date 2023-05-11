let scroll;
let timer;

export const scrollBtn = document.querySelector('.scroll-to-top');
scrollBtn.addEventListener('click', () => {
        scroll = window.pageYOffset;
        window.scrollTo(0, 0);
    scrollToTop();
    scrollBtn.style.opacity = 0.5;
});

function scrollToTop() {
    if (scroll > 0) {
        window.scrollTo(0, scroll);
        scroll = scroll- 20;
        timer = setTimeout(scrollToTop, 20);
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
       scrollBtn.style.opacity = 1;
    };
};

  window.onscroll = function () {
    if ( window.pageYOffset > 0 ) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  };

  