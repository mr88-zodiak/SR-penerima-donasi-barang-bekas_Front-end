<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'
import Search_action from '@/components/Search_action.vue'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import { ref } from 'vue'

const klasifikasi = useDataKlasifikasi()

onMounted(async () => {
  await klasifikasi.getData()

  socket.on('data_update', async (data) => {
    console.log(data)
    await klasifikasi.getData()
  })
})
onUnmounted(() => socket.off('data_update'))

const cekLayak = (item) => (item.layak === 1 ? 'layak' : 'tidak')
const colorKelayakan = (item) => (item.layak === 1 ? 'text-green-500' : 'text-red-500')

const theme = useTheme()
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return klasifikasi.dataTable.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="klasifikasi w-full min-h-screen p-4 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <Search_action :display="'hidden'" :displayB="'hidden'" />

    <div
      class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <table
        class="w-full text-xs text-left"
        :class="theme.isdarkMode ? 'text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
          :class="theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'"
        >
          <tr>
            <th scope="col" class="px-6 py-4">#No</th>
            <th scope="col" class="px-6 py-4">Nama Penerima</th>
            <th scope="col" class="px-6 py-4">Penghasilan</th>
            <th scope="col" class="px-6 py-4 text-center">Tanggungan</th>
            <th scope="col" class="px-6 py-4 text-center">Kendaraan</th>
            <th scope="col" class="px-6 py-4">Status Tinggal</th>
            <th scope="col" class="px-6 py-4">Jenis Kebutuhan</th>
            <th scope="col" class="px-6 py-4 text-center">Keputusan Layak</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, id) in paginatedData"
            :key="item.id"
            class="transition-colors hover:bg-gray-600 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'bg-gray-800' : 'bg-white'"
          >
            <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </td>

            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {{ item.name }}
            </td>

            <td class="px-6 py-4 font-medium text-green-600 dark:text-green-400">
              {{ item.penghasilan }}
            </td>

            <td class="px-6 py-4 text-center">{{ item.tanggungan }} Orang</td>

            <td class="px-6 py-4 text-center">{{ item.kendaraan }} Unit</td>

            <td class="px-6 py-4 whitespace-nowrap">
              {{ item.statusTinggal }}
            </td>

            <td class="px-6 py-4">
              <span
                class="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-medium border border-blue-100 dark:border-blue-800"
              >
                {{ item.jenisKebutuhan }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                :class="colorKelayakan(item)"
              >
                {{ cekLayak(item) }}
              </span>
            </td>
          </tr>

          <tr v-if="klasifikasi.dataTable.length === 0">
            <td class="text-center py-16" colspan="8">
              <div class="flex flex-col items-center space-y-3 opacity-40">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p class="text-sm font-medium">Tidak ada data rekomendasi untuk ditampilkan :)</p>
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
        :totalRecords="klasifikasi.dataTable.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="klasifikasi.dataTable.length > 0"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :class="
          theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        "
      />
    </div>
  </div>
</template>
