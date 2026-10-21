import type { PeminjamanFilterParams, SumberDaya } from '../types'

interface PeminjamanFilterProps {
  sumberDayaList: SumberDaya[]
  filter: PeminjamanFilterParams
  onFilterChange: (newFilter: PeminjamanFilterParams) => void
}

export function PeminjamanFilter({
  sumberDayaList,
  filter,
  onFilterChange,
}: PeminjamanFilterProps) {
  return (
    <div className="peminjaman-filter">
      <h3>Filter Peminjaman</h3>
      <div>
        <label htmlFor="filter-sumber-daya">Filter sumber daya</label>
        <select
          id="filter-sumber-daya"
          value={filter.sumber_daya_id ?? ''}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              sumber_daya_id: e.target.value === '' ? '' : Number(e.target.value),
            })
          }
        >
          <option value="">Semua</option>
          {sumberDayaList.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-tanggal">Filter tanggal</label>
        <input
          id="filter-tanggal"
          type="date"
          value={filter.tanggal ?? ''}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              tanggal: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label htmlFor="filter-status">Filter status</label>
        <select
          id="filter-status"
          value={filter.status ?? ''}
          onChange={(e) =>
            onFilterChange({
              ...filter,
              status: e.target.value,
            })
          }
        >
          <option value="">Semua</option>
          <option value="diajukan">diajukan</option>
          <option value="disetujui">disetujui</option>
          <option value="ditolak">ditolak</option>
          <option value="selesai">selesai</option>
          <option value="dibatalkan">dibatalkan</option>
        </select>
      </div>
    </div>
  )
}
