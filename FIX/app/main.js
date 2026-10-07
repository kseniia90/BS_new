"use strict";

// preload

loading();
window.addEventListener("load", function () {
  document.querySelector("body").classList.add("loaded");
});

function loading() {
  document.querySelectorAll(".bar").forEach(function (current) {
    let startWidth = 0;
    const endWidth = current.dataset.size;
    const interval = setInterval(frame, 20);

    function frame() {
      if (startWidth >= endWidth) {
        clearInterval(interval);
      } else {
        startWidth++;
        current.style.width = `${endWidth}%`;
        document.getElementById("percentage").innerText = `${startWidth}%`;
      }
    }
  });
}

if (document.querySelector(".filters-heder button.light") !== null) {
  document.querySelector(".filters-heder button.light").addEventListener("click", function (e) {
    let url = location.href;
    const shortenedUrl = url.split('/filter')[0] + '/';

    location.href = shortenedUrl;
  });
}

//   back to page
// if (document.querySelector(".back_pg-btn") !== null) {
//   document.querySelector(".back_pg-btn").addEventListener("click", function (e) {
//       e.preventDefault();
//       window.history.back();
//     });
// }

// When the user scrolls down 250px from the top of the document, show the button
if (document.querySelector(".add-fixed-btn") !== null) {
  let addBtnFixed = document.querySelector(".add-fixed-btn");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 250 ||
      document.documentElement.scrollTop > 250 && document.documentElement.scrollTop < 1000
    ) {
      addBtnFixed.style.display = "flex";
    } else {
      addBtnFixed.style.display = "none";
    }
  }
}

// open catalog

document.querySelectorAll(".fixed-menu-item.catalog").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();

    if(document.querySelector(".catalog-nav").classList.contains("open")){
      document.querySelector(".fixed-menu-item.catalog").classList.remove("active");
      document.querySelector(".catalog-nav").classList.remove("open");
      document.querySelector("body").classList.remove("lock");
      if (document.querySelector(".menu-item-has-children.active") !== null) {
        document.querySelector(".menu-item-has-children.active").classList.remove("active");
      }
    } else {
      document.querySelectorAll(".fixed-menu-item").forEach((el) => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".cart-page").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelectorAll(".authorization-popup").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelector(".fixed-menu-item.catalog").classList.add("active");
      document.querySelector(".catalog-nav").classList.add("open");
      document.querySelector("body").classList.add("lock");
    }    
  });
});

// open cart

document.querySelectorAll(".fixed-menu-item.cart").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();

    if(document.querySelector(".cart-page").classList.contains("open")){
      document.querySelector(".fixed-menu-item.cart").classList.remove("active");
      document.querySelector(".cart-page").classList.remove("open");
      document.querySelector("body").classList.remove("lock");
     
    } else {
      document.querySelectorAll(".fixed-menu-item").forEach((el) => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".catalog-nav").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelectorAll(".authorization-popup").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelector(".fixed-menu-item.cart").classList.add("active");
      document.querySelector(".cart-page").classList.add("open");
      document.querySelector("body").classList.add("lock");
    }    
  });
});

if (document.querySelector(".empty-cart .btn") !== null) {
  document.querySelector(".empty-cart .btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".fixed-menu-item.cart").classList.remove("active");
    document.querySelector(".cart-page").classList.remove("open");
    document.querySelector("body").classList.remove("lock");
  });
}

// open authorization-popup

document.querySelectorAll(".fixed-menu-item.account").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();

    if(document.querySelector(".authorization-popup").classList.contains("open")){
      document.querySelector(".fixed-menu-item.account").classList.remove("active");
      document.querySelector(".authorization-popup").classList.remove("open");
      document.querySelector("body").classList.remove("lock");
     
    } else {
      document.querySelectorAll(".fixed-menu-item").forEach((el) => {
        el.classList.remove("active");
      });
      document.querySelectorAll(".catalog-nav").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelectorAll(".cart-page").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelector(".fixed-menu-item.account").classList.add("active");
      document.querySelector(".authorization-popup").classList.add("open");
      document.querySelector("body").classList.add("lock");
    }    
  });
});

