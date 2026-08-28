if (document.querySelector(".product-page") !== null) {
  const productCarousel = new Carousel(document.getElementById("productCarousel"),{
      transition: "slide",
      preload: 3, // Smoother navigation when using lazy loaded images

      Dots: false,
      Thumbs: {
        autoStart : true,
        showOnStart: true,
        type: "classic",
        Carousel: {
          dragFree: false,
          slidesPerPage: "auto",
          Navigation: true,

          axis: "x",
          breakpoints: {
            "(min-width: 993px)": {
              axis: "y",
            },
          },
        },
      },
    },
    { Thumbs }
  );

  Fancybox.bind('[data-fancybox="gallery"]', {
    compact: false,
    idle: false,
    dragToClose: false,
    contentClick: () =>
      window.matchMedia("(max-width: 578px), (max-height: 578px)").matches
        ? "toggleMax"
        : "toggleCover",

    animated: false,
    showClass: false,
    hideClass: false,

    Hash: false,
    Thumbs: true,

    Thumbs: {
      autoStart : true,
      showOnStart: true,
    },

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },

    Carousel: {
      transition: "fadeFast",
      preload: 3,
    },

    Images: {
      zoom: false,
      Panzoom: {
        panMode: "mousemove",
        mouseMoveFactor: 1.1,
      },
    },
  });
};


$(".product-page__accordion .accordion__title").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);

  if (!$this.hasClass("accordion-active")) {
    $(".product-page__accordion .accordion__content").slideUp(400);
    $(".product-page__accordion .accordion__title").removeClass("accordion-active");
  }

  $this.toggleClass("accordion-active");
  $this.next().slideToggle();
});

$(".add_rev").on("click", function (e) {
  e.preventDefault();
  $(".review-block__left .add-review-stars").css("display", "flex");
  $(".review-block__left .add-review-form").css("display", "flex");
  setTimeout(function() {
    $(".review-block__left").addClass("show_rev_form");
  }, 50);
  
});



// File input

function validateFiles(event) {
  const input = event.target;
  const fileList = document.getElementById('fileList');

  [...input.files].forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.name;
        fileList.appendChild(li);
      });
}

document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', validateFiles);
  }
});


function timer_product_sale(){
  
  if (document.querySelector(".coutndown") !== null) {
    document.querySelectorAll(".coutndown").forEach((countDownElement)=>{
    
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const timeleftAttr = countDownElement.getAttribute("data-timeleft");
    if (!timeleftAttr) {
      return;
    }

    let timeleft = JSON.parse(timeleftAttr),
      distance = timeleft.days * day + timeleft.hours * hour +  timeleft.minutes * minute +  timeleft.seconds * second;
    const timerInterval = setInterval(function () {
      if (distance < 0) {
        const timerBlock = countDownElement.closest(".product__discount_timer");
        if (timerBlock) {
          timerBlock.style.display = "none";
        }
        clearInterval(timerInterval);
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

}

$(document).on('click', '.characteristics__title [data-tab]', function () {
    var $btn = $(this);
    var tab = $btn.attr('data-tab');
    var $c = $btn.closest('.characteristics__container');
    $c.find('.characteristics__title [data-tab]').removeClass('active');
    $btn.addClass('active');
    $c.find('.characteristics__tab-pane').removeClass('active');
    $c.find('.characteristics__tab-pane[data-tab-pane="' + tab + '"]').addClass('active');
});

//timer_product_sale();
