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
      { nama: 'Kopi Hitam', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi seduh asli dengan cita rasa pekat dan aroma kuat.', gambar: 'assets/images/menu/kopi-hitam.webp' },
      { nama: 'Kopi Susu', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Perpaduan kopi dan susu kental manis yang pas.', gambar: 'assets/images/menu/kopi-susu.webp' },
      { nama: 'Kopi Gula Aren', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Manisnya gula aren asli bercampur dengan kopi.', gambar: 'assets/images/menu/kopi-gula-aren.webp' },
      { nama: 'White Coffee', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi instan lembut untuk menemani santai.', gambar: 'assets/images/menu/white-coffee.webp' },
      { nama: 'Cappuccino', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Kopi dengan busa lembut yang menghangatkan.', gambar: 'assets/images/menu/cappucino.webp' },
      { nama: 'Chocolatos', hargaPanas: 4000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Cokelat panas maupun dingin yang selalu jadi andalan.', gambar: 'assets/images/menu/chocolatos.webp' },
      { nama: 'Milo', hargaPanas: 5000, hargaDingin: 5000, tipe: 'keduanya', deskripsi: 'Minuman cokelat malt khas kesukaan semua.', gambar: 'assets/images/menu/milo.webp' },
      { nama: 'Susu Jahe', hargaPanas: 4000, hargaDingin: null, tipe: 'panas', deskripsi: 'Kehangatan ekstra dari campuran susu dan jahe asli.', gambar: 'assets/images/menu/susu-jahe.webp' },
      { nama: 'Susu Hangat', hargaPanas: 4000, hargaDingin: null, tipe: 'panas', deskripsi: 'Susu putih hangat penenang pikiran.', gambar: 'assets/images/menu/susu-hangat.webp' },
      { nama: 'Joshua', hargaPanas: null, hargaDingin: 5000, tipe: 'dingin', deskripsi: 'Minuman segar dengan campuran rasa spesial.', gambar: 'assets/images/menu/joshua.webp' },
    ],
    tubruk: [
      { nama: 'Tubruk Arabica', harga: 6000, tipe: 'panas', deskripsi: 'Kopi tubruk khas dengan notes asam Arabica.', gambar: 'assets/images/menu/kopi-tubruk.webp' },
      { nama: 'Tubruk Robusta', harga: 6000, tipe: 'panas', deskripsi: 'Sensasi kopi tubruk yang tebal dan pekat.', gambar: 'assets/images/menu/kopi-tubruk.webp' },
    ],
    spesial: [
      { nama: 'Taro Singgah', harga: 8000, tipe: 'dingin', deskripsi: 'Minuman manis rasa taro yang creamy.', gambar: 'assets/images/menu/taro-singgah.webp' },
      { nama: 'Choco Beng', harga: 8000, tipe: 'dingin', deskripsi: 'Kreasi cokelat eksklusif dengan topping renyah.', gambar: 'assets/images/menu/choco-beng.webp' },
      { nama: 'Miloreo Crunch', harga: 8000, tipe: 'dingin', deskripsi: 'Paduan Milo dan Oreo yang crunchy.', gambar: 'assets/images/menu/miloreo-crunch.webp' },
      { nama: 'Coffee Latte', harga: 8000, tipe: 'dingin', deskripsi: 'Espresso dengan paduan susu segar yang gurih.', gambar: 'assets/images/menu/coffee-latte.webp' },
      { nama: 'Aren Coffee', harga: 8000, tipe: 'dingin', deskripsi: 'Racikan andalan es kopi susu gula aren premium.', gambar: 'assets/images/menu/aren-coffee.webp' },
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
        if (item.tipe === 'panas') badgeText = 'Panas';
        else if (item.tipe === 'dingin') badgeText = 'Dingin';
        else if (item.tipe === 'keduanya') badgeText = 'Panas & Dingin';

        var currentPrice = item.hargaPanas || item.hargaDingin || item.harga;
        var currentCartName = item.nama;

        if (item.tipe === 'keduanya') {
           currentPrice = item.hargaPanas;
           currentCartName = item.nama + ' (Panas)';
        }

        var toggleHtml = '';
        if (item.tipe === 'keduanya') {
          toggleHtml = 
            '<div class="menu__card-toggle" style="display:flex; gap:8px; margin-bottom:12px;">' +
              '<button class="menu-toggle-btn is-active" data-type="panas" style="padding:4px 10px; font-size:12px; border-radius:20px; border:1px solid #C8892A; background:#C8892A; color:#1C1410; cursor:pointer; font-weight:600;">Panas</button>' +
              '<button class="menu-toggle-btn" data-type="dingin" style="padding:4px 10px; font-size:12px; border-radius:20px; border:1px solid #6B4226; background:transparent; color:#D4C5A9; cursor:pointer; font-weight:600;">Dingin</button>' +
            '</div>';
        }

        card.innerHTML =
          '<div class="menu__card-image">' +
            '<img src="' + item.gambar + '" alt="' + item.nama + '" class="menu__card-img" loading="lazy">' +
            '<span class="menu__card-badge">' + badgeText + '</span>' +
          '</div>' +
          '<div class="menu__card-content">' +
            '<h3 class="menu__card-name">' + item.nama + '</h3>' +
            '<p class="menu__card-desc">' + item.deskripsi + '</p>' +
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
                b.style.background = 'transparent';
                b.style.borderColor = '#6B4226';
                b.style.color = '#D4C5A9';
                b.classList.remove('is-active');
              });
              var clicked = e.target;
              clicked.style.background = '#C8892A';
              clicked.style.borderColor = '#C8892A';
              clicked.style.color = '#1C1410';
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
        btnContainer.innerHTML = '<button class="menu__more-btn" id="menu-more-btn">Selengkapnya <i data-lucide="chevron-down"></i></button>';
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
            btn.innerHTML = 'Lebih Sedikit <i data-lucide="chevron-up"></i>';
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
            btn.innerHTML = 'Selengkapnya <i data-lucide="chevron-down"></i>';
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

    // Render menu sesuai tab
    renderMenu(tab.dataset.tab);
  });

  /* --- Render awal: Hot Menu --- */
  renderMenu('panasdingin');
})();
