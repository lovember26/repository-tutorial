import { openCloseRevisionDate } from '../openCloseRevisionDate';
import getRefs from '../get-refs';

const READED_KEY = 'readed';
let storageArray = [];
const refs = getRefs();

const revisionDateContainer = document.querySelector(
  '.revision-date-container'
);

window.addEventListener('DOMContentLoaded', creatRevisionDataNew);

function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem(`${READED_KEY}`)) === null) {
    refs.notFound.classList.toggle('visually-hidden');
    return;
  }
  storageArray = JSON.parse(localStorage.getItem(`${READED_KEY}`));
  // console.log(storageArray);
  creatRevisionDataNew(storageArray);
}

checkLocalStorage();

function creatRevisionDataNew(array) {
  // console.log(`Array.from(array)`);
  // console.log(Object.keys(array));
  const dates = [...array]
    .map(({ date }) => date)
    .filter((course, index, array) => array.indexOf(course) === index);
  // console.log(dates);
  const gallery = document.querySelector('.container-for-viewed-cards');
  // console.log(gallery);
  dates.forEach(dateE => {
    revisionDateContainer.insertAdjacentHTML(
      'afterbegin',
      `<div>
        <button type="button" class="revision-date-btn">${dateE}
          <svg class="icon-arrow">
            <use href="./images/arrow.svg#icon-arrow"></use>
          </svg>
        </button>
        <ul class="container-for-viewed-cards">
        </ul>
        </div>`
    );
    const gallery = document.querySelector('.container-for-viewed-cards');
    array.forEach(el => {
      if (el.date === dateE) {
        // console.log(el.markup);
        gallery.insertAdjacentHTML('afterbegin', el.markup);
      }
    });
    const newsGallery = document.querySelector('.container-for-viewed-cards');

    const storageData = JSON.parse(localStorage.getItem('favorite'))
      ? JSON.parse(localStorage.getItem('favorite'))
      : [];

    // window.addEventListener('DOMContentLoaded', checkFavCards);

    newsGallery.addEventListener('click', onCardBtnClick);

    function onCardBtnClick({ target }) {
      if (
        target.nodeName === 'BUTTON' &&
        target.classList.contains('addToFavoriteBtn')
      ) {
        changeAddBtnToRemoveBtn(target);
        const cardMarkup = {
          firstElOfCard: target.parentNode.firstElementChild.outerHTML,
          markup: target.parentNode.parentNode.outerHTML,
        };
        // const storageData = JSON.parse(localStorage.getItem("favorite"))
        //   ? JSON.parse(localStorage.getItem("favorite"))
        //   : [];
        storageData.push(cardMarkup);
        localStorage.setItem('favorite', JSON.stringify(storageData));
      } else if (
        target.nodeName === 'BUTTON' &&
        target.classList.contains('removeFromFavoriteBtn')
      ) {
        removeCardFromLocalStorage(target);
        changeRemoveBtnToAddBtn(target);
      }
    }
    function changeAddBtnToRemoveBtn(target) {
      target.classList.replace('addToFavoriteBtn', 'removeFromFavoriteBtn');
      target.innerHTML = `Remove from favorite  <svg class="news-favorite__icon" width="16"
                                    height="16"
                                    viewBox="0 0 37 32"
                                    >
                                <path fill="#4440f7" style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                                </svg>`;
    }
    function changeRemoveBtnToAddBtn(target) {
      target.classList.replace('removeFromFavoriteBtn', 'addToFavoriteBtn');
      target.innerHTML = `Add to favorite  <svg class="news-favorite__icon" width="16"
                                    height="16"
                                    viewBox="0 0 37 32"
                                    >
                            <path style="stroke: var(--color1, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
                            </svg>`;
    }
    function removeCardFromLocalStorage(target) {
      // const storageData = JSON.parse(localStorage.getItem("favorite"));

      const indexOfDelEl = storageData.findIndex(
        obj => obj.markup === target.parentNode.parentNode.outerHTML
      );

      storageData.splice(indexOfDelEl, 1);
      localStorage.setItem('favorite', JSON.stringify(storageData));
    }
  });

  openCloseRevisionDate();
}

