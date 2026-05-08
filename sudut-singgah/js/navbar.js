/* ================================
   NAVBAR
   - Sticky: transparan di hero, background gelap saat scroll
   - Hamburger toggle untuk mobile drawer
   - Tutup drawer saat link diklik
   ================================ */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerLinks = document.querySelectorAll('.navbar__drawer-link');

  if (!navbar) return;

  /* --- Scroll detection --- */
  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // cek awal

  /* --- Hamburger toggle --- */
  if (hamburgerBtn && navDrawer) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = navDrawer.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Tutup drawer saat link diklik
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navDrawer.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }
})();
