import {renderCategory} from './best_sellers_render'
import {FetchBooks} from './best_sellers_fetch';
const categoriesBlock = document.querySelector('.categories-list');
categoriesBlock.addEventListener('click', chooseCategory);
const topBooks = document.querySelector('.book-gallery');
function chooseCategory(event) {
  event.preventDefault();
  // console.dir(event);
  // console.dir(event.target.value);
  // console.dir(event.target.classList);

  if (event.target.innerHTML === 'All categories') {
    renderCategory();
    if (topBooks.innerHTML) {
      topBooks.innerHTML = '';
    }
    return;
  } else if (event.target.nodeName !== 'A') {
    return;
  } else {
    const selectedCategory = event.target.textContent;
    fetch(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`,
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      }
    )
      .then(response => {
        //   console.log({ response });
        return response.json();
      })
      .then(resData => {
        // console.log({ resData });
        console.log(resData);
        console.log({ resData });
        const removedBestsellersHTML =
          document.querySelector('.render-container');
        const removedChosenHTML = document.querySelector('.book-gallery');
        if (removedBestsellersHTML) {
          removedBestsellersHTML.innerHTML = '';
        }
        if (removedChosenHTML) {
          removedChosenHTML.innerHtml = '';
        }

        //   const chosen = document.querySelector('.chosen');
        const markup = resData.map(buildTopBooksMarkup).join('');
        removedChosenHTML.innerHTML = markup;
      });

    function buildTopBooksMarkup({ list_name, title, author, book_image }) {
      // console.log(books);
      ///////insert markup for books from choosen category///////////////////////
      //   for (let i = 0; i < resData.length; i += 1) {
      // returning HTML markup as JS String
      return `
    <ul class="ul-chosen-categories"> 
  <li> ${list_name}</li>
  <li> ${title}</li>
  <li> ${author}</li>
  <li> <img src="${book_image}" alt="books photo" /></li>
</ul>
    `;
    }
  }
}
