<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
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

const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return donasi.tableData.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
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
  <div
    class="donasi w-full min-h-screen p-4 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <Search_action :display="'hidden'" :displayB="'hidden'" />

    <div
      class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <table
        class="w-full text-xs text-left"
        :class="theme.isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
          :class="theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'"
        >
          <tr>
            <th scope="col" class="px-6 py-4">#id</th>
            <th scope="col" class="px-6 py-4">Pihak Terkait</th>
            <th scope="col" class="px-6 py-4">Detail Barang</th>
            <th scope="col" class="px-6 py-4">Timeline Donasi</th>
            <th scope="col" class="px-6 py-4">Pesan</th>
            <th scope="col" class="px-6 py-4 text-center">Status</th>
            <th
              scope="col"
              class="px-6 py-4 text-center"
              v-if="donasi.tableData.some((item) => item.status === 'pending')"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, id) in paginatedData"
            :key="item.id"
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'dark:bg-gray-800' : 'bg-white'"
          >
            <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </td>

            <td class="px-6 py-4 space-y-1">
              <div class="flex items-center space-x-1">
                <span class="text-[10px] opacity-50 w-8">From:</span>
                <router-link
                  to="/donatur/account"
                  class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {{ item.donaturName }}
                </router-link>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-[10px] opacity-50 w-8">To:</span>
                <router-link
                  to="/penerima/account"
                  class="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                >
                  {{ item.penerimaName }}
                </router-link>
              </div>
            </td>

            <td class="px-6 py-4">
              <router-link
                to="/barang"
                class="font-semibold text-gray-900 dark:text-white block hover:text-blue-500"
              >
                {{ item.jenisBarang }}
              </router-link>
              <span class="text-[10px] italic">{{ item.kondisi }}</span>
            </td>

            <td class="px-6 py-4 text-[10px] leading-relaxed">
              <div class="flex justify-between w-40">
                <span class="opacity-60">Diajukan:</span>
                <span>{{ item.tanggalDonasi }}</span>
              </div>
              <div
                v-if="item.tanggalApprove"
                class="flex justify-between w-40 text-green-600 dark:text-green-400"
              >
                <span class="font-medium">Approve:</span>
                <span>{{ item.tanggalApprove }}</span>
              </div>
              <div v-if="item.tanggalReject" class="flex justify-between w-40 text-red-500">
                <span class="font-medium">Reject:</span>
                <span>{{ item.tanggalReject }}</span>
              </div>
            </td>

            <td class="px-6 py-4 max-w-37.5 truncate" :title="item.pesan">
              {{ item.pesan || '-' }}
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm"
                :class="[
                  cekStatus(item.status),
                  {
                    'bg-yellow-100 text-yellow-700 border border-yellow-200':
                      item.status === 'pending',
                  },
                ]"
              >
                {{ item.status }}
              </span>
            </td>

            <td
              class="px-6 py-4 text-center"
              v-if="donasi.tableData.some((item) => item.status === 'pending')"
            ></td>
          </tr>

          <tr v-if="donasi.tableData.length === 0">
            <td class="text-center py-16" colspan="7">
              <div class="flex flex-col items-center opacity-30">
                <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p class="text-sm font-medium italic">Belum ada riwayat donasi :)</p>
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
        :totalRecords="donasi.tableData.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="donasi.tableData.length > 0"
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
  </div>
</template>
