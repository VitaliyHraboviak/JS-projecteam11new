
console.log('my_shopping-list-Серг');

//http://localhost:1234/shopping_books.html


import {DATA_BOOKS} from './shopping_data.js';
// console.log(DATA_BOOKS[1].title);

// IMAGES
import Amazon from '../images/icon/amazon.png';
import Book from '../images/icon/Book.png';
import BookShop from '../images/icon/BookShop.png';


// let booksLocalStorage = [1, 2, 3, 4, 5];

const titleEl = document.querySelector('.shopping-title');
titleEl.addEventListener('click', onRender);

let isMobileScreen = onMobileScreen(); //Мобильная версия? true. false
let totalBook = DATA_BOOKS.length; //Всего книг в памяти
let perPage = makePerPage(); //Количество книг на странице      3 / 4 
let totalPage = Math.ceil(totalBook / perPage); //К-во страниц
let lastPerPage = makeLastPerPage(); //Остаток книг неполной страницы

let currentPage = 1; // Текущая страница / по умолчанию 1
let numberRender = 0; //Сколько пизиций рендирить

let howManyBtn = onHowManyBtn(); // Сколько кнопок TURN должно отбражаться 1-4
let currentBtn = 1; // текущая активная кнопка
let maxBtn = onmaxBtn(); //Максимальное ко-во кнопок  3 / 4

console.log('totalBook', totalBook);
console.log('perPage', perPage);
console.log('totalPage', totalPage);
// console.log('numberRender', numberRender);
console.log('currentPage', currentPage);
console.log('maxBtn', maxBtn);
console.log('howManyBtn', howManyBtn);



const shoppingListEl = document.querySelector('.shopping-list'); // render shoppinglist
const emptyBookEl = document.querySelector('.empty-book-wrapper'); // empty-book
const shoplistBtn = document.querySelector('.shopping-list-btn'); // Кнопки листания страниц
let removeBookBtns = [];



//========= TURN Page ===============

    const firstBtnEl = document.querySelector('[data-turn="first"]');
    const secondBtnEl = document.querySelector('[data-turn="second"]');
    const thirdBtnEl = document.querySelector('[data-turn="third"]');
    const restBtnEl = document.querySelector('[data-turn="rest"]');

    let turnBtnsArray = makeBtnsArr(); //создаем массив динамических кнопок пагинации
    onRenderButtons(); // отображаем динамические кнопки пагинации из массива


// NEXT
    const NextBtnEl = document.querySelector('[data-turn="next"]');
    NextBtnEl.addEventListener('click', onTurnNextPage);

    function onTurnNextPage() {
        if(currentPage < totalPage-1) {
            currentPage ++;

            // Страниц больше чем кнопок
            if(totalPage > maxBtn) {

                if(currentBtn < maxBtn-1 ) { // 1 - 2/3
                    turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                    currentBtn ++;
                    turnBtnsArray[currentBtn-1].classList.add('turn-active'); //active Color 
                }
                else { // currentBtn = 3
                    let y = maxBtn-2; // 3 /4


                    for(let i=0; i< maxBtn; i++) {
                        if(!i) {
                            turnBtnsArray[i].textContent = '...';
                        }
                        else if(i=== maxBtn-1) {
                            if(currentPage === totalPage - 1) {
                                turnBtnsArray[maxBtn-1].textContent = currentPage + 1;
                            }
                            else {
                                turnBtnsArray[i].textContent = '...';
                            }
                        }
                        else {
                            turnBtnsArray[i].textContent = currentPage - y;
                        }
                        y--;
                    }


                }
            }

            // Страниц не более чем кнопок
            else {
                turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                currentBtn ++;
                turnBtnsArray[currentBtn-1].classList.add('turn-active'); //active Color 
            }

            console.log('currentPage', currentPage);
            onRender();
        }
        else if(currentPage < totalPage) {
            currentPage ++;
            turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
            currentBtn ++;
            turnBtnsArray[currentBtn-1].classList.add('turn-active'); //active Color 

            console.log('currentPage', currentPage);
            // console.log('Ляля', currentPage);
            onRender();
            
        }
    }

