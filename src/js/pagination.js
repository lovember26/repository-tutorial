const ref = {
  paginationEl: document.getElementById('pagination'),
  paginationContainerEl: document.querySelector('.pagination__container'),
  btnNextPg: document.querySelector('.next-btn'),
  btnPrevPg: document.querySelector('.prev-btn'),
};

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  amountCards: 0,
  totalPages: 0,
};

// DYNAMIC PAGINATION
function pagination(obj) {
  const { totalPages, curPage, numLinksTwoSide: delta } = obj;

  const range = delta + 4; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<button class="pagination__btn-points">...</button>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    ref.paginationEl.innerHTML = renderTwoSide;
  } else {
    ref.paginationEl.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <button class="pagination__btn pagination__btn-num ${active}"  data-page="${index}">${index}</button>`;
}

function handleButton(element) {
  if (element.classList.contains('prev-btn')) {
    valuePage.curPage -= 1;
    // console.log(valuePage.curPage);
    handleButtonLeft();
    ref.btnNextPg.disabled = false;
  } else if (element.classList.contains('next-btn')) {
    valuePage.curPage += 1;
    // console.log(valuePage.curPage);
    handleButtonRight();
    ref.btnPrevPg.disabled = false;
  }
  // pagination(obj);
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    ref.btnPrevPg.disabled = true;
    ref.btnNextPg.disabled = false;
  } else {
    ref.btnPrevPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    //  console.log(valuePage.curPage);
    ref.btnNextPg.disabled = true;
    ref.btnPrevPg.disabled = false;
  } else {
    ref.btnNextPg.disabled = false;
  }
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
export {
  ref,
  valuePage,
  pagination,
  handleButtonRight,
  handleButtonLeft,
  handleButton,
};
