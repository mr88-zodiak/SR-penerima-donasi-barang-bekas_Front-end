// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin/AdminPage.vue'
import { jwtDecode } from 'jwt-decode'

const routes = [
  {
    // -----admin page-----
    path: '/',
    component: Admin,
    default: true,
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Dashboard.vue'),
      },
      {
        path: 'donasi',
        name: 'donasi',
        meta: { title: 'Riwayat Donasi', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/RiwayatDonasi.vue'),
      },
      {
        path: 'kebutuhan',
        name: 'kebutuhan',
        meta: { title: 'Kebutuhan', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Kebutuhan.vue'),
      },
      {
        path: 'barang',
        name: 'barang',
        meta: { title: 'Barang', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Barang.vue'),
      },
      {
        path: 'cek-kelayakan',
        name: 'cek kelayakan',
        meta: { title: 'Cek kelayakan', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/klasifikasi.vue'),
      },
      {
        path: 'donatur/account',
        name: 'donatur account',
        meta: { title: 'Donatur', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/AccountDonatur.vue'),
      },
      {
        path: 'penerima/account',
        name: 'penerima account',
        meta: { title: 'Penerima', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/AccountPenerima.vue'),
      },
      {
        path: 'activity/role',
        name: 'aktivitas user',
        meta: { title: 'Activity', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Aktifitas.vue'),
      },
      {
        path: 'auth',
        name: 'auth',
        meta: { title: 'Auth', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Authorization.vue'),
      },
    ],
  },

  // -----login & register-----
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

  // -----donatur page-----
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

  // -----landing page-----
  {
    path: '/DonasiKita/',
    name: 'landingPage',
    meta: { title: 'Landing Page' },
    component: () => import('../views/landing_page/Home.vue'),
  },

  // -----penerima page-----
  {
    path: '/DonasiKita/penerima',
    name: 'PenerimaHome',
    meta: { title: 'Home Penerima', requiresAuth: true, role: 'penerima' },
    component: () => import('../views/Penerima/PenerimaPage.vue'),
    // ✅ kalau mau aktifkan children nanti, pastikan tanpa slash di depan path
    // children: [
    //   {
    //     path: 'dashboard',
    //     name: 'PenerimaDashboard',
    //     meta: { title: 'Dashboard Penerima', requiresAuth: true, role: 'penerima' },
    //     component: () => import('../views/Penerima/DashboardPenerima.vue'),
    //   },
    //   {
    //     path: 'informasi-donasi',
    //     name: 'InformasiDonasi',
    //     meta: { title: 'Informasi Donasi', requiresAuth: true, role: 'penerima' },
    //     component: () => import('../views/Penerima/InfoDonasi.vue'),
    //   },
    // ],
  },

  // -----not found page-----
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

// 🔒 Proteksi route berdasarkan role & token
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const tokenKeys = {
    admin: 'token',
    donatur: 'token_donatur',
    penerima: 'token_penerima',
  }

  const key = tokenKeys[to.meta.role]
  const token = localStorage.getItem(key)

  if (!token) return next({ name: 'Login', replace: true })

  try {
    const decoded = jwtDecode(token)

    // token expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem(key)
      return next({ name: 'Login', replace: true })
    }

    // role mismatch
    if (to.meta.role && decoded.role !== to.meta.role) {
      return next({ name: 'Login', replace: true })
    }

    next()
  } catch (e) {
    console.error(e)
    localStorage.removeItem(key)
    next({ name: 'Login', replace: true })
  }
})

// 🧭 Update title halaman otomatis
router.afterEach((to) => {
  document.title = to.meta.title || 'DonasiKita'
})

export default router
