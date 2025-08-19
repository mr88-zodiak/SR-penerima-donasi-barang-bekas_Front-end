<script setup>
import 'flowbite'
import { reactive, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  itemMenu: {
    type: Array,
    default: () => [],
  },
})
const route = useRoute()
const router = useRouter()
const localMenu = reactive(props.itemMenu.map((item) => ({ ...item })))
const setActiveMenu = (id) => {
  localMenu.forEach((item) => {
    item.active = item.id === id
  })
}
const redirectKe = (menu) => {
  router.push(menu.link)
}
// const sidebarRef = ref(null)
// const sideBarOpen = ref(props.isOpen)

// const handleClickOutside = (event) => {
//   if (sidebarRef.value && !sidebarRef.value.contains(event.target)) {
//     sideBarOpen.value = false
//   }
// }

// onMounted(() => {
//   document.addEventListener('click', handleClickOutside)
// })
// onBeforeUnmount(() => {
//   document.removeEventListener('click', handleClickOutside)
// })

// const isSelected = (id) => {}
</script>
<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 w-64 h-screen transition-all -translate-x-full sm:translate-x-0 shadow-lg shadow-gray-800 duration-300 ease-in-out z-50"
    :class="isOpen ? 'right-0' : '-right-80 '"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto z-0 transition-all duration-300 ease-in-out"
      :class="isDarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-6 me-3 sm:h-7"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap text-black transition-all duration-300 ease-in-out"
          :class="isDarkMode ? 'dark:text-white' : 'text-black'"
          >DonasiKita</span
        >
      </a>
      <ul class="space-y-2 font-medium" v-for="item in localMenu" :key="item.id">
        <li>
          <router-link
            :to="item.link"
            class="flex items-center p-2 rounded-lg group transition-all duration-300 ease-in-out"
            :class="[
              { 'bg-blue-500 hover:bg-blue-300 text-gray-100': route.path === item.link },
              { 'dark:text-white dark:hover:bg-gray-700': isDarkMode },
              {
                'text-gray-900 hover:bg-gray-100 ': route.path !== item.link,
              },
            ]"
            @click="[setActiveMenu(item.id), redirectKe(item)]"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span class="ms-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
