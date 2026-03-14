import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { usePenerima } from '@/store/penerima'

vi.mock('axios')
describe('usePenerima Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('mengambil data penerima dan memfilter approved', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 2,
            name: 'Budi',
            email: 'budi@mail.com',
            username: 'budi',
            password: '123',
            status: 'pending',
            penghasilan_perbulan: 1000000,
            jumlah_tanggungan: 2,
            jumlah_kendaraan: 1,
            status_tempat_tinggal: 'kontrak',
            nama_barang: 'beras',
            jumlah: 1,
            jenis_barang: 'pangan',
            alamat: 'Bandung',
          },
          {
            id: 1,
            name: 'Ani',
            email: 'ani@mail.com',
            username: 'ani',
            password: '321',
            status: 'approved',
            penghasilan_perbulan: 2000000,
            jumlah_tanggungan: 1,
            jumlah_kendaraan: 1,
            status_tempat_tinggal: 'milik',
            nama_barang: 'baju',
            jumlah: 2,
            jenis_barang: 'sandang',
            alamat: 'Jakarta',
          },
        ],
      },
    })

    const store = usePenerima()

    await store.getDataPenerima()

    // hanya approved
    expect(store.tableDataPenerima.length).toBe(1)

    // cek sorting
    expect(store.tableDataPenerima[0].no).toBe(1)

    // cek format rupiah
    expect(store.tableDataPenerima[0].penghasilan_perbulan).toContain('Rp')
  })
  it('validasi form data diri', () => {
    const store = usePenerima()

    store.formDataDiri.penghasilan_perbulan = 1000000
    store.formDataDiri.jumlah_tanggungan = 2
    store.formDataDiri.jumlah_kendaraan = 1
    store.formDataDiri.status_tempat_tinggal = 'milik'
    store.formDataDiri.jenis_kebutuhan = 'pangan'

    expect(store.isformValid()).toBe(true)
  })
  it('mengambil role user dan set loading flag', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            nama: 'Admin',
            email: 'admin@mail.com',
            username: 'admin',
            role: 'admin',
            status: 'active',
          },
          {
            id: 2,
            role: 'pending',
          },
        ],
      },
    })

    const store = usePenerima()

    const promise = store.getDataRole()

    // saat loading jalan
    expect(store.isLoading).toBe(true)

    await promise

    // loading selesai
    expect(store.isLoading).toBe(false)

    // pending terfilter
    expect(store.dataRole.length).toBe(1)
  })
  it('memanggil API approve user', async () => {
    axios.patch.mockResolvedValue({ data: { message: 'ok' } })

    const store = usePenerima()

    await store.approved(5)

    expect(axios.patch).toHaveBeenCalled()
  })

  it('memanggil API reject user', async () => {
    axios.patch.mockResolvedValue({ data: { message: 'ok' } })

    const store = usePenerima()

    await store.rejected(3)

    expect(axios.patch).toHaveBeenCalled()
  })
  it('menghitung totalDataPenerima', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { id: 1, status: 'approved' },
          { id: 2, status: 'approved' },
        ],
      },
    })

    const store = usePenerima()

    await store.getDataPenerima()

    expect(store.totalDataPenerima).toBe(2)
  })
})
