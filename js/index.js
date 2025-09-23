const swiperBanner = new Swiper('.banner-carousel', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
  }
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
