<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Search_action from '@/components/Search_action.vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import ModalFeedback from '@/components/Modal/ModalFeedback.vue'
import { useDataDonasi } from '@/store/dataDonasi'
import { useBarang } from '@/store/barang'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'

const theme = useTheme()
const barang = useBarang()
const donasi = useDataDonasi()

// Modal state
const isModalOpen = ref(false)
const isRejectOpen = ref(false)
const selectedItemId = ref(null)
const selectedItemName = ref('')

onMounted(async () => {
  await barang.getDataBarang()
  barang.tableDataBarang.forEach((item) => {
    item.newStatus = item.statusPengiriman || 'delivering'
  })
  socket.on('data_update', async (data) => {
    console.log(data)
    await barang.getDataBarang()
    barang.tableDataBarang.forEach((item) => {
      item.newStatus = item.statusPengiriman || 'delivering'
    })
  })
})

onUnmounted(() => socket.off('data_update'))

// Handle delete modal
const openDeleteModal = (item) => {
  selectedItemId.value = item.id
  selectedItemName.value = item.barangName
  isModalOpen.value = true
}

const closeDeleteModal = () => {
  isModalOpen.value = false
  selectedItemId.value = null
  selectedItemName.value = ''
}

const handleDeleteSuccess = async () => {
  closeDeleteModal()
  await barang.getDataBarang()
}

// Handle reject modal
const openRejectModal = (item) => {
  selectedItemId.value = item.id
  donasi.rejectItem(item.id) // panggil fungsi reject dari store
  isRejectOpen.value = true
}

const closeRejectModal = () => {
  isRejectOpen.value = false
  selectedItemId.value = null
}

const API_CONFIG = {
  url: 'http://localhost:5000/barang/api/delete/',
  token: localStorage.getItem('token'),
}
const formatStatus = (status) => {
  switch (status) {
    case 'delivering':
      return 'Barang dalam perjalanan'
    case 'pick_up':
      return 'Barang sedang diambil'
    case 'done':
      return 'Selesai'
    default:
      return 'Status tidak diketahui'
  }
}
const handleStatusChange = async (item) => {
  if (item.newStatus === 'done') {
    await donasi.selesaikanDonasi(item.id)
    item.statusPengiriman = 'done'
  }
}
</script>

<template>
  <div class="Barang">
    <Search_action :display="'hidden'" :displayB="'hidden'" />

    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right"
        :class="theme.isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs"
          :class="
            theme.isdarkMode
              ? 'dark:bg-gray-700 dark:text-gray-400'
              : 'text-gray-700 uppercase bg-gray-50'
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3 uppercase">ID</th>
            <th scope="col" class="px-6 py-3 uppercase">Nama Donatur</th>
            <th scope="col" class="px-6 py-3 uppercase">Nama Barang</th>
            <th scope="col" class="px-6 py-3 uppercase">Kondisi Barang</th>
            <th scope="col" class="px-6 py-3 uppercase">Foto Gambar</th>
            <th scope="col" class="px-6 py-3 uppercase">Tanggal Masuk</th>
            <th scope="col" class="px-6 py-3 uppercase">Status</th>
            <th scope="col" class="px-6 py-3 uppercase">Status Pengiriman</th>
            <th scope="col" class="px-6 py-3 uppercase">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in barang.tableDataBarang"
            :key="item.id"
            class="bg-white border-b"
            :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
            >
              {{ item.id }}
            </th>

            <td class="px-6 py-4" :class="theme.isdarkMode ? 'dark:text-white' : 'text-black'">
              {{ item.donaturName }}
            </td>

            <td class="px-6 py-4" :class="theme.isdarkMode ? 'dark:text-white' : 'text-black'">
              {{ item.barangName }}
            </td>

            <td class="px-6 py-4" :class="theme.isdarkMode ? 'dark:text-white' : 'text-black'">
              {{ item.kondisi }}
            </td>

            <td class="px-6 py-4">
              <img
                v-if="item.gambar"
                :src="item.gambar"
                :alt="`Gambar ${item.barangName}`"
                class="w-20 h-20 object-cover rounded shadow-sm"
                @error="$event.target.style.display = 'none'"
              />
              <div
                v-else
                class="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"
              >
                No Image
              </div>
            </td>
            <td class="px-6 py-4">{{ item.tanggal_masuk }}</td>
            <td class="px-6 py-4">{{ item.status }}</td>
            <td class="px-6 py-4">
              <!-- Jika status masih delivering -->
              <div v-if="item.statusPengiriman === 'delivering'">
                <select
                  v-model="item.newStatus"
                  @change="handleStatusChange(item)"
                  class="bg-gray-800 text-white rounded-lg p-2 w-full border border-gray-600"
                >
                  <option :value="item.statusPengiriman">
                    {{ formatStatus(item.statusPengiriman) }}
                  </option>
                  <option value="done">Selesai</option>
                </select>
              </div>

              <!-- Jika status sudah done / pick_up -->
              <p v-else class="text-gray-300">
                {{ formatStatus(item.statusPengiriman) }}
              </p>
            </td>

            <td class="px-6 py-4 space-x-2">
              <template v-if="item.tanggal_masuk !== null">
                <button
                  @click="openDeleteModal(item)"
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                  Hapus
                </button>
              </template>
              <template v-else>
                <button
                  class="bg-green-500 hover:bg-green-600 p-2 rounded text-white cursor-pointer"
                  @click="donasi.approveData(item.id)"
                >
                  Approve
                </button>
                <button
                  class="bg-red-400 hover:bg-red-500 p-2 rounded text-white cursor-pointer"
                  @click="openRejectModal(item)"
                >
                  Reject
                </button>
              </template>
            </td>
          </tr>

          <tr v-if="barang.tableDataBarang.length === 0">
            <td
              class="text-center py-8 text-gray-500"
              :class="{ 'dark:text-gray-400': theme.isdarkMode }"
              colspan="7"
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
                <p>Tidak ada data barang</p>
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

    <ModalFeedback
      v-if="isRejectOpen"
      :isOpen="isRejectOpen"
      :itemId="selectedItemId"
      @close="closeRejectModal"
    />
  </div>
</template>

<style scoped>
img {
  transition: opacity 0.3s ease;
}
img[src=''],
img:not([src]) {
  opacity: 0;
}
</style>
