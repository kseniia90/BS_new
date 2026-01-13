$(".filters__title-open").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);

  $(".categories__content__left").toggleClass("open");
  $("body").addClass("lock");
});

$(".filters__list-heder .close").on("click", function (e) {
  $(".categories__content__left").removeClass("open");
  $("body").removeClass("lock");
});

$(".filter__header").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);

  $this.toggleClass("open");
  $this.next().slideToggle();
});

// При кліку на List
$(".filters-view-btn-list").on("click", function (e) {
  e.preventDefault();
  $(".filters-view-btn").removeClass("active");
  $(this).addClass("active");
  $(".categories-result").addClass("list");

  localStorage.setItem("viewMode", "list");
});

// При кліку на Multi
$(".filters-view-btn-multi").on("click", function (e) {
  e.preventDefault();
  $(".filters-view-btn").removeClass("active");
  $(this).addClass("active");
  $(".categories-result").removeClass("list");

  localStorage.setItem("viewMode", "multi");
});

// При завантаженні сторінки — відновлюємо стан
$(document).ready(function () {
  const view = localStorage.getItem("viewMode");

  if (view === "list") {
    $(".filters-view-btn").removeClass("active");
    $(".filters-view-btn-list").addClass("active");
    $(".categories-result").addClass("list");
  } else {
    $(".filters-view-btn").removeClass("active");
    $(".filters-view-btn-multi").addClass("active");
    $(".categories-result").removeClass("list");
  }
});

document.querySelectorAll(".aktsii-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    slidesPerView: 4,
    cssMode: true,
    navigation: {
      nextEl: ".aktsii-slider .swiper-button-next",
      prevEl: ".aktsii-slider .swiper-button-prev",
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
});

document.querySelectorAll(".brand-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 16,
    cssMode: true,
    navigation: {
      nextEl: ".brand-slider .swiper-button-next",
      prevEl: ".brand-slider .swiper-button-prev",
    },

    pagination: {
      el: ".brand-slider .swiper-pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
      },
      1300: {
        slidesPerView: 4,
      },
    },
  });
});


// const swiperAktsii = new Swiper(".aktsii-slider", {
//   loop: true,
//   slidesPerView: 4,
//   cssMode: true,
//   navigation: {
//     nextEl: ".aktsii-slider .swiper-button-next",
//     prevEl: ".aktsii-slider .swiper-button-prev",
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: "auto",
//       spaceBetween: 16,
//     },
//     1300: {
//       slidesPerView: 4,
//       spaceBetween: 32,
//     },
//   },
// });

// const swiperBrand = new Swiper(".brand-slider", {
//   loop: true,
//   spaceBetween: 16,
//   cssMode: true,
//   navigation: {
//     nextEl: ".brand-slider .swiper-button-next",
//     prevEl: ".brand-slider .swiper-button-prev",
//   },

//    pagination: {
//     el: '.brand-slider .swiper-pagination',
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: "auto",
//     },
//     1300: {
//       slidesPerView: 4,
//     },
//   },
// });

// countDown on banner

if (document.querySelector(".sale-coutndown") !== null) {

  const second = 1000,
        minute = second * 60,
        hour   = minute * 60,
        day    = hour * 24;

  const timeleft = JSON.parse(
    document.querySelector(".sale-timer-right").getAttribute("data-timeleft")
  );

  let distance =
      (timeleft.days * day) +
      (timeleft.hours * hour) +
      (timeleft.minutes * minute) +
      (timeleft.seconds * second);

  const x = setInterval(() => {

    if (distance <= 0) {
      document.getElementById("days").innerText    = "00";
      document.getElementById("hours").innerText   = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
      clearInterval(x);
      return;
    }

    let days    = Math.floor(distance / day);
    let hours   = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    days    = days.toString().padStart(2, "0");
    hours   = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    document.getElementById("days").innerText    = days;
    document.getElementById("hours").innerText   = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    distance -= second;

  }, second);
}



const rangeMinValue = document.querySelector("#range-min-value");
const rangeMaxValue = document.querySelector("#range-max-value");
const inputMinValue = document.querySelector("#input-min-value");
const inputMaxValue = document.querySelector("#input-max-value");
const rangeElement = document.querySelector(".slider-range");

const MIN_VALUE = 0;
const MAX_VALUE = 9000;

function valueToPercentage(value) {
  return (value / MAX_VALUE) * 100;
}

function percentageToValue(percentage) {
  return Math.round((percentage / 100) * MAX_VALUE);
}

function setThumbPosition(thumbType, percentage) {
  const cssVar =
    thumbType === "min" ? "--min-thumb-percent" : "--max-thumb-percent";
  rangeElement.style.setProperty(cssVar, percentage);
}

function getThumbPosition(thumbType) {
  const cssVar =
    thumbType === "min" ? "--min-thumb-percent" : "--max-thumb-percent";
  return rangeElement.style.getPropertyValue(cssVar);
}

function validateAndSetValue(input, value, minValue, maxValue) {
  if (value < minValue) {
    input.value = minValue;
  } else if (value > maxValue) {
    input.value = maxValue;
  }
  return parseInt(input.value);
}

function sanitizeInputValue(input) {
  if (!/^\d+$/.test(input.value)) {
    input.value = input.value.replace(/[^0-9]/g, "");
  }
}

inputMinValue.addEventListener("input", function () {
  sanitizeInputValue(this);

  const maxValue = parseInt(inputMaxValue.value) || MAX_VALUE;
  const value = validateAndSetValue(
    this,
    parseInt(this.value) || MIN_VALUE,
    MIN_VALUE,
    MAX_VALUE
  );

  if (value >= maxValue) {
    this.value = maxValue - 1;
  }

  const percentage = valueToPercentage(parseInt(this.value));

  if (!isNaN(value)) {
    rangeMinValue.value = percentage;
    setThumbPosition("min", percentage);
  }
});

inputMaxValue.addEventListener("input", function () {
  sanitizeInputValue(this);

  const minValue = parseInt(inputMinValue.value) || MIN_VALUE;
  const value = validateAndSetValue(
    this,
    parseInt(this.value),
    minValue + 1,
    MAX_VALUE
  );
  const percentage = valueToPercentage(parseInt(this.value));

  if (!isNaN(value)) {
    rangeMaxValue.value = percentage;
    setThumbPosition("max", percentage);
  }
});

rangeMinValue.addEventListener("input", function () {
  const maxThumbPercent = getThumbPosition("max");

  if (parseInt(this.value) >= parseInt(maxThumbPercent)) {
    this.value = maxThumbPercent;
  }

  const percentage = parseInt(this.value);
  const value = percentageToValue(percentage);

  inputMinValue.value = value;
  setThumbPosition("min", percentage);
});

rangeMaxValue.addEventListener("input", function () {
  const minThumbPercent = getThumbPosition("min");

  if (parseInt(this.value) <= parseInt(minThumbPercent)) {
    this.value = minThumbPercent;
  }

  const percentage = parseInt(this.value);
  const value = percentageToValue(percentage);

  inputMaxValue.value = value;
  setThumbPosition("max", percentage);
});

rangeMinValue.dispatchEvent(new Event("input"));
rangeMaxValue.dispatchEvent(new Event("input"));
