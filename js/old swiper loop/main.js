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

  // if (window.innerWidth >= mobileBreakpoint) {
    if (dropDown.classList.contains("hover-dropdown") === true) {
      
      dropDown.onmouseover = dropDown.onmouseout = dropdownHover;

      function dropdownHover(e) {
        if (window.innerWidth >= mobileBreakpoint) {
          if (e.type == "mouseover" && !!this.nextElementSibling) {
            // Close the opend dropdown
            closeDropdown();

            // add the open and active class(Opening the DropDown)
            this.parentElement.classList.add("dropdown-open");
            this.nextElementSibling.classList.add("dropdown-active");
          }
        }
      }
    }
    // close the dropdown on mouse out from the dropdown list
    document.querySelectorAll(".header__submenu__list").forEach(function (dropDownList) {
        // close the dropdown after user leave the list
        dropDownList.onmouseleave = function(){
          if (window.innerWidth >= mobileBreakpoint) {
            closeDropdown;
          }
        } 
      });
    document.querySelectorAll(".header__nav-link").forEach(function (listItem) {
      listItem.onmouseleave = function () {
        if (window.innerWidth >= mobileBreakpoint) {
          dropdownCloseTimeout = setTimeout(function () {
            closeDropdown();
          }, 200);
        }
      };
    });
    document.querySelectorAll(".header__submenu__list").forEach(function (dropDownList) {
        dropDownList.onmouseenter = function () {
           if (window.innerWidth >= mobileBreakpoint) {
             clearTimeout(dropdownCloseTimeout);
           }
        };
      });
  // } else {
    if (dropDown.classList.contains("dropdown-link") === true) {
      dropDown.addEventListener("click", function (e) {
        if (window.innerWidth < mobileBreakpoint) {
          if (!!this.nextElementSibling && this.nextElementSibling.classList.contains("dropdown-active") === true) {
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
        }
      });
    }
  // }
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
    if ( !e.target.closest(".header__nav-container") &&  !e.target.classList.contains("burger-menu__icon") ) {
      // document.body.classList.remove("lock");
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
  var $langDropdown = $(".lang-dropdown");

  $(".lang-switcher .current").on("click", function (e) {
    e.stopPropagation();
    $(".lang-switcher").toggleClass("open");
    if ($langDropdown.hasClass("show")) {
      $langDropdown.removeClass("show").fadeOut();
    } else {
      $langDropdown.addClass("show").fadeIn().css("display", "flex");
    }
  });

  $(window).on("click", function (e) {
    if (!$(e.target).closest(".lang-switcher").length && $langDropdown.hasClass("show")) {
      $langDropdown.removeClass("show").fadeOut();
    }
  });
});

// sliders start
document.querySelectorAll(".products-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    slidesPerView: "auto",

    navigation: {
      nextEl: slider.querySelector(".swiper-button-next"),
      prevEl: slider.querySelector(".swiper-button-prev"),
    },

    pagination: {
      el: slider.querySelector(".swiper-pagination"),
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
});

document.querySelectorAll(".insta-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 8,
    slidesPerView: "auto",
    pagination: {
      clickable: true,
    },
  });
});

document.querySelectorAll(".reviews-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
      spaceBetween: 32,
      slidesPerView: "auto",
      cssMode: true,
      navigation: {
        nextEl: ".reviews-slider .swiper-button-next",
        prevEl: ".reviews-slider .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
  });
});

document.querySelectorAll(".card-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 16,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".card-slider .swiper-button-next",
      prevEl: ".card-slider .swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
});

document.querySelectorAll(".posts-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    slidesPerView: "auto",
    cssMode: true,
    navigation: {
      nextEl: ".posts-slider .swiper-button-next",
      prevEl: ".posts-slider .swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
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
});

document.querySelectorAll(".gifts-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    slidesPerView: "auto",
    pagination: {
      el: ".gifts-slider .swiper-pagination",
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
});

document.querySelectorAll(".cart-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 16,
    slidesPerView: "auto",
  
  });
});

document.querySelectorAll(".product__variants-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    spaceBetween: 8,
    slidesPerView: "auto",
  
  });
});

// const swiperInsta = new Swiper(".insta-slider", {
//   loop: true,
//   spaceBetween: 8,
//   slidesPerView: "auto",
//   pagination: {
//     clickable: true,
//   },
// });

// const swiperReviews = new Swiper(".reviews-slider", {
//   loop: true,
//   spaceBetween: 32,
//   slidesPerView: "auto",
//   cssMode: true,
//   navigation: {
//     nextEl: ".reviews-slider .swiper-button-next",
//     prevEl: ".reviews-slider .swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

