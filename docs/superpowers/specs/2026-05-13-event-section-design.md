# Section Event — Polaroid Cards Swiper + Font Cleanup

> Redesign section Explore menjadi section Event dengan Swiper Polaroid cards effect, lightbox popup, dan penghapusan font Grold dari seluruh project.

---

## Scope

Dua perubahan utama:

1. **Section Explore → Event:** Ubah horizontal scroll biasa menjadi Swiper cards effect bergaya Polaroid, dengan lightbox saat foto diklik.
2. **Font Cleanup:** Ganti semua referensi font `'Grold', serif` di CSS dengan font yang tersedia (`var(--font-body)` atau `var(--font-brand)`).

---

## 1. Section Event

### Identitas

| Atribut | Nilai |
|---|---|
| Nama section | Event |
| ID HTML | `#event` |
| Label | Momen & Cerita |
| Judul | `<span class="font-brand">Sudut Singgah</span> Event` |
| Background | `#1C1410` (gelap) |
| Watermark dekoratif | "EVENT" (pojok kanan bawah, `opacity: 0.04`) |

### 4 Event

| Slide | Judul | File Gambar |
|---|---|---|
| 1 | Sudut Singgah Explore | `assets/images/explore-1.webp` |
| 2 | Nonton Bareng | `assets/images/explore-2.webp` |
| 3 | Bazar Kopi | `assets/images/explore-3.webp` |
| 4 | Workshop Latte Art | `assets/images/explore-4.webp` |

### Kartu Polaroid

- **Background:** `#F5F0E8`
- **Padding:** `12px` atas/kiri/kanan, `48px` bawah (area caption)
- **Border-radius:** `2px` (Polaroid asli hampir tidak ada radius)
- **Foto:** `aspect-ratio: 1/1`, `object-fit: cover`
- **Caption:** Judul event, font **Caveat** (Google Fonts), `18px`, warna `#1C1410`, centered
- **Shadow default:** `0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)`
- **Hover:**
  - `transform: translateY(-4px)`
  - Shadow membesar: `0 30px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)`
  - Tidak ada overlay pada foto
- **Klik:** Buka lightbox

### Swiper Config

```js
new Swiper('.event-swiper', {
  effect: 'cards',
  grabCursor: true,
  cardsEffect: {
    perSlideOffset: 12,
    perSlideRotate: 8,
    rotate: true,
    slideShadows: true,
  },
  navigation: {
    nextEl: '.event-next',
    prevEl: '.event-prev',
  },
});
```

### Navigasi

Dua tombol panah bulat di bawah kartu:

```css
.event-prev, .event-next {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(200, 137, 42, 0.4);
  background: transparent;
  color: #C8892A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

Ikon: Lucide `arrow-left` dan `arrow-right`.

### Header Section

Mengikuti pola lokasi section — label centered dengan garis emas di kedua sisi:

```html
<div class="event-header">
  <div class="event-label-wrap">
    <span class="event-label">Momen & Cerita</span>
  </div>
  <h2 class="event-title">
    <span class="font-brand">Sudut Singgah</span> Event
  </h2>
</div>
```

CSS `.event-label-wrap::before` dan `::after` sebagai garis emas `32px × 1px`.

### Watermark Dekoratif

```css
.event-deco-text {
  position: absolute;
  bottom: -40px;
  right: -20px;
  font-family: var(--font-body);
  font-size: 180px;
  font-weight: 800;
  color: #C8892A;
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
}
```

### Mobile (max-width: 767px)

- Section padding: `80px 24px`
- Judul: `font-size: 32px`
- Polaroid width: mengikuti Swiper cards (otomatis responsif)
- Watermark: `font-size: 80px`

---

## 2. Lightbox

Popup yang muncul saat kartu Polaroid diklik.

### Struktur HTML

```html
<div class="lightbox" id="event-lightbox">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Tutup">
      <i data-lucide="x"></i>
    </button>
    <img class="lightbox-img" src="" alt="">
    <p class="lightbox-caption"></p>
  </div>
</div>
```

### Perilaku

- Klik kartu Polaroid → set `src` dan caption → tambah class `is-open`
- Tutup dengan: klik backdrop / klik ✕ / tekan ESC
- Animasi buka: backdrop `opacity 0→1`, gambar `scale(0.9) → scale(1)` + `opacity 0→1`
- Animasi tutup: reverse

### CSS

```css
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.lightbox.is-open {
  opacity: 1;
  visibility: visible;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
}

