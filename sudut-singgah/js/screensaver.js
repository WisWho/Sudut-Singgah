/* ================================
   SCREENSAVER.JS
   - Idle detection (30 detik tanpa aktivitas)
   - Screensaver: uap kopi SVG + kata melayang
   - Klik/tap untuk keluar
   ================================ */

(function () {
  'use strict';

  var screensaver = document.getElementById('screensaver');
  var wordsContainer = document.getElementById('steam-words');
  if (!screensaver || !wordsContainer) return;

  var IDLE_TIMEOUT = 30000; // 30 detik
  var idleTimer = null;
  var wordTimer = null;
  var isActive = false;

  var words = ['jeda', 'singgah', 'tenang', 'nikmati'];
  var wordIndex = 0;

  /* --- Expose: ubah kata screensaver dari luar (dipanggil i18n.js) --- */
  window.updateScreensaverWords = function (newWords) {
    if (!Array.isArray(newWords) || newWords.length === 0) return;
    words = newWords;
    wordIndex = 0;
  };

  /* --- Aktivasi Screensaver --- */
  function activate() {
    if (isActive) return;
    isActive = true;
    screensaver.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    startWordRotation();
  }

  /* --- Deaktivasi Screensaver --- */
  function deactivate() {
    if (!isActive) return;
    isActive = false;
    
    if (typeof gsap !== 'undefined') {
      gsap.to(screensaver, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: function() {
          screensaver.classList.remove('is-active');
          screensaver.style.opacity = '';
          document.body.style.overflow = '';
          stopWordRotation();
          resetIdleTimer();
        }
      });
    } else {
      screensaver.classList.remove('is-active');
      document.body.style.overflow = '';
      stopWordRotation();
      resetIdleTimer();
    }
  }

  /* --- Rotasi Kata --- */
  function startWordRotation() {
    showWord();
    wordTimer = setInterval(showWord, 3000);
  }

  function stopWordRotation() {
    if (wordTimer) {
      clearInterval(wordTimer);
      wordTimer = null;
    }
  }

  function showWord() {
    var wordEl = wordsContainer.querySelector('.screensaver__word');
    if (!wordEl) return;

    if (typeof gsap !== 'undefined') {
      gsap.to(wordEl, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          wordEl.textContent = words[wordIndex];
          wordIndex = (wordIndex + 1) % words.length;
          gsap.to(wordEl, { opacity: 0.15, duration: 1, ease: 'power2.out' });
        },
      });
    } else {
      wordEl.textContent = words[wordIndex];
      wordIndex = (wordIndex + 1) % words.length;
      wordEl.style.opacity = '0.15';
    }
  }

  /* --- Idle Timer --- */
  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(activate, IDLE_TIMEOUT);
  }

  /* --- Event Listeners: deteksi aktivitas --- */
  var activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

  activityEvents.forEach(function (event) {
    document.addEventListener(event, function () {
      if (isActive) {
        deactivate();
      } else {
        resetIdleTimer();
      }
    }, { passive: true });
  });

  // Klik screensaver untuk keluar
  screensaver.addEventListener('click', deactivate);

  // Mulai idle timer
  resetIdleTimer();
})();
