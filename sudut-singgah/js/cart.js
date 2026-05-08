/* ================================
   CART.JS
   - State management keranjang
   - Drawer open/close
   - Tambah, kurang, hapus item
   - WhatsApp redirect
   ================================ */

(function () {
  'use strict';

  var cart = [];

  /* --- DOM Elements --- */
  var cartDrawer = document.getElementById('cart-drawer');
  var cartBackdrop = document.getElementById('cart-backdrop');
  var cartCloseBtn = document.getElementById('cart-close-btn');
  var cartFab = document.getElementById('cart-fab');
  var cartBadge = document.getElementById('cart-badge');
  var cartBody = document.getElementById('cart-body');
  var cartEmpty = document.getElementById('cart-empty');
  var cartTotal = document.getElementById('cart-total');
  var cartOrderBtn = document.getElementById('cart-order-btn');
  var cartCancelBtn = document.getElementById('cart-cancel-btn');
  var cartFooter = document.getElementById('cart-footer');

  /* --- Format Harga --- */
  function formatHarga(harga) {
    return 'Rp ' + harga.toLocaleString('id-ID');
  }

  /* --- Update Badge --- */
  function updateBadge() {
    var total = cart.reduce(function (sum, item) { return sum + item.jumlah; }, 0);
    cartBadge.textContent = total;

    // Sembunyikan badge saat kosong
    if (total === 0) {
      cartBadge.classList.remove('has-items', 'pop');
    } else {
      cartBadge.classList.add('has-items');
      // Animasi pop
      cartBadge.classList.remove('pop');
      void cartBadge.offsetWidth; // force reflow
      cartBadge.classList.add('pop');
    }
  }

  /* --- Render Cart --- */
  function renderCart() {
    // Hapus item lama (bukan empty message)
    var existingItems = cartBody.querySelectorAll('.cart-item');
    existingItems.forEach(function (el) { el.remove(); });

    // Selalu update badge dulu
    updateBadge();

    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
      cartFooter.style.display = 'none';
      return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'flex';

    cart.forEach(function (item, index) {
      var el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML =
        '<div class="cart-item__info">' +
          '<div class="cart-item__name">' + item.nama + '</div>' +
          '<div class="cart-item__price">' + formatHarga(item.harga) + '</div>' +
        '</div>' +
        '<div class="cart-item__controls">' +
          '<button class="cart-item__btn" data-action="minus" data-index="' + index + '" aria-label="Kurangi">−</button>' +
          '<span class="cart-item__qty">' + item.jumlah + '</span>' +
          '<button class="cart-item__btn" data-action="plus" data-index="' + index + '" aria-label="Tambah">+</button>' +
          '<button class="cart-item__remove" data-action="remove" data-index="' + index + '" aria-label="Hapus">×</button>' +
        '</div>';
      cartBody.insertBefore(el, cartEmpty);
    });

    // Update total
    var totalHarga = cart.reduce(function (sum, item) {
      return sum + item.harga * item.jumlah;
    }, 0);
    cartTotal.textContent = formatHarga(totalHarga);

    updateBadge();
  }

  /* --- Tambah ke Cart --- */
  function addToCart(nama, harga) {
    var existing = cart.find(function (item) { return item.nama === nama; });
    if (existing) {
      existing.jumlah++;
    } else {
      cart.push({ nama: nama, harga: harga, jumlah: 1 });
    }
    renderCart();

    // Bounce animation pada FAB
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(cartFab, { scale: 1.2 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
    }
  }

  /* --- Open / Close Drawer --- */
  function openDrawer() {
    cartDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    cartDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* --- Event: klik tombol + di menu --- */
  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest('.menu__card-add');
    if (!addBtn) return;

    var nama = addBtn.dataset.nama;
    var harga = parseInt(addBtn.dataset.harga, 10);
    addToCart(nama, harga);

    // Bounce animation pada tombol
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(addBtn, { scale: 0.85 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' });
    }
  });

  /* --- Event: kontrol di dalam cart --- */
  cartBody.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;

    var action = btn.dataset.action;
    var index = parseInt(btn.dataset.index, 10);

    if (action === 'plus') {
      cart[index].jumlah++;
    } else if (action === 'minus') {
      cart[index].jumlah--;
      if (cart[index].jumlah <= 0) cart.splice(index, 1);
    } else if (action === 'remove') {
      cart.splice(index, 1);
    }

    renderCart();
  });

  /* --- Event: FAB, close, backdrop --- */
  if (cartFab) cartFab.addEventListener('click', openDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeDrawer);

  /* --- Event: Pesan via WhatsApp --- */
  if (cartOrderBtn) {
    cartOrderBtn.addEventListener('click', function () {
      if (cart.length === 0) return;

      var pesanText = cart.map(function (i) {
        return '- ' + i.nama + ' x' + i.jumlah;
      }).join('%0A');

      var total = cart.reduce(function (sum, i) {
        return sum + i.harga * i.jumlah;
      }, 0);

      var waUrl = 'https://wa.me/6285738212143?text=Halo%20Sudut%20Singgah!%20Saya%20mau%20pesan:%0A' +
        pesanText + '%0A%0ATotal:%20Rp%20' + total.toLocaleString('id-ID');

      window.open(waUrl, '_blank');
    });
  }

  /* --- Event: Batal --- */
  if (cartCancelBtn) {
    cartCancelBtn.addEventListener('click', function () {
      cart = [];
      renderCart();
      closeDrawer();
    });
  }

  // Render awal
  renderCart();
})();
