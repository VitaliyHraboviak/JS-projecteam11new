const bookGallery = document.querySelector('.book-gallery');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-content');
const closeButton = modal.querySelector('.js-modal-close');

if (bookGallery) {
  bookGallery.addEventListener('click', openModal);
}

function openModal(event) {
   if (event.target.closest('.item-category-book')) {
  //   const bookId = event.target.closest('.item-category-book').dataset.bookId;
  //   showModal(bookId);
     const bookElement = event.target.closest('.item-category-book');
     const bookId = bookElement.dataset.bookId;
     const bookData = getBookData(bookId);
     showModal(bookData);
  }
}
function getBookData(bookId) {
  return {
    id: bookId,
    coverImage: 'book-cover.jpg',
    name: 'Book Name',
    author: 'Author Name',
    description: 'Book description goes here.',
    tradingPlatforms: [
      { name: 'Platform 1', link: 'https://platform1.com' },
      { name: 'Platform 2', link: 'https://platform2.com' },
      { name: 'Platform 3', link: 'https://platform3.com' },
    ],
  };
}
// function showModal(bookId) {
//   //   console.log(Open modal for book with ID: ${bookId});
//   modal.style.display = 'block';
// }
function showModal(bookData) {
  modal.style.display = 'block';
  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${bookData.name}</h2>
      <button class="js-modal-close">Close</button>
    </div>
    <div class="modal-body">
      <img class="book-cover" src="${bookData.coverImage}" alt="Book Cover">
      <p><strong>Author:</strong> ${bookData.author}</p>
      <p><strong>Description:</strong> ${bookData.description}</p>
      <h4>Trading Platforms:</h4>
      <ul>
        ${bookData.tradingPlatforms
          .map(
            platform =>
              `<li><a href="${platform.link}" target="_blank">${platform.name}</a></li>`
          )
          .join('')}
      </ul>
      <button class="js-add-to-shopping-list">Add to Shopping List</button>
    </div>
  `;

  const closeButtons = modalContent.querySelectorAll('.js-modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', hideModal);
  });

  const addToShoppingListButton = modalContent.querySelector(
    '.js-add-to-shopping-list'
  );
  addToShoppingListButton.addEventListener('click', toggleShoppingList);
}


function hideModal() {
  modal.style.display = 'none';
}

function toggleShoppingList() {
  // Functionality to add or remove the book from the shopping list.
  // Implement your logic here.
  console.log('Toggle shopping list');
}

// bookGallery.addEventListener('click', event => {
//   const clickedBook = event.target.closest('.book-card');
//   if (clickedBook) {
//     showModal(clickedBook);
//   }
// });

// closeButton.addEventListener('click', hideModal);

// modalContent.addEventListener('click', event => {
//   if (event.target === modalContent) {
//     hideModal();
//   }
// });

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});
