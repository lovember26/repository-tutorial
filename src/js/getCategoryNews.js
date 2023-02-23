import { getCategoryNewsAPI } from './api/news-api.js';
import { markup } from './markups/newsCard.js';
import { checkFavCards } from './addAndRemoveFromFavorite.js';
import { getMarkupWeather } from './markups/weather-markup.js';
import { weatherData } from './markups/weather-markup.js';
import { pagination } from './pagination.js';

let currentCategory = '';

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 0,
};

const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const currentDateContainer = document.querySelector('.calendar-btn-span');
const calendarBtn = document.querySelector('.calendar-btn');
const todayBtn = document.querySelector('.today-btn');

calendarBtn.addEventListener('blur', onSearchDate);
todayBtn.addEventListener('click', onSearchDate);

function onSearchDate() {
  if (!currentCategory) {
    return;
  }
  getCategoryNews(currentCategory);
}

export async function getCategoryNews(category, offset) {
  currentCategory = category;
  try {
    console.log(
      '🚀 ~ file: getCategoryNews.js:23 ~ getCategoryNews ~ category:',
      category
    );
    let newsArr = [];
    let filteredNews = [];
    const getCategotyNews = await getCategoryNewsAPI(category, offset);
    const dataNews = getCategotyNews.results;

    let markupNews = '';
    const markupWeather = getMarkupWeather({ data: weatherData });
    // console.log(markupWeather);
    // console.log({ data: weatherData });
    const itemWeather = `<li class="weather__card">${markupWeather}</li>`;
    // console.log(itemWeather);

    const currentDate = currentDateContainer.innerText;
    console.log(
      '🚀 ~ file: getCategoryNews.js:37 ~ getCategoryNews ~ currentDate:',
      currentDate
    );

    if (currentDate === 'Select a date...') {
      newsArr = toAdaptData(dataNews);
    } else {
      filteredNews = filterDateNews(dataNews, currentDate);
      console.log(
        '🚀 ~ file: getCategoryNews.js:43 ~ getCategoryNews ~ filteredNews:',
        filteredNews
      );

      if (filteredNews.length === 0) {
        notFoundPage.classList.add('visually-hidden');
        return;
      }
      newsArr = toAdaptData(filteredNews);
    }

    console.log(newsArr);

    if (window.innerWidth < 768) {
      if (newsArr.length < 5) {
        for (let i = 0; i < newsArr.length; i += 1) {
          if (i === 0) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
        }
      } else {
        for (let i = 0; i < 5; i += 1) {
          if (i === 0) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
          valuePage.amountCards = 5;
          valuePage.totalPages = Math.ceil(
            newsArr.length / valuePage.amountCards
          );
        }
      }
    }
    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      if (newsArr.length === 1) {
        markupNews += markup(newsArr[0]) + itemWeather;
      } else if (newsArr.length < 8) {
        for (let i = 0; i < newsArr.length; i += 1) {
          if (i === 1) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
        }
      } else {
        for (let i = 0; i < 8; i += 1) {
          if (i === 1) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
          valuePage.amountCards = 8;
          valuePage.totalPages = Math.ceil(
            newsArr.length / valuePage.amountCards
          );
        }
      }
    }
    if (window.innerWidth >= 1280) {
      if (newsArr.length <= 2) {
        for (let i = 0; i < newsArr.length; i += 1) {
          markupNews += markup(newsArr[i]);
        }
        markupNews += itemWeather;
      } else if (newsArr.length < 9 && newsArr.length > 2) {
        for (let i = 0; i < newsArr.length; i += 1) {
          if (i === 2) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
        }
      } else {
        for (let i = 0; i < 9; i += 1) {
          if (i === 2) {
            markupNews += itemWeather;
          } else {
            markupNews += markup(newsArr[i]);
          }
          valuePage.amountCards = 9;
          valuePage.totalPages = Math.ceil(
            newsArr.length / valuePage.amountCards
          );
        }
      }
    }

    popularNewsGallery.innerHTML = markupNews;
    pagination(valuePage);

    checkFavCards();
  } catch {
    notFoundPage.classList.toggle('visually-hidden');
  }
}

function toAdaptData(data) {
  return data.map(obj => {
    if (obj.multimedia === null) {
      obj.multimedia = [
        {
          url: true,
        },
        {
          url: true,
        },
        {
          url: 'https://amsrus.ru/wp-content/uploads/2016/02/Mercedes-Benz-C63-AMG-Black-Series-1.jpg',
        },
      ];
    }
    const container = {};
    (container.abstract = obj.abstract),
      (container.media = [
        {
          caption: obj.title,
          'media-metadata': [
            { url: obj.multimedia[0].url },
            { url: obj.multimedia[1].url },
            { url: obj.multimedia[2].url },
          ],
        },
      ]);

    container.published_date = obj.published_date;
    container.subsection = obj.section;
    container.title = obj.title;
    container.url = obj.url;

    return container;
  });
}

function filterDateNews(arrNews, selectedDate) {
  return arrNews.filter(news => {
    console.log('Convert', dateConversion(news.published_date));
    console.log(
      '🚀 ~ file: getCategoryNews.js:205 ~ filterDateNews ~ selectedDate:',
      selectedDate
    );
    console.log(dateConversion(news.published_date) === selectedDate);
    return String(dateConversion(news.published_date)) === String(selectedDate);
  });
}

function dateConversion(getDate) {
  const date = new Date(getDate);
  const month = String(date.getMonth() + 1);
  return `${date.getDate()}/${month.padStart(2, '0')}/${date.getFullYear()}`;
}
