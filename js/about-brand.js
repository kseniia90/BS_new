function createInfiniteMarquee(marquee) {
  if (!marquee) return;

  const track = marquee.querySelector(".marquee__track");

  if (!track) return;

  const directionValue = marquee.dataset.direction || "left";
  const speed = parseFloat(marquee.dataset.speed) || 45;
  const direction = directionValue === "right" ? 1 : -1;
  const originalItems = Array.from(track.children);

  if (!originalItems.length) return;

  originalItems.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  let groupWidth = 0;
  let tween = null;

  function measure() {
    let width = 0;

    originalItems.forEach((item) => {
      width += item.getBoundingClientRect().width;
    });

    const styles = getComputedStyle(track);

    const gap = parseFloat(styles.columnGap) || 0;

    width += gap * (originalItems.length - 1);

    return width;
  }

  function normalizeX(x) {
    return gsap.utils.wrap(-groupWidth, 0, x);
  }

  function startAnimation(startX) {
    if (tween) {
      tween.kill();
    }

    startX = normalizeX(startX);

    gsap.set(track, {
      x: startX,
    });

    let target;
    let distance;

    if (direction === -1) {
      target = -groupWidth;

      distance = startX - target;
    } else {
      target = 0;

      distance = target - startX;
    }

    /*
     * Якщо дійшли до кінця
     */

    if (distance <= 0.01) {
      if (direction === -1) {
        startX = 0;

        target = -groupWidth;
      } else {
        startX = -groupWidth;

        target = 0;
      }

      distance = groupWidth;

      gsap.set(track, {
        x: startX,
      });
    }

    const duration = distance / speed;

    tween = gsap.to(track, {
      x: target,

      duration: duration,

      ease: "none",

      onComplete() {
        if (direction === -1) {
          startAnimation(0);
        } else {
          startAnimation(-groupWidth);
        }
      },
    });
  }

  function refresh() {
    if (tween) {
      tween.kill();
    }

    groupWidth = measure();

    if (!groupWidth) {
      return;
    }

    const startX = direction === -1 ? 0 : -groupWidth;

    gsap.set(track, {
      x: startX,
    });

    startAnimation(startX);
  }

  const resizeObserver = new ResizeObserver(() => {
    refresh();
  });

  resizeObserver.observe(marquee);

  const images = marquee.querySelectorAll("img");

  let loaded = 0;

  function imageReady() {
    loaded++;

    if (loaded === images.length) {
      refresh();
    }
  }

  if (images.length === 0) {
    refresh();
  }

  images.forEach((img) => {
    if (img.complete) {
      imageReady();
    } else {
      img.addEventListener("load", imageReady, { once: true });

      img.addEventListener("error", imageReady, { once: true });
    }
  });

  return {
    refresh,

    pause() {
      if (tween) {
        tween.pause();
      }
    },

    play() {
      startAnimation(gsap.getProperty(track, "x"));
    },

    destroy() {
      if (tween) {
        tween.kill();
      }

      resizeObserver.disconnect();
    },
  };
}

document.querySelectorAll(".marquee").forEach((marquee) => {
  createInfiniteMarquee(marquee);
});

// tab
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".ingredient");
  const visuals = document.querySelectorAll(".visual");

  items.forEach((item) => {
    const button = item.querySelector(".ingredient__title");

    button.addEventListener("click", () => {
      const id = item.dataset.tab;
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-active");
        }
      });

      item.classList.toggle("is-active");
      visuals.forEach((visual) => {
        visual.classList.toggle(
          "is-active",
          visual.dataset.content === id && item.classList.contains("is-active"),
        );
      });
    });
  });
});