// PREVIOS
    const PrevBtnEl = document.querySelector('[data-turn="prev"]');
    PrevBtnEl.addEventListener('click', onTurnPrevPage);

    function onTurnPrevPage() {

        // 1. Если первая Страница - Выход
        if(currentPage === 1) {
            console.log('фить <');
            return
        }

        // 1. Если Страниц не более чем кнопок двигаем активацию кнопки
        if(totalPage <= maxBtn) {
            console.log('1.');
            turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
            currentBtn --;
            currentPage --;
            turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 
            onRender();
            console.log('currentBtn', currentBtn);
            console.log('currentPage', currentPage);
            return
        }


        // 2. Если Страниц  больше чем кнопок

        // 2.1. Если справа (...) а с лева (1) то двигаем активацию
        if(currentBtn === currentPage ) { // 1 - 2/3
            console.log('2.1.');
            turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
            currentBtn --;
            currentPage --;
            turnBtnsArray[currentBtn-1].classList.add('turn-active'); //active Color 
            onRender();
            console.log('currentBtn', currentBtn);
            console.log('currentPage', currentPage);
            return
        }

        // 2.2. Если справа (...) и с лева (...) 
        // 2.2.1. Если активная кнопка рядом возде (...) с лева то двигаем текст
        if(currentBtn > 2) {
            console.log('2.2.1.');
            // двигаем активацию
            turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
            currentBtn --;
            currentPage --;
            turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 
            onRender();
            console.log('currentBtn', currentBtn);
            console.log('currentPage', currentPage);
            return
        }
        // 2.2.2.
        else {
            console.log('2.2.2.');
            // двигаем текст
            // currentBtn --;
            currentPage --;
            console.log('currentBtn', currentBtn);
            console.log('currentPage', currentPage);

            for(let i=0; i< maxBtn; i++) {
                if(!i) {
                    if(currentPage === 2) {
                        turnBtnsArray[0].textContent = 1;
                    }
                    else {
                        turnBtnsArray[i].textContent = '...';
                    }
                }
                else if(i === maxBtn-1) {
                    turnBtnsArray[i].textContent = '...';
                }

                else {
                    turnBtnsArray[i].textContent = currentPage +i-1;
                }
            }        
            onRender();
            return
        }
    }


// START 
    const startBtnEl = document.querySelector('[data-turn="start"]');
    startBtnEl.addEventListener('click', onTurnStartPage);

    function onTurnStartPage() {

        if(currentPage < 2) {
            console.log('Тиць');
            return
        }
        else {
            // 1. Если Страниц менее равно чем кнопок 
            if(totalPage <= maxBtn) {
                turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                currentBtn = 1;
                currentPage = 1;
                turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 
                onRender();
                console.log('currentBtn', currentBtn);
                console.log('currentPage', currentPage);
                return
            }
            // 1. Если Страниц больше чем кнопок 
            else {
                turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                currentBtn = 1;
                currentPage = 1;
                turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 

                for(let i=0; i< maxBtn; i++) {
                
                    if(i === maxBtn-1) {
                        turnBtnsArray[i].textContent = '...';
                    }
                    else {
                        turnBtnsArray[i].textContent = currentPage +i;
                    }
                } 

                onRender();
                console.log('currentBtn', currentBtn);
                console.log('currentPage', currentPage);
                return
            }
           
        }
    }


