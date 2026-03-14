import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useDonatur = defineStore('donatur', () => {
  const tableDataDonatur = reactive([])

  const tableDataDonaturP = reactive([])
  const jumlahDonatur = ref(0)
  console.log(jumlahDonatur)
  const getJumlahDonatur = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/api/get/jumlah/account/donatur')
      const data = response.data.jumlah
      jumlahDonatur.value = data
    } catch (e) {
      console.log(e)
    }
  }

  // console.log(totalData)
  const getDataDonatur = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/user/api/get/account/donatur', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data)
      const data = response.data.data
        .map((item) => ({
          id: item.id,
          nama: item.nama,
          email: item.email,
          username: item.username,
          password: item.password,
          status: item.status,
          login: item.login_stamp,
          register: item.register,
          edit_stamp: item.edit_stamp,
          approved: item.approve,
          rejected: item.rejected,
        }))
        .filter((item) => item.status === 'approved')
      tableDataDonatur.splice(0, tableDataDonatur.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  const getDataDonaturP = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/user/api/get/account/donatur', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(response.data)
      const data = response.data.data
        .map((item) => ({
          id: item.id,
          nama: item.nama,
          email: item.email,
          username: item.username,
          password: item.password,
          status: item.status,
          login: item.login_stamp,
          register: item.register,
          approved: item.approve,
          rejected: item.rejected,
        }))
        .filter((item) => item.status !== 'rejected')
      tableDataDonaturP.splice(0, tableDataDonaturP.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }

  const totalDataP = computed(() => tableDataDonaturP.length)
  const totalData = computed(() => tableDataDonatur.length)
  return {
    getDataDonatur,
    totalDataP,
    getDataDonaturP,
    tableDataDonatur,
    tableDataDonaturP,
    totalData,
    getJumlahDonatur,
  }
})
