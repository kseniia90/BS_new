$(".course-start .course-accordion .accordion__title").on(
  "click",
  function (e) {
    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".course-start .course-accordion .accordion__content").slideUp(400);
      $(".course-start .course-accordion .accordion__title").removeClass(
        "accordion-active"
      );
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
  }
);

$(".course-faq .course-accordion .accordion__title").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);

  if (!$this.hasClass("accordion-active")) {
    $(".course-faq .course-accordion .accordion__content").slideUp(400);
    $(".course-faq .course-accordion .accordion__title").removeClass("accordion-active");
  }

  $this.toggleClass("accordion-active");
  $this.next().slideToggle();
});

