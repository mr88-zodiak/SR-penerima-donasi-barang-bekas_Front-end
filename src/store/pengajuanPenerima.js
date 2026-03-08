import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const usePengajuanPenerimaStore = defineStore('pengajuanPenerima', () => {
  const pengajuanData = reactive([])
  const pengajuanDataB = reactive([])
  const formPengajuan = ref({
    nama_barang: '',
    jenis_barang: '',
    jumlah: null,
  })
  const pesan = ref('')

  const pengajuanPost = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/pengajuan/api/post/pengajuan_barang',
        formPengajuan.value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )

      alert(response.data.message)
      console.log(formPengajuan)
      // formPengajuan.nama_barang = ''
      // formPengajuan.jenis_barang = ''
      // formPengajuan.jumlah = null
    } catch (e) {
      console.log(e.response?.data || e)
    }
  }

  const getPengajuanData = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/pengajuan/api/get/pengajuan_barang', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.data)
      pengajuanData.splice(0, pengajuanData.length, ...response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getPengajuanDataB = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/pengajuan/api/get/pengajuanB', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.data)
      pengajuanDataB.splice(0, pengajuanDataB.length, ...response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const editdataPengajuan = async (id) => {
    try {
      const response = await axios.patch(
        'http://localhost:5000/pengajuan/api/patch/pengajuan_barang/' + id,
        formPengajuan.value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      // console.log(formPengajuan.value)
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const approvedPengajuan = async (id) => {
    try {
      const response = await axios.put(
        'http://localhost:5000/pengajuan/api/put/approve/pengajuan_barang/' + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const rejectPengajuan = async (id) => {
    try {
      const response = await axios.put(
        'http://localhost:5000/pengajuan/api/put/reject/pengajuan_barang/' + id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const pesanReject = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/pengajuan/api/post/pesan_reject/' + id,
        {
          pesan: pesan.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    pengajuanData,
    pengajuanPost,
    pesanReject,
    pesan,
    rejectPengajuan,
    approvedPengajuan,
    editdataPengajuan,
    getPengajuanData,
    formPengajuan,
    getPengajuanDataB,
    pengajuanDataB,
  }
})
