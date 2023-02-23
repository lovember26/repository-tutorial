import { getSearchNewsAPI } from './api/news-api';
import { getMarkupWeather } from './markups/weather-markup.js';
import { weatherData } from './markups/weather-markup.js';
import { markup } from './markups/newsCard.js';
import { checkFavCards } from './addAndRemoveFromFavorite';
const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 0,
};
const newsGallery = document.querySelector('.news-gallery');
const pageNotFound = document.querySelector('.not-found');
const form = document.querySelector('.search-form');
form.addEventListener('submit', onEnterPush);
function onEnterPush(e) {
  console.log('hello');
  e.preventDefault();
  const searchQuery = e.currentTarget.elements[1].value.trim();
  getSearchNews(searchQuery);
}
async function getSearchNews(search) {
  try {
    const getNews = await getSearchNewsAPI(search);
    const data = getNews.data.response.docs;
    const adaptedData = toAdaptData(data);
    getAmountCards(data);
    if (getNews.data.response.docs.length) {
      pageNotFound.classList.add('visually-hidden');
      createMarkup(adaptedData);
    } else if (getNews.data.response.docs.length === 0) {
      pageNotFound.classList.remove('visually-hidden');
      //notFound();
    }
  } catch (err) {
    //pageNotFound.classList.toggle('visually-hidden');
    console.log(err);
  }
}
window.addEventListener('resize', getSearchNews);
function createMarkup(array) {
  let markupNews = '';
  const markupWeather = getMarkupWeather({ data: weatherData });
  const itemWeather = `<li class="weather__card">${markupWeather.markup}</li>`;
  if (window.innerWidth < 768) {
    for (let i = 0; i < 5; i += 1) {
      if (i === 0) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(array[i]);
      }
    }
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    for (let i = 0; i < 8; i += 1) {
      if (i === 1) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(array[i]);
      }
    }
  }
  if (window.innerWidth >= 1280) {
    for (let i = 0; i < 9; i += 1) {
      if (i === 2) {
        markupNews += itemWeather;
      } else {
        markupNews += markup(array[i]);
      }
    }
  }
  newsGallery.innerHTML = markupNews;
  checkFavCards();
}
function getAmountCards(array) {
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
          caption: obj.headline.main,
          'media-metadata': [
            { url: `https://static01.nyt.com/${obj.multimedia[0].url}` },
            { url: `https://static01.nyt.com/${obj.multimedia[1].url}` },
            { url: `https://static01.nyt.com/${obj.multimedia[2].url}` },
          ],
        },
      ]);
    container.published_date = obj.pub_date;
    container.section = obj.section_name;
    container.title = obj.headline.main;
    container.url = obj.web_url;
    return container;
  });
}
