const search = document.querySelector('.search-form');
const btn = document.querySelector('.search-form__button');
const input = document.querySelector('.search-form__input');

search.addEventListener('submit', e => {
  e.preventDefault();

  if (e.currentTarget.classList.contains('active')) {
    onEnterPush();
  } else {
    search.classList.toggle('active');
    input.focus();
  }
})