const swiperBanner = new Swiper('.banner-carousel', {
  loop: true,
  autoplay: {
    delay: 5000,
  },
   navigation: {
    nextEl: '.banner-carousel .swiper-button-next',
    prevEl: '.banner-carousel .swiper-button-prev',
  },
  pagination: {
    el: '.banner-carousel .swiper-pagination',
  }
});

const swiperPhotos = new Swiper('.photo-slider', {
  loop: true,
  spaceBetween: 8,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.photo-slider .swiper-button-next',
    prevEl: '.photo-slider .swiper-button-prev',
  },
  pagination: {
    el: '.photo-slider .swiper-pagination',
  }
});


document.querySelectorAll('.scroll-box').forEach(function (scrollBox) {
  const container = scrollBox;
  const wrapper = document.createElement("div");
  wrapper.className = "scroll-box-wrapper";
  container.parentNode.insertBefore(wrapper, container);
  wrapper.appendChild(container);

  wrapper.style.setProperty("--scroll-box-gap", window.getComputedStyle(scrollBox).columnGap);

  const items = Array.from(wrapper.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    wrapper.appendChild(clone);
  });

  wrapper.classList.add("animate");
});