document.querySelectorAll(".login-popup .btn-big").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();

    if(document.querySelector(".authorization-popup").classList.contains("open")){
      document.querySelector(".fixed-menu-item.account").classList.remove("active");
      document.querySelector(".authorization-popup").classList.remove("open");
      document.querySelector("body").classList.remove("lock");
     
    } else {
      document.querySelectorAll(".fixed-menu-item").forEach((el) => {
        el.classList.remove("active");
      });

      document.querySelector(".login-popup").classList.remove("open");
      document.querySelectorAll(".catalog-nav").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelectorAll(".cart-page").forEach((el) => {
        el.classList.remove("open");
      });
      document.querySelector(".fixed-menu-item.account").classList.add("active");
      document.querySelector(".authorization-popup").classList.add("open");
      document.querySelector("body").classList.add("lock");
    }    
  });
});

document.querySelector(".fixed-menu-item.home").addEventListener("click", function (e) {
  document.querySelectorAll(".fixed-menu-item").forEach((el) => {
    el.classList.remove("active");
  });
  
  if (document.querySelector(".cart-page") !== null) {
    document.querySelector(".cart-page").classList.remove("open");
  }

  if (document.querySelector(".catalog-nav") !== null) {
    document.querySelector(".catalog-nav").classList.remove("open");
  }

  if (document.querySelector(".authorization-popup") !== null) {
    document.querySelector(".authorization-popup").classList.remove("open");
  }
  
  document.querySelector("body").classList.remove("lock");
  document.querySelector(".fixed-menu-item.home").classList.add("active");
});

// open order
function addListenerOrderInfo() {
  document.querySelectorAll(".vertical-list-item-info>.btn").forEach((el) => {
    if(!el.classList.contains("order-info-click")) {
      el.classList.add("order-info-click");
    el.addEventListener("click", (event) => {
      event.preventDefault();
      el.parentElement.classList.toggle("active");
      document.querySelector(".menu-item.active .mega-menu-item").scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".vertical-list-item-info.active .order-info").scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".menu-item.active .mega-menu-item").style.overflow ="hidden";
    });
  };
  document.querySelectorAll(".order-info .back_pg-btn").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      el.closest(".vertical-list-item-info").classList.remove("active");
      document.querySelector(".menu-item.active .mega-menu-item").style.overflow ="auto";
    });
  });
  });
}

addListenerOrderInfo();

// login popup
function openLoginPopup(){
       
  if (document.querySelector(".login-popup") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".login-popup").classList.add("open");

    window.addEventListener("click", function (e) {
  
      if (e.target.closest(".login-popup .close-popup") || e.target.closest(".login-popup .blue-btn")) {
        e.preventDefault();
        document.querySelector(".login-popup").classList.remove("open");
        document.body.style.overflow = "auto";
      }
    });
  }
}

// price popup
document.querySelectorAll(".btn-chat").forEach((el) => {
  el.addEventListener("click", (event) => {
      event.preventDefault();
       
    if (document.querySelector(".price-popup") !== null) {

      document.body.style.overflow = "hidden";
      document.querySelector(".price-popup").classList.add("open");

      window.addEventListener("click", function (e) {
    
        if (e.target.closest(".price-popup .close-popup") || e.target.closest(".price-popup .layout")) {
          e.preventDefault();
          document.querySelector(".price-popup").classList.remove("open");
          document.body.style.overflow = "auto";
        }
      });
    }
  })
});

// show sms verify 
function showSmsVerify(){
       
  if (document.querySelector(".sign-in__phone-code") !== null) {
    
    document.querySelector(".sign-in__content>form").style.display = "none";
    document.querySelector(".sign-in__phone-code").style.display = "flex";

    window.addEventListener("click", function (e) {
  
      if (!e.target.closest(".sign-in__phone-code")) {
        document.querySelector(".sign-in__content>form").style.display = "block";
        document.querySelector(".sign-in__phone-code").style.display = "none";
      }
    });
  }
  countdownSmsVerify();
}

function countdownSmsVerify() {
  document.getElementById("timer-counter").style.display= "block"
  document.querySelector(".timer-block .repeat-code-btn").style.display= "none"
  var seconds = 59;
  function tick() {
    var counter = document.getElementById("timer-counter");
    seconds--;
    counter.innerHTML =
      "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      document.querySelector(".timer-block .repeat-code-btn").style.display= "block"
      document.getElementById("timer-counter").style.display= "none"
    }
  }
  tick();
}

