import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useBarang } from '@/store/barang'

vi.mock('axios')
describe('useBarang Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('mengambil dan memfilter data barang (admin)', async () => {
    axios.get.mockResolvedValue({
      data: {
        barang: [
          {
            id: 1,
            barangId: 11,
            barangName: 'Baju',
            donaturName: 'Andi',
            kondisi_barang: 4,
            gambar: 'img.jpg',
            status: 'approved',
            status_pengiriman: 'done',
            tanggal_masuk: '2025-01-01',
          },
          {
            id: 2,
            status: 'rejected',
          },
        ],
      },
    })

    const store = useBarang()

    await store.getDataBarang()

    // rejected harus hilang
    expect(store.tableDataBarang.length).toBe(1)

    // cek mapping
    expect(store.tableDataBarang[0].barangName).toBe('Baju')

    // cek decode
    expect(store.tableDataBarang[0].kondisi).toBe('masih baru')
  })
  it('menghitung totalDataBarang', async () => {
    axios.get.mockResolvedValue({
      data: {
        barang: [
          { id: 1, status: 'approved' },
          { id: 2, status: 'approved' },
        ],
      },
    })

    const store = useBarang()

    await store.getDataBarang()

    expect(store.totalDataBarang).toBe(2)
  })
  it('memproses data chart bar dengan benar', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { tanggal: '2025-01-01', kategori: 'pakaian', total: 3 },
          { tanggal: '2025-01-01', kategori: 'buku', total: 2 },
          { tanggal: '2025-01-02', kategori: 'pakaian', total: 5 },
        ],
      },
    })

    const store = useBarang()

    await store.fetchChartData()

    // cek kategori tanggal
    expect(store.categoriesBar).toEqual(['2025-01-01', '2025-01-02'])

    // cek series ada 2 kategori
    expect(store.seriesBar.length).toBe(2)

    // cek data pakaian
    const pakaian = store.seriesBar.find((s) => s.name === 'pakaian')

    expect(pakaian.data).toEqual([3, 5])
  })
  it('memproses data pie chart', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { kategori: 'pakaian', total: 3 },
          { kategori: 'pakaian', total: 2 },
          { kategori: 'buku', total: 4 },
        ],
      },
    })

    const store = useBarang()

    await store.fetchPieChartData()

    expect(store.labelsPie).toEqual(['pakaian', 'buku'])

    expect(store.seriesPie).toEqual([5, 4])
  })
  it('deleteData memanggil API dan refresh data', async () => {
    axios.delete.mockResolvedValue({})
    axios.get.mockResolvedValue({ data: { barang: [] } })

    const store = useBarang()

    await store.deleteData(10)

    expect(axios.delete).toHaveBeenCalled()
    expect(store.tableDataBarang.length).toBe(0)
  })
})
