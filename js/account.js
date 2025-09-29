//account-info-delivery
$(".account-info-delivery__item__btn").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.toggleClass("accordion-active");
  $(".account-info-delivery__change").slideToggle();
});

//BEGIN order accordion
$(document).on("click", ".order__accordion .accordion__title", function (e) {
  e.preventDefault();
  var $this = $(this);

  if (!$this.hasClass("accordion-active")) {
    $(".order__accordion .accordion__content").slideUp(400);
    $(".order__accordion .accordion__title").removeClass("accordion-active");
    $(".order__accordion .accordion__arrow").removeClass("active");
  }

  $this.toggleClass("accordion-active");
  $this.next().slideToggle();
  $(".accordion__arrow", this).toggleClass("active");
});

 $(".bonus-history__accordion .accordion__title").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("rotate");
  });

/*Account tab start*/

$(function () {
  if (location.hash) {
    $('.account-section[data-id="' + location.hash + '"]').addClass("active");
    $('.account-nav a[href="' + location.hash + '"').parent().addClass("active");
  } else {
    if ($(window).width() > 768) {
      $(".account-section").first().addClass("active");
      $(".account-nav li").first().addClass("active");
    }
  }

  $('.account-nav a[href*="#"]').click(function (e) {
    e.preventDefault();
    $(".account-section, .account-nav li").removeClass("active");
    $('.account-section[data-id="' + this.hash + '"]').addClass("active");
    $('.account-nav a[href="' + this.hash + '"')
      .parent()
      .addClass("active");
    location.hash = this.hash;
    if ($(window).width() < 768) {
      // $("body").addClass("lock");
      $(".account-sidebar").slideUp();
      $(".account-title").slideUp();
    }
  });

  $(".account-item-title").click(function (e) {
    e.preventDefault();
    $(".account-section, .account-nav li").removeClass("active");
    $(".account-sidebar").slideDown();
    $(".account-title").slideDown();
    // $("body").removeClass("lock");
  });
});

/*Account tab end*/
