import getRefs from './get-refs';
const refs = getRefs();
const READED_KEY = 'readed';
let readedArray = [];
checkLocalStorage();
refs.newsGalery.addEventListener('click', evt => {
  const readLink = evt.target.closest('.card__infotion__more');
  if (!readLink) return;
  readLink.closest('li.card-news__item').classList.add('readed');
  addToReaded(readLink);
});
function checkLocalStorage() {
  if (JSON.parse(localStorage.getItem(`${READED_KEY}`)) === null) {
    return;
  }
  readedArray = JSON.parse(localStorage.getItem(`${READED_KEY}`));
}
function addToReaded(readedEl) {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const readedArticle = {
    firstElOfCard: readedEl.href,
    markup: `${readedEl.closest('li.card-news__item').outerHTML}`,
  };
    for (let i = 0; i < readedArray.length; i += 1) {
      if (readedArray[i].firstElOfCard === readedArticle.firstElOfCard) return;
    }
    readedArray.push(readedArticle);
  localStorage.setItem(currentDate, JSON.stringify(readedArray));
}