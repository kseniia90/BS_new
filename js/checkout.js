//checkout-info
/*$(".checkout-info__change-btn").on("click", function (e) {
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
});*/

$(".payment input[type=radio]").on("change", function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.closest(".payment").find(".payment-info").show();
});

document.querySelectorAll(".checkout-gifts-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 3;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 16,
    slidesPerView: "auto",
  });
});

const $promocode = $(".add-coupon.promocode");
const $cupon = $(".add-coupon.cupon");

function initCouponValues() {
  $(".resident .add-coupon.promocode, .resident .add-coupon.cupon").each(function () {
    const $block = $(this);
    const $input = $block.find(".add_cupon");
    const $addedInput = $block.find(".added_cupon");
    const value = ($input.val() || "").toString().trim();

    if (value) {
      $addedInput.val(value);
      $block.find(".add-coupon-block").hide();
      $block.find(".added-coupon-block").show();
    }
  });

  updateFieldsState();
}

// Блокуємо одне поле, якщо друге вже використовується
function updateFieldsState() {
  const promocodeValue = ($promocode.find(".added_cupon").val() || "").toString().trim();

  const cuponValue = ($cupon.find(".added_cupon").val() || "").toString().trim();
  if (promocodeValue) {
    $cupon.find(".add_cupon").prop("disabled", true);
    return;
  }
  if (cuponValue) {
    $promocode.find(".add_cupon").prop("disabled", true);
    return;
  }
  $(".add-coupon .add_cupon").prop("disabled", false);
}

// Додати промокод / б'ютіки
$(document).on("click", ".add-cupon-btn", function (e) {
  e.preventDefault();
  const $block = $(this).closest(".add-coupon");
  const $input = $block.find(".add_cupon");
  const $addedInput = $block.find(".added_cupon");
  const value = ($input.val() || "").toString().trim();
  if (!value) {
    return;
  }
  $addedInput.val(value);
  $block.find(".add-coupon-block").hide();
  $block.find(".added-coupon-block").show();
  updateFieldsState();
});


// Видалити промокод / б'ютіки
$(document).on("click", ".delete-cupon-btn", function (e) {
  e.preventDefault();
  const $block = $(this).closest(".add-coupon");
  $block.find(".add_cupon").val("");
  $block.find(".added_cupon").val("");
  $block.find(".add-coupon-block").show();
  $block.find(".added-coupon-block").hide();
  updateFieldsState();
});

initCouponValues();

const deliveryInputs = document.querySelectorAll('input[name="delivery"]');

const payment1 = document.querySelector('#payment-1');
const payment2 = document.querySelector('#payment-2');
const payment3 = document.querySelector('#payment-3');

deliveryInputs.forEach(delivery => {
    delivery.addEventListener('change', () => {

        // Спочатку скидаємо всі
        payment1.checked = false;
        payment2.checked = false;
        payment3.checked = false;

        // Вибираємо потрібний
        if (delivery.id === 'delivery-nova') {
            payment1.checked = true;
        } else if (delivery.id === 'delivery-ukrp' || delivery.id === 'delivery-meest') {
            payment2.checked = true;
        } else if (delivery.id === 'delivery-uklon') {
            payment3.checked = true;
        }
    });
});

if (document.querySelector(".checkout-error-popup.active") !== null) {
  document.body.addEventListener("click", function (e) {
    const popup = document.querySelector(".checkout-error-popup.active");
    if (popup && !popup.contains(e.target)) {
      popup.classList.remove("active");
    }
  });
}
