import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
export const useDataDonasi = defineStore('dataDonasi', () => {
  let tableData = reactive([])
  let tableDataP = reactive([])
  const route = useRouter()
  const totalData = computed(() => tableData.length)
  const totalDataP = computed(() => tableDataP.length)
  const dataPost = async (id, formData) => {
    try {
      const respon = await axios.post(
        `http://localhost:5000/donasi/api/post/donate/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token_donatur')}`,
          },
        },
      )
      alert(respon.data.message)
      route.push('/DonasiKita/donatur/dashboard')
    } catch (e) {
      console.log(e)
      alert(e.response.data.error)
    }
  }
  const getData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/donasi/api/get/donasi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.donasi)
      const data = response.data.donasi
        .map((item) => ({
          id: item.id,
          donaturName: item.donatur_name,
          penerimaName: item.penerima_name,
          kondisi: decode(item.kondisi_barang),
          jenisBarang: item.barang,
          jumlah: item.jumlah,
          tanggalDonasi: item.tanggal_donasi?.split('T')[0] || '-',
          tanggalApprove: item.tanggal_approve ? item.tanggal_approve.split('T')[0] : '-',
          tanggalReject: item.tanggal_reject ? item.tanggal_reject.split('T')[0] : '-',
          status: item.status,
          pesan: item.pesan,
        }))
        .filter((item) => item.status !== 'pending')
      tableData.splice(0, tableData.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const getDataP = async () => {
    try {
      const token = localStorage.getItem('token_penerima')
      const response = await axios.get('http://localhost:5000/donasi/api/get/donasi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.donasi)
      const data = response.data.donasi
        .map((item) => ({
          id: item.id,
          donaturName: item.donatur_name,
          penerimaName: item.penerima_name,
          kondisi: item.kondisi_barang,
          jenisBarang: item.barang,
          tanggalDonasi: item.tanggal_donasi?.split('T')[0] || '-',
          tanggalApprove: item.tanggal_approve ? item.tanggal_approve.split('T')[0] : '-',
          tanggalReject: item.tanggal_reject ? item.tanggal_reject.split('T')[0] : '-',
          status: item.status,
        }))
        .filter((item) => item.status === 'pending')
      tableDataP.splice(0, tableDataP.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const approveData = async (id) => {
    try {
      const respon = await axios.put(`http://localhost:5000/donasi/api/put/approve/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      alert(respon.data)
    } catch (e) {
      console.log(e)
    }
  }
  const rejectItem = async (id) => {
    try {
      const respon = await axios.put(`http://localhost:5000/donasi/api/reject/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      alert(respon.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const riwayatDonasi = reactive([])
  const kategoriPakaian = reactive([])
  const kategoriBuku = reactive([])
  const kategoriElektronik = reactive([])
  const kategoriFurniture = reactive([])
  const kategoriDapur = reactive([])

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
  const formatStatus = (status) => {
    switch (status) {
      case 'delivering':
        return 'Barang dalam perjalanan'
      case 'pick_up':
        return 'Barang sedang diambil'
      case 'rejected':
        return 'barang ditolak'
      case 'done':
        return 'Selesai'
      default:
        return 'Status tidak diketahui'
    }
  }
  const getDataRiwayat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/donasi/api/get/riwayatDonasi', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_donatur')}`,
        },
      })
      console.log(response.data.riwayat)
      const data = response.data.riwayat.map((item) => {
        return {
          id: item.id,
          nama: item.name,
          nama_barang: item.nama_barang,
          kategori: item.kategori,
          kondisi: decode(item.kondisi),
          tanggal_donasi: item.tanggal_donasi?.split('T')[0] || '-',
          status: item.status,
          tanggal_approve: item.tanggal_approve ? item.tanggal_approve.split('T')[0] : '-',
          tanggal_reject: item.tanggal_reject ? item.tanggal_reject.split('T')[0] : '-',
          pesan: item.pesan,
          statusPengiriman: formatStatus(item.status_pengiriman),
        }
      })
      data.sort((a, b) => a.id - b.id)
      riwayatDonasi.splice(0, riwayatDonasi.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const selesaikanDonasi = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/donasi/api/done/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const getKategori = async (kategori) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/donasi/api/get/Kategori/${kategori}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
          },
        },
      )

      const data = response.data.kategori
      // console.log(data)

      if (kategori === 'pakaian') {
        kategoriPakaian.splice(0, kategoriPakaian.length, ...data)
      } else if (kategori === 'buku') {
        kategoriBuku.splice(0, kategoriBuku.length, ...data)
      } else if (kategori === 'elektronik') {
        kategoriElektronik.splice(0, kategoriElektronik.length, ...data)
      } else if (kategori === 'furniture') {
        kategoriFurniture.splice(0, kategoriFurniture.length, ...data)
      } else if (kategori === 'peralatan dapur') {
        kategoriDapur.splice(0, kategoriDapur.length, ...data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const DataDonasiTerkini = reactive([])
  const getDonasiTerbaru = async () => {
    try {
      const response = await axios.get('http://localhost:5000/donasi/api/get/donasiTerbaru', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
        },
      })
      console.log(response.data.donasi)
      const data = response.data.donasi
        .map((item) => {
          return {
            id: item.id,
            namaDonatur: item.donatur_name,
            namaBarang: item.nama_barang,
            kategori: item.kategori,
            kondisi: decode(item.kondisi),
            jumlah: item.jumlah,
            status: item.status,
            tanggalDonasi: item.tanggal_donasi,
            statusPengiriman: formatStatus(item.status_pengiriman),
          }
        })
        .filter((item) => item.status === 'approved')
      DataDonasiTerkini.splice(0, DataDonasiTerkini.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const totalRiwayat = computed(() => riwayatDonasi.length)
  const totalKategoriPakaian = computed(() => kategoriPakaian.length)
  const totalKategoriFurniture = computed(() => kategoriFurniture.length)
  const totalKategoriBuku = computed(() => kategoriBuku.length)
  const totalKategoriElektronik = computed(() => kategoriElektronik.length)
  const totalKategoriDapur = computed(() => kategoriDapur.length)
  const totalSelesai = computed(() =>
    DataDonasiTerkini.map((item) => item.statusPengiriman === 'selesai'),
  )
  return {
    tableData,
    dataPost,
    totalKategoriDapur,
    totalSelesai,
    getDonasiTerbaru,
    DataDonasiTerkini,
    getData,
    approveData,
    selesaikanDonasi,
    totalData,
    rejectItem,
    riwayatDonasi,
    getDataP,
    tableDataP,
    totalDataP,
    getDataRiwayat,
    totalRiwayat,
    getKategori,
    kategoriPakaian,
    kategoriFurniture,
    kategoriBuku,
    kategoriElektronik,
    totalKategoriPakaian,
    totalKategoriFurniture,
    totalKategoriElektronik,
    totalKategoriBuku,
  }
})
