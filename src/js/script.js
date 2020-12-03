/* Add any JavaScript you need to this file. */
'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  navbarMenu.classList.remove('open');
  // console.log(event.target.dataset.link);
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// arrow button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// click 'arrow up button' go to home
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// for rendering dynamic menus
function renderCategoryMenus(parent) {
  const categoryCounts = parent.querySelectorAll('.category__count');
  categoryCounts[0].textContent = dataItems.length;
  categoryCounts[1].textContent = dataItems.filter(e => e.category === 'general').length;
  categoryCounts[2].textContent = dataItems.filter(e => e.category === 'special').length;
}

// for rendering items
function renderItems(parent) {
  dataItems.forEach(e => {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('target', 'blank');
    a.dataset.type = e.category;
    a.classList.add('cupnoodle');

    const img = document.createElement('img');
    img.setAttribute('src', e.imageUrl);
    img.setAttribute('alt', e.name);
    img.classList.add('cupnoodle__img');
    a.appendChild(img);

    const div = document.createElement('div');
    div.classList.add('cupnoodle__description');
    const h3 = document.createElement('h3');
    h3.textContent = e.name;
    div.appendChild(h3);
    const span = document.createElement('span');
    span.textContent = e.description;
    div.appendChild(span);
    a.appendChild(div);
    parent.appendChild(a);
  });
}

// kinds of cupnoodle
const cupnoodleBtnContainer = document.querySelector('.cupnoodle__categories');
renderCategoryMenus(cupnoodleBtnContainer);
const cupnoodleContainer = document.querySelector('.cupnoodle__kinds');
renderItems(cupnoodleContainer);
const kinds = document.querySelectorAll('.cupnoodle');
cupnoodleBtnContainer.addEventListener('click', e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  }

  // Erase selection from the previous item and select  new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  cupnoodleContainer.classList.add('anim-out');
  setTimeout(() => {
    kinds.forEach(cupnoodle => {
      console.log(cupnoodle.dataset.type);
      if (filter === '*' || filter === cupnoodle.dataset.type) {
        cupnoodle.classList.remove('invisible');
      } else {
        cupnoodle.classList.add('invisible');
      }
    });
    cupnoodleContainer.classList.remove('anim-out');
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
