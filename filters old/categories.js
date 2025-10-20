  $(".filter__accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $('body').addClass("lock");
  });

  $(".filters-heder .close").on("click", function (e) {
    $(".accordion__title").removeClass("accordion-active");
    $('body').removeClass("lock");
});

//BEGIN filters accordion

  $(".filters__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });
  //END

  const swiperAktsii = new Swiper(".aktsii-slider", {
  loop: true,
  slidesPerView: 4,
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});
  