if (document.querySelector(".product-page") !== null) {
  const productCarousel = new Carousel(
    document.getElementById("productCarousel"),
    {
      transition: "slide",
      preload: 3, // Smoother navigation when using lazy loaded images

      Dots: false,
      Thumbs: {
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
    Thumbs: false,

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
}

$(".product-page__accordion .accordion__title").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);

  if (!$this.hasClass("accordion-active")) {
    $(".product-page__accordion .accordion__content").slideUp(400);
    $(".product-page__accordion .accordion__title").removeClass("accordion-active"    );
    $(".product-page__accordion .accordion__arrow").removeClass("active");
  }

  $this.toggleClass("accordion-active");
  $this.next().slideToggle();
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
