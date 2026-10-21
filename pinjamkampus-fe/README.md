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

### Checkpoint 2 (Menit 90) - Selesai
- [x] **F4: Validasi dan Error**
  - Validasi form client sebelum submit (kolom kosong, tanggal tidak valid, slot selesai < slot mulai, jumlah > stok) dengan pesan pada `role="alert"`.
  - Pesan error server (400, 404, 409) ditampilkan apa adanya pada elemen ber-atribut `role="alert"`.
  - Penanganan server offline menampilkan pesan yang memuat kata "error" atau "gagal" tanpa membuat status `Memuat...` macet.
- [x] **F5: Tampilan Bentrok (HTTP 409)**
  - Peminjaman yang bentrok (kapasitas slot penuh) menampilkan pesan kesalahan dari server pada `role="alert"` tanpa mengosongkan isian form.
- [x] **F6: Ubah dan Hapus**
  - Tombol `Edit` pada item yang menahan slot (`aktif`, `diajukan`, `disetujui`) mengisi form dan mengubah tombol menjadi `Simpan perubahan` (`PUT /peminjaman/{id}`).
  - Tombol `Hapus` mengirim `DELETE /peminjaman/{id}` dan menyinkronkan daftar.
- [x] **F7: Aman dan Konsisten**
  - Tombol dinonaktifkan (`disabled`) saat proses async berlangsung untuk mencegah duplikasi request klik ganda.
  - Tampilan selalu sinkron dengan server setelah setiap aksi.
- [x] **Fitur Khas Persona C (Admin Himpunan)**
  - Status awal peminjaman adalah `diajukan`.
  - Tombol `Setujui`: Mengubah status `diajukan` menjadi `disetujui` (`POST /peminjaman/{id}/setujui`).
  - Tombol `Tolak`: Memunculkan kolom `Alasan penolakan` dan tombol `Kirim penolakan` di dalam `<li>` (`POST /peminjaman/{id}/tolak`).
  - Validasi alasan penolakan wajib dan maksimal 100 karakter (`role="alert"` jika kosong).
  - Menampilkan `Alasan: {alasan}` di dalam `<li>` berstatus `ditolak`.
  - Tombol `Selesaikan`: Mengubah status `disetujui` menjadi `selesai` (`POST /peminjaman/{id}/selesaikan`).
  - Tombol `Edit` hanya muncul untuk status `diajukan` dan `disetujui`, tidak ada untuk `ditolak` dan `selesai`.

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
