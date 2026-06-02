# AUDIT REPORT — Sudut Singgah
Tanggal audit: 02 Juni 2026

## Ringkasan Eksekutif
Proyek Sudut Singgah secara umum memiliki struktur yang cukup baik sebagai Single Page Application (SPA) statis. Namun, ditemukan sejumlah masalah yang berfokus pada ketidaksesuaian selector antara HTML dan JavaScript yang merusak beberapa animasi GSAP. Terdapat juga banyak inkonsistensi dalam penulisan CSS (penggunaan *hardcode* hex color dan metodologi penamaan class), ukuran target sentuh di bawah standar pada versi mobile, serta beberapa *dead code*.

## Skor Per Kategori
| Kategori | Kondisi | Jumlah Temuan |
|---|---|---|
| Fungsionalitas | Buruk | 4 |
| Responsif & Mobile | Cukup | 3 |
| Desain & UI | Kurang | 2 |
| Performa | Baik | 2 |
| Aksesibilitas | Cukup | 2 |
| Kode & Konsistensi | Kurang | 3 |

## Temuan Detail

### 🔴 KRITIS — Harus Diperbaiki

- **File**: `js/main.js`
- **Lokasi**: Baris 90 (`gsap.from('.about__image-wrapper', ...)`)
- **Masalah**: Mismatch selector. Di `js/main.js` ditulis `.about__image-wrapper`, namun di `index.html` class yang digunakan adalah `.about-image-wrapper`.
- **Dampak**: Animasi scroll GSAP untuk gambar di bagian "Tentang Kami" gagal dieksekusi (elemen tidak ditemukan).

- **File**: `js/main.js`
- **Lokasi**: Baris 98 (`gsap.from('.about__text .section__label, .about__text .section__title, .about__text .about__desc', ...)`)
- **Masalah**: Mismatch selector. Class `.about__text` maupun elemen bersarang lainnya tidak ada di `index.html` (HTML menggunakan `.about-content`, `.about-label`, `.about-title`, `.about-desc`).
- **Dampak**: Teks di section "Tentang Kami" tidak muncul atau kehilangan efek animasinya sama sekali karena ScrollTrigger gagal menargetkan elemen.

- **File**: `js/main.js`
- **Lokasi**: Baris 126 & 134 (`gsap.from('.gallery__title')`, `gsap.from('.gallery__item')`, `trigger: '.gallery__grid'`)
- **Masalah**: Mismatch selector GSAP untuk galeri. Di `index.html` class yang digunakan adalah `.gallery-bento` dan `.bento-item`, tidak ada `.gallery__grid` maupun `.gallery__item`.
- **Dampak**: Animasi GSAP ScrollTrigger untuk bagian Galeri tidak berfungsi.

### 🟡 SEDANG — Perlu Diperbaiki

- **File**: `css/style.css`
- **Lokasi**: Baris 1189 (`.lightbox-close`) & Baris 1506 (`.footer-social-btn`)
- **Masalah**: Ukuran tombol sentuh (touch target) terlalu kecil untuk standar mobile (hanya 40x40px).
- **Dampak**: Pengguna mobile akan kesulitan menyentuh tombol tutup lightbox dan ikon media sosial, menurunkan kualitas User Experience (UX). Mengingat standar minimal *touch target* adalah 44x44px.

- **File**: `css/style.css`
- **Lokasi**: Tersebar di berbagai lokasi (contoh: baris 331, 385, 403, dll)
- **Masalah**: Banyak nilai warna yang di-hardcode (misal: `#1C1410`, `#C8892A`, `#F5F0E8`) dan RGB rgba langsung alih-alih menggunakan CSS variabel yang telah disediakan di awalan file (`var(--color-arang)`, `var(--color-emas)`).
- **Dampak**: Inkonsistensi desain dan menyulitkan jika nantinya ada pembaruan tema warna utama.

- **File**: `index.html`
- **Lokasi**: Baris 374 (Link Google Maps di section Lokasi)
- **Masalah**: Menggunakan `target="_blank"` namun tidak disertai `rel="noopener noreferrer"`.
- **Dampak**: Terdapat celah kerentanan *security* ringan (tab nabbing) dan sedikit berdampak pada evaluasi performa *best practice*.

- **File**: `css/style.css`
- **Lokasi**: Tipografi absolut (contoh: `.hero-title` `80px`, `.about-deco-text` `180px`)
- **Masalah**: Font size tidak menggunakan ukuran relatif seperti `rem`, `em`, atau `clamp()`. Meski ada media query untuk mobile, penggunaannya tetap *fixed pixel*.
- **Dampak**: Tampilan bisa kurang dinamis saat dirender di rentang resolusi *tablet* ke atas atau kurang ramah aksesibilitas bila pengguna membesarkan pengaturan *font size* di peramban mereka.

### 🟢 MINOR — Disarankan Diperbaiki

- **File**: `css/style.css` dan `index.html`
- **Lokasi**: Seluruh dokumen
- **Masalah**: Metodologi penamaan class CSS tidak konsisten. Ada yang menggunakan metodologi BEM (`.menu__card-image`), tetapi ada yang menggunakan gaya *flat-descriptive* (`.about-image-wrapper`, `.hero-title`).
- **Dampak**: Kode terasa kurang rapi atau membingungkan bagi developer lain yang bekerja di proyek ini karena tiadanya standar tata nama komponen.

- **File**: `js/main.js` & `css/style.css`
- **Lokasi**: Baris 22-41 (`main.js`) dan Baris 11-16 (`style.css`)
- **Masalah**: Terdapat banyak *dead code* (kode yang hanya di-*comment out*).
- **Dampak**: Membuat file membengkak tanpa fungsi yang jelas. (Khususnya skrip inisiasi Lenis dan font `Lorestta`).

- **File**: `index.html`
- **Lokasi**: Baris 63
- **Masalah**: Memuat skrip Phosphor Icons secara sinkron di `head`.
- **Dampak**: Script ini bisa memblokir proses parsing awal halaman (render-blocking), sebaiknya di-load menjelang `</body>` atau diberi atribut `defer`.

## Prioritas Perbaikan

1. **Perbaikan Mismatch Selector (Kritis)**: Segera sinkronkan nama class di dalam `js/main.js` dengan yang ada di `index.html` (terutama pada blok animasi `About` dan `Gallery`) agar animasi halaman dapat berjalan semestinya dan tata letak tidak rusak.
2. **Perbaikan UX Mobile (Sedang)**: Ubah ukuran elemen-elemen tombol interaktif minimal menjadi 44x44px.
3. **Penerapan Rel atribut (Sedang)**: Tambahkan atribut `rel="noopener noreferrer"` pada semua link eksternal.
4. **Refaktor CSS (Sedang & Minor)**: Ganti warna-warna *hardcoded* dengan CSS variabel yang sudah ada dan hapus *dead code* untuk menjaga kebersihan pangkalan kode.
5. **Modernisasi Responsivitas (Minor)**: Implementasikan `clamp()` untuk tipografi yang lebih fluida.