// END 
    const endtBtnEl = document.querySelector('[data-turn="end"]');
    endtBtnEl.addEventListener('click', onTurnEndtPage);

    function onTurnEndtPage() {

        // if(currentPage < totalPage) {
        //     turnBtnsArray[currentPage-1].classList.remove('turn-active');
        //     currentPage = totalPage;
            
        //     // console.log('currentPage', currentPage);
        //     onRender();
        // }

        if(currentPage === totalPage) {
            console.log('Тиць');
            return
        }
        else {
            // 1. Если Страниц менее равно чем кнопок
            if(totalPage <= maxBtn) {
                turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                currentBtn = howManyBtn;
                currentPage = totalPage;
                turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 
                onRender();
                console.log('currentBtn', currentBtn);
                console.log('currentPage', currentPage);
                return
            }
            // 1. Если Страниц больше чем кнопок 
            else {
                turnBtnsArray[currentBtn-1].classList.remove('turn-active');//remove Color
                currentBtn = howManyBtn;
                currentPage = totalPage;
                turnBtnsArray[currentBtn-1].classList.add('turn-active');//active Color 

                for(let i=0; i< maxBtn; i++) {
                
                    if(i === 0) {
                        turnBtnsArray[i].textContent = '...';
                    }
                    else {
                        turnBtnsArray[i].textContent = currentPage + i + 1 - maxBtn;
                    }
                } 

                onRender();
                console.log('currentBtn', currentBtn);
                console.log('currentPage', currentPage);
                return
            }
        }
    }


//========= TURN totalPageS Конец ===============






// ======= DELETE BOOK ===========

function onRemoveBook(event) {
    //Видалення слухачів з кнопок
    for (let i=0; i < numberRender; i++) {
        removeBookBtns[i].removeEventListener('click', onRemoveBook);
    }

    // Видалення книжки по data-set
    const numDataSet = Number(event.target.dataset.set);
    const indexDelete = numDataSet + (currentPage - 1) * perPage;
    DATA_BOOKS.splice(indexDelete, 1);
    totalBook -= 1; //удалили книгу с памяти массива

    //Если книг нет Выход 
    if(!totalBook) { 
        onResetList();
        return
    }
    // Если книги есть

    let lastTotalPage = totalPage; // Прошлое количество страниц
    totalPage = Math.ceil(totalBook / perPage); // Новое количество страниц

    // Если стало на 1 страницу меньше
    if(totalPage < lastTotalPage) {

        if(totalPage <= maxBtn) {
            if(currentBtn > 1) {
                currentBtn --;
            }
          
            if(currentPage > 1) {
                currentPage --;
            }
            console.log('d', currentBtn, currentPage);
            howManyBtn = onHowManyBtn();
            onRenderButtons();
        }
                 
    }

        lastPerPage = makeLastPerPage(); //Остаток книг
        onRender();     
    
}







// ======= RENDER  Временно! ================

// const renderBtn = document.querySelector('[data-render]');
// renderBtn.addEventListener('click', onRender);

function onRender() {
    if(totalBook) { //Если книги есть
        emptyBookEl.classList.add('is-hidden'); // ховаємо вікно відсутніх книжок
        shoplistBtn.classList.remove('is-hidden');//відображаємо кнопки листання
    }
    else {
        console.log('Книг нет');
        return
    }
    //               6               2           3
    numberRender = totalBook >= (currentPage * perPage) ? perPage : lastPerPage;
      console.log('numberRender', numberRender);

    const x = (currentPage-1) * perPage;
    const itemArr = []; //Массив для рендеру html 
    
    for(let i=0; i< numberRender; i++) {
        const markaup = `
            <li class="shopping-item">
                <div class="item-card-thumb">
                    <img src="${DATA_BOOKS[i+x].coverImage}" alt="book">
                </div>       
                <div class="item-card-wrap">
                    <h3 class="item-card-title">${DATA_BOOKS[i+x].title}</h3>
                    <p class="item-card-category">${DATA_BOOKS[i+x].list_name}</p>
                    <p class="item-card-desc">${DATA_BOOKS[i+x].description}</p>       
                    <div class="item-card-bottom-wrap">
                        <p class="item-card-author">${DATA_BOOKS[i+x].author}</p>
                        <ul class="item-card-stores-wrap">
                            <li class="item-card-icons">
                                <img src=${Amazon} width="32" alt=" ">
                            </li>
                            <li class="item-card-icon">
                                <img src=${Book} width="16" alt=" ">
                            </li>
                            <li class="item-card-icon">
                                <img src=${BookShop} width="16" alt=" ">
                            </li>
                        </ul>
                    </div>
                    <button class="remove-btn" data-set="${i}">${i}</button>
                </div>
            </li>
        `;
        itemArr[i] = markaup;
    }
    const markaupAll = itemArr.join('');
    shoppingListEl.innerHTML = markaupAll;  

    // Чіпляємо слухачі на кнопки видалення
    removeBookBtns = document.querySelectorAll('.remove-btn'); // []
    for (let i=0; i < numberRender; i++) {
        removeBookBtns[i].addEventListener('click', onRemoveBook);
        // console.log('addEventListener', i);
    }
}






