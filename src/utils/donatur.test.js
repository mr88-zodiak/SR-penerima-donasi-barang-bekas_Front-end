import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useDonatur } from '@/store/donatur'

vi.mock('axios')
describe('useDonatur Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(() => {})
      vi.spyOn(console, 'error').mockImplementation(() => {})
    })
  })

  it('mengambil data donatur admin (approved saja)', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            nama: 'Budi',
            email: 'budi@mail.com',
            username: 'budi',
            password: '123',
            status: 'approved',
          },
          {
            id: 2,
            status: 'pending',
          },
        ],
      },
    })

    const store = useDonatur()

    await store.getDataDonatur()

    expect(store.tableDataDonatur.length).toBe(1)
    expect(store.tableDataDonatur[0].nama).toBe('Budi')
  })
  it('mengambil data donatur penerima (bukan rejected)', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { id: 1, status: 'approved', nama: 'Andi' },
          { id: 2, status: 'rejected', nama: 'Rudi' },
        ],
      },
    })

    const store = useDonatur()

    await store.getDataDonaturP()

    expect(store.tableDataDonaturP.length).toBe(1)
    expect(store.tableDataDonaturP[0].nama).toBe('Andi')
  })
  it('menghitung totalData', async () => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          { id: 1, status: 'approved' },
          { id: 2, status: 'approved' },
        ],
      },
    })

    const store = useDonatur()

    await store.getDataDonatur()

    expect(store.totalData).toBe(2)
  })
  it('handle error API tanpa crash', async () => {
    axios.get.mockRejectedValue(new Error('Server error'))

    const store = useDonatur()

    await store.getDataDonatur()

    expect(store.tableDataDonatur.length).toBe(0)
  })
})
