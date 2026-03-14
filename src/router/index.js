import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin/AdminPage.vue'
import { jwtDecode } from 'jwt-decode'

const routes = [
  {
    path: '/DonasiKita',
    name: 'landingPage',
    meta: { title: 'Landing Page' },
    component: () => import('../views/landing_page/Home.vue'),
  },
  {
    path: '/admin/user/data',
    component: Admin,
    children: [
      { path: '', redirect: { name: 'dashboard' } },
      {
        path: '/admin/user/data/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Dashboard.vue'),
      },
      {
        path: '/admin/user/data/donasi',
        name: 'donasi',
        meta: { title: 'Riwayat Donasi', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/RiwayatDonasi.vue'),
      },
      {
        path: '/admin/user/data/kebutuhan',
        name: 'kebutuhan',
        meta: { title: 'Kebutuhan', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Kebutuhan.vue'),
      },
      {
        path: '/admin/user/data/barang',
        name: 'barang',
        meta: { title: 'Barang', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Barang.vue'),
      },
      {
        path: '/admin/user/data/cek-kelayakan',
        name: 'cek kelayakan',
        meta: { title: 'Cek kelayakan', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/klasifikasi.vue'),
      },
      {
        path: '/admin/user/data/account/donatur',
        name: 'donatur account',
        meta: { title: 'Donatur', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/AccountDonatur.vue'),
      },
      {
        path: '/admin/user/data/account/penerima',
        name: 'penerima account',
        meta: { title: 'Penerima', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/AccountPenerima.vue'),
      },
      {
        path: '/admin/user/data/activity/role',
        name: 'aktivitas user',
        meta: { title: 'Activity', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Aktifitas.vue'),
      },
      {
        path: '/admin/user/data/auth',
        name: 'auth',
        meta: { title: 'Auth', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Authorization.vue'),
      },
    ],
  },
  // ... (Rute Login, Register, Donatur, Landing Page, Penerima, Not Found)
  {
    path: '/DonasiKita/login',
    name: 'Login',
    meta: { title: 'Login' },
    component: () => import('../views/Donatur/LoginDonatur.vue'),
  },
  {
    path: '/DonasiKita/register',
    name: 'Register',
    meta: { title: 'Register' },
    component: () => import('../views/Donatur/DaftarDonaturAkun.vue'),
  },
  {
    path: '/DonasiKita/register/datadiri',
    name: 'registerDataDiri',
    meta: { title: 'Register Data Diri' },
    component: () => import('../views/Penerima/DaftarPenerimaData.vue'),
  },
  {
    path: '/DonasiKita/donatur/dashboard',
    name: 'DonaturHome',
    meta: { title: 'Home Donatur', requiresAuth: true, role: 'donatur' },
    component: () => import('../views/Donatur/DonaturPage.vue'),
  },
  {
    path: '/DonasiKita/donatur/donate/:id/checkout',
    name: 'DonaturCheckout',
    meta: { title: 'Checkout Donatur', requiresAuth: true, role: 'donatur' },
    component: () => import('../Page/CheckOutPage.vue'),
  },

  {
    path: '/DonasiKita/penerima',
    name: 'PenerimaHome',
    meta: { title: 'Home Penerima', requiresAuth: true, role: 'penerima' },
    component: () => import('../views/Penerima/PenerimaPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { title: 'Not Found' },
    component: () => import('../views/PageNotFount.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * Fungsi untuk meminta Access Token baru menggunakan Refresh Token (yang ada di HttpOnly Cookie).
 * @param {string} roleKey Kunci localStorage tempat Access Token disimpan ('token', 'token_donatur', dll.)
 * @returns {Promise<string>} Access Token baru
 */
async function refreshAccessToken(roleKey) {
  try {
    const res = await fetch('http://localhost:5000/user/oauth/token', {
      method: 'POST',
      credentials: 'include', // cookie refresh token terkirim ke backend
    })

    if (!res.ok) {
      localStorage.removeItem(roleKey)
      throw new Error('Refresh token tidak valid atau kedaluwarsa. Mohon login ulang.')
    }

    const data = await res.json()
    localStorage.setItem(roleKey, data.access_token)
    return data.access_token
  } catch (err) {
    localStorage.removeItem(roleKey)
    throw err
  }
}

router.beforeEach(async (to, from, next) => {
  // 1. Jika rute tidak memerlukan otentikasi, lanjutkan
  if (!to.meta.requiresAuth) return next()

  const tokenKeys = {
    admin: 'token',
    donatur: 'token_donatur',
    penerima: 'token_penerima',
  }
  const key = tokenKeys[to.meta.role]
  let token = localStorage.getItem(key)

  // 2. Jika tidak ada token sama sekali, redirect ke Login
  if (!token) {
    return next({ name: 'Login', replace: true })
  }

  try {
    let decoded = jwtDecode(token)

    // 3. Cek apakah Access Token kedaluwarsa
    if (decoded.exp * 1000 < Date.now()) {
      console.log('Access Token expired. Attempting refresh...')

      // Coba refresh token
      token = await refreshAccessToken(key)
      decoded = jwtDecode(token) // Decode token yang baru
    }

    // 4. Cek otorisasi peran (Role)
    if (to.meta.role && decoded.role !== to.meta.role) {
      console.warn(
        `Akses ditolak: Pengguna role '${decoded.role}' mencoba mengakses rute role '${to.meta.role}'.`,
      )
      // PENTING: Redirect ke landing atau halaman error, bukan hanya login
      // Tapi karena login adalah halaman netral yang Anda punya, kita gunakan itu.
      return next({ name: 'landingPage', replace: true })
    }

    // 5. Lanjutkan ke rute tujuan
    next()
  } catch (e) {
    console.error('Kesalahan dalam proses decoding/validasi token:', e)
    localStorage.removeItem(key)
    // Redirect ke login saat decoding gagal (misalnya token rusak)
    next({ name: 'Login', replace: true })
  }
})

// 🧭 Update title halaman otomatis
router.afterEach((to) => {
  document.title = to.meta.title || 'DonasiKita'
})

export default router
