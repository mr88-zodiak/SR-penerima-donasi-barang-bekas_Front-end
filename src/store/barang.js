import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useBarang = defineStore('barang', () => {
  const tableDataBarang = reactive([])
  const tableDataBarangP = reactive([])
  const tableDataBarangPR = reactive([])
  const tablePengajuanBarang = reactive([])
  const seriesBar = ref([])
  const categoriesBar = ref([])
  const seriesPie = ref([])
  const labelsPie = ref([])

  const decode = (item) => {
    switch (item) {
      case 1:
        return 'kurang baik'

      case 2:
        return 'cukup baik'

      case 3:
        return 'bekas'

      case 4:
        return 'masih baru'
    }
  }
  const getDataBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // console.log(response.data.barang)
      const data = response.data.barang
        .map((item) => ({
          id: item.id,
          barangName: item.barangName,
          donaturName: item.donaturName,
          kondisi: decode(item.kondisi_barang),
          gambar: item.gambar,
          status: item.status,
          statusPengiriman: item.status_pengiriman,
          tanggal_masuk: item.tanggal_masuk,
        }))
        .filter((item) => item.status !== 'rejected')
      tableDataBarang.splice(0, tableDataBarang.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const getDataBarangP = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
        },
      })
      // console.log(response.data.barang)
      const data = response.data.barang
        .map((item) => ({
          id: item.id,
          barangName: item.barangName,
          donaturName: item.donaturName,
          kondisi: item.kondisi_barang,
          gambar: item.gambar,
          status: item.status,
          tanggal_masuk: item.tanggal_masuk,
        }))
        .filter((item) => item.status === 'approved')
      tableDataBarangP.splice(0, tableDataBarangP.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  const getDataBarangPR = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
        },
      })
      // console.log(response.data.barang)
      const data = response.data.barang
        .map((item) => ({
          id: item.id,
          barangName: item.barangName,
          donaturName: item.donaturName,
          kondisi: item.kondisi_barang,
          gambar: item.gambar,
          status: item.status,
          tanggal_masuk: item.tanggal_masuk,
          statusPengiriman: item.status_pengiriman,
        }))
        .filter((item) => item.statusPengiriman === 'done' && item.status === 'approved')
      tableDataBarangPR.splice(0, tableDataBarangPR.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const totalDataBarangP = computed(() => tableDataBarangP.length)
  const totalDataBarangPR = computed(() => tableDataBarangPR.length)
  // console.log(totalDataBarangPR)
  const totalDataBarang = computed(() => tableDataBarang.length)

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/barang/api/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    await getDataBarang()
  }

  const fetchChartData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/barang/api/chart/totalDonasiBarang', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      const data = res.data.data || res.data

      if (!Array.isArray(data)) {
        console.error('Unexpected chart data format:', res.data)
        return
      }

      const dates = [...new Set(data.map((d) => d.tanggal))].sort()
      categoriesBar.value = dates

      const kategori = [...new Set(data.map((d) => d.kategori))]

      seriesBar.value = kategori.map((k) => ({
        name: k,
        data: dates.map((date) => {
          const item = data.find((d) => d.kategori === k && d.tanggal === date)
          return item ? item.total : 0
        }),
      }))
    } catch (error) {
      console.error('Error fetching chart data:', error)
    }
  }

  const fetchPieChartData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/barang/api/chart/totalDonasiBarang', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      const data = res.data.data || res.data

      if (!Array.isArray(data)) {
        console.error('Unexpected pie chart data format:', res.data)
        return
      }

      const kategori = [...new Set(data.map((d) => d.kategori))]
      labelsPie.value = kategori

      seriesPie.value = kategori.map((k) =>
        data.filter((d) => d.kategori === k).reduce((sum, d) => sum + d.total, 0),
      )
    } catch (error) {
      console.error('Error fetching pie chart data:', error)
    }
  }

  const pengajuanBarang = async (formdata) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/pengajuan/api/post/pengajuan_barang',
        formdata,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e.response)
      alert(e.response.data.error)
    }
  }
  const getDataPengajuanBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pengajuan/api/get/pengajuan_barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // console.log(response.data.pengajuan_barang)
      const data = response.data.pengajuan_barang.map((item) => ({
        id: item.id,
        penerimaName: item.penerima_name,
        jenisBarang: item.jenis_barang,
        namaBarang: item.nama_barang,
        status: item.status,
        tanggalPengajuan: item.tanggal_pengajuan?.split('T')[0] || '-',
      }))
      tablePengajuanBarang.splice(0, tablePengajuanBarang.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    totalDataBarang,
    getDataPengajuanBarang,
    tablePengajuanBarang,
    pengajuanBarang,
    totalDataBarangP,
    getDataBarangP,
    fetchChartData,
    fetchPieChartData,
    tableDataBarang,
    getDataBarang,
    deleteData,
    getDataBarangPR,
    totalDataBarangPR,
    seriesBar,
    categoriesBar,
    seriesPie,
    labelsPie,
  }
})
