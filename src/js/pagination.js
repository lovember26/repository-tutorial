const popularNewsGallery = document.querySelector('.news-gallery');
const notFoundPage = document.querySelector('.not-found');
const btnContainer = document.querySelector('#pagination');
let currentPage;

function createMarkupOfBtns(currentPage, amountOfPages) {
  if (Number(currentPage) === 1) {
    document.querySelector('.prev-btn').disabled = true;
    document.querySelector('.next-btn').disabled = false;
  } else if (Number(currentPage) === amountOfPages) {
    document.querySelector('.prev-btn').disabled = false;
    document.querySelector('.next-btn').disabled = true;
    btnContainer.insertAdjacentHTML(
      'afterbegin',
      `<button class="pagination__btn-points">...</button>`
    );
  } else {
    btnContainer.insertAdjacentHTML(
      'afterbegin',
      `<button class="pagination__btn-points">...</button>`
    );
    document.querySelector('.prev-btn').disabled = false;
    document.querySelector('.next-btn').disabled = false;
  }

  for (let i = currentPage; i <= amountOfPages; i++) {
    if (i <= Number(currentPage) + 2) {
      btnContainer.insertAdjacentHTML(
        'beforeend',
        `
        <button class="pagination__btn pagination__btn-num" data-page=${i}>
          ${i}
        </button>`
      );
    } else if (i === Number(currentPage) + 3) {
      btnContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="pagination__btn-points">...</button>`
      );
    } else {
      btnContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="pagination__btn pagination__btn-num" data-page=${amountOfPages}>
            ${amountOfPages}
          </button>`
      );
      break;
    }
  }
  addClassActive(currentPage);
}

function addClassActive(currentPage) {
  const activeBtn = document.querySelector(
    `button[data-page="${currentPage}"]`
  );

  activeBtn.classList.add('active');
}

export { createMarkupOfBtns };
