import type { SumberDaya } from '../types'

interface SumberDayaListProps {
  items: SumberDaya[]
}

export function SumberDayaList({ items }: SumberDayaListProps) {
  return (
    <div className="sumber-daya-list-container">
      <h3>Daftar Sumber Daya</h3>
      {items.length === 0 ? (
        <p>Belum ada sumber daya.</p>
      ) : (
        <ul aria-label="Daftar sumber daya">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.nama}</span> - <span>{item.jenis}</span> - <span>Stok: {item.stok}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