// const swiperCards = new Swiper(".card-slider", {
//   loop: true,
//   spaceBetween: 16,
//   slidesPerView: "auto",
//   navigation: {
//     nextEl: ".card-slider .swiper-button-next",
//     prevEl: ".card-slider .swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
// });

// const swiperPosts = new Swiper(".posts-slider", {
//   loop: true,
//   slidesPerView: "auto",
//   cssMode: true,
//   navigation: {
//     nextEl: ".posts-slider .swiper-button-next",
//     prevEl: ".posts-slider .swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   breakpoints: {
//     0: {
//       spaceBetween: 16,
//     },
//     768: {
//       spaceBetween: 32,
//     },
//   },
// });

// const swiperGifts = new Swiper(".gifts-slider", {
//   loop: true,
//   slidesPerView: "auto",
//   pagination: {
//     el: ".gifts-slider .swiper-pagination",
//   },
//   breakpoints: {
//     0: {
//       spaceBetween: 16,
//     },
//     768: {
//       spaceBetween: 32,
//     },
//   },
// });

// const swiperCart = new Swiper(".cart-slider", {
//   loop: true,
//   spaceBetween: 16,
//   slidesPerView: "auto",
// });

// const swiperVariants = new Swiper(".product__variants-slider", {
//   loop: true,
//   spaceBetween: 8,
//   slidesPerView: "auto",
// });

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

$("textarea").keyup(function () {
  var characterCount = $(this).val().length,
    current = $("#current");
  current.text(characterCount);
});

// $(".favorit_icon").on("click", function (e) {
//   e.preventDefault();
//   $(this).toggleClass("favorite");
// });

// mini-cart popup start
if (document.querySelector(".mini-cart-popup") !== null) {
  document.querySelector(".header-mini-cart").addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.add("active");
      document.body.classList.add("lock");
    });

  window.addEventListener("click", function (e) {
    if (e.target.closest(".mini-cart-popup__close") || e.target.closest(".mini-cart-popup .btn-continue")) {
      e.preventDefault();
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("lock");
    }

    if (document.querySelector(".mini-cart-popup.active") && !e.target.closest(".mini-cart-popup-content") && !e.target.closest(".header-mini-cart")) {
      document.querySelector(".mini-cart-popup").classList.remove("active");
      document.body.classList.remove("lock");
    }
  });
}
// mini-cart end


// authorization popup start
if (document.querySelector(".authorization-popup") !== null) {
  document.querySelectorAll(".authorization-popup-close").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.overflow = "visible";
      document.querySelectorAll(".authorization-popup").forEach(el => el.classList.remove("active"));
    });
  });
   if (document.querySelector(".authorization-popup.active")) {
     document.addEventListener('click', function(event) {
      console.log("click");
      document.querySelectorAll('.authorization-popup.active').forEach(function(popup) {
        if (!popup.querySelector('.authorization-popup-content').contains(event.target)) {
          popup.classList.remove('active');
        }
      });
    });
   }
}

// tab links
function openOption(evt, optionName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";

}

// sing in email/phone
$(".sign-in-btn").on("click", function (e) {
  e.preventDefault();
  $(".email-block, .phone-block").toggleClass("open");
});

$(".toggle-password").click(function() {

  $(this).toggleClass("hide");
  var input = $(this).closest(".input-has-icon").find("input");
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

function showSmsVerify(){
       
  if (document.querySelector(".sign-in__phone-code") !== null) {
    
    document.querySelector(".phone-block-row").style.display = "none";
    document.querySelector(".sign-in__phone-code").style.display = "flex";
    document.querySelector(".sign-in__choice").style.display = "block";
  }
}

let timeoutSmsVerify;

function countdownSmsVerify() {
  document.getElementById("timer-counter").style.display= "block"
  var seconds = 59;
  function tick() {
    var counter = document.getElementById("timer-counter");
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      timeoutSmsVerify = setTimeout(tick, 1000);
    } else {
      document.getElementById("timer-counter").style.display= "none"
    }
  }
  tick();
}

if (document.querySelector(".sign-in__choice") !== null) {

   document.querySelector(".sign-in__choice-back").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".phone-block-row").style.display = "flex";
    document.querySelector(".sign-in__phone-code").style.display = "none";
    document.querySelector(".sign-in__choice").style.display = "none";
  });

  document.querySelector(".sign-in__choice-repeat").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".timer-block").style.display = "block";
    document.querySelector(".repeat-btn_wrapper").style.display = "none";
    clearTimeout(timeoutSmsVerify);
    countdownSmsVerify();
  });
}

if (document.querySelector(".authorization-popup") !== null) {
  document.querySelectorAll(".forget-password-btn").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".sign-in__content").classList.add("hide");
      document.querySelector(".remind-password__content").classList.add("active");
    });
  });
}

//  authorization popup end

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

