"use strict";
// menu start

const burgerMenuIcon = document.querySelector(".burger-menu__icon");
const burgerMenuBody = document.querySelector(".header__nav-container");

document.addEventListener("click", function (event) {
  if (event.target.closest(".burger-menu-btn")) {
    document.body.classList.toggle("lock");
    burgerMenuBody.classList.toggle("_active");
    burgerMenuIcon.classList.toggle("_active");
  }
});


document.querySelectorAll(".dropdown-link").forEach(dropDownFunc);
let dropdownCloseTimeout;

// Dropdown Open and Close function START
function dropDownFunc(dropDown) {
  if (window.innerWidth > 900) {
    if (dropDown.classList.contains("hover-dropdown") === true) {
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (e.type == "mouseover" && !!this.nextElementSibling) {
          // Close the opend dropdown
          closeDropdown();

          // add the open and active class(Opening the DropDown)
          this.parentElement.classList.add("dropdown-open");
          this.nextElementSibling.classList.add("dropdown-active");
        //   this.querySelector(".arrow_down").classList.add("rotate");
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
        //   if (!!this.querySelector(".arrow_down")) {
        //     this.querySelector(".arrow_down").classList.add("rotate");
        //   }
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
  if (window.innerWidth > 900) {
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
  if (window.innerWidth > 900) {
    // Close the menu if click happen outside menu
    if (!e.target.closest(".header__nav__list")) {
      // Close the opend dropdown
      closeDropdown();
    }
  } else {
    // close burger menu
    if (!e.target.closest(".header__nav-container") &&!e.target.classList.contains("burger-menu__icon")) {
      document.body.classList.remove("lock");
      burgerMenuBody.classList.remove("_active");
      burgerMenuIcon.classList.remove("_active");

      this.setTimeout(function () {
        $(".header__second-submenu__list.open").removeClass("open");
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass("dropdown-active");
        // $(".header__nav-link.dropdown-open .arrow_down").removeClass("arrow_down");
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      }, 400);
    }

    if (e.target.closest(".header__nav__back")) {
      if ($(".header__second-submenu__list.open").length) {
        $(".header__second-submenu__list.open").removeClass("open");
      } else if ($(".header__nav-link.dropdown-open").length) {
        $(".header__nav-link.dropdown-open .dropdown-active").removeClass("dropdown-active");
        // $(".header__nav-link.dropdown-open .arrow_down").removeClass("arrow_down");
        $(".header__nav-link.dropdown-open").removeClass("dropdown-open");
      } else {
        document.body.classList.remove("lock");
        burgerMenuBody.classList.remove("_active");
        burgerMenuIcon.classList.remove("_active");
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

//   document.querySelectorAll(".arrow_down").forEach(function (container) {
//     container.classList.remove("rotate");
//   });
}
// dropdown menu END

// dropdown submenu
$(".has-submenu > a").click(function (e) {
  e.preventDefault();
  if (!$(this).siblings(".header__second-submenu__list").hasClass("open")) {
    $(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth > 900) {
      $(".header__second-submenu__list").slideUp();
    }
    $(this).siblings(".header__second-submenu__list").addClass("open");
    if (window.innerWidth > 900) {
      $(this).siblings(".header__second-submenu__list").slideDown();
    }
  } else {
    $(this).siblings(".header__second-submenu__list").removeClass("open");
    if (window.innerWidth > 900) {
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
  spaceBetween: 32,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  }
});

const swiperReviews = new Swiper('.reviews-slider', {
  loop: true,
  spaceBetween: 32,
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
  spaceBetween: 32,
  slidesPerView: 'auto',
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  }
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

// accordion end