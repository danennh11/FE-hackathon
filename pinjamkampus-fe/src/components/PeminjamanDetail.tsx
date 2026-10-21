import type { Peminjaman, SumberDaya } from '../types'

interface PeminjamanDetailProps {
  peminjaman: Peminjaman | null
  sumberDayaList: SumberDaya[]
  onClose: () => void
}

export function PeminjamanDetail({
  peminjaman,
  sumberDayaList,
  onClose,
}: PeminjamanDetailProps) {
  if (!peminjaman) return null

  const res = sumberDayaList.find((r) => r.id === peminjaman.sumber_daya_id)

  return (
    <section aria-label="Detail peminjaman" className="detail-peminjaman-card">
      <div className="detail-header">
        <h3>Detail Peminjaman #{peminjaman.id}</h3>
        <button type="button" onClick={onClose}>
          Tutup
        </button>
      </div>

      <div className="detail-content">
        <p>
          <strong>ID:</strong> {peminjaman.id}
        </p>
        <p>
          <strong>Peminjam:</strong> {peminjaman.peminjam}
        </p>
        <p>
          <strong>Sumber Daya:</strong> {res ? `${res.nama} (${res.jenis})` : `#${peminjaman.sumber_daya_id}`}
        </p>
        <p>
          <strong>Tanggal:</strong> {peminjaman.tanggal}
        </p>
        <p>
          <strong>Slot:</strong> Slot {peminjaman.slot_mulai}-{peminjaman.slot_selesai}
        </p>
        <p>
          <strong>Jumlah:</strong> {peminjaman.jumlah}
        </p>
        <p>
          <strong>Status:</strong> {peminjaman.status}
        </p>
        {peminjaman.alasan && (
          <p>
            <strong>Alasan:</strong> {peminjaman.alasan}
          </p>
        )}
      </div>
    </section>
  )
}
