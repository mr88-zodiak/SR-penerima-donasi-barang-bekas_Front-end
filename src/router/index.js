import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/AdminPage.vue'

const routes = [
  {
    path: '',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        default: true,
        meta: { title: 'Dashboard' },
        component: () => import('../Page/Dashboard.vue'),
      },
      {
        path: 'donasi',
        name: 'donasi',
        meta: { title: 'Donasi' },
        component: () => import('../Page/Donasi.vue'),
      },
      {
        path: 'barang',
        name: 'barang',
        meta: { title: 'Barang' },
        component: () => import('../Page/Barang.vue'),
      },
      {
        path: 'penerima',
        name: 'penerima',
        meta: { title: 'Penerima' },
        component: () => import('../Page/Penerima.vue'),
      },
      {
        path: 'donatur',
        name: 'donatur',
        meta: { title: 'Donatur' },
        component: () => import('../Page/Donatur.vue'),
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'Login',
    meta: { title: 'Login' },
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/donatur/login',
    name: 'DonaturLogin',
    meta: { title: 'Login Donatur' },
    component: () => import('../views/LoginDonatur.vue'),
  },
  {
    path: '/donatur/register',
    name: 'DonaturRegister',
    meta: { title: 'Register Donatur' },
    component: () => import('../views/DaftarDonatur.vue'),
  },
  {
    path: '/donatur/home',
    name: 'DonaturHome',
    meta: { title: 'Home Donatur' },
    component: () => import('../views/DonaturPage.vue'),
  },
  {
    path: '/donatur/donasi/:id/checkout',
    name: 'DonaturCheckout',
    meta: { title: 'Checkout Donatur' },
    component: () => import('../Page/CheckOutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
