// // export default router
// import { createRouter, createWebHistory } from 'vue-router'
// import Admin from '../views/Admin/AdminPage.vue'
// import { jwtDecode } from 'jwt-decode'

// const routes = [
//   {
//     // -----admin page-----
//     path: '/',
//     component: Admin,
//     default: true,
//     children: [
//       {
//         path: '',
//         redirect: { name: 'dashboard' },
//       },
//       {
//         path: 'dashboard',
//         name: 'dashboard',
//         meta: { title: 'Dashboard', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/Dashboard.vue'),
//       },
//       {
//         path: 'donasi',
//         name: 'donasi',
//         meta: { title: 'Riwayat Donasi', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/RiwayatDonasi.vue'),
//       },
//       {
//         path: 'kebutuhan',
//         name: 'kebutuhan',
//         meta: { title: 'Kebutuhan', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/Kebutuhan.vue'),
//       },
//       {
//         path: 'barang',
//         name: 'barang',
//         meta: { title: 'Barang', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/Barang.vue'),
//       },
//       {
//         path: 'cek-kelayakan',
//         name: 'cek kelayakan',
//         meta: { title: 'Cek kelayakan', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/klasifikasi.vue'),
//       },
//       {
//         path: 'donatur/account',
//         name: 'donatur account',
//         meta: { title: 'Donatur', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/AccountDonatur.vue'),
//       },
//       {
//         path: 'penerima/account',
//         name: 'penerima account',
//         meta: { title: 'Penerima', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/AccountPenerima.vue'),
//       },
//       {
//         path: 'activity/role',
//         name: 'aktivitas user',
//         meta: { title: 'Activity', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/Aktifitas.vue'),
//       },
//       {
//         path: 'auth',
//         name: 'auth',
//         meta: { title: 'Auth', requiresAuth: true, role: 'admin' },
//         component: () => import('../Page/Authorization.vue'),
//       },
//     ],
//   },

//   // -----login & register-----
//   {
//     path: '/DonasiKita/login',
//     name: 'Login',
//     meta: { title: 'Login' },
//     component: () => import('../views/Donatur/LoginDonatur.vue'),
//   },
//   {
//     path: '/DonasiKita/register',
//     name: 'Register',
//     meta: { title: 'Register' },
//     component: () => import('../views/Donatur/DaftarDonaturAkun.vue'),
//   },
//   {
//     path: '/DonasiKita/register/datadiri',
//     name: 'registerDataDiri',
//     meta: { title: 'Register Data Diri' },
//     component: () => import('../views/Penerima/DaftarPenerimaData.vue'),
//   },

//   // -----donatur page-----
//   {
//     path: '/DonasiKita/donatur/dashboard',
//     name: 'DonaturHome',
//     meta: { title: 'Home Donatur', requiresAuth: true, role: 'donatur' },
//     component: () => import('../views/Donatur/DonaturPage.vue'),
//   },
//   {
//     path: '/DonasiKita/donatur/donate/:id/checkout',
//     name: 'DonaturCheckout',
//     meta: { title: 'Checkout Donatur', requiresAuth: true, role: 'donatur' },
//     component: () => import('../Page/CheckOutPage.vue'),
//   },

//   // -----landing page-----
//   {
//     path: '/DonasiKita/',
//     name: 'landingPage',
//     meta: { title: 'Landing Page' },
//     component: () => import('../views/landing_page/Home.vue'),
//   },

//   // -----penerima page-----
//   {
//     path: '/DonasiKita/penerima',
//     name: 'PenerimaHome',
//     meta: { title: 'Home Penerima', requiresAuth: true, role: 'penerima' },
//     component: () => import('../views/Penerima/PenerimaPage.vue'),
//     // ✅ kalau mau aktifkan children nanti, pastikan tanpa slash di depan path
//     // children: [
//     //   {
//     //     path: 'dashboard',
//     //     name: 'PenerimaDashboard',
//     //     meta: { title: 'Dashboard Penerima', requiresAuth: true, role: 'penerima' },
//     //     component: () => import('../views/Penerima/DashboardPenerima.vue'),
//     //   },
//     //   {
//     //     path: 'informasi-donasi',
//     //     name: 'InformasiDonasi',
//     //     meta: { title: 'Informasi Donasi', requiresAuth: true, role: 'penerima' },
//     //     component: () => import('../views/Penerima/InfoDonasi.vue'),
//     //   },
//     // ],
//   },

//   // -----not found page-----
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     meta: { title: 'Not Found' },
//     component: () => import('../views/PageNotFount.vue'),
//   },
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// })
// async function refreshAccessToken(roleKey) {
//   try {
//     const res = await fetch('http://localhost:5000/user/api/token/refresh', {
//       method: 'POST',
//       credentials: 'include', // cookie HttpOnly dikirim otomatis
//     })
//     if (!res.ok) throw new Error('Refresh token expired')
//     const data = await res.json()
//     localStorage.setItem(roleKey, data.access_token)
//     return data.access_token
//   } catch (err) {
//     localStorage.removeItem(roleKey)
//     throw err
//   }
// }

// router.beforeEach(async (to, from, next) => {
//   if (!to.meta.requiresAuth) return next()

//   const tokenKeys = {
//     admin: 'token',
//     donatur: 'token_donatur',
//     penerima: 'token_penerima',
//   }
//   const key = tokenKeys[to.meta.role]
//   let token = localStorage.getItem(key)

//   if (!token) return next({ name: 'Login', replace: true })

//   try {
//     const decoded = jwtDecode(token)

//     if (decoded.exp * 1000 < Date.now()) {
//       try {
//         token = await refreshAccessToken(key)
//       } catch (err) {
//         return next({ name: 'Login', replace: true, error: err })
//       }
//     }

//     if (to.meta.role && jwtDecode(token).role !== to.meta.role) {
//       return next({ name: 'Login', replace: true })
//     }
//     next()
//   } catch (e) {
//     console.error(e)
//     localStorage.removeItem(key)
//     next({ name: 'Login', replace: true })
//   }
// })

// // 🧭 Update title halaman otomatis
// router.afterEach((to) => {
//   document.title = to.meta.title || 'DonasiKita'
// })

// export default router
// export default router
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/Admin/AdminPage.vue'
import { jwtDecode } from 'jwt-decode'

const routes = [
  // ... (Definisi rute Anda tidak berubah)
  {
    // -----admin page-----
    path: '/',
    component: Admin,
    default: true,
    children: [
      // ... (Rute anak-anak Admin)
      { path: '', redirect: { name: 'dashboard' } },
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
      {
        path: 'dokumentasi',
        name: 'dokumentasi',
        meta: { title: 'Dokumentasi', requiresAuth: true, role: 'admin' },
        component: () => import('../Page/Dokumentasi.vue'),
      },
      {
        path: 'verifikasi-donatur',
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
    path: '/DonasiKita/',
    name: 'landingPage',
    meta: { title: 'Landing Page' },
    component: () => import('../views/landing_page/Home.vue'),
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