// =============== FUNCTIONS ===============


// ======= RESET ==========!

// const resetBtn = document.querySelector('[data-reset]');
// resetBtn.addEventListener('click', onResetList);

function onResetList() {
    emptyBookEl.classList.remove('is-hidden');
    shoplistBtn.classList.add('is-hidden');
    shoppingListEl.innerHTML = '';


    turnBtnsArray = [firstBtnEl, secondBtnEl, thirdBtnEl, restBtnEl];

    for(let i=0; i<turnBtnsArray.length; i++) {
        if(turnBtnsArray[i].classList.contains('is-hidden')){
            continue
        }
        turnBtnsArray[i].classList.add('is-hidden');
    }



    isMobileScreen = onMobileScreen(); //Мобильная версия? true. false
    totalBook = DATA_BOOKS.length; //Всего книг в памяти
    perPage = makePerPage(); //Количество книг на странице      3 / 4 
    totalPage = Math.ceil(totalBook / perPage); //К-во страниц
    lastPerPage = makeLastPerPage(); //Остаток книг неполной страницы

    currentPage = 1; // Текущая страница / по умолчанию 1
    numberRender = 0; //Сколько пизиций рендирить

    howManyBtn = onHowManyBtn(); // Сколько кнопок TURN должно отбражаться 1-4
    currentBtn = 1; // текущая активная кнопка
    maxBtn = onmaxBtn(); //Максимальное ко-во кнопок  3 / 4
    turnBtnsArray = makeBtnsArr(); //создаем массив динамических кнопок пагинации
    onRenderButtons(); // отображаем динамические кнопки пагинации из массива

    //классы прицепить

}




function onMobileScreen() {
    if(window.innerWidth > 767) {
        return false;
    }
    return true;
}

function makePerPage() {
    if(isMobileScreen) {
        return 4;
    }
    return 3;
}

function makeLastPerPage() {
    return totalBook % perPage;
}



function onHowManyBtn() {
    if(isMobileScreen) {
        return totalPage > 2 ? 3 : totalPage;
    }
    return totalPage > 3 ? 4 : totalPage;
}



function onmaxBtn() {
    return isMobileScreen ? 3 : 4;
}



function makeBtnsArr() {
    if(isMobileScreen){
        return [firstBtnEl, secondBtnEl, restBtnEl];// Массив динамических кнопок (2 3 ...)
    }
    else {
        return [firstBtnEl, secondBtnEl, thirdBtnEl, restBtnEl];// Массив динамических кнопок (2 3 ...)
    }
}




function onRenderButtons() {

    // добавление классов
    for(let i=0; i<turnBtnsArray.length; i++) {
        turnBtnsArray[i].classList.remove('turn-active');//remove Color
        if(turnBtnsArray[i].classList.contains('is-hidden')){
            continue
        }
        turnBtnsArray[i].classList.add('is-hidden');
    }

    turnBtnsArray[currentBtn-1].classList.add('turn-active');// active Color


    // Если страниц менее = как кнопок
    if(totalPage <= maxBtn) {
        for(let i=0; i< howManyBtn; i++) {
            turnBtnsArray[i].classList.remove('is-hidden');
            turnBtnsArray[i].textContent = i+1; //1
        }
        return
    }

    // Если страниц больше чем кнопок
    for(let i=0; i< howManyBtn; i++) {
        turnBtnsArray[i].classList.remove('is-hidden');



        if(i === maxBtn-1) {
            turnBtnsArray[i].textContent = '...';
            return
        }
        turnBtnsArray[i].textContent = i+1; 



    }
    //====================


}

















// function makePerRage() {
//     // const viewportHeight = window.innerHeight;      // Высота экрана
//     // const viewportWidth = window.innerWidth;

