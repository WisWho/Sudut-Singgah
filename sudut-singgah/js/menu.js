/* ================================
   MENU.JS
   - Data menu lengkap
   - Tab switching dengan skeleton loading
   - Render kartu menu
   ================================ */

(function () {
  'use strict';

  /* --- Data Menu --- */
  var menuData = {
    panasdingin: [
      { nama: 'Kopi Hitam', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi seduh asli dengan cita rasa pekat dan aroma kuat.', deskripsiEn: 'Traditionally brewed black coffee with a bold flavour and rich aroma.', gambar: 'assets/images/menu/kopi-hitam.webp' },
      { nama: 'Kopi Susu', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Perpaduan kopi dan susu kental manis yang pas.', deskripsiEn: 'A perfect blend of coffee and sweetened condensed milk.', gambar: 'assets/images/menu/kopi-susu.webp' },
      { nama: 'Kopi Gula Aren', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Manisnya gula aren asli bercampur dengan kopi.', deskripsiEn: 'The natural sweetness of palm sugar mixed with fresh brewed coffee.', gambar: 'assets/images/menu/kopi-gula-aren.webp' },
      { nama: 'White Coffee', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi instan lembut untuk menemani santai.', deskripsiEn: 'A smooth and mild instant coffee, perfect for a relaxed moment.', gambar: 'assets/images/menu/white-coffee.webp' },
      { nama: 'Cappuccino', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi dengan busa lembut yang menghangatkan.', deskripsiEn: 'Rich espresso topped with a cloud of soft, velvety foam.', gambar: 'assets/images/menu/cappucino.webp' },
      { nama: 'Chocolatos', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Cokelat panas maupun dingin yang selalu jadi andalan.', deskripsiEn: 'A crowd-favourite chocolate drink, served hot or cold.', gambar: 'assets/images/menu/chocolatos.webp' },
      { nama: 'Milo', hargaPanas: 5000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Minuman cokelat malt khas kesukaan semua.', deskripsiEn: 'The classic malt chocolate drink loved by everyone.', gambar: 'assets/images/menu/milo.webp' },
      { nama: 'Susu Jahe', hargaPanas: 4000, hargaDingin: null, tipe: 'panas', deskripsi: 'Kehangatan ekstra dari campuran susu dan jahe asli.', deskripsiEn: 'Extra warmth from a blend of milk and fresh ginger.', gambar: 'assets/images/menu/susu-jahe.webp' },
      { nama: 'Susu Hangat', hargaPanas: 4000, hargaDingin: null, tipe: 'panas', deskripsi: 'Susu putih hangat penenang pikiran.', deskripsiEn: 'Warm plain milk, simple, comforting, and calming.', gambar: 'assets/images/menu/susu-hangat.webp' },
      { nama: 'Joshua', hargaPanas: null, hargaDingin: 5000, tipe: 'dingin', deskripsi: 'Minuman segar dengan campuran rasa spesial.', deskripsiEn: 'A refreshing drink with a special blend of flavours.', gambar: 'assets/images/menu/joshua.webp' },
    ],
    tubruk: [
      { nama: 'Tubruk Arabica', harga: 6000, tipe: 'panas', deskripsi: 'Kopi tubruk khas dengan notes asam Arabica.', deskripsiEn: 'Classic tubruk coffee featuring the bright, acidic notes of Arabica.', gambar: 'assets/images/menu/kopi-tubruk.webp' },
      { nama: 'Tubruk Robusta', harga: 6000, tipe: 'panas', deskripsi: 'Sensasi kopi tubruk yang tebal dan pekat.', deskripsiEn: 'Bold and intense tubruk coffee with a strong Robusta body.', gambar: 'assets/images/menu/kopi-tubruk.webp' },
    ],
    spesial: [
      { nama: 'Taro Singgah', harga: 8000, tipe: 'dingin', deskripsi: 'Minuman manis rasa taro yang creamy.', deskripsiEn: 'A sweet and creamy taro-flavoured drink.', gambar: 'assets/images/menu/taro-singgah.webp' },
      { nama: 'Choco Beng', harga: 8000, tipe: 'dingin', deskripsi: 'Kreasi cokelat eksklusif dengan topping renyah.', deskripsiEn: 'An exclusive chocolate creation with a satisfying crunchy topping.', gambar: 'assets/images/menu/choco-beng.webp' },
      { nama: 'Miloreo Crunch', harga: 8000, tipe: 'dingin', deskripsi: 'Paduan Milo dan Oreo yang crunchy.', deskripsiEn: 'The ultimate combo of Milo and Oreo with an irresistible crunch.', gambar: 'assets/images/menu/miloreo-crunch.webp' },
      { nama: 'Coffee Latte', harga: 8000, tipe: 'dingin', deskripsi: 'Espresso dengan paduan susu segar yang gurih.', deskripsiEn: 'Smooth espresso paired with rich, fresh milk.', gambar: 'assets/images/menu/coffee-latte.webp' },
      { nama: 'Aren Coffee', harga: 8000, tipe: 'dingin', deskripsi: 'Racikan andalan es kopi susu gula aren premium.', deskripsiEn: 'Our signature iced coffee with premium palm sugar and fresh milk.', gambar: 'assets/images/menu/aren-coffee.webp' },
    ],
  };

  var menuGrid = document.getElementById('menu-grid');
  var menuTabs = document.getElementById('menu-tabs');

  if (!menuGrid || !menuTabs) return;

  /* --- Format Harga --- */
  function formatHarga(harga) {
    return 'Rp ' + harga.toLocaleString('id-ID');
  }

  /* --- Render Skeleton --- */
  function renderSkeleton(count) {
    menuGrid.innerHTML = '';
    for (var i = 0; i < count; i++) {
      var skeleton = document.createElement('div');
      skeleton.className = 'menu__skeleton';
      menuGrid.appendChild(skeleton);
    }
  }

  /* --- Render Kartu Menu --- */
  function renderMenu(category) {
    var items = menuData[category];
    if (!items) return;

    // Tampilkan skeleton dulu
    renderSkeleton(items.length);

    // Delay singkat untuk efek skeleton
    setTimeout(function () {
      menuGrid.innerHTML = '';

      // Tentukan limit item awal: 4 untuk mobile (1x4), 8 untuk desktop (2x4)
      var itemLimit = window.innerWidth < 1024 ? 4 : 8;

      items.forEach(function (item, index) {
        var card = document.createElement('div');
        card.className = 'menu__card';
        if (index >= itemLimit) {
          card.classList.add('hidden-item');
        }

        var badgeText = '';
        if (item.tipe === 'panas') badgeText = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Hot' : 'Panas';
        else if (item.tipe === 'dingin') badgeText = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Cold' : 'Dingin';
        else if (item.tipe === 'keduanya') badgeText = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Hot & Cold' : 'Panas & Dingin';

        var currentLang = window.i18n ? window.i18n.getCurrent() : 'id';
        var displayDesc = (currentLang === 'en' && item.deskripsiEn) ? item.deskripsiEn : item.deskripsi;

        var currentPrice = item.hargaPanas || item.hargaDingin || item.harga;
        var currentCartName = item.nama;

        if (item.tipe === 'keduanya') {
           currentPrice = item.hargaPanas;
           currentCartName = item.nama + ' (Panas)';
        }

        var toggleHtml = '';
        if (item.tipe === 'keduanya') {
          var labelPanas = currentLang === 'en' ? 'Hot' : 'Panas';
          var labelDingin = currentLang === 'en' ? 'Cold' : 'Dingin';
          toggleHtml =
            '<div class="menu__card-toggle">' +
              '<button class="menu-toggle-btn is-active" data-type="panas">' + labelPanas + '</button>' +
              '<button class="menu-toggle-btn" data-type="dingin">' + labelDingin + '</button>' +
            '</div>';
        }

        card.innerHTML =
          '<div class="menu__card-image">' +
            '<img src="' + item.gambar + '" alt="' + item.nama + '" class="menu__card-img" loading="lazy">' +
            '<span class="menu__card-badge">' + badgeText + '</span>' +
          '</div>' +
          '<div class="menu__card-content">' +
            '<h3 class="menu__card-name">' + item.nama + '</h3>' +
            '<p class="menu__card-desc">' + displayDesc + '</p>' +
            toggleHtml +
            '<div class="menu__card-footer">' +
              '<span class="menu__card-price" id="price-' + index + '">' + formatHarga(currentPrice) + '</span>' +
              '<button class="menu__card-add" id="add-' + index + '" data-nama="' + currentCartName + '" data-harga="' + currentPrice + '" aria-label="Tambah ' + item.nama + '">' +
                '<i data-lucide="plus" style="width:16px;height:16px;"></i>' +
              '</button>' +
            '</div>' +
          '</div>';

        menuGrid.appendChild(card);

        if (item.tipe === 'keduanya') {
          var toggleBtns = card.querySelectorAll('.menu-toggle-btn');
          var priceEl = card.querySelector('#price-' + index);
          var addBtn = card.querySelector('#add-' + index);
          
          toggleBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              toggleBtns.forEach(function(b) {
                b.classList.remove('is-active');
              });
              var clicked = e.currentTarget;
              clicked.classList.add('is-active');

              var type = clicked.getAttribute('data-type');
              var newPrice = type === 'panas' ? item.hargaPanas : item.hargaDingin;
              var newName = item.nama + ' (' + (type === 'panas' ? 'Panas' : 'Dingin') + ')';

              priceEl.textContent = formatHarga(newPrice);
              addBtn.setAttribute('data-harga', newPrice);
              addBtn.setAttribute('data-nama', newName);
            });
          });
        }
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();

      // Handle "Selengkapnya" button
      var existingBtnContainer = document.getElementById('menu-more-container');
      if (existingBtnContainer) existingBtnContainer.remove();

      if (items.length > itemLimit) {
        var btnContainer = document.createElement('div');
        btnContainer.id = 'menu-more-container';
        var labelMore = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Show More' : 'Selengkapnya';
        btnContainer.innerHTML = '<button class="menu__more-btn" id="menu-more-btn">' + labelMore + ' <i data-lucide="chevron-down"></i></button>';
        menuGrid.parentNode.insertBefore(btnContainer, menuGrid.nextSibling);
        
        if (typeof lucide !== 'undefined') lucide.createIcons();

        var btn = document.getElementById('menu-more-btn');
        var isExpanded = false;

        btn.addEventListener('click', function() {
          isExpanded = !isExpanded;
          var hiddenItems = menuGrid.querySelectorAll('.menu__card:nth-child(n+' + (itemLimit + 1) + ')');

          if (isExpanded) {
            // Tampilkan item
            hiddenItems.forEach(function(item) { item.classList.remove('hidden-item'); });
            var labelLess = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Show Less' : 'Lebih Sedikit';
            btn.innerHTML = labelLess + ' <i data-lucide="chevron-up"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();

            if (typeof gsap !== 'undefined') {
              gsap.from(hiddenItems, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: 0.05,
                ease: 'power2.out'
              });
            }
          } else {
            // Sembunyikan item
            if (typeof gsap !== 'undefined') {
              gsap.to(hiddenItems, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                onComplete: function() {
                  hiddenItems.forEach(function(item) {
                    item.classList.add('hidden-item');
                    item.style.opacity = '';
                    item.style.transform = '';
                  });
                }
              });
            } else {
              hiddenItems.forEach(function(item) { item.classList.add('hidden-item'); });
            }
            btn.innerHTML = (window.i18n ? window.i18n.getCurrent() : 'id') === 'en' ? 'Show More <i data-lucide="chevron-down"></i>' : 'Selengkapnya <i data-lucide="chevron-down"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            // Scroll otomatis ke bagian menu
            var target = document.getElementById('menu');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }

      // Animasi masuk kartu pertama jika GSAP tersedia
      if (typeof gsap !== 'undefined') {
        var visibleCards = menuGrid.querySelectorAll('.menu__card:not(.hidden-item)');
        gsap.from(visibleCards, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        });
      }
    }, 300);
  }

  /* --- Tab Click Handler --- */
  var activeCategory = 'panasdingin';

  menuTabs.addEventListener('click', function (e) {
    var tab = e.target.closest('.menu__tab');
    if (!tab) return;

    // Update tab aktif
    menuTabs.querySelectorAll('.menu__tab').forEach(function (t) {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');

    // Simpan kategori aktif & render
    activeCategory = tab.dataset.tab;
    renderMenu(activeCategory);
  });

  /* --- Expose rerenderMenu ke global (dipanggil oleh i18n.js) --- */
  window.rerenderMenu = function () {
    renderMenu(activeCategory);
  };

  /* --- Render awal: Hot Menu --- */
  renderMenu('panasdingin');
})();
