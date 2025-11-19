import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useNotif = defineStore('notif', () => {
  const formData = reactive({
    message: '',
  })

  const rejectCallback = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/notif/api/post/notif/${id}`,
        formData,
        {
          headers: {
            // ⬅️ ini harus lowercase
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      alert(response.data.message)
      formData.message = '' // opsional: reset textarea
    } catch (e) {
      console.error('Gagal mengirim notifikasi:', e)
    }
  }

  const notifData = reactive([])
  const getCallback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notif/api/get/notif', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_donatur')}`,
        },
      })
      // console.log(response.data.notifications)
      const data = response.data.notifications
        .map((item) => {
          return {
            jenis_kebutuhan: item.nama_barang,
            status: item.status,
            tanggal: item.tanggal_donasi,
          }
        })
        .filter((item) => item.status !== 'pending')
      notifData.splice(0, notifData.length, ...data) // Update reactive array
    } catch (e) {
      console.error('Gagal mengambil notifikasi:', e)
    }
  }
  const getTotalnotif = computed(() => notifData.length)
  return { rejectCallback, getCallback, formData, notifData, getTotalnotif }
})
