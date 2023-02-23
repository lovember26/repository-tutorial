import { getCategoriesAPI } from '../api/news-api.js';
import { divideArrNews } from '../categories.js';

const categoriesList = document.querySelector('.buttons-list');
const categoriesBtn = document.querySelector('#btn-open-category');
const categoriesMenu = document.querySelector('.category__menu');

export async function markupCategories(categoriesMenu) {
  const getCategories = await getCategoriesAPI();
  const categories = getCategories.results;
  if (window.matchMedia('(max-width: 767px)').matches) {
    categoriesList.innerHTML = '';
    categoriesMenu.innerHTML = renderingOthers(categories);
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches) {
    categoriesList.innerHTML = '';
    const categoriesArrs = divideArrNews(categories, 4);
    categoriesMenu.innerHTML = renderingOthers(categoriesArrs[1]);
    categoriesList.insertAdjacentHTML(
      'afterbegin',
      renderingButtons(categoriesArrs[0])
    );
  }
  if (window.matchMedia('(min-width: 1280px)').matches) {
    categoriesList.innerHTML = '';
    const categoriesArrs = divideArrNews(categories, 6);
    categoriesMenu.innerHTML = renderingOthers(categoriesArrs[1]);
    categoriesList.insertAdjacentHTML(
      'afterbegin',
      renderingButtons(categoriesArrs[0])
    );
  }
}

export function markupNameButton(currentButton) {
  if (categoriesMenu.classList.contains('is-open-categories')) {
    categoriesMenu.classList.remove('is-open-categories');
    console.log(currentButton.length);
    console.log(currentButton);
    if (currentButton.length < 18) {
      categoriesBtn.firstChild.textContent = currentButton;
    }
    else {
    const newNameButton = `${currentButton.slice(0, 15)}...`
    categoriesBtn.firstChild.textContent = newNameButton;
  }
  } else {
    if (window.matchMedia('(max-width: 767px)').matches) {
      categoriesBtn.firstChild.textContent = 'Categories';
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
      categoriesBtn.firstChild.textContent = 'Others';
    }
  }
}

function renderingOthers(categories) {
  return categories
    .map(({ section, display_name }) => {
      return `<li class='category__item'><button class="btn-item" data-btn=${encoded(
        section
      )}>${display_name}</button></li>`;
    })
    .join(' ');
}

function renderingButtons(categories) {
  return categories
    .map(({ section, display_name }) => {
      return `<li class='buttons-list__item'><button class="buttons-list__button" data-btn=${encoded(
        section
      )}>${display_name}</button></li>`;
    })
    .join(' ');
}

function encoded(string) {
  return encodeURIComponent(string);
}


