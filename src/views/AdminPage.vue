<script setup>
import { ref, reactive } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Bars3Icon, MoonIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
import {
  SunIcon,
  HomeIcon,
  // BanknotesIcon,
  UserGroupIcon,
  // UserCircleIcon,
  // HandRaisedIcon,
} from '@heroicons/vue/24/outline'
import SideBar from '@/components/SideBar.vue'
import ModalLogout from '@/components/Modal/Logout.vue'
import { provide } from 'vue'
const isOpen = ref(false)
const ismodalOpen = ref(false)
// const isdarkMode = ref(false)
const isdarkMode = ref(localStorage.getItem('DarkMode') === 'true')
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
const route = useRoute()
const toggleDarkMode = () => {
  isdarkMode.value = !isdarkMode.value
  if (isdarkMode.value) {
    document.documentElement.classList.add('dark:bg-gray-800')
  } else {
    document.documentElement.classList.remove('dark:bg-gray-800')
  }
}
const itemMenu = reactive([
  { id: 1, name: 'Dashboard', icon: HomeIcon, link: '/dashboard', active: true },
  // { id: 2, name: 'Donasi', icon: BanknotesIcon, link: '/donasi', active: false },
  // { id: 3, name: 'Barang', icon: UserCircleIcon, link: '/barang', active: false },
  { id: 2, name: 'Penerima', icon: UserGroupIcon, link: '/penerima', active: false },
  // { id: 4, name: 'Donatur', icon: HandRaisedIcon, link: '/donatur', active: false },
])

watch(isdarkMode, (value) => {
  localStorage.setItem('DarkMode', value)
})
provide('isdarkMode', isdarkMode)
</script>

<template>
  <header>
    <SideBar :isOpen="isOpen" :is-dark-mode="isdarkMode" :itemMenu="itemMenu" />
    <div
      class="container mx-auto overflow-auto bg-white shadow-md p-4 max-w-full h-full transition-all duration-300 ease-in-out text-black fixed"
      :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <div
        class="row flex items-center justify-between shadow-lg p-4 bg-inherit rounded-lg"
        :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
      >
        <div class="bungkus flex items-center space-x-10">
          <div class="flex items-center transition duration-300 ease-in-out">
            <Bars3Icon
              class="h-6 w-6 text-gray-500 cursor-pointer ml-2"
              @click="toggleSidebar"
              :class="isOpen ? 'hidden' : 'block'"
            />
            <XMarkIcon
              class="h-6 w-6 text-gray-500 cursor-pointer ml-2"
              :class="isOpen ? 'block' : 'hidden'"
              @click="toggleSidebar"
            />
          </div>
          <SunIcon
            class="h-6 w-6 text-yellow-500 cursor-pointer"
            :class="isdarkMode ? 'block' : 'hidden'"
            @click="toggleDarkMode"
          />
          <MoonIcon
            class="h-6 w-6 text-gray-500 cursor-pointer ml-2"
            :class="isdarkMode ? 'hidden' : 'block'"
            @click="toggleDarkMode"
          />
        </div>
        <div
          id="popup-modal"
          class="profile font-bold cursor-pointer hover:text-gray-700"
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          @click="ismodalOpen = !ismodalOpen"
        >
          <h1>{{ ismodalOpen ? '[-] ' : '[+] ' }}{{ route.meta.title }}</h1>
          <ModalLogout
            :isOpen="ismodalOpen"
            data_modal_target="popup-modal"
            @close="ismodalOpen = false"
          />
        </div>
      </div>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </header>
</template>
