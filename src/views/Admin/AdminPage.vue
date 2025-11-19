<script setup>
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useSideBars } from '@/store/sideBar'
import { Bars3Icon, MoonIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { SunIcon } from '@heroicons/vue/24/outline'
import SideBar from '@/components/SideBar.vue'
import ModalLogout from '@/components/Modal/ModalLogout.vue'
import { useTheme } from '@/store/themeStore'

const admin = useSideBars()
const route = useRoute()
const isOpen = ref(false)
const ismodalOpen = ref(false)
const theme = useTheme()
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const toggleDarkMode = () => {
  theme.isdarkMode = !theme.isdarkMode
  if (theme.isdarkMode) {
    document.documentElement.classList.add('dark:bg-gray-800')
  } else {
    document.documentElement.classList.remove('dark:bg-gray-800')
  }
}
</script>

<template>
  <header>
    <!-- Sidebar -->
    <SideBar
      :isOpen="isOpen"
      :is-dark-mode="theme.isdarkMode"
      :itemMenu="admin.itemMenu"
      @close="isOpen = false"
    />

    <!-- Navbar -->
    <div
      class="fixed top-0 left-0 w-full z-50 shadow-md p-6 transition-all duration-300 ease-in-out"
      :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <Bars3Icon
            class="h-6 w-6 text-gray-500 cursor-pointer"
            @click="toggleSidebar"
            :class="isOpen ? 'hidden' : 'block'"
          />
          <XMarkIcon
            class="h-6 w-6 text-gray-500 cursor-pointer"
            @click="[toggleSidebar, (ismodalOpen = false)]"
            :class="isOpen ? 'block' : 'hidden'"
          />
          <SunIcon
            class="h-6 w-6 text-yellow-500 cursor-pointer"
            :class="theme.isdarkMode ? 'block' : 'hidden'"
            @click="toggleDarkMode"
          />
          <MoonIcon
            class="h-6 w-6 text-gray-500 cursor-pointer"
            :class="theme.isdarkMode ? 'hidden' : 'block'"
            @click="toggleDarkMode"
          />
        </div>

        <div
          class="font-bold cursor-pointer hover:text-gray-700"
          @click="ismodalOpen = !ismodalOpen"
        >
          <h1>{{ ismodalOpen ? '[-] ' : '[+] ' }}{{ route.meta.title }}</h1>
          <ModalLogout
            :isOpen="ismodalOpen"
            data_modal_target="popup-modal"
            :router_link="'/DonasiKita/login'"
            token="token"
          />
        </div>
      </div>
    </div>

    <!-- Konten Utama -->
    <main
      class="pt-18 px-4 overflow-y-auto h-full"
      :class="theme.isdarkMode ? 'dark:bg-gray-800' : 'bg-gray-100'"
    >
      <!-- Tambahkan padding-top agar konten tidak tertutup navbar -->
      <RouterView />
    </main>
  </header>
</template>
