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

const swiperCards = new Swiper('.card-slider', {
  loop: true,
  spaceBetween: 16,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  }
});

const swiperPhotos = new Swiper('.photo-slider', {
  loop: true,
  spaceBetween: 8,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  }
});
