<script setup>
import 'flowbite'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

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
const emit = defineEmits(['close'])
const sidebar = ref(null)
onClickOutside(sidebar, () => {
  emit('close')
})
// const route = useRoute()
const router = useRouter()
const localMenu = reactive(props.itemMenu.map((item) => ({ ...item })))
const openDropdowns = reactive({})

const toggleDropdown = (id) => {
  openDropdowns[id] = !openDropdowns[id]
}
const setActiveMenu = (id) => {
  localMenu.forEach((item) => {
    item.active = item.id === id
  })
}
const redirectKe = (menu) => {
  router.push(menu.link)
}
</script>
<template>
  <aside
    id="logo-sidebar"
    ref="sidebar"
    class="fixed top-0 w-64 h-screen transition-all -translate-x-full sm:translate-x-0 shadow-lg shadow-gray-800 duration-300 ease-in-out z-50"
    :class="isOpen ? 'right-0' : '-right-80 '"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto z-0 transition-all duration-300 ease-in-out"
      :class="isDarkMode ? 'dark:bg-gray-800 dark:text-white ' : 'bg-white text-black'"
    >
      <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-6 me-3 sm:h-7"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-xl font-semibold whitespace-nowrap text-black transition-all duration-300 ease-in-out"
          :class="isDarkMode ? 'dark:text-white ' : 'text-black'"
          >DonasiKita</span
        >
      </a>
      <!-- <ul class="space-y-2 font-medium" v-for="item in localMenu" :key="item.id">
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
            <component :is="item.active ? item.iconActive : item.icon" class="w-6 h-6" />
            <span class="ms-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul> -->
      <ul class="space-y-2 font-medium">
        <li v-for="item in localMenu" :key="item.id">
          <!-- Menu Utama -->
          <div
            class="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            :class="item.active ? 'bg-blue-500 text-gray-100' : 'text-gray-900 dark:text-white'"
            @click="
              item.children ? toggleDropdown(item.id) : [setActiveMenu(item.id), redirectKe(item)]
            "
          >
            <div
              class="flex items-center space-x-2"
              :class="isDarkMode ? 'dark:text-white' : 'text-black'"
            >
              <component :is="item.active ? item.iconActive : item.icon" class="w-6 h-6" />
              <span class="">{{ item.name }}</span>
            </div>
            <span
              v-if="item.children"
              class="transition-transform"
              :class="[openDropdowns[item.id] ? 'rotate-90' : '']"
            >
              ▶
            </span>
          </div>

          <!-- Submenu -->
          <ul v-if="item.children && openDropdowns[item.id]" class="ml-6 mt-1 space-y-1">
            <li v-for="child in item.children" :key="child.id">
              <router-link
                :to="child.link"
                class="block p-2 rounded-lg hover:bg-gray-200 text-gray-700 dark:text-gray-400"
                @click="[setActiveMenu(child.id), redirectKe(child)]"
              >
                {{ child.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>
