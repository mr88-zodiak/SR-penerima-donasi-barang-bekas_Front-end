<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Search_action from '@/components/Search_action.vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import ModalFeedback from '@/components/Modal/ModalFeedback.vue'
import { useDataDonasi } from '@/store/dataDonasi'
import { useBarang } from '@/store/barang'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import { useDokumentasi } from '@/store/dokumentasi'

const theme = useTheme()
const barang = useBarang()
const donasi = useDataDonasi()

// Modal state
const isModalOpen = ref(false)
const isRejectOpen = ref(false)
const selectedItemId = ref(null)
const selectedItemName = ref('')
console.log(selectedItemName.value)

onMounted(async () => {
  await barang.getDataBarang()
  await storeDokumentasi.getDokumentasi()
  barang.tableDataBarang.forEach((item) => {
    item.newStatus = item.statusPengiriman || 'delivering'
  })
  socket.on('data_update', async (data) => {
    console.log(data)
    await barang.getDataBarang()
    await storeDokumentasi.getDokumentasi()
    barang.tableDataBarang.forEach((item) => {
      item.newStatus = item.statusPengiriman || 'delivering'
    })
  })
})

const cekStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'text-yellow-500'
    case 'approved':
      return 'text-green-500'
    case 'rejected':
      return 'text-red-500'
  }
}

onUnmounted(() => socket.off('data_update'))

const openDeleteModal = (item) => {
  selectedItemId.value = item.id_barang
  selectedItemName.value = item.barangName
  isModalOpen.value = true
}
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return barang.tableDataBarang.slice(first.value, first.value + rows.value)
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
  await barang.getDataBarang()
}

// Handle reject modal
const openRejectModal = (item) => {
  selectedItemId.value = item.id_barang
  isRejectOpen.value = true
}

const closeRejectModal = () => {
  isRejectOpen.value = false
  selectedItemId.value = null
}
const storeDokumentasi = useDokumentasi()
const handleFileInput = async (e, id) => {
  const file = e.target.files[0]
  await storeDokumentasi.addDokumentasi(id, file)
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
// const handleStatusChange = async (item) => {
//   if (item.newStatus === 'done') {
//     await donasi.selesaikanDonasi(item.id)
//     item.statusPengiriman = 'done'
//   }
// }
</script>

<template>
  <div
    class="barang w-full min-h-screen p-4 transition-colors duration-300"
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
          :class="theme.isdarkMode ? 'bg-gray-700 dark:text-gray-400' : 'bg-white text-gray-700'"
        >
          <tr>
            <th scope="col" class="px-4 py-4">ID</th>
            <th scope="col" class="px-4 py-4">Donatur & Barang</th>
            <th scope="col" class="px-4 py-4">Kondisi</th>
            <th scope="col" class="px-4 py-4">Visual</th>
            <th scope="col" class="px-4 py-4">Logistik</th>
            <th scope="col" class="px-4 py-4 text-center">Status Appr.</th>
            <th scope="col" class="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, id) in paginatedData"
            :key="item.id"
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'dark:bg-gray-800' : 'bg-white'"
          >
            <td class="px-4 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </td>

            <td class="px-4 py-4">
              <div class="font-semibold text-gray-900 dark:text-white">{{ item.barangName }}</div>
              <div class="text-[10px] opacity-60">Donatur: {{ item.donaturName }}</div>
            </td>

            <td class="px-4 py-4">
              <span class="italic">{{ item.kondisi }}</span>
            </td>

            <td class="px-4 py-4">
              <img
                v-if="item.gambar"
                :src="item.gambar"
                :alt="`Gambar ${item.barangName}`"
                class="w-12 h-12 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:scale-150 transition-transform cursor-zoom-in"
                @error="$event.target.style.display = 'none'"
              />
              <div
                v-else
                class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-[8px] text-gray-400 uppercase"
              >
                No Image
              </div>
            </td>

            <td class="px-4 py-4">
              <div class="text-[10px] font-medium">{{ formatStatus(item.statusPengiriman) }}</div>
              <div class="text-[9px] opacity-50">{{ item.tanggal_masuk || 'Belum masuk' }}</div>
            </td>

            <td class="px-4 py-4 text-center">
              <span class="px-2 py-1 rounded text-[10px] font-bold" :class="cekStatus(item.status)">
                {{ item.status }}
              </span>
            </td>

            <td class="px-4 py-4">
              <div class="flex items-center justify-center gap-2">
                <template v-if="formatStatus(item.statusPengiriman) === 'Barang dalam perjalanan'">
                  <label
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] font-medium cursor-pointer transition-all active:scale-95"
                  >
                    <span>Upload</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      @change="handleFileInput($event, item.id)"
                      name="file"
                      class="hidden"
                    />
                  </label>
                </template>

                <template v-if="item.tanggal_masuk !== null">
                  <button
                    @click="openDeleteModal(item)"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95"
                  >
                    Hapus
                  </button>
                </template>
                <template v-else>
                  <button
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95"
                    @click="donasi.approveData(item.id_barang)"
                  >
                    Approve
                  </button>
                  <button
                    class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95"
                    @click="openRejectModal(item)"
                  >
                    Reject
                  </button>
                </template>
              </div>
            </td>
          </tr>

          <tr v-if="barang.tableDataBarang.length === 0">
            <td class="text-center py-12" colspan="7">
              <div class="flex flex-col items-center opacity-30">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p class="text-xs font-bold uppercase tracking-widest">Tidak ada data barang</p>
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
        :totalRecords="barang.tableDataBarang.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="barang.tableDataBarang.length > 0"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :class="
          theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        "
      />
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
