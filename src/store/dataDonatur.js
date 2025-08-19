import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataDonatur = defineStore('dataAdmin', () => {
  const tableData = ref([
    {
      id: 1,
      nama: 'John Doe',
      email: 'x6A7o@example.com',
      username: 'johndoe',
      password: 'password123',
      tanggalDaftar: '2023-01-01',
      tanggalLogin: '2023-02-01',
    },
    {
      id: 2,
      nama: 'Jane Smith',
      email: 'BtN3o@example.com',
      username: 'janesmith',
      password: 'password456',
      tanggalDaftar: '2023-02-01',
      tanggalLogin: '2023-03-01',
    },
  ])

  return { tableData }
})
