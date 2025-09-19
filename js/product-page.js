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
};


 $(".product-page__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".product-page__accordion .accordion__content").slideUp(400);
      $(".product-page__accordion .accordion__title").removeClass("accordion-active");
      $(".product-page__accordion .accordion__item").removeClass("border");
      $(".product-page__accordion .accordion__arrow").removeClass("minus");
    }

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });
