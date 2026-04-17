import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'

// mock axios
vi.mock('axios')

describe('useDataKlasifikasi Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('berhasil mengambil dan memproses data getData()', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 2,
            name: 'Budi',
            penghasilan_perbulan: 1000000,
            jumlah_tanggungan: 2,
            jumlah_kendaraan: 1,
            status_tempat_tinggal: 'kontrak',
            jenis_kebutuhan: 'pangan',
            layak: 0,
          },
          {
            id: 1,
            name: 'Ani',
            penghasilan_perbulan: 2000000,
            jumlah_tanggungan: 1,
            jumlah_kendaraan: 0,
            status_tempat_tinggal: 'milik',
            jenis_kebutuhan: 'sandang',
            layak: 1,
          },
        ],
      },
    })

    const store = useDataKlasifikasi()

    await store.getData()

    expect(store.dataTable.length).toBe(2)

    expect(store.dataTable[0].id).toBe(1)

    expect(store.dataTable[0].penghasilan).toContain('Rp')
  })

  it('menghitung totalLayak dan totalTidakLayak', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { id: 1, layak: 0 },
          { id: 2, layak: 1 },
          { id: 3, layak: 0 },
        ],
      },
    })

    const store = useDataKlasifikasi()

    await store.getData()

    expect(store.totalLayak).toBe(1)
    expect(store.totalTidakLayak).toBe(2)
  })
})
