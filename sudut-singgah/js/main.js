/* ================================
   MAIN.JS
   - Inisialisasi Lenis smooth scroll
   - GSAP ScrollTrigger register
   - Animasi hero stagger setelah loading selesai
   - Animasi scroll per section
   - Lucide icons init
   ================================ */

(function () {
  'use strict';

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(init, 50);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* --- Lenis Smooth Scroll (Disabled) --- */
    /*
    if (typeof Lenis !== 'undefined') {
      var lenis = new Lenis({
        duration: 1.2,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Sync Lenis dengan ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
    }
    */

    /* --- Native Smooth Scroll --- */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* --- Lucide Icons --- */
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    /* --- Hero Stagger Animation (setelah loading selesai) --- */
    function animateHero() {
      var heroElements = [
        '.hero__label',
        '.hero__title',
        '.hero__divider',
        '.hero__tagline',
        '.hero__cta',
      ];

      gsap.from(heroElements.join(', '), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      });
    }

    window.addEventListener('loadingComplete', animateHero);

    /* --- Scroll Animations --- */

    // About section
    gsap.from('.about__image-wrapper', {
      scrollTrigger: { trigger: '.about', start: 'top 85%' },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.about__text .section__label, .about__text .section__title, .about__text .about__desc', {
      scrollTrigger: { trigger: '.about__text', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Menu section
    gsap.from('.menu__title', {
      scrollTrigger: { trigger: '.menu', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.menu__tabs', {
      scrollTrigger: { trigger: '.menu', start: 'top 80%' },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out',
    });

    // Gallery section
    gsap.from('.gallery__title', {
      scrollTrigger: { trigger: '.gallery', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.gallery__item', {
      scrollTrigger: { trigger: '.gallery__grid', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });

    // Explore section
    gsap.from('.explore__label, .explore__title', {
      scrollTrigger: { trigger: '.explore', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.explore__item', {
      scrollTrigger: { trigger: '.explore__scroll', start: 'top 85%' },
      x: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Location section
    gsap.from('.location__title, .location__map, .location__info', {
      scrollTrigger: { trigger: '.location', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // Footer
    gsap.from('.footer__brand, .footer__socials, .footer__copy', {
      scrollTrigger: { trigger: '.footer', start: 'top 90%' },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    /* --- Back to Top --- */
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }
      }, { passive: true });

      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