// function creatRevisionData() {
//   for (let i = 0; i < localStorage.length; i++) {
//     let key = localStorage.key(i)
//       if (key !== 'favorite' && key !== 'theme' && key !== 'favorite')

//     revisionDateContainer.insertAdjacentHTML("afterbegin",
//       `<div>
//         <button type="button" class="revision-date-btn">${key}
//           <svg class="icon-arrow">
//             <use href="./images/arrow.svg#icon-arrow"></use>
//           </svg>
//         </button>
//         <ul class="container-for-viewed-cards">
//         </ul>
//         </div>`);

//     const gallery = document.querySelector('.container-for-viewed-cards');
//     try {
//       const storageData = JSON.parse(localStorage.getItem(key));
//       const galleryMarkup = storageData.reduce((previousValue, obj) => {
//         return previousValue + obj.markup;
//       }, '');
//       gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
//     } catch {
//       console.log('LocalStorage is empty!');
//     }
//                       const newsGallery = document.querySelector('.container-for-viewed-cards');

//                       const storageData = JSON.parse(localStorage.getItem('favorite'))
//                         ? JSON.parse(localStorage.getItem('favorite'))
//                         : [];

//                       // window.addEventListener('DOMContentLoaded', checkFavCards);

//                       newsGallery.addEventListener('click', onCardBtnClick);

//                       function onCardBtnClick({ target }) {
//                         if (
//                           target.nodeName === 'BUTTON' &&
//                           target.classList.contains('addToFavoriteBtn')
//                         ) {
//                           changeAddBtnToRemoveBtn(target);
//                           const cardMarkup = {
//                             firstElOfCard: target.parentNode.firstElementChild.outerHTML,
//                             markup: target.parentNode.parentNode.outerHTML,
//                           };
//                           // const storageData = JSON.parse(localStorage.getItem("favorite"))
//                           //   ? JSON.parse(localStorage.getItem("favorite"))
//                           //   : [];
//                           storageData.push(cardMarkup);
//                           localStorage.setItem('favorite', JSON.stringify(storageData));
//                         } else if (
//                           target.nodeName === 'BUTTON' &&
//                           target.classList.contains('removeFromFavoriteBtn')
//                         ) {
//                           removeCardFromLocalStorage(target);
//                           changeRemoveBtnToAddBtn(target);
//                         }
//                       }
//                       function changeAddBtnToRemoveBtn(target) {
//                         target.classList.replace('addToFavoriteBtn', 'removeFromFavoriteBtn');
//                         target.innerHTML = `Remove from favorite  <svg class="news-favorite__icon" width="16"
//                                                       height="16"
//                                                       viewBox="0 0 37 32"
//                                                       >
//                                                   <path fill="#4440f7" style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
//                                                   </svg>`;
//                       }
//                       function changeRemoveBtnToAddBtn(target) {
//                         target.classList.replace('removeFromFavoriteBtn', 'addToFavoriteBtn');
//                         target.innerHTML = `Add to favorite  <svg class="news-favorite__icon" width="16"
//                                                       height="16"
//                                                       viewBox="0 0 37 32"
//                                                       >
//                                               <path style="stroke: var(--color1, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
//                                               </svg>`;
//                       }
//                       function removeCardFromLocalStorage(target) {
//                         // const storageData = JSON.parse(localStorage.getItem("favorite"));

//                         const indexOfDelEl = storageData.findIndex(
//                           obj => obj.markup === target.parentNode.parentNode.outerHTML
//                         );

//                         storageData.splice(indexOfDelEl, 1);
//                         localStorage.setItem('favorite', JSON.stringify(storageData));
//                       }
// }
//   openCloseRevisionDate();
// }
