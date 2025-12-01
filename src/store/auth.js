import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  // ===============================login========================================
  // donaturLogin
  const formLogin = ref({
    email: '',
    password: '',
  })
  const isFormValidLogin = computed(() => formLogin.value.email && formLogin.value.password)
  const Login = async () => {
    try {
      const respon = await axios.post(
        'http://localhost:5000/user/api/post/login',
        formLogin.value,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // console.log(respon)
      if (respon.status === 200) {
        const token = respon.data.access_token
        const dataDiriId = respon.data.user.dataDiriId
        // localStorage.setItem('token', token)
        switch (respon.data.user.role) {
          case 'admin':
            router.push({ name: 'dashboard' })
            localStorage.setItem('token', token)
            break
          case 'donatur':
            router.push({ name: 'DonaturHome' })
            localStorage.setItem('token_donatur', token)
            break
          case 'penerima':
            localStorage.setItem('token_penerima', token)
            if (dataDiriId !== null) {
              router.push({ name: 'PenerimaHome' })
            } else {
              router.push({ name: 'registerDataDiri' })
            }
            break
        }
      }
    } catch (e) {
      // console.log(e)
      alert(e.response.message) || alert(e.response.data.message)
    }
  }

  // ===============================register========================================
  // Register
  const formDataRegister = ref({
    name: '',
    email: '',
    username: '',
    password: '',
    role: '',
  })

  const Register = async () => {
    try {
      const respon = await axios.post(
        'http://localhost:5000/user/api/post/daftar',
        formDataRegister.value,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      alert(respon.data.message)
      switch (respon.data.user) {
        case 'penerima':
          router.push('/DonasiKita/login')
          break
        case 'donatur':
          router.push('/DonasiKita/login')
          break
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const isFormValidRegister = computed(() =>
    Boolean(
      formDataRegister.value.name &&
        formDataRegister.value.email &&
        formDataRegister.value.username &&
        formDataRegister.value.password,
    ),
  )
  const formDataPersonalRegister = ref({
    penghasilan: '',
    tanggungan: '',
    kendaraan: '',
    status_tempat_tinggal: '',
    kategori: '',
    jenis_kebutuhan: '',
    jumlah: '',
  })
  const personalRegister = async () => {
    try {
      const respon = await axios.post(
        'http://localhost:5000/user/api/post/personalData',
        formDataPersonalRegister.value,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token_penerima')}`,
          },
        },
      )
      alert(respon.data.message)
      router.push({ name: 'PenerimaHome' })
    } catch (e) {
      console.log(e.response)
    }
  }
  const isFormValidPersonal = computed(() => {
    return (
      formDataPersonalRegister.value.penghasilan === '' ||
      formDataPersonalRegister.value.tanggungan === '' ||
      formDataPersonalRegister.value.kendaraan === '' ||
      formDataPersonalRegister.value.status_tempat_tinggal === '' ||
      formDataPersonalRegister.value.jenis_kebutuhan === '' ||
      formDataPersonalRegister.value.nama_barang === ''
    )
  })
  const getUsername = ref('')
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/api/get/username', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_donatur')}`,
        },
      })
      // console.log(response.data)
      getUsername.value = response.data.username
    } catch (e) {
      console.log(e)
    }
  }

  return {
    isFormValidLogin,
    isFormValidRegister,
    isFormValidPersonal,
    formDataPersonalRegister,
    formDataRegister,
    getUsername,
    personalRegister,
    formLogin,
    Register,
    getUser,
    Login,
  }
})
