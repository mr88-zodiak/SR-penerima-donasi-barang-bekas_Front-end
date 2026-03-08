import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useDokumentasi = defineStore('dokumentasi', () => {
  const dokumen = reactive([])
  const router = useRouter()
  const addDokumentasi = async (id, file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const postData = await axios.post(
        'http://localhost:5000/dokumentasi/api/post/dokumentasi/' + id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      alert(postData.data.message)
      if (postData.status === 201) {
        router.push('/dokumentasi')
      }
    } catch (e) {
      console.log(e)
      alert(e.response?.data?.error || 'Upload gagal')
    }
  }

  const getDokumentasi = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/dokumentasi/api/get/dokumentasi', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data.dokumentasi)
      const data = response.data.dokumentasi.map((item) => ({
        id: item.id,
        file: item.file,
        filename: item.file_name,
        ukuranFile: item.ukuran_file,
        tanggalDokumentasi: item.tanggal_dokumentasi?.split('T')[0] || '-',
        donaturName: item.donatur_name,
      }))
      dokumen.splice(0, dokumen.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteDokumentasi = async (id) => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/dokumentasi/api/delete/dokumentasi/' + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        },
      )
      alert(response.data.message)
    } catch (e) {
      console.log(e)
      alert(e.response?.data?.error || 'Hapus dokumentasi gagal')
    }
  }
  getDokumentasi()
  return { dokumen, addDokumentasi, getDokumentasi, deleteDokumentasi }
})
