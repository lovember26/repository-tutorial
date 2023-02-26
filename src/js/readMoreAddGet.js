import getRefs from './get-refs';
const refs = getRefs();
const READED_KEY = 'readed';
let readedNewsArray = [];

checkLocalStorage();
setTimeout(() => {
    
  const ckeckedCards = Array.from(refs.newsGalery.querySelectorAll('.card__infotion__more'));
  const chekedUrls = readedNewsArray.map(el => el.url);
  
  ckeckedCards.filter(link => chekedUrls.includes(link.href)).forEach(link => link.closest('li.card-news__item').classList.add(`readed`));
}, 500)

function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem(`${READED_KEY}`)) === null) {
    return;
  }
  readedNewsArray = JSON.parse(localStorage.getItem(`${READED_KEY}`));
}

// window.addEventListener('load', setTimeout(() => {
    
//   const ckeckedCards = Array.from(refs.newsGalery.querySelectorAll('.card__infotion__more'));
//   const chekedUrls = readedNewsArray.map(el => el.url);
  
//   ckeckedCards.filter(link => chekedUrls.includes(link.href)).forEach(link => link.closest('li.card-news__item').classList.add(`readed`));
// }, 500))