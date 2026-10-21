# AI-LOG - Log Penggunaan AI (PinjamKampus)

Dokumen ini mencatat setiap penggunaan AI yang menghasilkan kode selama pengerjaan ETS Frontend PinjamKampus, sesuai ketentuan pada dokumen spesifikasi.

---

## 1. Modul API Client & Konfigurasi Request (F1 - F3)
- **Prompt:** "buatkan modul api client fetch TypeScript dengan custom ApiError yang memproses status 204 dan menangani error koneksi jaringan"
- **Dipakai:** `src/api/client.ts` (`requestApi` dan kelas `ApiError`).
- **Diubah / Diperbaiki:** 
  - AI awalnya menggunakan tipe `any` pada data respons dan generic `Error`.
  - Diperbaiki dengan type-safety (`unknown`), memastikan status 204 tidak mencoba melakukan `res.json()`, serta memastikan pesan kegagalan koneksi memuat kata `"error"` atau `"gagal"` sesuai kontrak ETS.

---

## 2. Pembuatan Komponen Form Sumber Daya & Validasi (F1)
- **Prompt:** "buat form sumber daya di React TypeScript dengan label Nama sumber daya, Jenis (ruang/alat), Stok, dan tombol Simpan sumber daya"
- **Dipakai:** `src/components/SumberDayaForm.tsx`.
- **Diubah / Diperbaiki:**
  - AI menyertakan CSS inline yang tidak diperlukan.
  - Diperbaiki dengan memastikan atribut `htmlFor` pada `<label>` terhubung persis ke `id` input/select, dan form hanya dikosongkan setelah `await createSumberDaya(...)` sukses.

---

## 3. Komponen Form Peminjaman & Komposisi State (F2)
- **Prompt:** "buat form peminjaman React dengan input select sumber daya, teks peminjam, tanggal, select slot 1-8, dan jumlah"
- **Dipakai:** `src/components/PeminjamanForm.tsx`.
- **Diubah / Diperbaiki:**
  - AI awalnya menggunakan input text biasa untuk slot.
  - Diubah menggunakan elemen `<select>` dengan opsi 1 sampai 8 sesuai kontrak tampilan.
  - Memastikan angka dikirim sebagai number (`Number(...)`) dan teks di-trim (`.trim()`).

---

## 4. Filter dan Tampilan Detail Peminjaman (F3)
- **Prompt:** "buat filter query string untuk sumber daya, tanggal, status dan komponen detail peminjaman"
- **Dipakai:** `src/components/PeminjamanFilter.tsx`, `src/components/PeminjamanDetail.tsx`, dan `src/api/peminjaman.ts`.
- **Diubah / Diperbaiki:**
  - AI awalnya melakukan filtering di client side (*array filter*).
  - Diubah agar parameter dikirimkan ke server melalui URL query parameters (`?sumber_daya_id=&tanggal=&status=`) sesuai spesifikasi F3.
  - Area detail dipastikan memiliki atribut `aria-label="Detail peminjaman"`.

---

## 5. Penanganan Error, Bentrok 409, dan Modus Edit (F4, F5, F6, F7)
- **Prompt:** "tampilkan pesan error 409 dari backend tanpa mengosongkan form isian di React dan ubah teks tombol jadi Simpan perubahan saat edit"
- **Dipakai:** `src/components/PeminjamanForm.tsx`.
- **Diubah / Diperbaiki:**
  - AI awalnya me-reset state form di awal `handleSubmit` sebelum pemanggilan `await`.
  - Kode diubah agar pembersihan form hanya terjadi setelah respons sukses diterima. Jika server mengembalikan 409/400, isian form tetap utuh dan error ditampilkan pada `role="alert"`.
  - Tombol diberi atribut `disabled={isSubmitting}` untuk mencegah klik ganda cepat (F7).

---

## 6. Alur Persetujuan Persona C (Setujui, Tolak Inline, Selesaikan)
- **Prompt:** "buat aksi tombol Setujui, Tolak dengan form inline alasan di dalam li, dan Selesaikan untuk status persona C di React"
- **Dipakai:** `src/components/PeminjamanList.tsx` dan `src/api/peminjaman.ts`.
- **Diubah / Diperbaiki:**
  - AI awalnya menggunakan modal popup dan `window.prompt` untuk meminta alasan penolakan. Sesuai spesifikasi, `window.prompt` dilarang dan form penolakan harus berada tepat di dalam elemen `<li>`.
  - Diubah menjadi form penolakan inline bersyarat di dalam `<li>` dengan label `Alasan penolakan` dan tombol `Kirim penolakan`.
  - Menambahkan validasi wajib dan maksimal 100 karakter dengan alert sebelum `POST /peminjaman/{id}/tolak` dikirim.
  - Tombol `Edit` dibatasi hanya muncul untuk status `diajukan` dan `disetujui`, serta disembunyikan untuk status `ditolak` dan `selesai`.
