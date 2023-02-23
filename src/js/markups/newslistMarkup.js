import { getPopularNewsAPI } from '../api/news-api.js';

const newsGallery = document.querySelector('.news-gallery');

export async function newslistMarkup(newsArray) {
  const getPopularNews = await getPopularNewsAPI();
  const news = getPopularNews.results;

//   newsGallery.innerHTML = news
//     .map(({ section, title, url, published_date}) => {
//       return `
//       <li class=" "> </li>`;

//     })
//     .join(' ');
}

