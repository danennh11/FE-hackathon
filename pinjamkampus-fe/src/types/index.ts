export type JenisSumberDaya = 'ruang' | 'alat'

export interface SumberDaya {
  id: number
  nama: string
  jenis: JenisSumberDaya
  stok: number
}

export interface BuatSumberDayaInput {
  nama: string
  jenis: JenisSumberDaya
  stok: number
}

export type StatusPeminjaman =
  | 'aktif'
  | 'diajukan'
  | 'disetujui'
  | 'ditolak'
  | 'selesai'
  | 'dibatalkan'

export interface Peminjaman {
  id: number
  sumber_daya_id: number
  peminjam: string
  tanggal: string
  slot_mulai: number
  slot_selesai: number
  jumlah: number
  status: StatusPeminjaman
  alasan?: string
}

export interface BuatPeminjamanInput {
  sumber_daya_id: number
  peminjam: string
  tanggal: string
  slot_mulai: number
  slot_selesai: number
  jumlah: number
}

export interface PeminjamanFilterParams {
  sumber_daya_id?: number | string
  tanggal?: string
  status?: string
}
