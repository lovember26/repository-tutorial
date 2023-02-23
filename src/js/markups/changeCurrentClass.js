const pageLinkElArray = Array.from(
  document.querySelectorAll('.nav-list__link')
);

const currentUrl = window.location.href;

pageLinkElArray.map(obj => {
  const title = obj.innerHTML.toLowerCase();
  if (currentUrl.includes(title)) {
    obj.classList.add('current');
  } else {
    obj.classList.remove('current');
  }
});
