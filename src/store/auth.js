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
  const errorMessage = ref(null)
  const pesanError = ref('')
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
      if (respon.status === 200) {
        const token = respon.data.access_token
        const dataDiriId = respon.data.user.dataDiriId
        switch (respon.data.user.role) {
          case 'admin':
            router.push({ name: 'dashboard' })
            localStorage.setItem('auth_token', token)
            localStorage.setItem('role', respon.data.user.role)
            break
          case 'donatur':
            router.push({ name: 'DonaturHome' })
            localStorage.setItem('auth_token', token)
            localStorage.setItem('role', respon.data.user.role)
            break
          case 'penerima':
            localStorage.setItem('auth_token', token)
            localStorage.setItem('role', respon.data.user.role)
            if (dataDiriId !== null) {
              router.push({ name: 'PenerimaHome' })
            } else {
              router.push({ name: 'registerDataDiri' })
            }
            break
        }
      } else {
        alert(respon.data.message)
      }
    } catch (e) {
      errorMessage.value = e.response?.data?.message || 'Terjadi kesalahan'
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
    alamat: '',
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
      formDataPersonalRegister.value.alamat === ''
    )
  })
  const getUsername = ref('')
  const getUser = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get('http://localhost:5000/user/api/get/username', {
        headers: {
          Authorization: `Bearer ${token}`,
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
    pesanError,
    formDataPersonalRegister,
    formDataRegister,
    getUsername,
    personalRegister,
    formLogin,
    Register,
    getUser,
    Login,
    errorMessage,
  }
})
