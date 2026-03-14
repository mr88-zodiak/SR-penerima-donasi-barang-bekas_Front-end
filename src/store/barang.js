import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBarang = defineStore('barang', () => {
  const tableDataBarang = ref([])
  const tableDataBarangP = ref([])
  const tableDataBarangPR = ref([])
  const tablePengajuanBarang = ref([])

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
  const status = ref(['rejected', 'pending'])
  const getDataBarang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      // console.log(response.data.barang)

      const data = response.data.barang
        .map((item) => ({
          id: item.id,
          id_barang: item.barangId,
          barangName: item.barangName,
          donaturName: item.donaturName,
          kondisi: decode(item.kondisi_barang),
          gambar: item.gambar,
          status: item.status,
          statusPengiriman: item.status_pengiriman,
          tanggal_masuk: item.tanggal_masuk,
        }))
        .filter((item) => !status.value.includes(item.status))
      tableDataBarang.value = data
      // console.log(tableDataBarang.value)
    } catch (e) {
      console.log(e)
    }
  }
  const getDataBarangP = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
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
      tableDataBarangP.value = data
    } catch (e) {
      console.log(e)
    }
  }

  const getDataBarangPR = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
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
      tableDataBarangPR.value = data
    } catch (e) {
      console.log(e)
    }
  }
  const totalDataBarangP = computed(() => tableDataBarangP.value.length)
  const totalDataBarangPR = computed(() => tableDataBarangPR.value.length)
  // console.log(totalDataBarangPR)
  const totalDataBarang = computed(() => tableDataBarang.value.length)
  // console.log(totalDataBarang)

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:5000/barang/api/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    await getDataBarang()
  }

  const pengajuanBarang = async (formdata) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/pengajuan/api/post/pengajuan_barang',
        formdata,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
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
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
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
      tablePengajuanBarang.value = data
    } catch (e) {
      console.log(e)
    }
  }
  const nameBarang = ref('')
  const getBarangId = async (id) => {
    try {
      const response = await axios.get('http://localhost:5000/barang/api/get/barang/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      nameBarang.value = response.data.data
      console.log(nameBarang.value)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    totalDataBarang,
    getBarangId,
    nameBarang,
    getDataPengajuanBarang,
    tablePengajuanBarang,
    pengajuanBarang,
    totalDataBarangP,
    getDataBarangP,
    tableDataBarang,
    getDataBarang,
    deleteData,
    getDataBarangPR,
    totalDataBarangPR,
  }
})
