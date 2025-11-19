import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useDonatur = defineStore('donatur', () => {
  const tableDataDonatur = reactive([])
  const tableDataDonaturP = reactive([])

  const getDataDonatur = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/penerima/api/get/account/donatur', {
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
        .filter((item) => item.status === 'approved')
      tableDataDonatur.splice(0, tableDataDonatur.length, ...data)
    } catch (e) {
      console.log(e)
    }
  }
  const getDataDonaturP = async () => {
    try {
      const token = localStorage.getItem('token_penerima')
      const response = await axios.get('http://localhost:5000/penerima/api/get/account/donatur', {
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

  const totalData = computed(() => tableDataDonatur.length)
  const totalDataP = computed(() => tableDataDonaturP.length)
  return { getDataDonatur, totalDataP, getDataDonaturP, tableDataDonatur, totalData }
})
