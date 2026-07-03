# @craftthingy-digital-innovation/cty-keyboard-navigation-table-web

Bilingual documentation: [Bahasa Indonesia](#bahasa-indonesia) | [English](#english)

---

## Bahasa Indonesia

Library client-side JavaScript modular untuk menangani navigasi sel tabel inline-cell editor menggunakan tombol panah keyboard (ArrowUp, ArrowDown), Tab, dan Enter (gaya spreadsheet Excel).

Menggunakan metode **event delegation** di elemen parent `<table>` sehingga secara otomatis mendukung baris dinamis yang baru ditambahkan/dihapus tanpa memerlukan inisialisasi ulang.

### Fitur Utama
- ⌨️ **Navigasi Keyboard Excel:** Mendukung ArrowUp, ArrowDown, Tab, dan Enter untuk perpindahan sel fokus secara efisien.
- ⚡ **Event Delegation:** Ringan dan kompatibel dengan penambahan baris DOM asinkron.
- 🛠 **Custom Callback Hooks:** Callback saat Enter ditekan di baris terakhir untuk membuat baris baru secara otomatis.

### Instalasi
```bash
npm install @craftthingy-digital-innovation/cty-keyboard-navigation-table-web
```

### Cara Penggunaan
```javascript
import { KeyboardNavTable } from '@craftthingy-digital-innovation/cty-keyboard-navigation-table-web';

const navTable = new KeyboardNavTable({
  tableElement: document.getElementById('my-table'),
  inputSelector: '.cell-input', // Selector input sel tabel
  onEnterKey: (e, { colIdx, rowEl, nextRow }) => {
    e.preventDefault();
    if (nextRow) {
      const nextInput = nextRow.querySelectorAll('.cell-input')[colIdx];
      if (nextInput) nextInput.focus();
    } else {
      // Tambah baris baru jika menekan Enter di baris terakhir
      addNewRow(colIdx);
    }
  },
  onTabLast: (e, { rowEl, nextRow }) => {
    if (!nextRow) {
      e.preventDefault();
      // Tambah baris baru jika Tab ditekan di sel paling pojok kanan bawah
      addNewRow(0);
    }
  }
});

// Inisialisasi listener
navTable.initialize();

// Hancurkan listener jika komponen dilepas
navTable.destroy();
```

---

## English

A modular client-side JavaScript library to manage inline-cell table editors via keyboard navigation (ArrowUp, ArrowDown, Tab, Enter - Excel style).

Employs **event delegation** on the parent `<table>` element, meaning it automatically supports dynamically added or deleted table rows without requiring listener reinstantiation.

### Key Features
- ⌨️ **Spreadsheet-style Navigation:** Seamless support for Enter, ArrowUp, ArrowDown, and Tab focus shifts.
- ⚡ **Event Delegation:** High-performance, lightweight listener footprint compatible with dynamic DOM bindings.
- 🛠 **Custom Callback Hooks:** Hook in new row creation when Tab or Enter is pressed on the final columns.

### Installation
```bash
npm install @craftthingy-digital-innovation/cty-keyboard-navigation-table-web
```

### Usage
```javascript
import { KeyboardNavTable } from '@craftthingy-digital-innovation/cty-keyboard-navigation-table-web';

const navTable = new KeyboardNavTable({
  tableElement: document.getElementById('my-table'),
  inputSelector: '.cell-input',
  onEnterKey: (e, { colIdx, nextRow }) => {
    e.preventDefault();
    if (nextRow) {
      nextRow.querySelectorAll('.cell-input')[colIdx].focus();
    } else {
      addNewRow();
    }
  }
});

navTable.initialize();
navTable.destroy();
```

## License
Licensed under Public-Source Corporate Royalty License (PSCRL). See [LICENSE](./LICENSE) for details.
