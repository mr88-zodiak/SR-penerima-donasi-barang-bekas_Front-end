import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDataDonasi = defineStore('dataAdmin', () => {
  const tableData = ref([
    {
      id: 1,
      donaturName: 'john doe',
      penerimaName: 'jason jacob',
      jenisBarang: 'selimut',
      status: 'pending',
    },
    {
      id: 2,
      donaturName: 'jane doe',
      penerimaName: 'michael philips',
      jenisBarang: 'pakaian',
      status: 'approve',
    },
    {
      id: 3,
      donaturName: 'reagan morgan',
      penerimaName: 'pattrick wiliam jr',
      jenisBarang: 'meja makan',
      status: 'pending',
    },
  ]).value

  return { tableData }
})
