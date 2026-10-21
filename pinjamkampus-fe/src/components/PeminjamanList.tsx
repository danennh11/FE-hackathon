import type { Peminjaman, SumberDaya } from '../types'

interface PeminjamanListProps {
  items: Peminjaman[]
  sumberDayaList: SumberDaya[]
  onDetail: (id: number) => void
}

export function PeminjamanList({
  items,
  sumberDayaList,
  onDetail,
}: PeminjamanListProps) {
  const getSumberDayaNama = (id: number) => {
    const res = sumberDayaList.find((r) => r.id === id)
    return res ? res.nama : `Sumber Daya #${id}`
  }

  return (
    <div className="peminjaman-list-container">
      <h3>Daftar Peminjaman</h3>
      {items.length === 0 ? (
        <p>Tidak ada peminjaman.</p>
      ) : (
        <ul aria-label="Daftar peminjaman">
          {items.map((item) => (
            <li key={item.id} className={`peminjaman-item status-${item.status}`}>
              <div className="peminjaman-info">
                <strong>{item.peminjam}</strong> - {getSumberDayaNama(item.sumber_daya_id)} -{' '}
                <span>{item.tanggal}</span> -{' '}
                <span>Slot {item.slot_mulai}-{item.slot_selesai}</span> -{' '}
                <span>Jumlah: {item.jumlah}</span> -{' '}
                <span className="badge-status">{item.status}</span>
              </div>

              <div className="peminjaman-actions">
                <button type="button" onClick={() => onDetail(item.id)}>
                  Detail
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
