import getRefs from './get-refs';
const refs = getRefs();
const READED_KEY = 'readed';
let readedArray = [];
checkLocalStorageNew();
refs.newsGalery.addEventListener('click', evt => {
  const readLink = evt.target.closest('.card__infotion__more');
  if (!readLink) return;
  readLink.closest('li.card-news__item').classList.add('readed');
  addToReaded(readLink);
  readLink.closest('li.card-news__item').classList.add('readed');
});
function checkLocalStorageNew() {
  if (JSON.parse(localStorage.getItem(`${READED_KEY}`)) === null) {
    return;
  }
  readedArray = JSON.parse(localStorage.getItem(`${READED_KEY}`));
}
function addToReaded(readedEl) {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const readedArticle = {
    date: currentDate,
    url: readedEl.href,
    markup: `${readedEl.closest('li.card-news__item').outerHTML}`,
  };
    for (let i = 0; i < readedArray.length; i += 1) {
      if (readedArray[i].url === readedArticle.url) return;
    }
    readedArray.push(readedArticle);
  localStorage.setItem(READED_KEY, JSON.stringify(readedArray));
}