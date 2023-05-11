import {renderCategory} from './best_sellers_render'
import {FetchBooks} from './best_sellers_fetch';
// import { makeBestesselersOneMoreTime } from './best_sellers_render';
const categoriesBlock = document.querySelector('.categories-list');
 
const topBooks = document.querySelector('.book-gallery');
const allCategories = document.querySelector('.all-categories')
const allCategoriesItems = document.querySelectorAll('.categories-item')
const allCategoriesItem = document.querySelector('.categories-item')
 categoriesBlock.addEventListener('click', chooseCategory);

 
allCategoriesItem.addEventListener('click',makeActive )
function makeActive() {
allCategoriesItems.forEach(itemCategory => {
  itemCategory.addEventListener('click', event => {
    const activeCategory = document.querySelector(
      '.active'
    );
    if (activeCategory) {
      activeCategory.classList.remove('active');
      console.log('remove')
    }
    event.target.classList.add('active');
    console.log('add')

  });
});
}

function chooseCategory(event) {
 makeActive() 

  event.preventDefault();
  console.dir(event);
  // console.dir(event.target.value);
  // console.dir(event.target.classList);

   



   
    // event.target.classList.toggle("active")
  

  if (event.target.classList.contains("all-categories")) {
    // makeBestesselersOneMoreTime();///// waiting for import from bestsellersrender
    if (topBooks.innerHTML) {
      topBooks.innerHTML = '';
    }
    return;
  } else if (event.target.nodeName !== 'LI') {
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
         
        try {
          const categoriesTitle = document.querySelector('.title-best-sellers')
          categoriesTitle.innerHTML = `<h2 class="title-best-sellers">${event.target.innerHTML
          .trim()
          .split(' ')
          .slice(0, length - 1)
          .join(' ')} <span class="title-best-sellers-color">${event.target.innerHTML
          .trim()
          .split(' ')
          .pop()}</span></h2>`} catch (error) {
            console.log('Oops! Something went wrong');
          }
         
      });
       

    function buildTopBooksMarkup({ list_name, title, author, book_image, _id }) { 
      return `
      <li class="item-category-book" data-book-id="${_id}">
        <a class="link-books-render" href="#" onclick="event.preventDefault()">
          
            <div class="img-card-book">
              <img src="${book_image}" alt="book" class="img-book">
              
            </div>
            <div class="book-info">
              
                <p class="title-book">${title}</p>
              
              
                <p class="author-book">${author}</p>
             
            </div>
          
        </a>
      </li>
    
    `;
    }
  }
}

 