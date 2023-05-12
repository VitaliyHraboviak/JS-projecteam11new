const openPopUp = document.getElementById('open_pop_up');
const closePopUp = document.getElementById('pop_up_close');
const popUp = document.getElementById('pop_up');

function openPopup() {
  popUp.classList.add('active');
}

function closePopup() {
  popUp.classList.remove('active');
}

openPopUp.addEventListener('click', function (e) {
  e.preventDefault();
  openPopup();
});

closePopUp.addEventListener('click', closePopup);