// product variants dropdown
const selectedAll = document.querySelectorAll(".variant-dropdown-wrapper");

selectedAll.forEach((selected) => {
  const optionsList = selected.querySelectorAll(".variant-dropdown-wrapper li");

  selected.addEventListener("click", () => {
    let arrow = selected.children[1];

    if (selected.classList.contains("active")) {
      handleDropdown(selected, arrow, false);
    } else {
      let currentActive = document.querySelector(
        ".variant-dropdown-wrapper.active"
      );

      if (currentActive) {
        let anotherArrow = currentActive.children[1];
        handleDropdown(currentActive, anotherArrow, false);
      }

      handleDropdown(selected, arrow, true);
    }
  });

  // update the display of the dropdown
  if (optionsList.length > 0) {
    optionsList[0].classList.add("selected");
    selected.querySelector(".selected-display").innerHTML =
      optionsList[0].innerHTML;
  }

  for (let o of optionsList) {
    o.addEventListener("click", () => {
      optionsList.forEach((el) => el.classList.remove("selected"));
      o.classList.add("selected");
      selected.querySelector(".selected-display").innerHTML = o.innerHTML;
    });
  }
});

// check if anything else ofther than the dropdown is clicked
document.addEventListener("mousemove", function (e) {
  const activeWrapper = document.querySelector(".variant-dropdown-wrapper.active");

  if (activeWrapper) {
    if (
      !e.target.closest(".variant-dropdown-wrapper.active") &&
      !e.target.closest(".variant-dropdown")
    ) {
      closeAllDropdowns();
    }
  }
});

window.addEventListener("click", function (e) {
  if (e.target.closest(".variant-dropdown-wrapper") === null) {
    closeAllDropdowns();
  }
});

// close all the dropdowns
function closeAllDropdowns() {
  const selectedAll = document.querySelectorAll(".variant-dropdown-wrapper");
  selectedAll.forEach((selected) => {
    let arrow = selected.children[1];

    handleDropdown(selected, arrow, false);
  });
}

// open all the dropdowns
function handleDropdown(dropdown, arrow, open) {
  if (open) {
    arrow.classList.add("rotated");
    dropdown.classList.add("active");
  } else {
    arrow.classList.remove("rotated");
    dropdown.classList.remove("active");
  }
}
// product variants dropdown end

// video play
jQuery(function ($) {

  function loadVideo($video) {
    // Уже загружали
    if ($video.data('loaded') === 1) return;

    var videoEl = $video.get(0);
    var src    = $video.data('src');

    var $source = $video.find('source[data-src]');

    if (!src && $source.length) {
      src = $source.data('src');
      $source.attr('src', src);
    } else if (src) {
      if (!$video.find('source').length) {
        $source = $('<source>', {
          src: src,
          type: 'video/mp4'
        });
        $video.append($source);
      } else {
        $source = $video.find('source').first();
        $source.attr('src', src);
      }
    }

    if (src) {
      videoEl.load();
      $video.data('loaded', 1);
    }
  }

  $('.video_container').each(function () {
    var $container  = $(this);
    var $video      = $container.find('video');
    var $playButton = $container.find('.play_button');

    if (!$video.length) return;

    var videoEl = $video.get(0);

    function pauseAllOthers() {
      $('.video_container').each(function () {
        var $otherContainer = $(this);
        var $otherVideo     = $otherContainer.find('video');
        var $otherButton    = $otherContainer.find('.play_button');

        if (!$otherVideo.length) return;

        if ($otherVideo.get(0) !== videoEl) {
          $otherVideo.get(0).pause();
          if ($otherButton.length) {
            $otherButton.removeClass('hide');
          }
        }
      });
    }

    $playButton.on('click', function (e) {
      e.preventDefault();

      loadVideo($video);

      pauseAllOthers();

      if (videoEl.paused) {
        videoEl.play().catch(function () {});
        $playButton.addClass('hide');
      } else {
        videoEl.pause();
        $playButton.removeClass('hide');
      }
    });

    $video.on('click', function () {
      loadVideo($video);

      if (videoEl.paused) {
        pauseAllOthers();
        videoEl.play().catch(function () {});
        $playButton.addClass('hide');
      } else {
        videoEl.pause();
        $playButton.removeClass('hide');
      }
    });

    $video.on('ended', function () {
      $playButton.removeClass('hide');
    });

  });

});


$(".delete-cupon-btn").each(function () {
  $(this).on("click", function (e) {
    e.preventDefault();

    const parent = $(this).closest(".add-coupon");
    parent.find(".bs-form .input-block.added-coupon-block").hide();
    parent.find(".bs-form .input-block.add-coupon-block").css("display", "grid").hide().fadeIn();
    // parent.removeClass("added");
  });
});
