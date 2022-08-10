import "vite/dynamic-import-polyfill";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SmoothScroll from 'smooth-scroll';
import Swiper, { Pagination, Navigation } from 'swiper';
import "./css/global.css";
import "./css/header.css";
import "./css/footer.css";
import "./css/home.css";
import "./css/inner-pages.css";

Swiper.use([Pagination, Navigation]);

var scroll = new SmoothScroll('a[href*="#"]');

const bodyTag = document.body;
const headerContainer = document.getElementById("header-container");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOpen = document.getElementById("mobile-menu-open");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const siteCopyright = document.getElementById('copyright-date');

mobileMenuOpen.addEventListener('click', e => {
  disableBodyScroll(mobileMenu);
});

mobileMenuClose.addEventListener('click', e => {
  enableBodyScroll(mobileMenu);
});

var today = new Date();
var yyyy = today.getFullYear();

today = yyyy;
siteCopyright.innerText = today;

function init() {
  // A demo: add an element to the document, then announce it
  const alertNode = document.createElement("div");
  const mainNode = document.querySelector("main");

  alertNode.setAttribute("role", "status");
  alertNode.setAttribute("aria-live", "polite");
  mainNode.appendChild(alertNode);

  // Wait some arbitrary time, then populate it
  setTimeout(() => {
    const successNode = document.createElement("p");
    // Let's verify that Vite is injecting environment variables
    // @see https://vitejs.dev/guide/env-and-mode.html#env-variables
    if (import.meta.env.DEV === true) {
      successNode.innerText = "Vite is serving the script correctly!";
    }
    if (import.meta.env.PROD === true) {
      successNode.innerText =
        "";
    }
    alertNode.appendChild(successNode);
  }, 400);
}

init();

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3.2,
    },
    1691: {
      slidesPerView: 4.0,
    },
  },
});

const swiperTeamCats = new Swiper('.swiper-team-cats', {
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: false,
  navigation: {
    nextEl: ".swiper-button-next-team-cats",
    prevEl: ".swiper-button-prev-team-cats",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3.5,
    },
    1691: {
      slidesPerView: 5.0,
    },
  },
});