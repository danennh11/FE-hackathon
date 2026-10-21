import { requestApi } from './client'
import type { BuatSumberDayaInput, SumberDaya } from '../types'

export async function getSumberDaya(): Promise<SumberDaya[]> {
  return requestApi<SumberDaya[]>('/sumber-daya')
}

export async function getSumberDayaById(id: number): Promise<SumberDaya> {
  return requestApi<SumberDaya>(`/sumber-daya/${id}`)
}

export async function createSumberDaya(input: BuatSumberDayaInput): Promise<SumberDaya> {
  return requestApi<SumberDaya>('/sumber-daya', {
    method: 'POST',
    body: JSON.stringify({
      nama: input.nama.trim(),
      jenis: input.jenis,
      stok: Number(input.stok),
    }),
  })
}
