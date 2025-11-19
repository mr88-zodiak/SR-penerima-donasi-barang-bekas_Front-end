<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { usePenerima } from '@/store/penerima'
import { useTheme } from '@/store/themeStore'
import { onMounted, onUnmounted } from 'vue'

const theme = useTheme()
const penerima = usePenerima()

let interval
onMounted(() => {
  penerima.getDataInfoDonasi()
  interval = setInterval(() => {
    penerima.getDataInfoDonasi()
  }, 3000)
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div
    class="donatur w-full h-screen bg-gray-100 p-4 mt-10 fixed"
    :class="{ 'dark:bg-gray-800': theme.isdarkMode }"
  >
    <Search_action />
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
            <th scope="col" class="px-6 py-3 uppercase">nama donatur</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal donasi</th>
            <th scope="col" class="px-6 py-3 uppercase">gambar barang</th>
            <th scope="col" class="px-6 py-3 uppercase">jenis barang</th>
            <!-- <th scope="col" class="px-6 py-3 uppercase">status</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal daftar</th> -->
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
            v-for="item in penerima.tableDataPenerimaInfo"
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
              {{ item.donaturName }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.tanggalDonasi }}
            </td>
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              <img
                v-if="item.gambarBarang"
                :src="item.gambarBarang"
                :alt="`Gambar ${item.jenisBarang}`"
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
            <td class="px-6 py-4 text-black" :class="{ 'dark:text-white': theme.isdarkMode }">
              {{ item.jenisBarang }}
            </td>
            <!-- <td class="px-6 py-4 flex items-center space-x-2" v-if="donatur.totalData > 0">
              <button
                id="popup-modal"
                class="text-white p-2 rounded dark:bg-red-500 dark:hover:bg-red-600 cursor-pointer"
                @click="openDeleteModal(item)"
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
              >
                Delete
              </button>
            </td> -->
          </tr>
          <tr v-if="penerima.totalDataInfoPenerima === 0">
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
  </div>
</template>
