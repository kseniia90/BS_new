$(function () {
  var activeFilter = $(".brands-catregory-list .active").attr("data-filter"),
    $contentbrands = $(".brands-content"),
    $tabslis = $(".brands-catregory-list li");

  $contentbrands.attr("data-filter", activeFilter);

  $tabslis.on("click", function (e) {
    e.preventDefault();
    var $current = $(e.currentTarget);
    activeFilter = $current.attr("data-filter");

    console.log(activeFilter);

    $tabslis.removeClass("active");
    $current.addClass("active");
    $contentbrands.attr("data-filter", activeFilter);
  });
});
