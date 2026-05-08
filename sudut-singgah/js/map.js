/* ================================
   MAP.JS
   - Leaflet map inisialisasi
   - Custom marker warna emas
   ================================ */

(function () {
  'use strict';

  var mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  function init() {
    if (typeof L === 'undefined') {
      setTimeout(init, 100);
      return;
    }

    var coords = [-7.9480666, 113.9674607];

    var map = L.map('map', {
      scrollWheelZoom: false,
    }).setView(coords, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    var icon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background:#C8892A;width:16px;height:16px;border-radius:50%;border:3px solid #F5F0E8;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker(coords, { icon: icon }).addTo(map)
      .bindPopup('<strong>Sudut Singgah</strong><br>sudut kecil untuk jeda')
      .openPopup();

    // Fix map rendering saat tab/scroll lazy load
    setTimeout(function () { map.invalidateSize(); }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
