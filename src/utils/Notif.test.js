import axios from 'axios'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, expect, vi, it } from 'vitest'
import { useNotif } from '@/store/notif'

beforeEach(() => {
  setActivePinia(createPinia())
})
beforeEach(() => {
  localStorage.setItem('token', 'fake-token')
  localStorage.setItem('token_donatur', 'fake-token-donatur')
})
vi.mock('axios')
it('mengambil notif selain pending', async () => {
  axios.get.mockResolvedValue({
    data: {
      notifications: [
        { nama_barang: 'Beras', status: 'done', tanggal_donasi: '2025' },
        { nama_barang: 'Minyak', status: 'pending', tanggal_donasi: '2025' },
      ],
    },
  })

  const store = useNotif()

  await store.getCallback()

  expect(store.notifData.length).toBe(1)
  expect(store.getTotalnotif).toBe(1)
})