if (document.querySelector(".timer-block .repeat-code-btn") !== null) {
  document.querySelector(".timer-block .repeat-code-btn").addEventListener("click", function (e) {
    e.preventDefault();
    openChoicePopup()
  });
}

// choice popup
function openChoicePopup(){
       
  if (document.querySelector(".sign-in__choice") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".sign-in__choice").classList.add("open");
  }
}

if (document.querySelector(".sign-in__choice") !== null) {
  document.querySelector(".sign-in__choice-email").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    document.querySelector(".sign-in__content>form").style.display = "block";
    document.querySelector(".sign-in__phone-code").style.display = "none";
    document.querySelector(".contacts-input-block.phone-block").classList.remove("open");
    document.querySelector(".contacts-input-block.email-block").classList.add("open");
  });
}

if (document.querySelector(".sign-in__choice") !== null) {
  document.querySelector(".sign-in__choice-phone").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    document.querySelector(".sign-in__content>form").style.display = "block";
    document.querySelector(".sign-in__phone-code").style.display = "none";
  });

  document.querySelector(".sign-in__choice-repeat").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    showSmsVerify();
  });


  document.querySelector(".sign-in__choice-cancel").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".sign-in__choice").classList.remove("open");
    document.querySelector(".authorization-popup").classList.remove("open");
    document.body.style.overflow = "auto";
  });

}

// language popup
function openLanguagePopup(){
       
  if (document.querySelector(".language-popup") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".language-popup").classList.add("open");

    document.querySelector(".language-popup-cancel").addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.overflow = "auto";
      document.querySelector(".language-popup").classList.remove("open");
    });

    document.querySelectorAll(".language-popup-body p a").forEach((el) => {
      el.addEventListener("click", () => {
        document.body.style.overflow = "auto";
        document.querySelector(".language-popup").classList.remove("open");
      });
    });

  }
}

if (document.querySelector(".select-lang") !== null) {
  document.querySelector(".select-lang").addEventListener("click", function (e) {
    e.preventDefault();
    openLanguagePopup();
  });
}

// quick-buy-popup

function openQuickBuyPopup(){
       
  if (document.querySelector(".quick-buy-popup") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".quick-buy-popup").classList.add("open");

    window.addEventListener("click", function (e) {
  
      if (e.target.closest(".quick-buy-popup .close-popup") || e.target.closest(".layout")) {
        e.preventDefault();
        document.querySelector(".quick-buy-popup").classList.remove("open");
        document.body.style.overflow = "auto";
      }
    });
  }
}

if (document.querySelector(".quick-buy-btn") !== null) {
  document.querySelector(".quick-buy-btn").addEventListener("click", function (e) {
    e.preventDefault();
    openQuickBuyPopup();
  });
}

//support_account-popup

function openSupportAaccountPopup(){
       
  if (document.querySelector(".support_account-popup") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".support_account-popup").classList.add("open");

    window.addEventListener("click", function (e) {
  
      if (e.target.closest(".support_account-popup .close-popup") || e.target.closest(".layout")) {
        e.preventDefault();
        document.querySelector(".support_account-popup").classList.remove("open");
        document.body.style.overflow = "auto";
      }
    });
  }
}

if (document.querySelector("#support_account") !== null) {
  document.querySelector("#support_account").addEventListener("click", function (e) {
    e.preventDefault();
    openSupportAaccountPopup();
  });
}

//delete_account-popup

function openDeleteAaccountPopup(){
       
  if (document.querySelector(".delete_account-popup") !== null) {

    document.body.style.overflow = "hidden";
    document.querySelector(".delete_account-popup").classList.add("open");

    window.addEventListener("click", function (e) {
  
      if (e.target.closest(".delete_account-popup .close-popup") || e.target.closest(".layout")) {
        e.preventDefault();
        document.querySelector(".delete_account-popup").classList.remove("open");
        document.body.style.overflow = "auto";
      }
    });
  }
}

if (document.querySelector("#delete_account") !== null) {
  document.querySelector("#delete_account").addEventListener("click", function (e) {
    e.preventDefault();
    openDeleteAaccountPopup();
  });
}

// show email verify 
function showEmailVerify(){
       
  if (document.querySelector(".contacts-input-block.email-block") !== null) {
    
    document.querySelector(".email-block-row.email").style.display = "none";
    document.querySelector(".email-block-row.pass").style.display = "flex";

    window.addEventListener("click", function (e) {
  
      if (!e.target.closest(".email-block-row.pass")) {
        document.querySelector(".email-block-row.email").style.display = "flex";
    document.querySelector(".email-block-row.pass").style.display = "none";
      }
    });
  }
}

