<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import { useDonatur } from '@/store/donatur'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import ModalUpdateDonatur from '@/components/Modal/ModalUpdateDonatur.vue'
import { computed } from 'vue'
const donatur = useDonatur()
const isModelOpen = ref(false)
const theme = useTheme()
const selectedItemId = ref(null)
const isUpdateModal = ref(false)
const selectedItemName = ref('')
const API_CONFIG = {
  url: 'http://localhost:5000/user/api/delete/donatur/',
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
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return donatur.tableDataDonatur.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="donatur w-full min-h-screen p-4 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <Search_action :displayC="'flex'" :display="'flex'" :role="'donatur'" />

    <div
      class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
          :class="theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'"
        >
          <tr>
            <th scope="col" class="px-6 py-4">#id</th>
            <th scope="col" class="px-6 py-4">Informasi Donatur</th>
            <th scope="col" class="px-6 py-4">Username</th>
            <th scope="col" class="px-4 py-4">Aktivitas</th>
            <th
              scope="col"
              class="px-6 py-4"
              v-if="donatur.tableDataDonatur.some((e) => e.edit_stamp !== null)"
            >
              Terakhir Edit
            </th>
            <th scope="col" class="px-6 py-4 text-center" v-if="donatur.totalData > 0">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'bg-gray-800' : 'bg-white'"
            v-for="(item, id) in paginatedData"
            :key="item.id"
          >
            <th scope="row" class="px-6 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </th>

            <td class="px-6 py-4">
              <div class="font-semibold text-gray-900 dark:text-white">{{ item.nama }}</div>
              <div class="text-[10px] opacity-60 lowercase">{{ item.email }}</div>
            </td>

            <td class="px-6 py-4 font-medium">@{{ item.username }}</td>

            <td class="px-4 py-4 text-[10px] leading-tight">
              <div class="mb-1 text-blue-600 dark:text-blue-400">Masuk: {{ item.login }}</div>
              <div class="opacity-60">Daftar: {{ item.register }}</div>
            </td>

            <td class="px-6 py-4 text-[10px]" v-if="item.edit_stamp !== null">
              {{ item.edit_stamp }}
            </td>

            <td class="px-6 py-4" v-if="donatur.totalData > 0">
              <div class="flex items-center justify-center space-x-2">
                <button
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
                  @click="OpenModalUpdate(item)"
                >
                  Edit
                </button>
                <button
                  id="popup-modal"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
                  @click="openDeleteModal(item)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="donatur.totalData === 0">
            <td
              class="text-center py-12 text-gray-500"
              :class="{ 'dark:text-gray-400': theme.isdarkMode }"
              colspan="6"
            >
              <div class="flex flex-col items-center space-y-3">
                <svg
                  class="w-16 h-16 text-gray-300 dark:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p class="text-sm font-medium">Akun donatur belum ditambahkan :)</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <Paginator
        v-model:first="first"
        :rows="rows"
        :totalRecords="donatur.tableDataDonatur.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="donatur.tableDataDonatur.length > 0"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :class="
          theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        "
      />
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
    <ModalUpdateDonatur
      :isOpen="isUpdateModal"
      @close="CloseModalUpdate"
      :id="selectedItemId"
      :role="'donatur'"
    />
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
