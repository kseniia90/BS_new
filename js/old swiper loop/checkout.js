//checkout-info
$(".checkout-info__change-btn").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.toggleClass("chande-open");
  if ($this.hasClass("chande-open")) {
    $this.text("Зберегти");
  } else {
    $this.text("Редагувати");
  }
  $this.toggleClass("accordion-active");
  $this.closest(".checkout-info").find(".checkout-info__change").slideToggle();
});

$(".payment input[type=radio]").on("change", function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.closest(".payment").find(".payment-info").show();
});

document.querySelectorAll(".checkout-gifts-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 16,
    slidesPerView: 'auto',
  
  });
});

// const swiperCheckoutGifts = new Swiper('.checkout-gifts-slider', {
//   loop: true,
//   spaceBetween: 16,
//   slidesPerView: 'auto',
// });