// menu catalog
document.querySelectorAll(".main-menu > ul > .menu-item-has-children > a").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      el.parentElement.classList.toggle("active");
      document.querySelector(".catalog-nav").scrollTo({ top: 0, behavior: "smooth" });
      document.body.classList.add("menu-open");
    });
  });

document.querySelectorAll(".main-menu > ul > .menu-item-has-children > .mega-menu-item > .back-block .btn-back").forEach((el) => {
  el.addEventListener("click", (event) => {
    el.closest(".active").classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
//submenu 
document.querySelectorAll(".sub-menu .menu-item-has-children > a").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    el.parentElement.classList.toggle("active");
    document.querySelector(".catalog-nav").scrollTo({ top: 0, behavior: "smooth" });
    document.body.classList.add("menu-open");
  });
});

document.querySelectorAll(".sub-menu .btn-back").forEach((el) => {
el.addEventListener("click", (event) => {
  el.closest(".active").classList.remove("active");
  document.body.classList.remove("menu-open");
});
});

function slideDown(el) {
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.display = "block";
  el.style.transition = "height 0.3s";
  el.style.height = el.scrollHeight + "px";
  setTimeout(() => {
    el.style.overflow = null;
    el.style.height = null;
    el.style.transition = null;
    el.style.display = null;
  }, 300);
}

function slideUp(el) {
  el.style.overflow = "hidden";
  el.style.display = "block";
  el.style.height = el.scrollHeight + "px";
  el.style.transition = "height 0.3s";
  setTimeout(() => {
    el.style.height = "0";
  }, 10);
  setTimeout(() => {
    el.style.overflow = null;
    el.style.display = null;
    el.style.height = null;
    el.style.transition = null;
  }, 300);
}

function fadeIn(el, display = "flex") {
  el.style.opacity = 0;
  el.style.display = display;
  el.style.transition = "opacity 0.3s";
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
  setTimeout(() => {
    el.style.transition = null;
    el.style.display = null;
    el.style.opacity = null;
  }, 300);
}

function fadeOut(el, display = "flex") {
  el.style.display = display;
  el.style.opacity = 1;
  el.style.transition = "opacity 0.3s";
  setTimeout(() => {
    el.style.opacity = 0;
  }, 10);
  setTimeout(() => {
    el.style.display = null;
    el.style.opacity = null;
    el.style.transition = null;
  }, 300);
}

// Counter in textarea
if (document.querySelector("#counter") !== null) {
  const messageEle = document.getElementById("message");
  const counterEle = document.getElementById("counter");
  messageEle.addEventListener("input", function (e) {
    const target = e.target;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;
    counterEle.innerHTML =
      `${currentLength}` + " з " + `${maxLength}` + " символiв";
  });
}

// countDown on banner
if (document.querySelector(".coutndown") !== null) {
  document.querySelectorAll(".coutndown").forEach((countDownElement)=>{
  
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let timeleft = JSON.parse(countDownElement.getAttribute("data-timeleft")),
    distance =
      timeleft.days * day +
      timeleft.hours * hour +
      timeleft.minutes * minute +
      timeleft.seconds * second;
  setInterval(function () {
    if (distance < 0) {
      return;
    }
    let days, hours, minutes, seconds;
    days = Math.floor(distance / day);
    days = days < 10 ? "0" + days : days;
    (countDownElement.querySelector(".days").innerText = days),
      (hours = Math.floor((distance % day) / hour));
    hours = hours < 10 ? "0" + hours : hours;
    (countDownElement.querySelector(".hours").innerText = hours),
      (minutes = Math.floor((distance % hour) / minute)),
      (minutes = minutes < 10 ? "0" + minutes : minutes);
    (countDownElement.querySelector(".minutes").innerText = minutes),
      (seconds = Math.floor((distance % minute) / second)),
      (seconds = seconds < 10 ? "0" + seconds : seconds);
    countDownElement.querySelector(".seconds").innerText = seconds;
    var sec = Math.floor((distance % minute) / second);
    distance = distance - second;
  }, second);

  })
}

// filters open

