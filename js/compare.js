
if (document.querySelector(".compare-table") !== null) {
  let stickyRow = document.querySelector(".compare-table thead tr");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
      stickyRow.classList.add("sticky");
    } else {
      stickyRow.classList.remove("sticky");
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {

  function resizeTableHeaders(table) {
    const ths = table.querySelectorAll('thead th');
    const count = ths.length;
    if (!count) return;
    const w = (100 / count) + '%';
    ths.forEach(th => {
      th.style.width = w;
      th.style.boxSizing = 'border-box';
    });
  }

  document.querySelectorAll('.compare-table').forEach(table => {
    resizeTableHeaders(table);

    const thead = table.querySelector('thead');
    if (thead) {
      const observer = new MutationObserver(() => resizeTableHeaders(table));
      observer.observe(thead, { childList: true, subtree: true });
    }
  });
});




// DOM elements to track.
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const table = document.getElementById('compare-table');

const tableWrapperSize = document.querySelector('.compare-table-wrapper').offsetWidth; // Unchanging area of the screen where the table is always visible.
const tableSize = table.offsetWidth;	// Includes itemsCount * itemSize but also factors in space between items added by flexbox.
const tableInvisibleSize = Math.max(tableSize - tableWrapperSize, 0);	// Fixed portion of scrollable table that is hidden at all times, or zero if table fits within container.
const arrowSize = rightArrow.offsetWidth;	// Width of each arrow div. In current design, this equates to 12px. Still computes value even if right arrow is hidden, which it is at time this line is executed.
const itemsCount = table.querySelectorAll('thead th').length; // Number of table items.
const itemSize = table.querySelectorAll('thead th')[0].offsetWidth; // offsetWidth includes borders and padding but not margins of a table item (since all the same, choose first one in array). FYI, clientWidth includes padding but NOT borders and margins.
const durationInMilliseconds = 500;


let starttime = null;

if (tableInvisibleSize === 0) {
	rightArrow.classList.add("hidden");
}
const getTblePosition = () => {
	return parseFloat(table.style.left) || 0;	
};

// Get current distance (in pixels) that we have scrolled.
const getScrolledDistance = () => {
	return -1 * getTblePosition();	// Negate value because this is the only way it will work.
};

const checkPosition = () => {
	// Calculate where we are right now.
	const tablePosition = getScrolledDistance();

	// Determine which arrow key(s) to display based on position.
	if (tablePosition <= arrowSize) {			// SHOW RIGHT ARROW if we are scrolling from far left.
		leftArrow.classList.add("hidden");		// FYI, this will NOT create duplicate hidden class if leftArrow already contains it.	
		rightArrow.classList.remove("hidden");
	} else if (tablePosition < tableInvisibleSize) {	// SHOW BOTH ARROWS when in the middle of the table.
		leftArrow.classList.remove("hidden");
		rightArrow.classList.remove("hidden");
	} else if (tablePosition >= tableInvisibleSize) {	// SHOW LEFT ARROW if we are scrolling as far right as we can go.
		leftArrow.classList.remove("hidden");
		rightArrow.classList.add("hidden");
    }

};

const animateTble = (timestamp, startingPoint, distance) => {
  const runtime = timestamp - starttime;
  let progress = runtime / durationInMilliseconds;
  progress = Math.min(progress, 1);
  let newValue = (startingPoint + distance * progress).toFixed(2) + "px";
  table.style.left = newValue;

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
	timestamp = timestamp || new Date().getTime();	// if browser doesn't support requestAnimationFrame, generate our own timestamp using Date.
	starttime = timestamp;
	const startingPoint = getTblePosition();		// This cannot be defined up top in constants. Need to read current value only during initial setup of arrow button click.
	animateTble(timestamp, startingPoint, travelDistanceInPixels);
};

rightArrow.addEventListener('click', () => requestAnimationFrame(
	timestamp => animationFramesSetup(timestamp, -1 * itemSize)
)
);
	
leftArrow.addEventListener('click', () => requestAnimationFrame(
	timestamp => animationFramesSetup(timestamp, itemSize)
));

