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
      gsap.from([
        '.hero-label',
        '.hero-title',
        '.hero-divider',
        '.hero-desc',
        '.hero-buttons'
      ], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
      });

      gsap.from('.hero-right', {
        opacity: 0,
        x: 30,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2
      });
    }

    window.addEventListener('loadingComplete', animateHero);

    /* --- Scroll Animations --- */

    // About section
    gsap.from('.about-image-wrapper', {
      scrollTrigger: { trigger: '.about', start: 'top 85%' },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.about-content .about-label, .about-content .about-title, .about-content .about-desc', {
      scrollTrigger: { trigger: '.about-content', start: 'top 85%' },
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

    gsap.from('.bento-item', {
      scrollTrigger: { trigger: '.gallery-bento', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });

    // Event section (Swiper + Lightbox)
    if (typeof Swiper !== 'undefined') {
      new Swiper('.collab-swiper', {
        effect: 'cards',
        grabCursor: true,
        cardsEffect: {
          perSlideOffset: 12,
          perSlideRotate: 8,
          rotate: true,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.collab-next',
          prevEl: '.collab-prev',
        },
      });
    }

    gsap.from('.collab-label, .collab-title', {
      scrollTrigger: { trigger: '.collab-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from('.collab-swiper', {
      scrollTrigger: { trigger: '.collab-section', start: 'top 80%' },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    });

    gsap.from('.collab-nav', {
      scrollTrigger: { trigger: '.collab-section', start: 'top 75%' },
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: 'power2.out',
    });

    // Lightbox
    var lightbox = document.getElementById('collab-lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxBackdrop = document.getElementById('lightbox-backdrop');
    var lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src, alt, caption) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';

      document.querySelectorAll('.bento-overlay.is-tapped').forEach(function(overlay) {
        overlay.classList.remove('is-tapped');
      });
    }

    if (lightbox) {
      document.querySelectorAll('.polaroid').forEach(function (card) {
        card.addEventListener('click', function () {
          var img = card.querySelector('img');
          var caption = card.getAttribute('data-caption') || '';
          if (img) openLightbox(img.src, img.alt, caption);
        });
      });

      document.querySelectorAll('.bento-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var img = item.querySelector('img');
          if (img) openLightbox(img.src, img.alt, '');
        });
      });

      if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
          closeLightbox();
        }
      });
    }

    // Location section
    gsap.from('.lokasi-title, .lokasi-map-wrapper, .lokasi-right', {
      scrollTrigger: { trigger: '.lokasi-section', start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // Footer
    gsap.from('.footer-brand, .footer-socials, .footer-bottom', {
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
