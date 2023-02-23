const mobileMenu = document.querySelector('.js-menu-container');
const openMenu = document.querySelector('.js-open-menu');
const closeMenu = document.querySelector('.js-close-menu');


const bodyScrollLock = require('body-scroll-lock');

// import debounce from 'lodash.debounce';
const toggleMenu = () => {
  const openMobileMenu =
    openMenu.getAttribute('aria-expanded') === 'true' || false;
    openMenu.setAttribute('aria-expanded', !openMobileMenu );
    mobileMenu.classList.toggle('is-open');

  const scrollLockMethod = !openMobileMenu
    ? 'disableBodyScroll'
    : 'enableBodyScroll';

  bodyScrollLock[scrollLockMethod](document.body);
};

const title = document.querySelector('meta[name="description"]').content.toLowerCase();
const links = document.querySelectorAll('.nav-mobile__link');

links.forEach(link => {
  if (link.innerText.toLowerCase() === title) {
    link.classList.add('nav-mobile__link--current');
    link.lastElementChild.classList.add('active');
  }
  
});

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