//     // Количество книг на страницу от ширины экрана
//     if(window.innerWidth > 767) {
//         return 3;
//     }
//     return 4;
//     // const listHeight = viewportHeight - 278;
//     // console.log('quantity:',  Math.floor(listHeight / 170));
//     // return Math.floor((listHeight + 20) / (170+20));
// }


// // Get book details from API
// const bookId = 'bookId';
// const apiUrl = https://books-backend.p.goit.global/books/${bookId};
// const DATA_BOOKS = {};

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     DATA_BOOKS.title = data.title;
//     DATA_BOOKS.author = data.author;
//     DATA_BOOKS.description = data.description;
//     DATA_BOOKS.coverImage = data.coverImage;
//     DATA_BOOKS.purchaseLinks = data.purchaseLinks;
//     updateModal();

//     // Add book details to the bookList array
//     const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
//     bookList.push(DATA_BOOKS);
//     localStorage.setItem('bookList', JSON.stringify(bookList));
//   })
//   .catch(error => console.error(error));

// // Update modal with book details
// function updateModal() {
//   const modal = document.querySelector('.modal');
//   const DATA_BOOKSContainer = document.querySelector('.book-details');

//   // Create modal content with book details
//   const modalContent = 
//     <div class="book-info">
//       <img src="${DATA_BOOKS.coverImage}" alt="Book Cover" />
//       <div>
//         <h2>${DATA_BOOKS.title}</h2>
//         <p>by ${DATA_BOOKS.author}</p>
//         <p>${DATA_BOOKS.description}</p>
//       </div>
//     </div>
//     <div class="purchase-links">
//       <h3>Buy Now:</h3>
//       <ul>
//         ${DATA_BOOKS.purchaseLinks.map(link => 
//           <li>
//             <a href="${link.url}" target="_blank" rel="noopener noreferrer">
//               <img src="${link.logoUrl}" alt="${link.name}" />
//             </a>
//           </li>
//         ).join('')}
//       </ul>
//     </div>
//     <div class="shopping-list">
//       <button class="add-to-list-btn">Add to Shopping List</button>
//       <button class="remove-from-list-btn">Remove from Shopping List</button>
//     </div>
//   ;
//   DATA_BOOKSContainer.innerHTML = modalContent;
// }
// ось js та там є масив з збереженням у локал сторедж






// Автоматический отступ  сверху
    // узнаем высоту поля form
    // const formHeight = formEl.getBoundingClientRect().height;

    // применяэм высоту body padding-top:
    // document.body.style = `padding-top: ${formHeight + 18}px`;
    // document.body.style.paddingTop = `${formHeight + 18}px`;
   
// Автоматический отступ  сверху







// function onRender() {
//     console.log('onRender');
//     const markaup = `
//             <li class="shopping-item">
//                 <div class="item-card-thumb">
//                     <img src="./images/img/IMG_9606 1.png" alt="book">
//                 </div>
                
//                 <div class="item-card-wrap">
//                     <h3 class="item-card-title">I will find you</h3>
//                     <p class="item-card-category">Hardcover fiction</p>
//                     <p class="item-card-desc">David Burroughs was once a devoted father to his three-year-old son Matthew, living a dream life just a short drive away from the working-class suburb where he and his wife, Cheryl, first fell in love--until one fateful night when David woke suddenly to discover Matthew had been murdered while</p>
                    
//                     <div class="item-card-bottom-wrap">
//                         <p class="item-card-author">Harlan Coben</p>
//                         <ul class="item-card-stores-wrap">
//                             <li class="item-card-icons">
//                                 <img src="./images/icon/amazon.png" width="32" alt=" ">
//                             </li>
//                             <li class="item-card-icon">
//                                 <img src="./images/icon/Book.png" width="16" alt=" ">
//                             </li>
//                             <li class="item-card-icon">
//                                 <img src="./images/icon/BookShop.png" width="16" alt=" ">
//                             </li>
//                         </ul>
//                     </div>
//                     <button class="remove-btn">dl</button>
//                 </div>
//             </li>
//     `;

//     // shoppingListEl.innerHTML = markaup;
//     shoppingListEl.insertAdjacentHTML("beforeend", markaup);
// }