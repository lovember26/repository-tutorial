/*import { getSearchNewsAPI } from './api/news-api.js';

const newsGallery = document.querySelector('.news-gallery');

//const newsApi = new NewsApi();

const pageNotFound = document.querySelector(".not-found");

const input = document.querySelector('.search-form__input');

input.addEventListener('submit', onEnterPush);

function onEnterPush(e) {
    const query = e.target.value;
  
    console.log(query);
    getSearchNews(query);
  }

  async function getSearchNews() {
    const getNews = await getSearchNewsAPI();
    console.log('Arr objects with search News ', getNews.response.docs);
    
  }

  //const articles = await response.json();
  const resArr = getNews.response.docs;

  if (resArr.length) {
    pageNotFound.classList.add("is-hidden");
    arrHandler(resArr);
  } else if (resArr.length === 0) {
    notFound();
  }
  // --> section not-found

  console.log(resArr)

  function notFound() {
    if (pageNotFound.classList.contains("is-hidden")) {
      // newsGallery.innerHTML = " ";
      pageNotFound.classList.remove("is-hidden");
    }
  }

 // function arrHandler(arr) {
    
    
   // createBaseMarcup(objArr);
  //}
  
  //function createBaseMarcup(arr) {
    //addMarkup()
  
  function addMarkup(tagString) {
  newsGallery.innerHTML = '';
  newsGallery.insertAdjacentHTML('beforeend', tagString);
  }
*/