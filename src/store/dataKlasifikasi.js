// src/store/dataPenerima.js
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import axios from 'axios'

export const useDataKlasifikasi = defineStore('useDataKlasifikasi', () => {
  const dataTable = reactive([])
  const klasifikasiData = reactive([])

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/klasifikasi/api/get/data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // console.log(response.data)
      const data = response.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        penghasilan: Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
          item.penghasilan_perbulan,
        ),
        tanggungan: item.jumlah_tanggungan,
        kendaraan: item.jumlah_kendaraan,
        statusTinggal: item.status_tempat_tinggal,
        jenisKebutuhan: item.jenis_kebutuhan,
        layak: item.layak,
      }))

      data.sort((a, b) => a.id - b.id)
      dataTable.splice(0, dataTable.length, ...data)
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  }
  const getDataD = async () => {
    try {
      const response = await axios.get('http://localhost:5000/klasifikasi/api/get/data/getData', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_donatur')}`,
        },
      })
      // console.log(response.data.data)
      const data = response.data.data
        .map((item) => ({
          id: item.id,
          name: item.name,
          kategori: item.kategori,
          status: item.status,
          jenis_kebutuhan: item.jenis_kebutuhan,
          layak: item.layak,
        }))
        .filter((item) => item.layak === 0 && item.status === 'approved')
      klasifikasiData.splice(0, klasifikasiData.length, ...data)
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  }
  const totalLayak = computed(() => dataTable.filter((item) => item.layak === 0).length)
  const totalTidakLayak = computed(() => dataTable.filter((item) => item.layak === 1).length)
  return { dataTable, getData, getDataD, klasifikasiData, totalLayak, totalTidakLayak }
})
