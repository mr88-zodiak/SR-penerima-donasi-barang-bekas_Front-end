<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useDataDonasi } from '@/store/dataDonasi'
import Search_action from '@/components/Search_action.vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'

const theme = useTheme()
const donasi = useDataDonasi()
const isModalOpen = ref(false)
const selectedItemId = ref(null)
const selectedItemName = ref('')

onMounted(async () => {
  await donasi.getData()
  socket.on('data_update', async (data) => {
    console.log(data)
    await donasi.getData()
  })
})
onUnmounted(() => socket.off('data_update'))
// const openDeleteModal = (item) => {
//   selectedItemId.value = item.id
//   selectedItemName.value = item.barangName
//   isModalOpen.value = true
// }

const closeDeleteModal = () => {
  isModalOpen.value = false
  selectedItemId.value = null
  selectedItemName.value = ''
}

const handleDeleteSuccess = async () => {
  closeDeleteModal()
  await donasi.getData()
}
const API_CONFIG = {
  url: 'http://localhost:5000/donasi/api/delete/',
  token: localStorage.getItem('token'),
}
// Fungsi untuk menentukan warna status
const cekStatus = (status) => (status === 'rejected' ? 'text-red-500' : 'text-green-500')
</script>

<template>
  <div class="donasi">
    <Search_action :display="'hidden'" :displayB="'hidden'" />
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left"
        :class="theme.isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs text-gray-700 uppercase"
          :class="theme.isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50'"
        >
          <tr>
            <th class="px-6 py-3">#id</th>
            <th class="px-6 py-3">Nama Donatur</th>
            <th class="px-6 py-3">Nama Penerima</th>
            <th class="px-6 py-3">Jenis Barang</th>
            <!-- <th class="px-6 py-3">Jumlah</th> -->
            <th class="px-6 py-3">Kondisi Barang</th>
            <th class="px-6 py-3">Tanggal Donasi</th>
            <th class="px-6 py-3">Tanggal approve</th>
            <th class="px-6 py-3">Tanggal reject</th>
            <th class="px-6 py-3">Pesan</th>
            <th class="px-6 py-3">Status</th>
            <!-- <th class="px-6 py-3">Action</th> -->
            <th class="px-6 py-3" v-if="donasi.tableData.some((item) => item.status === 'pending')">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in donasi.tableData"
            :key="item.id"
            class="bg-white border-b"
            :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
          >
            <th class="px-6 py-4" :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'">
              {{ item.id }}
            </th>

            <td
              class="px-6 py-4 cursor-pointer hover:bg-gray-700"
              :class="{ 'dark:text-white': theme.isdarkMode }"
            >
              <router-link to="/donatur/account">
                {{ item.donaturName }}
              </router-link>
            </td>

            <td
              class="px-6 py-4 cursor-pointer hover:bg-gray-700"
              :class="{ 'dark:text-white': theme.isdarkMode }"
            >
              <router-link to="/penerima/account">
                {{ item.penerimaName }}
              </router-link>
            </td>
            <td
              class="px-6 py-4 cursor-pointer hover:bg-gray-700"
              :class="{ 'dark:text-white': theme.isdarkMode }"
            >
              <router-link to="/barang">
                {{ item.jenisBarang }}
              </router-link>
            </td>
            <!-- <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jumlah }}
            </td> -->
            <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.kondisi }}
            </td>
            <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.tanggalDonasi }}
            </td>
            <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.tanggalApprove }}
            </td>
            <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.tanggalReject }}
            </td>
            <td class="px-6 py-4" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.pesan }}
            </td>
            <td
              class="px-6 py-4"
              :class="[cekStatus(item.status), { 'text-yellow-400': item.status === 'pending' }]"
            >
              {{ item.status }}
            </td>
            <!-- <td class="px-6 py-4" v-if="item.status !== 'pending'">
              <div class="flex items-center space-x-2">
                <button
                  @click="openDeleteModal(item)"
                  class="px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </td> -->
          </tr>
          <tr v-if="donasi.tableData.length === 0">
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
                <p>Belum ada yang donasi :)</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DeleteData
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :urlDelete="API_CONFIG.url"
      :token="API_CONFIG.token"
      :dataId="selectedItemId"
      :itemName="selectedItemName"
      @close="closeDeleteModal"
      @success="handleDeleteSuccess"
    />
  </div>
</template>
