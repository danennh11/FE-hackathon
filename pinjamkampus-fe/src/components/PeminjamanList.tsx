import { useState } from 'react'
import {
  deletePeminjaman,
  setujuiPeminjaman,
  tolakPeminjaman,
  selesaikanPeminjaman,
} from '../api/peminjaman'
import type { Peminjaman, SumberDaya } from '../types'

interface PeminjamanListProps {
  items: Peminjaman[]
  sumberDayaList: SumberDaya[]
  onDetail: (id: number) => void
  onEdit: (item: Peminjaman) => void
  onActionSuccess: () => void
}

export function PeminjamanList({
  items,
  sumberDayaList,
  onDetail,
  onEdit,
  onActionSuccess,
}: PeminjamanListProps) {
  const [rejectingId, setRejectingId] = useState<number | null>(null)
  const [alasanPenolakan, setAlasanPenolakan] = useState('')
  const [actionError, setActionError] = useState<{ id: number; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getSumberDayaNama = (id: number) => {
    const res = sumberDayaList.find((r) => r.id === id)
    return res ? res.nama : `Sumber Daya #${id}`
  }

  const handleSetujui = async (id: number) => {
    setActionError(null)
    setIsSubmitting(true)
    try {
      await setujuiPeminjaman(id)
      onActionSuccess()
    } catch (err) {
      if (err instanceof Error) {
        setActionError({ id, message: err.message })
      } else {
        setActionError({ id, message: 'Gagal menyetujui peminjaman.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenTolak = (id: number) => {
    setActionError(null)
    if (rejectingId === id) {
      setRejectingId(null)
      setAlasanPenolakan('')
    } else {
      setRejectingId(id)
      setAlasanPenolakan('')
    }
  }

  const handleKirimPenolakan = async (id: number) => {
    setActionError(null)
    const trimmed = alasanPenolakan.trim()
    if (!trimmed) {
      setActionError({ id, message: 'Alasan penolakan wajib diisi.' })
      return
    }
    if (trimmed.length > 100) {
      setActionError({ id, message: 'Alasan penolakan maksimal 100 karakter.' })
      return
    }

    setIsSubmitting(true)
    try {
      await tolakPeminjaman(id, trimmed)
      setRejectingId(null)
      setAlasanPenolakan('')
      onActionSuccess()
    } catch (err) {
      if (err instanceof Error) {
        setActionError({ id, message: err.message })
      } else {
        setActionError({ id, message: 'Gagal menolak peminjaman.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelesaikan = async (id: number) => {
    setActionError(null)
    setIsSubmitting(true)
    try {
      await selesaikanPeminjaman(id)
      onActionSuccess()
    } catch (err) {
      if (err instanceof Error) {
        setActionError({ id, message: err.message })
      } else {
        setActionError({ id, message: 'Gagal menyelesaikan peminjaman.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHapus = async (id: number) => {
    setActionError(null)
    setIsSubmitting(true)
    try {
      await deletePeminjaman(id)
      onActionSuccess()
    } catch (err) {
      if (err instanceof Error) {
        setActionError({ id, message: err.message })
      } else {
        setActionError({ id, message: 'Gagal menghapus peminjaman.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="peminjaman-list-container">
      <h3>Daftar Peminjaman</h3>
      {items.length === 0 ? (
        <p>Tidak ada peminjaman.</p>
      ) : (
        <ul aria-label="Daftar peminjaman">
          {items.map((item) => {
            const canEdit =
              item.status === 'aktif' ||
              item.status === 'diajukan' ||
              item.status === 'disetujui'

            return (
              <li key={item.id} className={`peminjaman-item status-${item.status}`}>
                <div className="peminjaman-info">
                  <strong>{item.peminjam}</strong> - {getSumberDayaNama(item.sumber_daya_id)} -{' '}
                  <span>{item.tanggal}</span> -{' '}
                  <span>Slot {item.slot_mulai}-{item.slot_selesai}</span> -{' '}
                  <span>Jumlah: {item.jumlah}</span> -{' '}
                  <span className="badge-status">{item.status}</span>
                </div>

                {item.status === 'ditolak' && (
                  <div className="peminjaman-alasan">
                    <strong>Alasan:</strong> {item.alasan}
                  </div>
                )}

                {actionError && actionError.id === item.id && (
                  <div role="alert" className="alert alert-error">
                    {actionError.message}
                  </div>
                )}

                <div className="peminjaman-actions">
                  <button
                    type="button"
                    onClick={() => onDetail(item.id)}
                    disabled={isSubmitting}
                  >
                    Detail
                  </button>

                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                  )}

                  {item.status === 'diajukan' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSetujui(item.id)}
                        disabled={isSubmitting}
                      >
                        Setujui
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenTolak(item.id)}
                        disabled={isSubmitting}
                      >
                        Tolak
                      </button>
                    </>
                  )}

                  {item.status === 'disetujui' && (
                    <button
                      type="button"
                      onClick={() => handleSelesaikan(item.id)}
                      disabled={isSubmitting}
                    >
                      Selesaikan
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleHapus(item.id)}
                    disabled={isSubmitting}
                  >
                    Hapus
                  </button>
                </div>

                {rejectingId === item.id && (
                  <div className="form-penolakan-inline">
                    <div>
                      <label htmlFor={`input-alasan-penolakan-${item.id}`}>
                        Alasan penolakan
                      </label>
                      <input
                        id={`input-alasan-penolakan-${item.id}`}
                        type="text"
                        maxLength={100}
                        value={alasanPenolakan}
                        onChange={(e) => setAlasanPenolakan(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleKirimPenolakan(item.id)}
                      disabled={isSubmitting}
                    >
                      Kirim penolakan
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
