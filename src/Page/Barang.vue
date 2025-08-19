<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, onMounted } from 'vue'
import Search_action from '@/components/Search_action.vue'
const isdarkMode = inject('isdarkMode')
import { useDataBarang } from '@/store/dataBarang'

const barang = useDataBarang()

onMounted(() => {
  barang.tableData
})
</script>

<template>
  <div class="Barang">
    <Search_action :display="'hidden'" />
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right"
        :class="isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs"
          :class="
            isdarkMode
              ? 'dark:bg-gray-700 dark:text-gray-400'
              : 'text-gray-700 uppercase bg-gray-50 '
          "
        >
          <tr>
            <th scope="col" class="px-6 py-3 uppercase">#id</th>
            <th scope="col" class="px-6 py-3 uppercase">nama donatur</th>
            <th scope="col" class="px-6 py-3 uppercase">nama barang</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal masuk</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal approve</th>
            <th scope="col" class="px-6 py-3 uppercase">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b"
            :class="isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
            v-for="item in barang.tableData"
            :key="item.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap"
              :class="isdarkMode ? 'dark:text-white' : 'text-gray-900'"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.donaturName }}</td>
            <td class="px-6 py-4">{{ item.barangName }}</td>
            <td class="px-6 py-4">{{ item.tanggal_masuk }}</td>
            <td class="px-6 py-4">{{ item.tanggal_disetujui }}</td>
            <div v-if="barang.tableData.length > 0">
              <td class="px-6 py-4 flex items-center space-x-2">
                <button
                  class="cursor-pointer mt-4 px-4 py-2 bg-green-300 text-white rounded hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  edit
                </button>
                <button
                  class="cursor-pointer mt-4 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  hapus
                </button>
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