// if (document.querySelector(".filters-row-item") !== null) {
  
//   document.querySelectorAll(".filters-row-item>span").forEach((el) => {
//     el.addEventListener("click", (event) => {
//       document.querySelectorAll(".filters-row-item").forEach((item) => {
//         item.classList.remove("open");
//       });

//       if (el.parentElement.querySelector(".widget-area")!== null) {
//         document.body.style.overflow = "hidden";
//       el.closest(".filters-row-item").classList.add("open");
//     } 
      
//     });
//   });

//   if (document.querySelector(".filters-heder") !== null){
//     document.querySelector(".filters-heder .close").addEventListener("click", function (e) {
//       e.preventDefault();
//       if(document.querySelector(".filter__item.active") !== null) {
//         // document.querySelector(".filter__item.active").closest(".filters-row-item>.widget-area").style.overflowY= "auto";
//           document.querySelector(".filter__item.active").closest(".widget-area").style.overflowY= "auto";
//           document.querySelector(".filter__item.active>.filter__inner").style.display= "none";
//           document.querySelector(".filter__item.active").classList.remove("active");
          
//       } else {
//         document.body.style.overflow = "auto";
//         document.querySelectorAll(".filters-row-item").forEach((item) => {
//           item.classList.remove("open");
//         });
//       }
//     });

//     document.querySelectorAll(".filter__checkgroup-control").forEach((el) => {
//       el.addEventListener("change", function() {
//         document.querySelector(".widget-area").style.overflowY= "auto";      
//       });
//     });


//   }

//   window.addEventListener("click", function (e) {
//     let filterHeader = e.target.closest(".filter__header");
//     if (filterHeader) {
//       filterHeader.parentElement.classList.toggle("active");
//       document.querySelector(".filters-row-item>.widget-area").scrollTo({ top: 0 });
//       filterHeader.closest(".filters-row-item>.widget-area").style.overflowY = "hidden";
//   }

// });
  
//   // document.querySelectorAll(".filter__header").forEach((el) => {
//   //   el.addEventListener("click", (event) => {
//   //     event.preventDefault();
//   //     el.parentElement.classList.toggle("active");
//   //     document.querySelector(".filters-row-item>.widget-area").scrollTo({ top: 0 });
//   //     el.closest(".filters-row-item>.widget-area").style.overflowY = "hidden";
//   //   });
//   // });

// }

// checkout page beautic-cupon active
// if (document.querySelector(".beautic-cupon") !== null) {
 
//   document.getElementById('cupon-toggle').addEventListener('change', function() {
//       if (this.checked) {
//         document.querySelector(".beautic-cupon").classList.add('beautic-cupon-active');
//       } else {
//         document.querySelector(".beautic-cupon").classList.remove('beautic-cupon-active');
//       }
//   });
// }

// tab START

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
// tab END

