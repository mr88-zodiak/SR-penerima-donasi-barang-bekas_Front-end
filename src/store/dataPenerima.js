import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDataPenerima = defineStore('dataAdmin', () => {
  const dataTable = reactive({
    items: [
      {
        no: 1,
        nama: 'John Doe',
        penghasilan: 'Rp 3.500.000',
        tanggungan: 3,
        kendaraan: 1,
        statusTinggal: 'Milik Sendiri',
        jenisKebutuhan: 'laptop bekas',
        layak: false,
      },
      {
        no: 2,
        nama: 'Jane Smith',
        penghasilan: 'Rp 3.500.000',
        tanggungan: 2,
        kendaraan: 0,
        statusTinggal: 'ngontrak',
        jenisKebutuhan: 'meja makan',
        layak: false,
      },
      {
        no: 3,
        nama: 'Alice Johnson',
        penghasilan: 'Rp 2.200.000',
        tanggungan: 1,
        kendaraan: 2,
        statusTinggal: 'ngontrak',
        jenisKebutuhan: 'selimut',
        layak: true,
      },
    ],
  })

  return { dataTable }
})
