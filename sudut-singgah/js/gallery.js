/* ================================
   GALLERY.JS
   - Gallery hover/tap overlay effect
   - Explore horizontal scroll setup
   ================================ */

(function () {
  'use strict';

  /* --- Gallery: tap toggle overlay di mobile --- */
  var galleryItems = document.querySelectorAll('.bento-item');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Toggle overlay visibility on tap (mobile)
      var overlay = item.querySelector('.bento-overlay');
      if (!overlay) return;

      // Remove active dari item lain
      galleryItems.forEach(function (other) {
        if (other !== item) {
          var otherOverlay = other.querySelector('.bento-overlay');
          if (otherOverlay) otherOverlay.classList.remove('is-tapped');
        }
      });

      overlay.classList.toggle('is-tapped');
    });
  });
})();