$(function () {
  //select2
  $('.js-example-basic-single').select2({
    minimumResultsForSearch: Infinity,
  });

  $('.sorting').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'sorting-select2',
    dropdownParent: $('#sorting-popup')
  });

  $('.quick-buy-popup .js-example-basic-single').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'popup-select2',
  });
  
  // slider banner
  $(".banner-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    items: 1,
    margin: 5,
    autoplay: true,
    slideTransition: "linear",
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });

  $(".akcia-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: false,
    items: 1,
    margin: 5,
    autoplay: true,
    slideTransition: "linear",
    autoplaySpeed: 3000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });

  //  product gallery carousel
  $(".product-carousel").owlCarousel({
    dots: true,
    nav: false,
    loop: false,
    items: 1,
    margin: 5,
  });

  //  posts carousel
  $(".posts-carousel").owlCarousel({
    dots: true,
    nav: false,
    loop: true,
    autoWidth: true,
    margin: 8,
  });

  //  cards carousel
  $(".cards-carousel").owlCarousel({
    dots: true,
    nav: false,
    loop: true,
    items: 1,
    margin: 5,
  });

  //  gifts carousel
  $(".gift-carousel").owlCarousel({
    dots: false,
    nav: true,
    loop: true,
    items: 1,
    margin: 8,
  });

  $(".gift2-carousel").owlCarousel({
    dots: true,
    nav: true,
    loop: true,
    autoWidth: true,
    margin: 8,
  });

   // loyalty_new caorusel
  $(".loyalty_new-carousel").owlCarousel({
    dots: true,
    nav: true,
    dotsEach: 3,
    center: false,
    autoWidth: true,
    margin: 16,
  });

  // slider course 
  $(".course-carousel").owlCarousel({
    dots: false,
    nav: false,
    loop: true,
    items: 1,
    autoWidth: true,
    center: true,
    margin: 8,
  });

  // accordion BEGIN
  $(".accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".accordion__content").slideUp(400);
      $(".accordion__title").removeClass("accordion-active");
      $(".accordion__arrow").removeClass("accordion__rotate");
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("accordion__rotate");
  });

  //review form
  $(".open-review-form").on("click", function (e) {
    e.preventDefault();
    $(".open-review-form").hide();
    $(".add-review").slideToggle();
  });

  $(".add-review-close").on("click", function (e) {
    e.preventDefault();
    $(".open-review-form").show();
    $(".add-review").slideToggle();
  });

  $(".header-search-form input").on("focus", function () {
    $(".header").addClass("search-open");
    $(".header-row").slideUp(250);
    $(".search-filter").slideDown();
  });

  $(document).on("click", function (event) {
    if ($(event.target).closest(".header").length == 0) {
      $(".header").removeClass("search-open");
      $(".header-row").slideDown(250);
      $(".search-filter").slideUp();
    }
  });

  // sing in email/phone
  $(".sign-in-btn").on("click", function (e) {
    e.preventDefault();
    $(".email-block, .phone-block").toggleClass("open");
  });

  // change account data
  $(".account-data input").on("click", function (e) {
    $(".account-data .btn").removeClass("not-active");
  });

  //account-info-delivery
  $(".account-info-delivery__item__btn").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $(".account-info-delivery__change").slideToggle();
  });

});

// wheel popup

function openWhellPopup() {

  document.body.style.overflow = "hidden";
    document.querySelector(".wheel-popup").classList.add("active");

    document.querySelector(".wheel-popup-content").addEventListener("click", function (e) {
      e.stopPropagation();
    });
}


if (document.querySelector(".wheel-popup") !== null) {

  document.querySelector(".wheel-popup-close").addEventListener("click", function (e) {
      document.body.style.overflow = "visible";
      document.querySelector(".wheel-popup").classList.remove("active");
    });

  window.addEventListener("click", function (e) {
    if (document.querySelector(".wheel-popup.active") && !e.target.closest(".wheel-popup-content")) {
      document.querySelector(".wheel-popup").classList.remove("active");
      document.body.style.overflow = "visible";
    }
  });

  // wheel subpopup
    document.querySelectorAll(".spin-btn").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".whell-subpopup").classList.add("active");
    });
  });
  document.querySelector(".whell-subpopup-content").addEventListener("click", function (e) {
      e.stopPropagation();
    });

  document.querySelector(".whell-subpopup-close").addEventListener("click", function (e) {
      document.querySelector(".whell-subpopup").classList.remove("active");
    });

    document.querySelector(".whell-subpopup .send-sms").addEventListener("click", function (e) {
      document.querySelector(".whell-subpopup").classList.remove("phone");
      document.querySelector(".whell-subpopup").classList.add("code");
    });
}

// present popup
function openPresentPopup() {
  if (document.querySelector(".present-popup").classList.contains("present-received")) {
    document.querySelector(".present-popup").classList.remove("present-received");
  }
    document.querySelector(".wheel-popup").classList.remove("active");
    document.body.style.overflow = "hidden";
    document.querySelector(".present-popup").classList.add("present", "active");

    document.querySelector(".present-popup-content").addEventListener("click", function (e) {
      e.stopPropagation();
    });
}


// present alredy received popup
function openPresentReceivedPopup() {
  if (document.querySelector(".present-popup").classList.contains("present")) {
    document.querySelector(".present-popup").classList.remove("present");
  }
    document.querySelector(".wheel-popup").classList.remove("active");
    document.body.style.overflow = "hidden";
    document.querySelector(".present-popup").classList.add("present-received", "active");

    document.querySelector(".present-popup-content").addEventListener("click", function (e) {
      e.stopPropagation();
    });
}

