import { useState, useEffect, useCallback } from 'react'
import { getSumberDaya } from './api/sumberDaya'
import { getPeminjaman, getPeminjamanById } from './api/peminjaman'
import { SumberDayaForm } from './components/SumberDayaForm'
import { SumberDayaList } from './components/SumberDayaList'
import { PeminjamanForm } from './components/PeminjamanForm'
import { PeminjamanFilter } from './components/PeminjamanFilter'
import { PeminjamanList } from './components/PeminjamanList'
import { PeminjamanDetail } from './components/PeminjamanDetail'
import type {
  SumberDaya,
  Peminjaman,
  PeminjamanFilterParams,
} from './types'
import './App.css'

export default function App() {
  const [sumberDayaList, setSumberDayaList] = useState<SumberDaya[]>([])
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([])
  const [filter, setFilter] = useState<PeminjamanFilterParams>({
    sumber_daya_id: '',
    tanggal: '',
    status: '',
  })
  const [selectedDetail, setSelectedDetail] = useState<Peminjaman | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)

  // Fetch Sumber Daya list
  const fetchSumberDaya = useCallback(async () => {
    try {
      const res = await getSumberDaya()
      setSumberDayaList(res)
    } catch (err) {
      console.error(err)
    }
  }, [])

  // Fetch Peminjaman list with current filter
  const fetchPeminjaman = useCallback(async (currentFilter: PeminjamanFilterParams) => {
    try {
      const items = await getPeminjaman(currentFilter)
      setPeminjamanList(items)
    } catch (err) {
      console.error(err)
    }
  }, [])

  // Initial load
  useEffect(() => {
    let mounted = true
    const init = async () => {
      setInitialLoading(true)
      try {
        const [res, items] = await Promise.all([
          getSumberDaya(),
          getPeminjaman({ sumber_daya_id: '', tanggal: '', status: '' }),
        ])
        if (mounted) {
          setSumberDayaList(res)
          setPeminjamanList(items)
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) {
          setInitialLoading(false)
        }
      }
    }

    init()
    return () => {
      mounted = false
    }
  }, [])

  // Handle filter changes
  const handleFilterChange = (newFilter: PeminjamanFilterParams) => {
    setFilter(newFilter)
    fetchPeminjaman(newFilter)
  }

  // Handle Detail view
  const handleDetail = async (id: number) => {
    try {
      const detail = await getPeminjamanById(id)
      setSelectedDetail(detail)
    } catch (err) {
      console.error(err)
    }
  }

  // Refresh after form submission
  const handleFormSuccess = () => {
    fetchPeminjaman(filter)
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>PinjamKampus</h1>
        <p className="app-subtitle">Persona C - Admin Himpunan</p>
      </header>

      {initialLoading && (
        <div className="loading-state">
          <p>Memuat...</p>
        </div>
      )}

      {!initialLoading && (
        <main className="main-content">
          <section className="section-sumber-daya">
            <h2>Sumber Daya</h2>
            <div className="grid-two-col">
              <SumberDayaForm onSuccess={fetchSumberDaya} />
              <SumberDayaList items={sumberDayaList} />
            </div>
          </section>

          <hr className="divider" />

          <section className="section-peminjaman">
            <h2>Peminjaman</h2>

            <PeminjamanForm
              sumberDayaList={sumberDayaList}
              onSuccess={handleFormSuccess}
            />

            <PeminjamanFilter
              sumberDayaList={sumberDayaList}
              filter={filter}
              onFilterChange={handleFilterChange}
            />

            {selectedDetail && (
              <PeminjamanDetail
                peminjaman={selectedDetail}
                sumberDayaList={sumberDayaList}
                onClose={() => setSelectedDetail(null)}
              />
            )}

            <PeminjamanList
              items={peminjamanList}
              sumberDayaList={sumberDayaList}
              onDetail={handleDetail}
            />
          </section>
        </main>
      )}
    </div>
  )
}
