import { getPopularNewsAPI } from './api/news-api.js';
import { getMarkupWeather } from './markups/weather-markup.js';
import { weatherData } from './markups/weather-markup.js';

import { markup } from './markups/newsCard.js';
import { checkFavCards } from './addAndRemoveFromFavorite.js';
import { createMarkupOfBtns } from './pagination.js';

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const btnContainer = document.querySelector('#pagination');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

btnContainer.addEventListener('click', onPageNumberClick);
prevBtn.addEventListener('click', onPrevBtnClick);
nextBtn.addEventListener('click', onNextBtnClick);

let currentPage = 1;
let valuePage;
getPopularProduct(currentPage);
async function getPopularProduct(currentPage) {
  try {
    const getNews = await getPopularNewsAPI();

    const newsArr = getNews.results;
    valuePage = getAmountCards(newsArr);

    const pagArr = getArrForPag(newsArr, currentPage, valuePage.amountCards);

    createMarkup(pagArr);
    createMarkupOfBtns(currentPage, valuePage.totalPages);
  } catch (error) {
    notFoundPage.classList.toggle('visually-hidden');
  }
}
function getArrForPag(newsArr, currentPage, amountCards) {
  return newsArr.splice((currentPage - 1) * amountCards, amountCards);
}
function getAmountCards(array) {
  const valuePage = {};
  if (window.innerWidth < 768) {
    valuePage.amountCards = 5;
    valuePage.totalPages = Math.ceil(array.length / valuePage.amountCards);
  }

  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    valuePage.amountCards = 8;
    valuePage.totalPages = Math.ceil(array.length / valuePage.amountCards);
  }

  if (window.innerWidth >= 1280) {
    valuePage.amountCards = 9;
    valuePage.totalPages = Math.ceil(array.length / valuePage.amountCards);
  }
  return valuePage;
}

function createMarkup(newsArr) {
  const markupWeather = getMarkupWeather({ data: weatherData });

  const itemWeather = `<li class="weather__card">${markupWeather.markup}</li>`;
  let markupNews = '';

  if (window.innerWidth < 768) {
    for (let i = 0; i < newsArr.length; i += 1) {
      if (i === 0) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(newsArr[i]);
      }
    }
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    for (let i = 0; i < newsArr.length; i += 1) {
      if (i === 1) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(newsArr[i]);
      }
    }
  }
  if (window.innerWidth >= 1280) {
    for (let i = 0; i < newsArr.length; i += 1) {
      if (i === 2) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(newsArr[i]);
      }
    }
  }

  popularNewsGallery.innerHTML = markupNews;
  checkFavCards();
}

function onPageNumberClick(e) {
  if (
    e.target.nodeName === 'BUTTON' &&
    e.target.classList.contains('pagination__btn-num')
  ) {
    btnContainer.innerHTML = '';
    currentPage = e.target.dataset.page;
    getPopularProduct(currentPage);
  }
}

function onPrevBtnClick() {
  if (Number(currentPage) > 1) {
    currentPage = Number(currentPage) - 1;

    btnContainer.innerHTML = '';
    getPopularProduct(currentPage);
  }
}
function onNextBtnClick() {
  if (Number(currentPage) < valuePage.amountCards) {
    currentPage = Number(currentPage) + 1;
    btnContainer.innerHTML = '';

    getPopularProduct(currentPage);
  }
}
