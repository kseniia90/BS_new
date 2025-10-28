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

$(".filters-view-btn-list").on("click", function (e) {
  e.preventDefault();
  $(".filters-view-btn").removeClass("active");
  $(this).addClass("active");
  $(".categories-result").addClass("list");
});

$(".filters-view-btn-multi").on("click", function (e) {
  e.preventDefault();
   $(".filters-view-btn").removeClass("active");
   $(this).addClass("active");
  $(".categories-result").removeClass("list");
});

const swiperAktsii = new Swiper(".aktsii-slider", {
  loop: true,
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

const swiperBrand = new Swiper(".brand-slider", {
  loop: true,
  spaceBetween: 16,
  cssMode: true,
  navigation: {
    nextEl: ".brand-slider .swiper-button-next",
    prevEl: ".brand-slider .swiper-button-prev",
  },

   pagination: {
    el: '.brand-slider .swiper-pagination',
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

// countDown on banner
if (document.querySelector(".sale-coutndown") !== null) {
  let days = document.getElementById("days"),
    hours = document.getElementById("hours"),
    minutes = document.getElementById("minutes"),
    seconds = document.getElementById("seconds");
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let timeleft = JSON.parse(document.querySelector(".sale-timer-right").getAttribute("data-timeleft")),
    distance = timeleft.days * day + timeleft.hours * hour + timeleft.minutes * minute + timeleft.seconds * second,
    x = setInterval(function () {
        
      days = Math.floor(distance / day);
      days = days < 10 ? "0" + days : days;
      (document.getElementById("days").innerText = days),
        (hours = Math.floor((distance % day) / hour));
      hours = hours < 10 ? "0" + hours : hours;
      (document.getElementById("hours").innerText = hours),
        (minutes = Math.floor((distance % hour) / minute)),
        (minutes = minutes < 10 ? "0" + minutes : minutes);
      (document.getElementById("minutes").innerText = minutes),
        (seconds = Math.floor((distance % minute) / second)),
        (seconds = seconds < 10 ? "0" + seconds : seconds);
      document.getElementById("seconds").innerText = seconds;
      var sec = Math.floor((distance % minute) / second);
      distance = distance - second;
    }, second);
};
