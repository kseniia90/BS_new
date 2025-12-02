$(function () {
  const $filterItems = $(".brands-catregory-list .item"); 
  const $brandBlocks = $(".brands-content .brand_block"); 
  const $brandItems = $(".brands-content .item_brand");

  $filterItems.on("click", function (e) {
    e.preventDefault();

    const $clicked = $(this);
    const filterType = $clicked.data("filter");

    $filterItems.removeClass("active");
    $clicked.addClass("active");
    if (filterType === "popular") {
      $brandItems.hide().filter('[data-filter="popular"]').show();
      $brandBlocks.each(function () {
        const $block = $(this);
        const hasVisibleItem = $block.find(".item_brand:visible").length > 0;
        $block.toggle(hasVisibleItem);
      });

      $filterItems.each(function () {
        const $li = $(this);

        if (typeof $li.data("filter") !== "undefined") {
          return;
        }

        const href = $li.find("a").attr("href") || "";
        if (!href || href.charAt(0) !== "#" || href === "#") {
          return;
        }

        const id = href.slice(1);
        if (!id) return;

        const $block = $("#" + id);
        if (!$block.length) {
          $li.hide();
          return;
        }

        const hasVisibleItem = $block.find(".item_brand:visible").length > 0;
        $li.toggle(hasVisibleItem);
      });

    } else if (filterType === "all") {
      $brandItems.show();
      $brandBlocks.show();
      $filterItems.show();
    } else {
      const href = $clicked.find("a").attr("href") || "";

      if (href.charAt(0) === "#" && href.length > 1) {
        const $target = $(href);
        if ($target.length) {
          $("html, body").animate({ scrollTop: $target.offset().top }, 300);
        }
      }
    }
  });

  const $brands_filter = $(".brands-filter .item");
  $brands_filter.on("click", function (e) {
    $brands_filter.removeClass("active");
    $(this).addClass("active");
  });
});
