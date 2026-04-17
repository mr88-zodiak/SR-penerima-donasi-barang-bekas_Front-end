import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin/AdminPage.vue'
import { jwtDecode } from 'jwt-decode'

const routes = [
  {
    path: '/',
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
      {
        path: '/admin/user/data/dokumentasi',
        name: 'dokumentasi',
        meta: { title: 'Dokumentasi', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Dokumentasi.vue'),
      },
      {
        path: '/admin/user/data/verifikasi-donatur',
        name: 'verifikasi pengajuan',
        meta: { title: 'Verifikasi Pengajuan', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/VerifikasiPengajuan.vue'),
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

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const token = localStorage.getItem('auth_token')

  if (!token) {
    return next({ name: 'Login' })
  }

  try {
    const decoded = jwtDecode(token)

    if (decoded.exp * 1000 < Date.now()) {
      const refresh = await refreshAccessToken()

      localStorage.setItem('auth_token', refresh)

      return next()
    }

    next()
  } catch (error) {
    localStorage.removeItem('auth_token')
    next({ name: 'Login' })
    console.log(error)
  }
})

async function refreshAccessToken() {
  const res = await fetch('http://localhost:5000/user/oauth/token', {
    method: 'POST',
    credentials: 'include',
  })

  if (!res.ok) {
    localStorage.removeItem('auth_token')
    throw new Error('Refresh token tidak valid. Mohon login ulang.')
  }

  const data = await res.json()
  return data.access_token
}

export default router
