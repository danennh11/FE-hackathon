import { requestApi } from './client'
import type {
  BuatPeminjamanInput,
  Peminjaman,
  PeminjamanFilterParams,
} from '../types'

export async function getPeminjaman(
  params?: PeminjamanFilterParams
): Promise<Peminjaman[]> {
  const query = new URLSearchParams()
  if (params?.sumber_daya_id !== undefined && params?.sumber_daya_id !== '') {
    query.set('sumber_daya_id', String(params.sumber_daya_id))
  }
  if (params?.tanggal) {
    query.set('tanggal', params.tanggal)
  }
  if (params?.status) {
    query.set('status', params.status)
  }

  const qs = query.toString() ? `?${query.toString()}` : ''
  return requestApi<Peminjaman[]>(`/peminjaman${qs}`)
}

export async function getPeminjamanById(id: number): Promise<Peminjaman> {
  return requestApi<Peminjaman>(`/peminjaman/${id}`)
}

export async function createPeminjaman(
  input: BuatPeminjamanInput
): Promise<Peminjaman> {
  return requestApi<Peminjaman>('/peminjaman', {
    method: 'POST',
    body: JSON.stringify({
      sumber_daya_id: Number(input.sumber_daya_id),
      peminjam: input.peminjam.trim(),
      tanggal: input.tanggal,
      slot_mulai: Number(input.slot_mulai),
      slot_selesai: Number(input.slot_selesai),
      jumlah: Number(input.jumlah),
    }),
  })
}
