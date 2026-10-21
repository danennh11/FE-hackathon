# PinjamKampus - Aplikasi Manajemen Peminjaman Ruang & Alat Kampus

ETS Pemrograman Frontend.

## Identitas Mahasiswa
- **Nama:** Danendra Nayottama
- **NRP:** 5053241032
- **Persona:** Persona C (Admin Himpunan)

---

## Status Pengerjaan

### Checkpoint 1 (Menit 45) - Selesai
- [x] Inisialisasi repository & project Vite + React + TypeScript
- [x] **F1: Kelola Sumber Daya**
  - Form penambahan sumber daya (`Nama sumber daya`, `Jenis`, `Stok`, tombol `Simpan sumber daya`)
  - Menampilkan daftar sumber daya (`<ul aria-label="Daftar sumber daya">`)
- [x] **F2: Buat Peminjaman**
  - Form peminjaman (`Sumber daya`, `Peminjam`, `Tanggal`, `Slot mulai`, `Slot selesai`, `Jumlah`, tombol `Simpan peminjaman`)
  - Penambahan data langsung memperbarui daftar peminjaman
- [x] **F3: Lihat Peminjaman**
  - Filter interaktif (`Filter sumber daya`, `Filter tanggal`, `Filter status`)
  - Daftar peminjaman (`<ul aria-label="Daftar peminjaman">`) dengan format `Slot X-Y`
  - Tombol `Detail` dan panel detail (`<section aria-label="Detail peminjaman">`)

### Cara Menjalankan
1. Jalankan backend:
   ```bash
   node server.mjs --persona C
   ```
2. Jalankan frontend:
   ```bash
   cd pinjamkampus-fe
   npm run dev
   ```
