/* ================================
   LOADING SCREEN
   - Fade in wordmark & subtitle dengan GSAP
   - Setelah 2.5 detik, slide up keluar
   - Lalu trigger animasi hero
   ================================ */

(function () {
  'use strict';

  const loadingScreen = document.getElementById('loading-screen');
  const wordmark = document.querySelector('.loading-screen__wordmark');
  const subtitle = document.querySelector('.loading-screen__subtitle');

  if (!loadingScreen || !wordmark || !subtitle) return;

  // Tunggu GSAP tersedia
  function init() {
    if (typeof gsap === 'undefined') {
      setTimeout(init, 50);
      return;
    }

    const tl = gsap.timeline();

    // Fade in wordmark
    tl.to(wordmark, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Fade in subtitle
    tl.to(subtitle, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

    // Tunggu sebentar, lalu slide up loading screen
    tl.to(loadingScreen, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 1.2,
      onComplete: function () {
        loadingScreen.style.display = 'none';
        document.body.classList.add('is-loaded');

        // Dispatch custom event untuk trigger animasi hero
        window.dispatchEvent(new CustomEvent('loadingComplete'));
      },
    });
  }

  // Mulai setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
