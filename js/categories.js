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
  const slides = slider.querySelectorAll(".swiper-slide").length;
  const enableLoop = slides > 4;

  new Swiper(slider, {
    loop: enableLoop,
    slidesPerView: "auto",
    cssMode: true,

    navigation: {
      nextEl: slider.querySelector(".swiper-button-next"),
      prevEl: slider.querySelector(".swiper-button-prev"),
    },

    breakpoints: {
      0: {
        spaceBetween: 16,
      },
      1300: {
        spaceBetween: 32,
      },
    },
  });
});


document.querySelectorAll(".brand-slider").forEach((slider) => {
  const slideCount = slider.querySelectorAll(".swiper-slide").length;
  const enableLoop = slideCount > 4;

  new Swiper(slider, {
    loop: enableLoop,
    spaceBetween: 16,
    cssMode: true,

    navigation: {
      nextEl: slider.querySelector(".swiper-button-next"),
      prevEl: slider.querySelector(".swiper-button-prev"),
    },

    pagination: {
      el: slider.querySelector(".swiper-pagination"),
      clickable: true,
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


if (document.querySelector(".slider-range") !== null) {
  const rangeMinValue = document.querySelector("#range-min-value"); 
  const rangeMaxValue = document.querySelector("#range-max-value"); 
  const inputMinValue = document.querySelector("#input-min-value"); 
  const inputMaxValue = document.querySelector("#input-max-value");
  const rangeElement  = document.querySelector(".slider-range");
  const form          = document.querySelector(".filter__slider-form");

  const MIN_VALUE = form ? parseInt(form.dataset.minDefault, 10) : 0;
  const MAX_VALUE = form ? parseInt(form.dataset.maxDefault, 10) : 9000;

  const minBound = Number.isFinite(MIN_VALUE) ? MIN_VALUE : 0;
  const maxBound = Number.isFinite(MAX_VALUE) ? MAX_VALUE : 9000;

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function valueToPercentage(value) {
    const v = clamp(value, minBound, maxBound);
    const range = (maxBound - minBound) || 1;
    return Math.round(((v - minBound) / range) * 100);
  }

  function percentageToValue(percentage) {
    const p = clamp(parseInt(percentage, 10) || 0, 0, 100);
    const range = (maxBound - minBound) || 1;
    return Math.round(minBound + (p / 100) * range);
  }

  function setThumbPosition(thumbType, percentage) {
    const cssVar = thumbType === "min" ? "--min-thumb-percent" : "--max-thumb-percent";
    rangeElement.style.setProperty(cssVar, percentage);
  }

  function getThumbPosition(thumbType) {
    const cssVar = thumbType === "min" ? "--min-thumb-percent" : "--max-thumb-percent";
    const raw = rangeElement.style.getPropertyValue(cssVar);
    const val = parseInt(raw, 10);
    return Number.isFinite(val) ? val : (thumbType === "min" ? 0 : 100);
  }

  function sanitizeInputValue(input) {
    if (!/^\d*$/.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, "");
    }
  }

  function normalizeInputs() {
    let minV = parseInt(inputMinValue.value, 10);
    let maxV = parseInt(inputMaxValue.value, 10);

    if (!Number.isFinite(minV)) minV = minBound;
    if (!Number.isFinite(maxV)) maxV = maxBound;

    minV = clamp(minV, minBound, maxBound);
    maxV = clamp(maxV, minBound, maxBound);

    if (minV >= maxV) {
      minV = Math.max(minBound, maxV - 1);
    }

    inputMinValue.value = minV;
    inputMaxValue.value = maxV;

    const minP = valueToPercentage(minV);
    const maxP = valueToPercentage(maxV);

    rangeMinValue.value = minP;
    rangeMaxValue.value = maxP;

    setThumbPosition("min", minP);
    setThumbPosition("max", maxP);
  }

  inputMinValue.addEventListener("input", function () {
    sanitizeInputValue(this);

    let minV = parseInt(this.value, 10);
    let maxV = parseInt(inputMaxValue.value, 10);

    if (!Number.isFinite(minV)) minV = minBound;
    if (!Number.isFinite(maxV)) maxV = maxBound;

    minV = clamp(minV, minBound, maxBound);

    if (minV >= maxV) minV = Math.max(minBound, maxV - 1);

    this.value = minV;

    const minP = valueToPercentage(minV);

    rangeMinValue.value = minP;
    setThumbPosition("min", minP);
  });

  inputMaxValue.addEventListener("input", function () {
    sanitizeInputValue(this);

    let maxV = parseInt(this.value, 10);
    let minV = parseInt(inputMinValue.value, 10);

    if (!Number.isFinite(maxV)) maxV = maxBound;
    if (!Number.isFinite(minV)) minV = minBound;

    maxV = clamp(maxV, minBound, maxBound);

    if (maxV <= minV) maxV = Math.min(maxBound, minV + 1);

    this.value = maxV;

    const maxP = valueToPercentage(maxV);

    rangeMaxValue.value = maxP;
    setThumbPosition("max", maxP);
  });

  rangeMinValue.addEventListener("input", function () {
    const maxThumbPercent = getThumbPosition("max");

    if (parseInt(this.value, 10) >= maxThumbPercent) {
      this.value = maxThumbPercent;
    }

    const percentage = parseInt(this.value, 10);
    const value = percentageToValue(percentage);

    inputMinValue.value = value;
    setThumbPosition("min", percentage);
  });

  rangeMaxValue.addEventListener("input", function () {
    const minThumbPercent = getThumbPosition("min");

    if (parseInt(this.value, 10) <= minThumbPercent) {
      this.value = minThumbPercent;
    }

    const percentage = parseInt(this.value, 10);
    const value = percentageToValue(percentage);

    inputMaxValue.value = value;
    setThumbPosition("max", percentage);
  });

  normalizeInputs();
}

