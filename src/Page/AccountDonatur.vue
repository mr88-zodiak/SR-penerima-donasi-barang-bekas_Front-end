<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import { useDonatur } from '@/store/donatur'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import ModalUpdateDonatur from '@/components/Modal/ModalUpdateDonatur.vue'
const donatur = useDonatur()
const isModelOpen = ref(false)
const theme = useTheme()
const selectedItemId = ref(null)
const isUpdateModal = ref(false)
const selectedItemName = ref('')
const API_CONFIG = {
  url: 'http://localhost:5000/penerima/api/delete/donatur/',
  token: localStorage.getItem('token'),
}

onMounted(async () => {
  await donatur.getDataDonatur()
  socket.on('data_update', async (data) => {
    console.log(data)
    await donatur.getDataDonatur()
  })
})
onUnmounted(() => socket.off('data_update'))

const openDeleteModal = (item) => {
  selectedItemId.value = item.id
  selectedItemName.value = item.barangName
  isModelOpen.value = true
}
const OpenModalUpdate = (item) => {
  isUpdateModal.value = true
  selectedItemId.value = item.id
}
const CloseModalUpdate = () => {
  isUpdateModal.value = false
}
const closeDeleteModal = () => {
  isModelOpen.value = false
  selectedItemId.value = null
  selectedItemName.value = ''
}
const handleDeleteSuccess = async () => {
  closeDeleteModal()
  await donatur.getDataDonatur()
}
</script>

<template>
  <div
    class="donatur w-full h-screen bg-gray-100 p-4"
    :class="{ 'dark:bg-gray-800': theme.isdarkMode }"
  >
    <Search_action :displayC="'flex'" :display="'flex'" :role="'donatur'" />
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs"
          :class="
            theme.isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50 text-gray-700'
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3 uppercase">#id</th>
            <th scope="col" class="px-6 py-3 uppercase">nama</th>
            <th scope="col" class="px-6 py-3 uppercase">email</th>
            <th scope="col" class="px-6 py-3 uppercase">username</th>
            <th scope="col" class="px-6 py-3 uppercase">password</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal login</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal daftar</th>
            <th scope="col" class="px-6 py-3 uppercase" v-if="donatur.totalData > 0">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            :class="
              theme.isdarkMode
                ? 'dark:bg-gray-800 dark:border-gray-700'
                : 'border-gray-200 bg-white'
            "
            v-for="item in donatur.tableDataDonatur"
            :key="item.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.nama }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.email }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.username }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.password }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.login }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.register }}
            </td>
            <td class="px-6 py-4 flex items-center space-x-2" v-if="donatur.totalData > 0">
              <button
                class="text-white p-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
                @click="OpenModalUpdate(item)"
              >
                Edit
              </button>
              <button
                id="popup-modal"
                class="text-white p-2 rounded dark:bg-red-500 dark:hover:bg-red-600 cursor-pointer"
                @click="openDeleteModal(item)"
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="donatur.totalData === 0">
            <td
              class="text-center py-8 text-gray-500"
              :class="{ 'dark:text-gray-400': theme.isdarkMode }"
              colspan="6"
            >
              <div class="flex flex-col items-center space-y-2">
                <svg
                  class="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p>Akun donatur belum ditambahkan :)</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DeleteData
      v-if="isModelOpen"
      :isOpen="isModelOpen"
      :urlDelete="API_CONFIG.url"
      :token="API_CONFIG.token"
      :dataId="selectedItemId"
      :itemName="selectedItemName"
      @close="closeDeleteModal"
      @success="handleDeleteSuccess"
    />
    <ModalUpdateDonatur :isOpen="isUpdateModal" @close="CloseModalUpdate" :id="selectedItemId" />
  </div>
</template>
<style scoped>
/* Optional: Loading state styles */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Optional: Better image loading */
img {
  transition: opacity 0.3s ease;
}

img[src=''],
img:not([src]) {
  opacity: 0;
}
</style>
