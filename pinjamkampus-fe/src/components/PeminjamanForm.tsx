import { useState } from 'react'
import { createPeminjaman } from '../api/peminjaman'
import type { SumberDaya } from '../types'

interface PeminjamanFormProps {
  sumberDayaList: SumberDaya[]
  onSuccess: () => void
}

export function PeminjamanForm({
  sumberDayaList,
  onSuccess,
}: PeminjamanFormProps) {
  const [sumberDayaId, setSumberDayaId] = useState<number | string>('')
  const [peminjam, setPeminjam] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [slotMulai, setSlotMulai] = useState<number>(1)
  const [slotSelesai, setSlotSelesai] = useState<number>(1)
  const [jumlah, setJumlah] = useState<number | string>(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sumberDayaId || !peminjam.trim() || !tanggal) {
      return
    }

    try {
      await createPeminjaman({
        sumber_daya_id: Number(sumberDayaId),
        peminjam: peminjam.trim(),
        tanggal,
        slot_mulai: Number(slotMulai),
        slot_selesai: Number(slotSelesai),
        jumlah: Number(jumlah),
      })

      // Reset form on success
      setSumberDayaId('')
      setPeminjam('')
      setTanggal('')
      setSlotMulai(1)
      setSlotSelesai(1)
      setJumlah(1)
      onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="peminjaman-form">
      <h3>Form Peminjaman</h3>

      <div>
        <label htmlFor="select-sumber-daya">Sumber daya</label>
        <select
          id="select-sumber-daya"
          value={sumberDayaId}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : Number(e.target.value)
            setSumberDayaId(val)
          }}
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
        />
      </div>

      <div>
        <label htmlFor="input-tanggal">Tanggal</label>
        <input
          id="input-tanggal"
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="select-slot-mulai">Slot mulai</label>
        <select
          id="select-slot-mulai"
          value={slotMulai}
          onChange={(e) => setSlotMulai(Number(e.target.value))}
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
        />
      </div>

      <button type="submit">Simpan peminjaman</button>
    </form>
  )
}
