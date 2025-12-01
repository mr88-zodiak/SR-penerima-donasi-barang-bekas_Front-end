<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import DeleteData from '@/components/Modal/ModalDeleteData.vue'
import { usePenerima } from '@/store/penerima'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import ModalUpdatePenerima from '@/components/Modal/ModalUpdatePenerima.vue'
import ModaladdKebutuhan from '@/components/Modal/ModaladdKebutuhan.vue'
const penerima = usePenerima()
const isModelOpen = ref(false)
const isModalUpdateOpen = ref(false)
const theme = useTheme()
const selectedItemId = ref(null)
const selectedItemName = ref('')

const API_CONFIG = {
  url: 'http://localhost:5000/penerima/api/delete/penerima/',
  token: localStorage.getItem('token'),
}

onMounted(async () => {
  await penerima.getDataPenerima()
  socket.on('data_update', async (data) => {
    console.log(data)
    await penerima.getDataPenerima()
  })
})
onUnmounted(() => socket.off('data_update'))

const currentStep = ref('register')
const openDeleteModal = (item) => {
  selectedItemId.value = item.no
  selectedItemName.value = item.nama
  isModelOpen.value = true
}
const openUpdateModal = (item) => {
  selectedItemId.value = item.no
  isModalUpdateOpen.value = true
}
console.log(selectedItemId.value)
const openDataDiri = () => {
  currentStep.value = 'datadiri'
  isModalUpdateOpen.value = true
}
const closeUpdateModal = () => {
  isModalUpdateOpen.value = false
  selectedItemId.value = null
}

const closeDeleteModal = () => {
  isModelOpen.value = false
  selectedItemId.value = null
  selectedItemName.value = ''
}
const handleDeleteSuccess = async () => {
  closeDeleteModal()
  await penerima.getDataPenerima()
}
const role = ref('penerima')
</script>

<template>
  <div
    class="penerima w-full h-screen bg-gray-100 p-4"
    :class="{ 'dark:bg-gray-800': theme.isdarkMode }"
  >
    <Search_action :displayA="'flex'" :display="'flex'" :role="'penerima'" />
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
            <th scope="col" class="px-6 py-3 uppercase">nama barang</th>
            <th scope="col" class="px-6 py-3 uppercase">jenis barang</th>
            <th scope="col" class="px-6 py-3 uppercase">status</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal approve</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal reject</th>
            <th scope="col" class="px-6 py-3 uppercase">alasan reject</th>
            <th
              scope="col"
              class="px-6 py-3 uppercase"
              v-if="penerima.tableDataPenerima.some((item) => item.status !== 'pending')"
            >
              action
            </th>
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
            v-for="item in penerima.tableDataPenerima"
            :key="item.no"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
            >
              {{ item.no }}
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
              {{ item.penghasilan_perbulan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jumlah_tanggungan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jumlah_kendaraan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.status_tempat_tinggal }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.kategori }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jenis_kebutuhan }}
            </td>
            <!-- <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jumlah }}
            </td> -->
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.login_stamp }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.register }}
            </td>
            <td
              class="px-6 py-4 flex items-center space-x-2"
              v-if="penerima.tableDataPenerima.some((item) => item.status !== 'pending')"
            >
              <button
                class="text-white p-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
                @click="openUpdateModal(item)"
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
          <tr v-if="penerima.totalDataPenerima === 0">
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
                <p>Akun penerima belum ditambahkan :)</p>
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
    <ModalUpdatePenerima
      v-show="currentStep === 'register' && role === 'penerima'"
      :isOpen="isModalUpdateOpen"
      @close="closeUpdateModal"
      @next="openDataDiri"
      :id="selectedItemId"
    />

    <ModaladdKebutuhan
      v-show="currentStep === 'datadiri' && role === 'penerima'"
      :isOpen="isModalUpdateOpen"
      @close="closeUpdateModal"
      :id="selectedItemId"
    />
  </div>
</template>
