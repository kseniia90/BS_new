"use strict";
// menu start

const mobileBreakpoint = 1400;
const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav-container");

document.addEventListener("click", function (event) {
  if (event.target.closest(".burger-menu-btn")) {
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("active");
    burgerMenuIcon.classList.toggle("active");
  }
});

document.querySelectorAll(".dropdown-link").forEach(dropDownFunc);
let dropdownCloseTimeout;

// Dropdown Open and Close function START
function dropDownFunc(dropDown) {
  if (window.innerWidth >= mobileBreakpoint) {
    if (dropDown.classList.contains("hover-dropdown") === true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (e.type == "mouseover" && !!this.nextElementSibling) {
          // Close the opend dropdown
          closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");
          this.nextElementSibling.classList.add("dropdown-active");
        }
      }
    }
    // close the dropdown on mouse out from the dropdown list
    document
      .querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        // close the dropdown after user leave the list
        dropDownList.onmouseleave = closeDropdown;
      });
    document.querySelectorAll(".header__nav-link").forEach(function (listItem) {
      listItem.onmouseleave = function () {
        dropdownCloseTimeout = setTimeout(function () {
          closeDropdown();
        }, 200);
      };
    });
    document
      .querySelectorAll(".header__submenu__list")
      .forEach(function (dropDownList) {
        dropDownList.onmouseenter = function () {
          clearTimeout(dropdownCloseTimeout);
        };
      });
  } else {
    if (dropDown.classList.contains("dropdown-link") === true) {
      dropDown.addEventListener("click", function (e) {
        if (
          !!this.nextElementSibling &&
          this.nextElementSibling.classList.contains("dropdown-active") === true
        ) {
          // Close the clicked dropdown
          this.parentElement.classList.remove("dropdown-open");
          this.nextElementSibling.classList.remove("dropdown-active");

          closeDropdown();
        } else {
          // Close the opend dropdown
          closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");

          if (!!this.nextElementSibling) {
            this.nextElementSibling.classList.add("dropdown-active");

            setTimeout(() => {
              this.closest(".header__nav-container").scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 300);
          }
        }
      });
    }
  }
}

document.querySelectorAll(".header__nav-link > a").forEach(function (dropDown) {
  if (window.innerWidth >= mobileBreakpoint) {
    if (dropDown.classList.contains("hover-dropdown") !== true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (e.type == "mouseover") {
          closeDropdown();
        }
      }
    }
  }
});

// Listen to the doc click
window.addEventListener("click", function (e) {
  if (window.innerWidth >= mobileBreakpoint) {
    // Close the menu if click happen outside menu
    if (!e.target.closest(".header__nav__list")) {
      closeDropdown();
    }
  } else {
    // close burger menu
    if (!e.target.closest(".header__nav-container") &&!e.target.classList.contains("burger-menu__icon")) {
      document.body.classList.remove("lock");
      burgerMenuBody.classList.remove("active");
      burgerMenuIcon.classList.remove("active");

      this.setTimeout(function () {
        $(".header__second-submenu__list.open").removeClass("open");
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass("dropdown-active");
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      }, 400);
    }

    if (e.target.closest(".nav__close")) {
      if ($(".header__second-submenu__list.open").length) {
        $(".header__second-submenu__list.open").removeClass("open");
      } else if ($(".header__nav-link.dropdown-open").length) {
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass("dropdown-active");
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      } else {
        document.body.classList.remove("lock");
        burgerMenuBody.classList.remove("active");
        burgerMenuIcon.classList.remove("active");
      }
    }
  }
});

// Close the openend Dropdowns
function closeDropdown() {
  clearTimeout(dropdownCloseTimeout);
  document.querySelectorAll(".header__nav-link").forEach(function (container) {
    container.classList.remove("dropdown-open");
  });

  document.querySelectorAll(".header__submenu__list").forEach(function (menu) {
    menu.classList.remove("dropdown-active");
  });

}
// dropdown menu END

