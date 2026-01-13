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

  function setActiveByHash(hash, fromChange) {
    if (!hash) {
      if ($(window).width() > 768) {
        $(".account-section").removeClass("active").first().addClass("active");
        $(".account-nav li").removeClass("active").first().addClass("active");
      }
      return;
    }

    $(".account-section, .account-nav li").removeClass("active");
    $('.account-section[data-id="' + hash + '"]').addClass("active");
    $('.account-nav a[href="' + hash + '"]').parent().addClass("active");

    if ($(window).width() < 768) {
      $(".account-sidebar").slideUp();
      $(".account-title").slideUp();
    }
  }

  setActiveByHash(location.hash);

  $(window).on("hashchange", function () {
    setActiveByHash(location.hash, true);
  });

  $('.account-nav a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    if (location.hash === this.hash) {
      setActiveByHash(this.hash);
      return;
    }

    location.hash = this.hash; 
  });

  $(".account-item-title").on("click", function (e) {
    e.preventDefault();
    $(".account-section, .account-nav li").removeClass("active");
    $(".account-sidebar").slideDown();
    $(".account-title").slideDown();
  });

});

/*Account tab end*/


/*Account save data user */
$('#save_data_user_account').on('click', function(e){
  $('.preloader').addClass('active');
  const $cityOpt = $('#select-city option:selected');
  const $whOpt   = $('#select-warehouse option:selected');
  const cityName   = $cityOpt.text();
  const whName     = $whOpt.text();

  let first_name = $('#resident_name').val();
  let last_name = $('#resident_lastname').val();
  let phone = $('#resident_phone').val();
  let bday = $('#resident_bday').val();
  let ref_city = $cityOpt.data('cityref') ?? '';
  let ref_branch = $whOpt.data('branchref') ?? '';

  const data_user = {
    first_name,
    last_name,
    phone,
    bday,
    ref_city,
    ref_branch
  };

  $.ajax({
    type: "POST",
    url: bsAjax.ajaxUrl,
    data: {
      action: "save_data_user_account",
      _ajax_nonce: bsAjax.nonce,
      data_user
    },
    dataType: "JSON",
    success: function (response) {
      if(response.status){
        if(ref_city != '' && ref_branch != ''){
          $('#city_ref').text(cityName);
          $('#branch_ref').text(whName);
        }
        
        $('#resident_bday').attr('disabled', true);
        notyf.success(response.message);
      }else{
        notyf.error(response.message);
      }

      $('.preloader').removeClass('active');

    }
  });
})

function generate_favorite_block(){
  $('.preloader').addClass('active');

  $.ajax({
    type: "POST",
    url: bsAjax.ajaxUrl,
    data: {
      action: "generate_favorite",
      _ajax_nonce: bsAjax.nonce,
    },
    dataType: "JSON",
    success: function (response) {
      console.log(response);
      if(response.status == true){
        if(response.row_product !== ''){
          $('.favorites-content').empty();
          $('.favorites-content').html(response.row_product);
        }
      }else{
        
        notyf.error('Wish list empty');
      }

      $('.preloader').removeClass('active');
    }
  });
}


function generate_order_block(){
  $('.preloader').addClass('active');
  $.ajax({
    type: "POST",
    url: bsAjax.ajaxUrl,
    data: {
      action: "generate_order",
      _ajax_nonce: bsAjax.nonce,
    },
    dataType: "JSON",
    success: function (response) {
      $('.preloader').removeClass('active');
      console.log(response);
      if(response.row_order != ""){
        $('.order__accordion').empty();
        $('.order__accordion').html(response.row_order)
      }
    }
  });
}




$(function () {
  function handleHash() {
    const hash = window.location.hash;

    switch (hash) {
      case '#favorites':
        generate_favorite_block();
        break;
      case "#orders":
        generate_order_block();
        break;
      default:
        break;
    }
  }

  handleHash();

  $(window).on('hashchange', handleHash);
});


$(document).on('click', '.order__repeat-btn', function(e){
  e.preventDefault();
  $('.preloader').addClass('active');

  let order_id = $(this).attr('data-orderid');

  $.ajax({
    type: "POST",
    url: bsAjax.ajaxUrl,
    data: {
      action: "nb_repeat_order",
      _ajax_nonce: bsAjax.nonce,
      order_id
    },
    dataType: "JSON",
    success: function (response) {
      if(response.status){
        reloadCartTable();
        notyf.success(response.message);
      }else{
        notyf.error(response.message);
      }

      $('.preloader').removeClass('active');
    }
  });

})


$('#load_more_order').on('click', function(e){
  e.preventDefault();
  $('.preloader').addClass('active');

  let offset = $('.order__table__row').length;

  if(offset <= 0){
    return;
  }

  $.ajax({
    type: "POST",
    url: bsAjax.ajaxUrl,
    data: {
      action: "nb_get_more_order",
      offset,
      _ajax_nonce: bsAjax.nonce,
    },
    dataType: "JSON",
    success: function (response) {
      if(response.status){
        notyf.success(response.message);
        $('#list_order').append(response.order_row);
      }else{
        notyf.error(response.message);
      }
      $('.preloader').removeClass('active');
    }
  });

})

$('#logout').on('click', function(e){
  e.preventDefault();
})