if (document.querySelector(".present-popup") !== null) {

  document.querySelector(".present-popup-close").addEventListener("click", function (e) {
      document.body.style.overflow = "visible";
      document.querySelector(".present-popup").classList.remove("active");
    });

  window.addEventListener("click", function (e) {
    if (document.querySelector(".present-popup.active") && !e.target.closest(".present-popup-content")) {
      document.querySelector(".present-popup").classList.remove("active");
      document.body.style.overflow = "visible";
    }
  });
};

// wheel start

 const prizes = [
    {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 1",
      color: "#FBFBFB",
    },
     {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 6",
      color: "#E1F56F",
    },
     {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 5",
      color: "#FBFBFB",
    },
    {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 4",
      color: "#E1F56F",
      select: true,
    },
    {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 3",
      color: "#FBFBFB",
    },
    {
      icon: "./img/wheel_sec_icon.svg",
      title: "Prize 2",
      color: "#E1F56F",
    },   
  ];

  if (document.querySelector(".wheel-popup") !== null) {  
    const wheel = document.querySelector(".deal-wheel");
    const spinner = wheel.querySelector(".spinner");
    const prizeSlice = 360 / prizes.length;
    const prizeOffset = Math.floor(180 / prizes.length);
    const spinClass = "is-spinning";
    const selectedClass = "selected";
    let prizeNodes;
    let finalRotation = 0; // <- will store final angle
    let spinning = false;
  };
  
  
  
  function createPrizeNodes() {
    prizes.forEach(({ icon, title }, i) => {
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      spinner.insertAdjacentHTML(
        "beforeend",
        `<li class="prize" style="--rotate: ${rotation}deg">
          <img class="icon" src="${icon}" alt="icon" width="32" height="32" title="${title}">
        </li>`
      );
    });
  };
  
  function createConicGradient() {
    spinner.setAttribute(
      "style",
      `background: conic-gradient(from -90deg,${prizes.map(({ color }, i) => 
        `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`
      ).reverse()});`
    );
  };
    
  function setupWheel() {
    createConicGradient();
    createPrizeNodes();
    prizeNodes = wheel.querySelectorAll(".prize");
  };

  function startWheel() {    
    prizeNodes.forEach(prize => prize.classList.remove(selectedClass));
    spinner.style.transition = "none"; 
    spinner.style.transform = "rotate(0deg)";
    
    spinner.classList.add("spinning");
    wheel.classList.add(spinClass);
    spinning = true;
    document.querySelector(".whell-subpopup").classList.remove("active");
    document.querySelector(".spin-btn").style.display = "none";
    document.querySelector(".stop-spin-btn").style.display = "flex";
  };

  const spinertia = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  };

   const getFixedRotation = () => {
      // Ищем приз с select: true
      const selectedPrizeIndex = prizes.findIndex(prize => prize.select === true);
      
      if (selectedPrizeIndex !== -1) {
          // Добавляем несколько оборотов (например, 3) к углу для остановки на нужном призе
          return 360 * 3 + selectedPrizeIndex * prizeSlice + prizeOffset;
      } else {
          // Если нет приза с select: true, генерируем случайное значение с несколькими оборотами
          return Math.floor(Math.random() * 360 + spinertia(2000, 5000) + 360 * 3);
      }
  };

  const selectPrize = () => {

      const selectedPrizeIndex = prizes.findIndex(prize => prize.select === true);
      const prizeTitle = prizes[selectedPrizeIndex].title;
      document.getElementById("cupon").innerHTML = prizeTitle;
      setTimeout(() => openPresentPopup(), 300);   
  };


if(document.querySelector(".deal-wheel") !== null) {   
  // Сброс анимации и включение кнопки после завершения вращения
    spinner.addEventListener("transitionend", () => {
        selectPrize();
    });

  document.querySelector(".stop-spin-btn").addEventListener("click", () => {
    if (!spinning) return;
    spinning = false;
    // get current angle from transform
    const st = window.getComputedStyle(spinner, null);
    const tr = st.getPropertyValue("transform");

    let angle = 0;
    if (tr !== "none") {
      const values = tr.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];
      angle = 360 * 3 + getFixedRotation();
    }

    spinner.classList.remove("spinning");
    spinner.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
      finalRotation = getFixedRotation();
      spinner.style.transition = "transform 4s cubic-bezier(0.25, 1, 0.5, 1)";
      spinner.style.transform = `rotate(${finalRotation}deg)`;
    }, 50);

    document.querySelector(".stop-spin-btn").style.display = "none";
    document.querySelector(".spin-btn").style.display = "flex";
  });

  document.querySelector(".whell-subpopup .send-code").addEventListener("click", () => {    
    startWheel();
  });

  setupWheel();
}

