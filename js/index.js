const swiperBanner = new Swiper('.banner-carousel', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
  }
});

const swiperInsta = new Swiper('.insta-slider', {
  loop: true,
  spaceBetween: 8,
   slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
      },
      breakpoints: {
        0: {
           slidesPerView: 'auto',

        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
});