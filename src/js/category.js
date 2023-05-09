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
    categoriesList.innerHTML = markup;
  });

function buildCategoriesListMarkup({ list_name }) {
  const listName = list_name;
  return `
         <li><a href="" class="categories-item">${listName}</a></li>
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