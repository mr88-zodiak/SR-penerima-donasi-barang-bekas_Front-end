<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
  url: 'http://localhost:5000/user/api/delete/penerima/',
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
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return penerima.tableDataPenerima.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="penerima w-full min-h-screen p-4"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <Search_action :displayC="'flex'" :display="'flex'" :role="'penerima'" />

    <div
      class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-[11px] uppercase tracking-wider"
          :class="
            theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600 border-b'
          "
        >
          <tr>
            <th scope="col" class="px-4 py-4">#id</th>
            <th scope="col" class="px-4 py-4">Nama</th>
            <th scope="col" class="px-4 py-4">Kontak (Email/User)</th>
            <th scope="col" class="px-4 py-4">Ekonomi</th>
            <th scope="col" class="px-4 py-4">Tanggungan</th>
            <th scope="col" class="px-4 py-4">Aset</th>
            <th scope="col" class="px-4 py-4">Hunian</th>
            <th scope="col" class="px-4 py-4">Alamat</th>
            <th scope="col" class="px-4 py-4">Kebutuhan</th>
            <th scope="col" class="px-4 py-4">Log/Daftar</th>
            <th
              v-if="penerima.tableDataPenerima.some((e) => e.edit_stamp !== null)"
              scope="col"
              class="px-4 py-4"
            >
              Edit
            </th>
            <th
              v-if="penerima.tableDataPenerima.some((item) => item.status !== 'pending')"
              scope="col"
              class="px-4 py-4 text-center"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, id) in paginatedData"
            :key="item.no"
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'dark:bg-gray-800' : 'bg-white'"
          >
            <th scope="row" class="px-4 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </th>

            <td class="px-4 py-4 font-semibold text-gray-900 dark:text-white">
              {{ item.nama }}
            </td>

            <td class="px-4 py-4 leading-relaxed">
              <div class="text-blue-600 dark:text-blue-400">{{ item.email }}</div>
              <div class="text-[10px] opacity-60">@{{ item.username }}</div>
            </td>

            <td class="px-4 py-4 font-medium text-green-600 dark:text-green-400">
              {{ item.penghasilan_perbulan }}
            </td>

            <td class="px-4 py-4 text-center">{{ item.jumlah_tanggungan }}</td>

            <td class="px-4 py-4 text-center">{{ item.jumlah_kendaraan }} Unit</td>

            <td class="px-4 py-4 whitespace-nowrap">{{ item.status_tempat_tinggal }}</td>

            <td class="px-4 py-4 max-w-50 truncate" :title="item.alamat">
              {{ item.alamat }}
            </td>

            <td class="px-4 py-4">
              <span class="font-medium block uppercase">{{ item.kategori }}</span>
              <span class="text-[10px] italic opacity-70">{{ item.jenis_kebutuhan }}</span>
            </td>

            <td class="px-4 py-4 text-[10px] whitespace-nowrap">
              <div>In: {{ item.login_stamp }}</div>
              <div>Reg: {{ item.register }}</div>
            </td>

            <td v-if="item.edit_stamp" class="px-4 py-4 text-[10px]">
              {{ item.edit_stamp }}
            </td>

            <td v-if="item.status !== 'pending'" class="px-4 py-4">
              <div class="flex items-center justify-center space-x-2">
                <button
                  class="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95"
                  @click="openUpdateModal(item)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1.5 rounded text-[10px] font-medium transition-all active:scale-95"
                  @click="openDeleteModal(item)"
                >
                  Delete
                </button>
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
        :totalRecords="penerima.tableDataPenerima.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="penerima.tableDataPenerima.length > 0"
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
    <ModalUpdatePenerima
      v-show="currentStep === 'register' && role === 'penerima'"
      :isOpen="isModalUpdateOpen"
      @close="closeUpdateModal"
      @next="openDataDiri"
      :id="selectedItemId"
      :role="'penerima'"
    />
    <ModaladdKebutuhan
      v-show="currentStep === 'datadiri' && role === 'penerima'"
      :isOpen="isModalUpdateOpen"
      @close="closeUpdateModal"
      :id="selectedItemId"
    />
  </div>
</template>
