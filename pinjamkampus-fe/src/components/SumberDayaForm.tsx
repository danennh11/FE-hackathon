import { useState } from 'react'
import { createSumberDaya } from '../api/sumberDaya'
import type { JenisSumberDaya } from '../types'

interface SumberDayaFormProps {
  onSuccess: () => void
}

export function SumberDayaForm({ onSuccess }: SumberDayaFormProps) {
  const [nama, setNama] = useState('')
  const [jenis, setJenis] = useState<JenisSumberDaya>('ruang')
  const [stok, setStok] = useState<number | string>(1)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedNama = nama.trim()
    if (!trimmedNama) {
      setError('Nama sumber daya wajib diisi.')
      return
    }
    if (trimmedNama.length > 50) {
      setError('Nama sumber daya maksimal 50 karakter.')
      return
    }

    const stokNum = Number(stok)
    if (isNaN(stokNum) || stokNum < 1 || !Number.isInteger(stokNum)) {
      setError('Stok harus berupa bilangan bulat minimal 1.')
      return
    }

    setIsSubmitting(true)
    try {
      await createSumberDaya({
        nama: trimmedNama,
        jenis,
        stok: stokNum,
      })
      // Clear form on success
      setNama('')
      setJenis('ruang')
      setStok(1)
      onSuccess()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi error saat menyimpan sumber daya.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sumber-daya-form">
      <h3>Tambah Sumber Daya</h3>

      {error && (
        <div role="alert" className="alert alert-error">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="input-nama-sumber-daya">Nama sumber daya</label>
        <input
          id="input-nama-sumber-daya"
          type="text"
          value={nama}
          maxLength={50}
          onChange={(e) => setNama(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="select-jenis-sumber-daya">Jenis</label>
        <select
          id="select-jenis-sumber-daya"
          value={jenis}
          onChange={(e) => setJenis(e.target.value as JenisSumberDaya)}
          disabled={isSubmitting}
        >
          <option value="ruang">ruang</option>
          <option value="alat">alat</option>
        </select>
      </div>

      <div>
        <label htmlFor="input-stok-sumber-daya">Stok</label>
        <input
          id="input-stok-sumber-daya"
          type="number"
          min={1}
          value={stok}
          onChange={(e) => setStok(e.target.value === '' ? '' : Number(e.target.value))}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        Simpan sumber daya
      </button>
    </form>
  )
}
