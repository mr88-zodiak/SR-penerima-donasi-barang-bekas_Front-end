import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { usePengajuanPenerimaStore } from '@/store/pengajuanPenerima'

vi.mock('axios')

beforeEach(() => {
  setActivePinia(createPinia())

  localStorage.setItem('token', 'fake')
  localStorage.setItem('token_penerima', 'fake2')

  globalThis.alert = vi.fn()

  vi.clearAllMocks()
})

describe('usePengajuanPenerimaStore', () => {
  it('mengambil data pengajuan', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [{ id: 1, nama_barang: 'Beras' }],
      },
    })
    const store = usePengajuanPenerimaStore()
    await store.getPengajuanData('token_penerima')
    expect(store.pengajuanData.length).toBe(1)
  })
  it('post pengajuan berhasil', async () => {
    axios.post.mockResolvedValue({
      data: { message: 'Sukses' },
    })
    const store = usePengajuanPenerimaStore()
    store.formPengajuan.nama_barang = 'Minyak'
    store.formPengajuan.jenis_barang = 'Sembako'
    store.formPengajuan.jumlah = 5
    await store.pengajuanPost()
    expect(axios.post).toHaveBeenCalled()
    expect(alert).toHaveBeenCalled()
  })
  it('handle error API', async () => {
    axios.get.mockRejectedValue(new Error('API Error'))
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const store = usePengajuanPenerimaStore()
    await store.getPengajuanData('token_penerima')
    expect(store.pengajuanData.length).toBe(0)
    spy.mockRestore()
  })
})
