import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
  HomeIcon,
  BanknotesIcon,
  UserCircleIcon,
  UserGroupIcon,
  HandRaisedIcon,
} from '@heroicons/vue/24/outline'

export const useDataAdmin = defineStore('dataAdmin', () => {
  const itemMenu = reactive([
    { id: 1, name: 'Dashboard', icon: HomeIcon, link: '/dashboard', active: true },
    { id: 2, name: 'Donasi', icon: BanknotesIcon, link: '/donasi', active: false },
    { id: 3, name: 'Barang', icon: UserCircleIcon, link: '/barang', active: false },
    { id: 4, name: 'Penerima', icon: UserGroupIcon, link: '/penerima', active: false },
    { id: 4, name: 'Donatur', icon: HandRaisedIcon, link: '/donatur', active: false },
  ])

  return { itemMenu }
})
