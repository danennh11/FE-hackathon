import { useState } from 'react'
import { createPeminjaman, updatePeminjaman } from '../api/peminjaman'
import type { Peminjaman, SumberDaya } from '../types'

interface PeminjamanFormProps {
  sumberDayaList: SumberDaya[]
  editingItem: Peminjaman | null
  onSuccess: () => void
  onCancelEdit?: () => void
}

function isTanggalValid(s: string): boolean {
  if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const [y, m, d] = s.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  )
}

export function PeminjamanForm({
  sumberDayaList,
  editingItem,
  onSuccess,
  onCancelEdit,
}: PeminjamanFormProps) {
  const [sumberDayaId, setSumberDayaId] = useState<number | string>(
    editingItem ? editingItem.sumber_daya_id : ''
  )
  const [peminjam, setPeminjam] = useState(editingItem ? editingItem.peminjam : '')
  const [tanggal, setTanggal] = useState(editingItem ? editingItem.tanggal : '')
  const [slotMulai, setSlotMulai] = useState<number>(editingItem ? editingItem.slot_mulai : 1)
  const [slotSelesai, setSlotSelesai] = useState<number>(editingItem ? editingItem.slot_selesai : 1)
  const [jumlah, setJumlah] = useState<number | string>(editingItem ? editingItem.jumlah : 1)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validasi client (F4)
    if (!sumberDayaId) {
      setError('Sumber daya harus dipilih.')
      return
    }

    const trimmedPeminjam = peminjam.trim()
    if (!trimmedPeminjam) {
      setError('Peminjam wajib diisi.')
      return
    }
    if (trimmedPeminjam.length > 50) {
      setError('Peminjam maksimal 50 karakter.')
      return
    }

    if (!isTanggalValid(tanggal)) {
      setError('Tanggal harus berupa tanggal yang valid.')
      return
    }

    const mulai = Number(slotMulai)
    const selesai = Number(slotSelesai)
    if (mulai < 1 || selesai > 8 || mulai > selesai) {
      setError('Slot harus antara 1 sampai 8 dan slot selesai tidak boleh lebih kecil dari slot mulai.')
      return
    }

    const selectedRes = sumberDayaList.find((r) => r.id === Number(sumberDayaId))
    const stokMax = selectedRes ? selectedRes.stok : 1
    const jumlahNum = Number(jumlah)
    if (isNaN(jumlahNum) || jumlahNum < 1 || (selectedRes && jumlahNum > stokMax)) {
      setError(`Jumlah harus berupa bilangan bulat antara 1 dan ${stokMax}.`)
      return
    }

    setIsSubmitting(true)
    try {
      if (editingItem) {
        await updatePeminjaman(editingItem.id, {
          sumber_daya_id: Number(sumberDayaId),
          peminjam: trimmedPeminjam,
          tanggal,
          slot_mulai: mulai,
          slot_selesai: selesai,
          jumlah: jumlahNum,
        })
      } else {
        await createPeminjaman({
          sumber_daya_id: Number(sumberDayaId),
          peminjam: trimmedPeminjam,
          tanggal,
          slot_mulai: mulai,
          slot_selesai: selesai,
          jumlah: jumlahNum,
        })
      }

      // Jika berhasil, form dikosongkan dan kembali ke mode buat
      setSumberDayaId('')
      setPeminjam('')
      setTanggal('')
      setSlotMulai(1)
      setSlotSelesai(1)
      setJumlah(1)
      setError(null)
      onSuccess()
    } catch (err) {
      // F4 & F5: Pesan error dari server (400, 404, 409) ditampilkan pada role="alert"
      // Isian form TIDAK dikosongkan
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi error saat memproses peminjaman.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="peminjaman-form">
      <h3>{editingItem ? 'Edit Peminjaman' : 'Form Peminjaman'}</h3>

      {error && (
        <div role="alert" className="alert alert-error">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="select-sumber-daya">Sumber daya</label>
        <select
          id="select-sumber-daya"
          value={sumberDayaId}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : Number(e.target.value)
            setSumberDayaId(val)
          }}
          disabled={isSubmitting}
        >
          <option value="">Pilih Sumber Daya</option>
          {sumberDayaList.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="input-peminjam">Peminjam</label>
        <input
          id="input-peminjam"
          type="text"
          maxLength={50}
          value={peminjam}
          onChange={(e) => setPeminjam(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="input-tanggal">Tanggal</label>
        <input
          id="input-tanggal"
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="select-slot-mulai">Slot mulai</label>
        <select
          id="select-slot-mulai"
          value={slotMulai}
          onChange={(e) => setSlotMulai(Number(e.target.value))}
          disabled={isSubmitting}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="select-slot-selesai">Slot selesai</label>
        <select
          id="select-slot-selesai"
          value={slotSelesai}
          onChange={(e) => setSlotSelesai(Number(e.target.value))}
          disabled={isSubmitting}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="input-jumlah">Jumlah</label>
        <input
          id="input-jumlah"
          type="number"
          min={1}
          value={jumlah}
          onChange={(e) =>
            setJumlah(e.target.value === '' ? '' : Number(e.target.value))
          }
          disabled={isSubmitting}
        />
      </div>

      <div className="button-group">
        <button type="submit" disabled={isSubmitting}>
          {editingItem ? 'Simpan perubahan' : 'Simpan peminjaman'}
        </button>

        {editingItem && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={isSubmitting}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}
