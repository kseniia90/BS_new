  $(".filter__accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $('body').addClass("lock");
  });

  $(".filters-heder .close").on("click", function (e) {
    $(".accordion__title").removeClass("accordion-active");
    $('body').removeClass("lock");
});

//BEGIN filters accordion

  $(".filters__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);

    $this.toggleClass("accordion-active");
    $this.parent().toggleClass("border");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("minus");
  });
  //END
  