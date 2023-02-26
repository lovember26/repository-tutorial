import { Notify } from 'notiflix';
const search = document.querySelector('.search-form');
const btn = document.querySelector('.search-form__button');
const input = document.querySelector('.search-form__input');
const gallery = document.querySelector('.favorite-gallery__list');
const notFoundPage = document.querySelector('.not-found');

search.addEventListener('submit', e => {
  e.preventDefault();

  if (!e.currentTarget.classList.contains('active')) {
    search.classList.add('active');
  }

  input.focus();
  onFormSumbit(e);
});

function onFormSumbit(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements[1].value.trim();
  if (searchQuery === '') {
    Notify.info('Enter Your Search Query!');
  } else {
    try {
      const storageData = JSON.parse(localStorage.getItem('favorite'));

      const arrOfStrings = storageData.map(obj => obj.markup);

      findSearchQueryEl(searchQuery, arrOfStrings);
    } catch (err) {
      console.log(err);
    }
  }
  search.reset();
}

function findSearchQueryEl(searchQuery, arrOfStrings) {
  const filteredArr = arrOfStrings
    .filter(obj => obj.includes(searchQuery))
    .join('');
  if (filteredArr === '') {
    notFoundPage.classList.remove('visually-hidden');
  } else {
    notFoundPage.classList.add('visually-hidden');
  }
  gallery.innerHTML = filteredArr;
}