// dropdown submenu
$(".has-submenu > a").click(function (e) {
  e.preventDefault();
  if (!$(this).siblings(".header__second-submenu__list").hasClass("open")) {
    $(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth >= mobileBreakpoint) {
      $(".header__second-submenu__list").slideUp();
    }
    $(this).siblings(".header__second-submenu__list").addClass("open");
    if (window.innerWidth >= mobileBreakpoint) {
      $(this).siblings(".header__second-submenu__list").slideDown();
    }
  } else {
    $(this).siblings(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth >= mobileBreakpoint) {
      $(this).siblings(".header__second-submenu__list").slideUp();
    }
  }
});
// menu end

$(function () {
  var $langDropdown = $('.lang-dropdown');

  $('.lang-switcher .current').on('click', function (e) {
    e.stopPropagation(); 
    $('.lang-switcher').toggleClass('open');
    if ($langDropdown.hasClass('show')) {
      $langDropdown.removeClass('show').fadeOut();
    } else {
      $langDropdown.addClass('show').fadeIn().css('display', 'flex');
    }
  });

  $(window).on('click', function (e) {
    if (!$(e.target).closest('.lang-switcher').length && $langDropdown.hasClass('show')) {
      $langDropdown.removeClass('show').fadeOut();
    }
  });
});


// sliders start
const swiperProducts = new Swiper('.products-slider', {
  loop: true,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },

  breakpoints: {
    0: {
      spaceBetween: 8,
    },
    768: {
      spaceBetween: 32,
    },
  },

});

const swiperInsta = new Swiper('.insta-slider', {
  loop: true,
  spaceBetween: 8,
  slidesPerView: 'auto',
  pagination: {
    clickable: true,
  },
});

const swiperReviews = new Swiper('.reviews-slider', {
  loop: true,
  spaceBetween: 32,
  slidesPerView: 'auto',
  cssMode: true,
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
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

const swiperPosts = new Swiper('.posts-slider', {
  loop: true,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    0: {
      spaceBetween: 16,
    },
    768: {
      spaceBetween: 32,
    },
  },
});

const swiperGifts = new Swiper('.gifts-slider', {
  loop: true,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
  },
  breakpoints: {
    0: {
      spaceBetween: 16,
    },
    768: {
      spaceBetween: 32,
    },
  },
});

const swiperCart = new Swiper('.cart-slider', {
  loop: true,
  spaceBetween: 16,
  slidesPerView: 'auto',
});

// sliders end

// accordion start
    $(".faq-accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".faq-accordion .accordion__content").slideUp(400);
      $(".faq-accordion .accordion__title").removeClass("accordion-active");
      $(".faq-accordion .accordion__arrow").removeClass("active");
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
  });

  $(".footer-main__side.center .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("accordion__rotate");
  });

  // mini-cart accordion
   $(".gift-accordion-title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
  });

  // add cupon accordion
   $(".add-coupon .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
  });

// accordion end

$('textarea').keyup(function() {
  var characterCount = $(this).val().length,
      current = $('#current');    
  current.text(characterCount);
});

$('.favorit_icon').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('favorite');
});


// mini-cart popup start
if (document.querySelector(".mini-cart-popup") !== null) {
  document.querySelector(".header-mini-cart").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.add("active");
      document.body.classList.add("lock");
    });

  window.addEventListener("click", function (e) {
    if (
      e.target.closest(".mini-cart-popup__close") || e.target.closest(".mini-cart-popup .btn-continue")
    ) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("lock");
    }

    if (
      document.querySelector(".mini-cart-popup.active") &&  !e.target.closest(".mini-cart-popup-content") &&  !e.target.closest(".header-mini-cart")
    ) {
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("lock");
    }
  });
}
// mini-cart end

// show more-less

document.querySelectorAll(".text-block").forEach((block) => {
  const hiddenText = block.querySelector(".hidden-text");
  const button = block.querySelector(".show-more-btn");

  button.addEventListener("click", () => {
    if (hiddenText.style.maxHeight) {
      hiddenText.style.maxHeight = null;
      button.innerHTML = "Розгорнути";
      button.setAttribute("aria-expanded", "false");
    } else {
      hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
      button.innerHTML = "Згорнути";
      button.setAttribute("aria-expanded", "true");
    }
  });
});
 