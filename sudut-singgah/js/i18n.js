/* ================================
   I18N.JS
   - Internasionalisasi: Bahasa Indonesia ↔ Bahasa Inggris
   - Membaca localStorage untuk preferensi bahasa
   - Bahasa default: 'id'
   - Expose window.i18n.toggle() dan window.i18n.getCurrent()
   ================================ */

(function () {
  'use strict';

  /* ============================================================
     TABEL TERJEMAHAN
     Kunci: dot-notation (misal 'nav.menu', 'hero.label')
     Nilai yang TIDAK ditranslate:
       - Nama brand, nama menu, username sosmed, alamat, nomor WA
  ============================================================ */
  var translations = {
    id: {
      /* --- Navbar --- */
      'nav.menu'        : 'Menu',
      'nav.about'       : 'Tentang',
      'nav.gallery'     : 'Galeri',
      'nav.location'    : 'Lokasi',

      /* --- Loading screen --- */
      'loading.subtitle': 'sebentar, kami sedang menyeduh...',

      /* --- Hero --- */
      'hero.label'      : 'Warkop · Bondowoso',
      'hero.desc'       : 'Singgahlah sebentar, duduk, pesan kopi, dan biarkan waktu berjalan lebih pelan.',
      'hero.cta.menu'   : 'Lihat Menu',
      'hero.cta.about'  : 'Tentang Kami',

      /* --- About --- */
      'about.label'     : 'Tentang Kami',
      'about.title.line1': 'Cerita di Balik',
      'about.quote'     : '"Singgahlah sebentar, biarkan kopi yang bicara."',
      'about.desc1'     : 'Sudut Singgah lahir dari satu keinginan sederhana, menyediakan tempat untuk berhenti sejenak. Di tengah rutinitas yang padat, kadang yang paling dibutuhkan hanyalah secangkir kopi dan sudut yang tenang. Kami bukan kafe mewah. Kami adalah warkop, tempat di mana siapa pun bisa duduk dan merasa betah.',
      'about.desc2'     : 'Terletak di Jl. Kawah Ijen, Bondowoso, Sudut Singgah hadir dengan suasana hangat dan harga yang bersahabat. Dari kopi tubruk yang pekat hingga minuman kekinian yang segar, semua disajikan dengan rasa yang jujur dan harga yang tidak menyakiti dompet. Singgahlah sejenak. Kami sudah menunggu.',

      /* --- Menu section --- */
      'menu.label'      : 'Menu Pilihan',
      'menu.title'      : 'Menu Kami',
      'menu.tab.hotcold': 'Panas & Dingin',
      'menu.tab.tubruk' : 'Kopi Tubruk',
      'menu.tab.special': 'Minuman Spesial',
      'menu.toggle.hot' : 'Panas',
      'menu.toggle.cold': 'Dingin',
      'menu.more'       : 'Selengkapnya',
      'menu.less'       : 'Lebih Sedikit',

      /* --- Gallery --- */
      'gallery.title'   : 'Galeri',
      'gallery.overlay.1': 'Sudut Singgah',
      'gallery.overlay.2': 'Kopi Kami',
      'gallery.overlay.3': 'Suasana',
      'gallery.overlay.4': 'Momen',
      'gallery.overlay.5': 'Tempat Jeda',
      'gallery.overlay.6': 'Detail',
      'gallery.overlay.7': 'Eksplorasi',

      /* --- Collab section --- */
      'collab.label'    : 'Bersama Teras Explore',
      'collab.title'    : 'Official Collaboration',
      'collab.prev'     : 'Event sebelumnya',
      'collab.next'     : 'Event berikutnya',

      /* --- Lokasi section --- */
      'lokasi.label'    : 'Lokasi Kami',
      'lokasi.title'    : 'Temukan Kami',
      'lokasi.hours.label': 'Jam Buka',
      'lokasi.hours.value': 'Setiap Hari · 19.00 — 00.00 WIB',
      'lokasi.address.label': 'Alamat',
      'lokasi.cta'      : 'Buka di Google Maps',

      /* --- Footer --- */
      'footer.tagline'  : 'sudut kecil untuk jeda',
      'footer.desc'     : 'Warkop hangat di jantung Bondowoso. Tempat yang pas untuk ngopi, ngobrol, dan sejenak melepas penat.',
      'footer.hours.label'  : 'Jam Buka',
      'footer.hours.value'  : 'Setiap Hari · 19.00 — 00.00 WIB',
      'footer.address.label': 'Alamat',
      'footer.copyright': '© 2025 Sudut Singgah. Hak cipta dilindungi.',

      /* --- Cart drawer --- */
      'cart.title'      : 'Pesanan kamu',
      'cart.empty'      : 'Belum ada pesanan',
      'cart.total'      : 'Total',
      'cart.order'      : 'Pesan via WhatsApp',
      'cart.cancel'     : 'Batal',

      /* --- Floating & Misc --- */
      'float.wa'        : 'Pesan via WhatsApp',
      'nav.open'        : 'Buka menu navigasi',
      'backtotop'       : 'Kembali ke atas',
      'lightbox.close'  : 'Tutup',
      'cart.close'      : 'Tutup keranjang',
      'skip.link'       : 'Langsung ke konten',
    },

    en: {
      /* --- Navbar --- */
      'nav.menu'        : 'Menu',
      'nav.about'       : 'About',
      'nav.gallery'     : 'Gallery',
      'nav.location'    : 'Location',

      /* --- Loading screen --- */
      'loading.subtitle': 'one moment, brewing for you...',

      /* --- Hero --- */
      'hero.label'      : 'Coffee Shop · Bondowoso',
      'hero.desc'       : 'Stay a while, sit down, order a coffee, and let time slow down.',
      'hero.cta.menu'   : 'See Menu',
      'hero.cta.about'  : 'About Us',

      /* --- About --- */
      'about.label'     : 'About Us',
      'about.title.line1': 'The Story Behind',
      'about.quote'     : '"Stay a while, let the coffee do the talking."',
      'about.desc1'     : 'Sudut Singgah was born from a simple wish to offer a place to pause. In the middle of a busy routine, sometimes all you need is a cup of coffee and a quiet corner. We are not a fancy café. We are a humble coffee shop where anyone can sit down and feel at home.',
      'about.desc2'     : 'Located on Jl. Kawah Ijen, Bondowoso, Sudut Singgah offers a warm atmosphere and friendly prices. From rich black coffee to refreshing modern drinks, everything is served with honest flavour and a price that won\'t hurt your wallet. Come stay awhile. We\'ve been waiting.',

      /* --- Menu section --- */
      'menu.label'      : 'Our Selection',
      'menu.title'      : 'Our Menu',
      'menu.tab.hotcold': 'Hot & Cold',
      'menu.tab.tubruk' : 'Tubruk Coffee',
      'menu.tab.special': 'Special Drinks',
      'menu.toggle.hot' : 'Hot',
      'menu.toggle.cold': 'Cold',
      'menu.more'       : 'Show More',
      'menu.less'       : 'Show Less',

      /* --- Gallery --- */
      'gallery.title'   : 'Gallery',
      'gallery.overlay.1': 'Sudut Singgah',
      'gallery.overlay.2': 'Our Coffee',
      'gallery.overlay.3': 'Atmosphere',
      'gallery.overlay.4': 'Moments',
      'gallery.overlay.5': 'Rest Spot',
      'gallery.overlay.6': 'Details',
      'gallery.overlay.7': 'Explore',

      /* --- Collab section --- */
      'collab.label'    : 'With Teras Explore',
      'collab.title'    : 'Official Collaboration',
      'collab.prev'     : 'Previous event',
      'collab.next'     : 'Next event',

      /* --- Lokasi section --- */
      'lokasi.label'    : 'Our Location',
      'lokasi.title'    : 'Find Us',
      'lokasi.hours.label': 'Opening Hours',
      'lokasi.hours.value': 'Every Day · 7:00 PM - 12:00 AM WIB',
      'lokasi.address.label': 'Address',
      'lokasi.cta'      : 'Open in Google Maps',

      /* --- Footer --- */
      'footer.tagline'  : 'a small corner for a pause',
      'footer.desc'     : 'A warm coffee shop in the heart of Bondowoso. The right place to sip coffee, catch up, and take a breather.',
      'footer.hours.label'  : 'Opening Hours',
      'footer.hours.value'  : 'Every Day · 7:00 PM - 12:00 AM WIB',
      'footer.address.label': 'Address',
      'footer.copyright': '© 2025 Sudut Singgah. All rights reserved.',

      /* --- Cart drawer --- */
      'cart.title'      : 'Your Order',
      'cart.empty'      : 'No items yet',
      'cart.total'      : 'Total',
      'cart.order'      : 'Order via WhatsApp',
      'cart.cancel'     : 'Cancel',

      /* --- Floating & Misc --- */
      'float.wa'        : 'Order via WhatsApp',
      'nav.open'        : 'Open navigation menu',
      'backtotop'       : 'Back to top',
      'lightbox.close'  : 'Close',
      'cart.close'      : 'Close cart',
      'skip.link'       : 'Skip to content',
    }
  };

  /* ============================================================
     STATE
  ============================================================ */
  var STORAGE_KEY = 'ss_lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'id';

  /* ============================================================
     FUNGSI UTAMA: applyLanguage
  ============================================================ */
  function applyLanguage(lang) {
    if (lang !== 'id' && lang !== 'en') lang = 'id';
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    var t = translations[lang];

    /* --- 1. Swap semua elemen [data-i18n] --- */
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        /* Untuk elemen <input> / <button> dengan placeholder, gunakan textContent biasa */
        el.textContent = t[key];
      }
    });

    /* --- 2. Swap semua aria-label [data-i18n-aria] --- */
    var ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) {
        el.setAttribute('aria-label', t[key]);
      }
    });

    /* --- 3. Update pill button (highlight bahasa aktif) --- */
    var pillId = document.querySelector('.lang-pill__id');
    var pillEn = document.querySelector('.lang-pill__en');
    if (pillId && pillEn) {
      if (lang === 'id') {
        pillId.classList.add('is-active');
        pillEn.classList.remove('is-active');
      } else {
        pillId.classList.remove('is-active');
        pillEn.classList.add('is-active');
      }
    }

    /* --- 4. Update screensaver words --- */
    var wordsId = ['jeda', 'singgah', 'tenang', 'nikmati'];
    var wordsEn = ['pause', 'linger', 'calm', 'savor'];
    if (typeof window.updateScreensaverWords === 'function') {
      window.updateScreensaverWords(lang === 'en' ? wordsEn : wordsId);
    }

    /* --- 5. Re-render kartu menu agar deskripsi ikut berganti --- */
    if (typeof window.rerenderMenu === 'function') {
      window.rerenderMenu();
    }

    /* --- 6. Re-render keranjang agar terjemahan (Panas)/(Hot) ikut berubah --- */
    if (typeof window.rerenderCart === 'function') {
      window.rerenderCart();
    }
  }

  /* ============================================================
     BIND TOGGLE EVENT
  ============================================================ */
  function bindToggleEvent() {
    var langPill = document.getElementById('lang-toggle');
    if (!langPill) return;
    
    langPill.addEventListener('click', function () {
      var newLang = currentLang === 'id' ? 'en' : 'id';
      applyLanguage(newLang);
    });
  }

  /* ============================================================
     INISIALISASI
  ============================================================ */
  function init() {
    bindToggleEvent();
    applyLanguage(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */
  window.i18n = {
    toggle: function () {
      applyLanguage(currentLang === 'id' ? 'en' : 'id');
    },
    getCurrent: function () {
      return currentLang;
    }
  };

})();
