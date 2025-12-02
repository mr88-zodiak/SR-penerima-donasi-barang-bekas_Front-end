import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {
  HomeIcon as HomeOutline,
  BanknotesIcon as BanknotesIconOutline,
  UserGroupIcon as UserGroupIconOutline,
  UserIcon as UserIconOutline,
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  ClockIcon as ClockIconOutline,
  KeyIcon as KeyIconOutline,
  PhotoIcon as PhotoIconOutline,
  CheckCircleIcon as CheckCircleIconOutline,
  // HandRaisedIcon,
} from '@heroicons/vue/24/outline'

import {
  UserIcon as UserIconSolid,
  BanknotesIcon as BanknotesIconSolid,
  HomeIcon as HomeSolid,
  UserGroupIcon as UserGroupIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  ClockIcon as ClockIconSolid,
  KeyIcon as KeyIconSolid,
  PhotoIcon as PhotoIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/vue/24/solid'
export const useSideBars = defineStore('dataSideBars', () => {
  const itemMenu = reactive([
    {
      id: 1,
      name: 'Dashboard',
      icon: HomeOutline,
      iconActive: HomeSolid,
      link: '/',
      active: true,
    },
    {
      id: 2,
      name: 'Riwayat donasi',
      icon: BanknotesIconOutline,
      iconActive: BanknotesIconSolid,
      link: '/donasi',
      active: false,
    },
    {
      id: 3,
      name: 'Barang',
      icon: ArchiveBoxIconOutline,
      iconActive: ArchiveBoxIconSolid,
      link: '/barang',
      active: false,
    },
    {
      id: 4,
      name: 'Kebutuhan',
      icon: ArchiveBoxIconOutline,
      iconActive: ArchiveBoxIconSolid,
      link: '/kebutuhan',
      active: false,
    },
    {
      id: 5,
      name: 'Cek kelayakan',
      icon: UserGroupIconOutline,
      iconActive: UserGroupIconSolid,
      link: '/cek-kelayakan',
      active: false,
    },
    {
      id: 6,
      name: 'Account User',
      icon: UserIconOutline,
      iconActive: UserIconSolid,
      link: '/donatur',
      active: false,
      children: [
        { id: 1, name: 'Account Donatur', link: '/donatur/account' },
        // { id: 2, name: 'Account Admin', link: '/admin' },
        { id: 2, name: 'Account Penerima', link: '/penerima/account' },
      ],
    },
    {
      id: 7,
      name: 'Activity',
      icon: ClockIconOutline,
      iconActive: ClockIconSolid,
      link: '/activity/role',
      active: false,
    },
    {
      id: 8,
      name: 'Authentication',
      icon: KeyIconOutline,
      iconActive: KeyIconSolid,
      link: '/auth',
      active: false,
    },
    {
      id: 9,
      name: 'Dokumentasi',
      icon: PhotoIconOutline,
      iconActive: PhotoIconSolid,
      link: '/dokumentasi',
      active: false,
    },
    {
      id: 10,
      name: 'Verifikasi Donatur',
      icon: CheckCircleIconOutline,
      iconActive: CheckCircleIconSolid,
      link: '/verifikasi-donatur',
      active: false,
    },
  ])

  return { itemMenu }
})