//wheel end


// filters start

$(".filter-open-btn").on("click", function (e) {
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


document.querySelectorAll(".products-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".swiper-slide");
  const hasMultipleSlides = slides.length > 3;

  new Swiper(slider, {
    loop: hasMultipleSlides,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".products-slider .swiper-button-next",
      prevEl: ".products-slider .swiper-button-prev",
    },
    pagination: {
      el: ".products-slider .swiper-pagination",
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

// product variants dropdown

if(document.querySelector(".variant-dropdown-wrapper") !== null) { 
  
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

}

// product variants dropdown end


function createInfiniteMarquee(marquee) {
  if (!marquee) return;

  const track = marquee.querySelector(".marquee__track");

  if (!track) return;

  const directionValue = marquee.dataset.direction || "left";
  const speed = parseFloat(marquee.dataset.speed) || 45;
  const direction = directionValue === "right" ? 1 : -1;
  const originalItems = Array.from(track.children);

  if (!originalItems.length) return;

  originalItems.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  let groupWidth = 0;
  let tween = null;

  function measure() {
    let width = 0;

    originalItems.forEach((item) => {
      width += item.getBoundingClientRect().width;
    });

    const styles = getComputedStyle(track);

    const gap = parseFloat(styles.columnGap) || 0;

    width += gap * (originalItems.length - 1);

    return width;
  }

  function normalizeX(x) {
    return gsap.utils.wrap(-groupWidth, 0, x);
  }

  function startAnimation(startX) {
    if (tween) {
      tween.kill();
    }

    startX = normalizeX(startX);

    gsap.set(track, {
      x: startX,
    });

    let target;
    let distance;

    if (direction === -1) {
      target = -groupWidth;

      distance = startX - target;
    } else {
      target = 0;

      distance = target - startX;
    }

    /*
     * Якщо дійшли до кінця
     */

    if (distance <= 0.01) {
      if (direction === -1) {
        startX = 0;

        target = -groupWidth;
      } else {
        startX = -groupWidth;

        target = 0;
      }

      distance = groupWidth;

      gsap.set(track, {
        x: startX,
      });
    }

    const duration = distance / speed;

    tween = gsap.to(track, {
      x: target,

      duration: duration,

      ease: "none",

      onComplete() {
        if (direction === -1) {
          startAnimation(0);
        } else {
          startAnimation(-groupWidth);
        }
      },
    });
  }

  function refresh() {
    if (tween) {
      tween.kill();
    }

    groupWidth = measure();

    if (!groupWidth) {
      return;
    }

    const startX = direction === -1 ? 0 : -groupWidth;

    gsap.set(track, {
      x: startX,
    });

    startAnimation(startX);
  }

  const resizeObserver = new ResizeObserver(() => {
    refresh();
  });

  resizeObserver.observe(marquee);

  const images = marquee.querySelectorAll("img");

  let loaded = 0;

  function imageReady() {
    loaded++;

    if (loaded === images.length) {
      refresh();
    }
  }

  if (images.length === 0) {
    refresh();
  }

  images.forEach((img) => {
    if (img.complete) {
      imageReady();
    } else {
      img.addEventListener("load", imageReady, { once: true });

      img.addEventListener("error", imageReady, { once: true });
    }
  });

  return {
    refresh,

    pause() {
      if (tween) {
        tween.pause();
      }
    },

    play() {
      startAnimation(gsap.getProperty(track, "x"));
    },

    destroy() {
      if (tween) {
        tween.kill();
      }

      resizeObserver.disconnect();
    },
  };
}

document.querySelectorAll(".marquee").forEach((marquee) => {
  createInfiniteMarquee(marquee);
});

// tab
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".ingredient");
  const visuals = document.querySelectorAll(".visual");

  items.forEach((item) => {
    const button = item.querySelector(".ingredient__title");

    button.addEventListener("click", () => {
      const id = item.dataset.tab;
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-active");
        }
      });

      item.classList.toggle("is-active");
      visuals.forEach((visual) => {
        visual.classList.toggle(
          "is-active",
          visual.dataset.content === id && item.classList.contains("is-active"),
        );
      });
    });
  });
});
