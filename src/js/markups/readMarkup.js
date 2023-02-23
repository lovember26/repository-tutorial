import { openCloseRevisionDate } from '../openCloseRevisionDate';

const revisionDateContainer = document.querySelector('.revision-date-container');
const dateRE = /^[0-3]\d\/\d+\/\d\d\d\d$/;

window.addEventListener('DOMContentLoaded', creatRevisionData);

function creatRevisionData() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
      if (key.match(dateRE))
    
    revisionDateContainer.insertAdjacentHTML("afterbegin",
      `<div>
        <button type="button" class="revision-date-btn">${key}
          <svg class="icon-arrow">
            <use href="./images/arrow.svg#icon-arrow"></use>
          </svg>
        </button>
        <ul class="container-for-viewed-cards">
        </ul>
        </div>`);
    
    const gallery = document.querySelector('.container-for-viewed-cards');
    try {
      const storageData = JSON.parse(localStorage.getItem(key));
      const galleryMarkup = storageData.reduce((previousValue, obj) => {
        return previousValue + obj.markup;
      }, '');
      gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
    } catch {
      console.log('LocalStorage is empty!');
    }
  }
  openCloseRevisionDate();
}
