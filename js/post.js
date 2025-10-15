if (document.querySelector(".post-page-popup") !== null) {
  document.querySelectorAll(".post-page-popup-close").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.style.overflow = "visible";
      document.querySelectorAll(".post-page-popup").forEach(el => el.classList.remove("active"));
    });
  });
  document.addEventListener('click', function(event) {
  document.querySelectorAll('.post-page-popup.active').forEach(function(popup) {
    if (!popup.querySelector('.post-page-popup-content').contains(event.target)) {
      popup.classList.remove('active');
    }
  });
});
}