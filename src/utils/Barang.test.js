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
    expect(store.tableDataBarang.length).toBe(1)

    expect(store.tableDataBarang[0].barangName).toBe('Baju')
    expect(store.tableDataBarang[0].kondisi).toBe('masih baru')
    expect(store.tableDataBarang[0].donaturName).toBe('Andi')
    expect(store.tableDataBarang[0].gambar).toBe('img.jpg')
    expect(store.tableDataBarang[0].status).toBe('approved')
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
  it('deleteData memanggil API dan refresh data', async () => {
    axios.delete.mockResolvedValue({})
    axios.get.mockResolvedValue({ data: { barang: [] } })

    const store = useBarang()
    await store.deleteData(10)

    expect(axios.delete).toHaveBeenCalled()
    expect(store.tableDataBarang.length).toBe(0)
  })
})