.lightbox-content {
  position: relative;
  z-index: 1;
  text-align: center;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.lightbox.is-open .lightbox-content {
  transform: scale(1);
}

.lightbox-img {
  max-width: 90vw;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 4px;
}

.lightbox-caption {
  font-family: var(--font-body);
  font-size: 16px;
  color: #F5F0E8;
  margin-top: 16px;
}

.lightbox-close {
  position: absolute;
  top: -48px;
  right: 0;
  width: 40px;
  height: 40px;
  color: #F5F0E8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: none;
}
```

### JS Logic (di main.js)

```js
// Klik polaroid → buka lightbox
document.querySelectorAll('.polaroid').forEach(function(card) {
  card.addEventListener('click', function() {
    var img = card.querySelector('img');
    var caption = card.querySelector('.polaroid-caption');
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption.textContent;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

// Tutup lightbox
function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

lightboxBackdrop.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});
```

---

## 3. Font Cleanup — Hapus Semua Grold

Semua referensi `font-family: 'Grold', serif` di `css/style.css` diganti:

| Selector CSS | Teks Saat Ini | Font Pengganti |
|---|---|---|
| `.about-title` | "Cerita di Balik Sudut Singgah" | `var(--font-body)`, tapi kata "Sudut Singgah" di HTML di-wrap `<span class="font-brand">` |
| `.about-quote` | Quote italic | `var(--font-body)` |
| `.about-deco-text` | Watermark "SINGGAH" | `var(--font-body)`, `font-weight: 800` |
| `.bento-overlay span` | Teks overlay galeri | `var(--font-body)`, `font-weight: 600` |
| `.lokasi-title` | "Temukan Kami" | `var(--font-body)`, `font-weight: 700` |
| `.lokasi-deco-text` | Watermark "BONDOWOSO" | `var(--font-body)`, `font-weight: 800` |
| `.footer-logo` | Huruf "S" | `var(--font-body)`, `font-weight: 700` |

### Perubahan HTML untuk Split Font

About title saat ini:
```html
<h2 class="about-title">Cerita di Balik<br>Sudut Singgah</h2>
```

Menjadi:
```html
<h2 class="about-title">Cerita di Balik<br><span class="font-brand">Sudut Singgah</span></h2>
```

### Utility Class Baru

```css
.font-brand {
  font-family: var(--font-brand);
}
```

---

## 4. CDN Baru

Ditambahkan di `index.html`:

```html
<!-- Di <head> -->
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Sebelum </body>, setelah Leaflet JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

---

## 5. File Yang Diubah

### `index.html`
- Tambah CDN Caveat + Swiper di `<head>`
- Tambah Swiper JS di scripts
- Ganti section `#explore` → `#event` (HTML baru)
- Tambah lightbox HTML (sebelum floating buttons)
- Update `<span class="font-brand">` di about-title
- Update navbar link `#explore` → `#event` (jika ada)

### `css/style.css`
- Hapus semua CSS `.explore*` lama (section 8)
- Tambah CSS baru: `.event-section`, `.polaroid`, `.event-nav`, `.event-deco-text`
- Tambah CSS lightbox: `.lightbox`, `.lightbox-backdrop`, `.lightbox-img`, `.lightbox-caption`
- Tambah utility: `.font-brand`
- Ganti semua `'Grold', serif` → `var(--font-body)` (7 tempat)
- Hapus responsive explore di breakpoints tablet/desktop

### `js/main.js`
- Hapus GSAP animation `.explore__label`, `.explore__title`, `.explore__item`
- Tambah Swiper init untuk `.event-swiper`
- Tambah GSAP animation untuk `.event-label`, `.event-title`, `.event-swiper`
- Tambah lightbox open/close logic

### `js/gallery.js`
- Hapus handler `.explore__item` tap (baris 31-48) — sudah tidak ada elemennya

---

## 6. Verifikasi

- Swiper cards effect berjalan dengan 4 slide
- Navigasi panah berfungsi (klik kiri/kanan)
- Drag/swipe berfungsi
- Klik kartu → lightbox terbuka dengan gambar + judul yang benar
- Lightbox tertutup via: klik backdrop, klik ✕, tekan ESC
- Font Grold tidak muncul di manapun di CSS
- Kata "Sudut Singgah" tampil dengan font Coffee Town
- Responsive mobile: section, kartu, dan lightbox tampil baik
- GSAP scroll animation berfungsi untuk section event
- Tidak ada error di console

---

## 7. Panduan Maintenance

### Menambah Event Baru

1. Taruh file gambar di `sudut-singgah/assets/images/` (format `.webp` direkomendasikan)
2. Buka `sudut-singgah/index.html`, cari section `#event`
3. Di dalam `<div class="swiper-wrapper">`, tambah slide baru:

```html
<div class="swiper-slide">
  <div class="polaroid">
    <div class="polaroid-img-wrap">
      <img src="assets/images/nama-file.webp" 
           alt="Deskripsi event" loading="lazy">
    </div>
    <div class="polaroid-caption">Judul Event</div>
  </div>
</div>
```

4. Selesai. Tidak perlu ubah JS atau CSS.

### Menghapus Event

Hapus `<div class="swiper-slide">...</div>` yang sesuai dari HTML. Minimum 2 slide agar efek cards terlihat baik.

### Mengganti Gambar Event

Ganti atribut `src` pada `<img>` dan update `alt` text-nya.
