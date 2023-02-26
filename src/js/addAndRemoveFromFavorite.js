const newsGallery = document.querySelector('.news-gallery');

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
    storageData.unshift(cardMarkup);
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

function checkFavCards() {
  // const storageData = JSON.parse(localStorage.getItem("favorite"));
  const newsCards = Array.from(document.querySelectorAll('.card-news__item'));
  if (storageData) {
    const firstElOfStorageObj = storageData.map(obj => obj.firstElOfCard);

    const cardsToChange = newsCards.filter(card =>
      firstElOfStorageObj.includes(
        card.firstElementChild.firstElementChild.outerHTML
      )
    );

    cardsToChange.map(item => {
      const card = item.querySelector('.addToFavoriteBtn');

      changeAddBtnToRemoveBtn(card);
    });
  }
}

export { checkFavCards };
