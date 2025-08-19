import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useDataBarang = defineStore('dataAdmin', () => {
  const tableData = ref([
    {
      id: 1,
      donaturName: 'John doe',
      barangName: 'selimut',
      tanggal_masuk: '20 januari 2026',
      tanggal_disetujui: '20 agustus 2026',
    },
    {
      id: 2,
      donaturName: 'Jane doe',
      barangName: 'meja makan',
      tanggal_masuk: '20 januari 2026',
      tanggal_disetujui: '20 agustus 2026',
    },
    {
      id: 3,
      donaturName: 'trump donald',
      barangName: 'buku anime',
      tanggal_masuk: '20 februari 2026',
      tanggal_disetujui: '20 agustus 2026',
    },
  ])

  return { tableData }
})
