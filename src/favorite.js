import './js/mobileMenu';
import './js/switch';
import './js/switchMobile';
import './js/markups/changeCurrentClass';

const gallery = document.querySelector('.favorite-gallery__list');
const notFoundPage = document.querySelector('.not-found');

window.addEventListener('DOMContentLoaded', createGallery);
gallery.addEventListener('click', removeFromFavorite);

function createGallery() {
  try {
    const storageData = JSON.parse(localStorage.getItem('favorite'));
    const galleryMarkup = storageData.reduce((previousValue, obj) => {
      return previousValue + obj.markup;
    }, '');
    gallery.innerHTML = galleryMarkup;
    if (storageData.length === 0) {
      notFoundPage.classList.remove('visually-hidden');
    } else notFoundPage.classList.add('visually-hidden');
  } catch {
    notFoundPage.classList.remove('visually-hidden');
  }
}

function removeFromFavorite({ target }) {
  if (
    target.nodeName === 'BUTTON' &&
    target.classList.contains('removeFromFavoriteBtn')
  ) {
    const storageData = JSON.parse(localStorage.getItem('favorite'));

    const indexOfDelEl = storageData.findIndex(
      obj => obj.markup === target.parentNode.parentNode.outerHTML
    );
    storageData.splice(indexOfDelEl, 1);
    localStorage.setItem('favorite', JSON.stringify(storageData));
    target.parentNode.parentNode.outerHTML = '';
  }
}
