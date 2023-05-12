fetch('https://books-backend.p.goit.global/books/category-list', {
  method: 'GET',
  headers: { accept: 'application/json' },
})
  .then(response => {
    // console.log({ response });
    return response.json();
  })
  .then(resData => {
    // console.log({ resData });
    const categoriesList = document.querySelector('.categories-list');
    const markup = resData.map(buildCategoriesListMarkup).join('');
    categoriesList.insertAdjacentHTML('beforeend' , markup)
  });

function buildCategoriesListMarkup({ list_name }) {
  const listName = list_name;
  return `
         <li class="categories-item">${listName}</li>
    `;
}
/////////////////////////////////////////////
export async function makeCategoriesListArray() {
  let categoriesArray = '';
  await fetch('https://books-backend.p.goit.global/books/category-list', {
    method: 'GET',
    headers: { accept: 'application/json' },
  })
    .then(response => {
      // console.log({ response });
      return response.json();
    })
    .then(resData => {
      console.log(resData);
      resData.map(createCategoriesPull);

    
  


      function createCategoriesPull() {
        // console.log(resData);
        for (let i = 0; i < resData.length; i += 1) {
          categoriesArray += resData[i].list_name;
          return categoriesArray;
        }
      }
      console.log(createCategoriesPull());
      return categoriesArray;
    });
}
//  ///////
const categoriesBlock = document.querySelector('.categories-item');
const allCategoriesItems = document.querySelectorAll('.categories-item')
console.log(allCategoriesItems)

categoriesBlock.addEventListener('click', makeActive);
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