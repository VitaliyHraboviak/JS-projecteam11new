const bookGallery = document.querySelector('.book-gallery');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-content');
const closeButton = modal.querySelector('.js-modal-close');

if (bookGallery) {
  bookGallery.addEventListener('click', openModal);
}

function openModal(event) {
  if (event.target.closest('.item-category-book')) {
    const bookId = event.target.closest('.item-category-book').dataset.bookId;
    showModal(bookId);
  }
}

function showModal(bookId) {
  //   console.log(Open modal for book with ID: ${bookId});
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

bookGallery.addEventListener('click', event => {
  const clickedBook = event.target.closest('.book-card');
  if (clickedBook) {
    showModal(clickedBook);
  }
});

closeButton.addEventListener('click', hideModal);

modalContent.addEventListener('click', event => {
  if (event.target === modalContent) {
    hideModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hideModal();
  }
});
