// src/store/dataPenerima.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

export const useDataPenerima = defineStore('dataPenerima', () => {
  const dataTable = reactive({ items: [] })

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/rekomendasi/getData')
      // asumsi response.data.data berisi array hasil rekomendasi
      dataTable.items = response.data.data.map((item, index) => ({
        no: index + 1,
        nama: item.nama,
        penghasilan: item.penghasilanPerbulan,
        tanggungan: item.jumlahTanggungan,
        kendaraan: item.jumlahKendaraan,
        statusTinggal: item.statusTempatTinggal,
        jenisKebutuhan: item.jenisKebutuhan,
        layak: item.layak,
      }))
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  }

  return { dataTable, getData }
})
