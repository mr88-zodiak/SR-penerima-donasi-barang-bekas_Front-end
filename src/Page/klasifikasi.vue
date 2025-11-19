<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'
import Search_action from '@/components/Search_action.vue'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'

const klasifikasi = useDataKlasifikasi()

onMounted(async () => {
  await klasifikasi.getData()

  socket.on('data_update', async (data) => {
    console.log(data)
    await klasifikasi.getData()
  })
})
onUnmounted(() => socket.off('data_update'))

const cekLayak = (item) => (item.layak === 0 ? 'layak' : 'tidak')
const colorKelayakan = (item) => (item.layak === 0 ? 'text-green-500' : 'text-red-500')

const theme = useTheme()
</script>

<template>
  <div
    class="klasifikasi w-full h-screen bg-gray-100 p-4"
    :class="{ 'dark:bg-gray-800': theme.isdarkMode }"
  >
    <Search_action :display="'hidden'" :displayB="'hidden'" />
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right"
        :class="theme.isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs uppercase"
          :class="
            theme.isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50 text-gray-700'
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3">#No</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Penghasilan perbulan</th>
            <th scope="col" class="px-6 py-3">Jumlah tanggungan</th>
            <th scope="col" class="px-6 py-3">Jumlah kendaraan</th>
            <th scope="col" class="px-6 py-3">Status tinggal</th>
            <th scope="col" class="px-6 py-3">Jenis kebutuhan</th>
            <th scope="col" class="px-6 py-3">layak</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
            v-for="item in klasifikasi.dataTable"
            :key="item.id"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              :class="{ 'dark:text-white': theme.isdarkMode }"
            >
              {{ item.id }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.name }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.penghasilan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.tanggungan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.kendaraan }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.statusTinggal }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jenisKebutuhan }}
            </td>
            <td class="px-6 py-4" :class="colorKelayakan(item)">{{ cekLayak(item) }}</td>
          </tr>
          <tr v-if="klasifikasi.dataTable.length === 0">
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
                <p>Tidak ada data rekomendasi :)</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
