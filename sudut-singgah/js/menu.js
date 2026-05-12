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
    hot: [
      { nama: 'Kopi Hitam', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Kopi seduh asli dengan cita rasa pekat dan aroma kuat.' },
      { nama: 'Kopi Susu', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Perpaduan kopi dan susu kental manis yang pas.' },
      { nama: 'Kopi Gula Aren', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Manisnya gula aren asli bercampur dengan kopi.' },
      { nama: 'White Coffee', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Kopi instan lembut untuk menemani santai.' },
      { nama: 'Cappuccino', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Kopi dengan busa lembut yang menghangatkan.' },
      { nama: 'Chocolatos', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Cokelat panas yang kental dan manis.' },
      { nama: 'Susu Jahe', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Kehangatan ekstra dari campuran susu dan jahe asli.' },
      { nama: 'Susu Hangat', harga: 4000, kategori: 'Hot Menu', deskripsi: 'Susu putih hangat penenang pikiran.' },
      { nama: 'Milo', harga: 5000, kategori: 'Hot Menu', deskripsi: 'Minuman cokelat malt khas kesukaan semua.' },
    ],
    cold: [
      { nama: 'Ice Coffee', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Kopi hitam dingin penyegar dahaga.' },
      { nama: 'Joshua', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Minuman segar dengan campuran rasa spesial.' },
      { nama: 'Kopi Susu', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Es kopi susu yang manis dan segar.' },
      { nama: 'Kopi Gula Aren', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Es kopi dengan sirup gula aren asli.' },
      { nama: 'White Coffee', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Es white coffee manis menyegarkan.' },
      { nama: 'Cappuccino', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Es cappuccino dengan kesegaran maksimal.' },
      { nama: 'Chocolatos', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Cokelat dingin yang selalu jadi andalan.' },
      { nama: 'Milo', harga: 5000, kategori: 'Cold Menu', deskripsi: 'Es Milo dingin penuh energi.' },
    ],
    specialty: [
      { nama: 'Tubruk Arabica', harga: 6000, kategori: 'Specialty', deskripsi: 'Kopi tubruk khas dengan notes asam Arabica.' },
      { nama: 'Tubruk Robusta', harga: 6000, kategori: 'Specialty', deskripsi: 'Sensasi kopi tubruk yang tebal dan pekat.' },
    ],
    special: [
      { nama: 'Taro Singgah', harga: 8000, kategori: 'Special Drink', deskripsi: 'Minuman manis rasa taro yang creamy.' },
      { nama: 'Choco Beng', harga: 8000, kategori: 'Special Drink', deskripsi: 'Kreasi cokelat eksklusif dengan topping renyah.' },
      { nama: 'Miloreo Crunch', harga: 8000, kategori: 'Special Drink', deskripsi: 'Paduan Milo dan Oreo yang crunchy.' },
      { nama: 'Coffee Latte', harga: 8000, kategori: 'Special Drink', deskripsi: 'Espresso dengan paduan susu segar yang gurih.' },
      { nama: 'Aren Coffee', harga: 8000, kategori: 'Special Drink', deskripsi: 'Racikan andalan es kopi susu gula aren premium.' },
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
        card.innerHTML =
          '<div class="menu__card-image">' +
            '<img src="../assets/images/menu-placeholder.webp" alt="' + item.nama + '" class="menu__card-img" loading="lazy">' +
            '<span class="menu__card-badge">' + item.kategori + '</span>' +
          '</div>' +
          '<div class="menu__card-content">' +
            '<h3 class="menu__card-name">' + item.nama + '</h3>' +
            '<p class="menu__card-desc">' + item.deskripsi + '</p>' +
            '<div class="menu__card-footer">' +
              '<span class="menu__card-price">' + formatHarga(item.harga) + '</span>' +
              '<button class="menu__card-add" data-nama="' + item.nama + '" data-harga="' + item.harga + '" aria-label="Tambah ' + item.nama + '">+</button>' +
            '</div>' +
          '</div>';
        menuGrid.appendChild(card);
      });

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
  renderMenu('hot');
})();
