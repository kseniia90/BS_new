if (document.querySelector(".compare-table") !== null) {
  let stickyRow = document.querySelector(".compare-table thead tr");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      stickyRow.classList.add("sticky");
    } else {
      stickyRow.classList.remove("sticky");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function resizeTableHeaders(table) {
    const ths = table.querySelectorAll("thead th");
    const count = ths.length;
    if (!count) return;
    const w = 100 / count + "%";
    // const minw = (tableWrapperSize / 4) + 'px';
    ths.forEach((th) => {
      th.style.width = w;
      // th.style.minWidth = minw;
      th.style.boxSizing = "border-box";
    });
  }

  document.querySelectorAll(".compare-table").forEach((table) => {
    resizeTableHeaders(table);

    const thead = table.querySelector("thead");
    if (thead) {
      const observer = new MutationObserver(() => resizeTableHeaders(table));
      observer.observe(thead, { childList: true, subtree: true });
    }
  });
});

// DOM elements to track.
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const table = document.getElementById("compare-table");

let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;

table.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  isDragging = true;
});

table.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  touchCurrentX = e.touches[0].clientX;
  const delta = touchCurrentX - touchStartX;

  let newLeft = getTblePosition() + delta;
  const maxLeft = 0;
  const minLeft = -tableInvisibleSize;

  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newLeft < minLeft) newLeft = minLeft;

  table.style.left = newLeft + "px";

  document
    .querySelectorAll(".compare-parameters-title p")
    .forEach((th) => (th.style.cssText = "--scrollOffset: " + newLeft + "px"));

  touchStartX = touchCurrentX;
  checkPosition();
});

table.addEventListener("touchend", () => {
  isDragging = false;
});

const getSizes = () => {
  const tableWrapperSize = document.querySelector(
    ".compare-table-wrapper",
  ).offsetWidth;
  const tableSize = table.scrollWidth;

  return {
    tableWrapperSize,
    tableSize,
    tableInvisibleSize: Math.max(tableSize - tableWrapperSize, 0),
  };
};
const { tableInvisibleSize } = getSizes();

const tableSize = table.scrollWidth;
const arrowSize = rightArrow.offsetWidth; // Width of each arrow div. In current design, this equates to 12px. Still computes value even if right arrow is hidden, which it is at time this line is executed.
const itemsCount = table.querySelectorAll("thead th").length; // Number of table items.
const durationInMilliseconds = 500;

const getItemSize = () => {
  const firstTh = table.querySelector("thead th");
  return firstTh ? firstTh.offsetWidth : 0;
};

let starttime = null;

if (tableInvisibleSize === 0) {
  rightArrow.classList.add("hidden");
}
const getTblePosition = () => {
  return parseFloat(table.style.left) || 0;
};

// Get current distance (in pixels) that we have scrolled.
const getScrolledDistance = () => {
  return -1 * getTblePosition(); // Negate value because this is the only way it will work.
};

const checkPosition = () => {
  const tablePosition = getScrolledDistance();

  const tolerance = 0;

  if (tablePosition <= arrowSize) {
    leftArrow.classList.add("hidden");
    rightArrow.classList.remove("hidden");
  } else if (tablePosition >= tableInvisibleSize - tolerance) {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.add("hidden");
  } else {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
  }
};
const animateTble = (timestamp, startingPoint, distance) => {
  const runtime = timestamp - starttime;
  let progress = runtime / durationInMilliseconds;
  progress = Math.min(progress, 1);
  let newValue = (startingPoint + distance * progress).toFixed(2) + "px";
  table.style.left = newValue;
  document.querySelectorAll(".compare-parameters-title p").forEach((th) => (th.style.cssText = "--scrollOffset: " + newValue));

  if (runtime < durationInMilliseconds) {
    // If we still have time remaining...
    requestAnimationFrame(function (timestamp) {
      // Request another animation frame and recursively call THIS function.
      animateTble(timestamp, startingPoint, distance);
    });
  }
  checkPosition();
};

const animationFramesSetup = (timestamp, travelDistanceInPixels) => {
  timestamp = timestamp || new Date().getTime(); // if browser doesn't support requestAnimationFrame, generate our own timestamp using Date.
  starttime = timestamp;
  const startingPoint = getTblePosition(); // This cannot be defined up top in constants. Need to read current value only during initial setup of arrow button click.
  animateTble(timestamp, startingPoint, travelDistanceInPixels);
};

rightArrow.addEventListener("click", () => {
  const itemSize = getItemSize();
  const current = getScrolledDistance();
  const remaining = tableInvisibleSize - current;
  const move = remaining < itemSize ? remaining : itemSize;

  requestAnimationFrame((timestamp) => animationFramesSetup(timestamp, -move));
});

leftArrow.addEventListener("click", () => {
  const itemSize = getItemSize();
  const current = getScrolledDistance();
  const move = current < itemSize ? current : itemSize;

  requestAnimationFrame((timestamp) => animationFramesSetup(timestamp, move));
});

document.querySelectorAll(".show-compare-table").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".compare-table-wrapper").style.display = "block";
    document.querySelector(".products-slider-block").style.display = "block";
    document.querySelector(".compare-toggle").style.display = "block";
    document.querySelector(".compare-back-btn").style.display = "flex";
    document.querySelectorAll(".compare-catregory-list").forEach((list) => {
      list.style.setProperty("display", "none", "important");
    });
  });
});

document.querySelectorAll(".compare-back-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".compare-table-wrapper").style.display = "none";
    document.querySelector(".products-slider-block").style.display = "none";
    document.querySelector(".compare-back-btn").style.display = "none";
    document.querySelectorAll(".compare-catregory-list.mobile-only").forEach((list) => {
      list.style.setProperty("display", "flex", "important");
    });
  });
});
