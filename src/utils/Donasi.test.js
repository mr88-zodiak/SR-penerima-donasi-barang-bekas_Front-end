import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useDataDonasi } from '@/store/dataDonasi'

// MOCK axios
vi.mock('axios')

// MOCK router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('Data Donasi Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    // mock localStorage
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => 'fake-token'),
      setItem: vi.fn(),
    })

    // mock alert
    vi.stubGlobal('alert', vi.fn())
  })

  it('dataPost berhasil mengirim donasi', async () => {
    axios.post.mockResolvedValue({
      data: {
        message: 'Donasi berhasil',
      },
    })

    const store = useDataDonasi()

    const fakeFormData = new FormData()

    await store.dataPost(1, fakeFormData)

    expect(axios.post).toHaveBeenCalled()
  })
  it('getData menyimpan data ke tableData', async () => {
    axios.get.mockResolvedValue({
      data: {
        donasi: [
          {
            id: 1,
            donatur_name: 'Bima',
            penerima_name: 'Andi',
            kondisi_barang: 2,
            barang: 'Baju',
            tanggal_donasi: '2024-01-01T10:00:00',
            tanggal_approve: null,
            tanggal_reject: null,
            status: 'approved',
            pesan: 'oke',
          },
        ],
      },
    })

    const store = useDataDonasi()

    await store.getData()

    expect(store.tableData.length).toBe(1)
    expect(store.tableData[0].donaturName).toBe('Bima')
  })
  it('approveData memanggil API approve', async () => {
    axios.put.mockResolvedValue({
      data: 'ok',
    })

    const store = useDataDonasi()

    await store.approveData(1)

    expect(axios.put).toHaveBeenCalled()
  })
  it('getDataRiwayat menyimpan riwayat donasi', async () => {
    axios.get.mockResolvedValue({
      data: {
        riwayat: [
          {
            id: 1,
            name: 'Bima',
            nama_barang: 'Laptop',
            kategori: 'elektronik',
            kondisi: 3,
            tanggal_donasi: '2024-01-01T10:00:00',
            status: 'done',
            tanggal_approve: null,
            tanggal_reject: null,
            pesan: '-',
            status_pengiriman: 'done',
          },
        ],
      },
    })

    const store = useDataDonasi()

    await store.getDataRiwayat()

    expect(store.riwayatDonasi.length).toBe(1)
    expect(store.riwayatDonasi[0].nama).toBe('Bima')
  })
})
