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

const swiperCheckoutGifts = new Swiper('.checkout-gifts-slider', {
  loop: true,
  spaceBetween: 16,
  slidesPerView: 'auto',
});