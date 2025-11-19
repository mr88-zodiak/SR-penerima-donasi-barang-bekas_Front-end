// src/store/dataPenerima.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive } from 'vue'

export const useDataRekomendasi = defineStore('useDataRekomendasi', () => {
  const dataTable = reactive([])

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/rekomendasi/api/get/data/personal', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(response.data.data)
      const data = response.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        penghasilan: item.penghasilan_perbulan,
        tanggungan: item.jumlah_tanggungan,
        kendaraan: item.jumlah_kendaraan,
        statusTinggal: item.status_tempat_tinggal,
        jenisKebutuhan: item.jenis_kebutuhan,
        skor: item.skor,
      }))
      // console.log(data)
      dataTable.splice(0, dataTable.length, ...data)
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  }
  return { dataTable, getData }
})
