import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const usePenerima = defineStore('penerima', () => {
  const tableDataPenerima = reactive([])
  const tableDataPenerimaInfo = reactive([])
  const dataTable = reactive([])
  const dataRole = reactive([])

  const getDataPenerima = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/user/api/get/account/penerima', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.data)
      const data = response.data.data
        .map((item) => ({
          no: item.id,
          nama: item.name,
          email: item.email,
          username: item.username,
          password: item.password,
          status: item.status,
          penghasilan_perbulan: Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(item.penghasilan_perbulan),
          jumlah_tanggungan: item.jumlah_tanggungan,
          jumlah_kendaraan: item.jumlah_kendaraan,
          status_tempat_tinggal: item.status_tempat_tinggal,
          jenis_kebutuhan: item.jenis_kebutuhan,
          jumlah: item.jumlah,
          kategori: item.kategori,
          login_stamp: item.login_stamp,
          register: item.register_stamp,
        }))
        .filter((item) => item.status === 'approved')
      data.sort((a, b) => a.no - b.no)
      // console.log(data)
      tableDataPenerima.splice(0, tableDataPenerima.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  const getDataPersonal = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/api/get/data/personal', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // console.log(response.data.data)
      const data = response.data.data.map((item) => ({
        id: item.id,
        name: item.name,
        penghasilan: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
          item.penghasilan_perbulan,
        ),
        tanggungan: item.jumlah_tanggungan,
        kendaraan: item.jumlah_kendaraan,
        statusTinggal: item.status_tempat_tinggal,
        jenisKebutuhan: item.jenis_kebutuhan,
        jumlah: item.jumlah,
      }))
      data.sort((a, b) => a.id - b.id)
      // console.log(data)
      dataTable.splice(0, dataTable.length, ...data)
    } catch (error) {
      console.error('Gagal mengambil data:', error)
    }
  }
  const getDataInfoDonasi = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/user/api/get/informasiDonasi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data.data)
      const data = response.data.data.map((item) => ({
        id: item.id,
        donaturName: item.name,
        tanggalDonasi: item.tanggal_donasi,
        gambarBarang: item.gambar_barang,
        jenisBarang: item.jenis_kebutuhan,
      }))
      tableDataPenerimaInfo.splice(0, tableDataPenerimaInfo.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const formDataDiri = reactive({
    penghasilan_perbulan: 0,
    jumlah_tanggungan: 0,
    jumlah_kendaraan: 0,
    status_tempat_tinggal: '',
    jenis_kebutuhan: '',
  })
  const updateDataPersonal = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/user/api/update/data/personal',
        formDataDiri,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const isformValid = () => {
    return (
      formDataDiri.penghasilan_perbulan > 0 &&
      formDataDiri.jumlah_tanggungan > 0 &&
      formDataDiri.jumlah_kendaraan > 0 &&
      formDataDiri.status_tempat_tinggal !== '' &&
      formDataDiri.jenis_kebutuhan !== ''
    )
  }
  let isLoading = ref(false)
  let isRefreshing = ref(false)

  const getDataRole = async (showLoading = true) => {
    if (showLoading) isLoading.value = true
    else isRefreshing.value = true

    try {
      const response = await axios.get('http://localhost:5000/user/api/get/role/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      // console.log(response.data.data)
      const data = response.data.data
        .map((item) => ({
          no: item.id,
          nama: item.nama,
          email: item.email,
          username: item.username,
          password: item.password,
          role: item.role,
          status: item.status,
          login_stamp: item.login_stamp,
          register: item.register,
          approved: item.approve,
          rejected: item.rejected,
        }))
        .filter((item) => item.role !== 'pending')

      data.sort((a, b) => a.no - b.no)
      dataRole.splice(0, dataRole.length, ...data)
    } catch (e) {
      console.log(e)
    } finally {
      if (showLoading) isLoading.value = false
      else isRefreshing.value = false
    }
  }

  const approved = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/api/user/approved/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const rejected = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/api/user/rejected/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      console.log(response.data.message)
    } catch (e) {
      console.log(e)
    }
  }
  const totalDataRole = computed(() => dataRole.length)
  const totalDataInfoPenerima = computed(() => tableDataPenerimaInfo.length)
  const totalDataPenerima = computed(() => tableDataPenerima.length)
  return {
    isformValid,
    getDataRole,
    isLoading,
    totalDataRole,
    getDataPenerima,
    tableDataPenerima,
    totalDataPenerima,
    getDataPersonal,
    formDataDiri,
    updateDataPersonal,
    dataTable,
    dataRole,
    approved,
    rejected,
    tableDataPenerimaInfo,
    getDataInfoDonasi,
    totalDataInfoPenerima,
  }
})
