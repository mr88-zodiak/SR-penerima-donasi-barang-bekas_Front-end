<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, onMounted } from 'vue'
import { useDataDonasi } from '@/store/dataDonasi'
import Search_action from '@/components/Search_action.vue'
const isdarkMode = inject('isdarkMode')
const donasi = useDataDonasi()

onMounted(() => {
  donasi.tableData
})

const cekStatus = (item) => {
  if (item == 'pending') {
    return 'text-yellow-400'
  } else {
    return 'text-green-500'
  }
}
</script>

<template>
  <div class="donasi">
    <Search_action :display="'hidden'" />
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right"
        :class="isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs text-gray-700 uppercase"
          :class="isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50'"
        >
          <tr>
            <th scope="col" class="px-6 py-3 uppercase">#id</th>
            <th scope="col" class="px-6 py-3 uppercase">nama donatur</th>
            <th scope="col" class="px-6 py-3 uppercase">nama penerima</th>
            <th scope="col" class="px-6 py-3 uppercase">jenis barang</th>
            <th scope="col" class="px-6 py-3 uppercase">status</th>
            <th scope="col" class="px-6 py-3 uppercase">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b"
            :class="isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
            v-for="item in donasi.tableData"
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
            <td class="px-6 py-4">{{ item.penerimaName }}</td>
            <td class="px-6 py-4">{{ item.jenisBarang }}</td>
            <td class="px-6 py-4" :class="cekStatus(item.status)">{{ item.status }}</td>
            <div v-if="donasi.tableData.length > 0">
              <td class="px-6 py-4 space-x-2">
                <button
                  class="bg-green-500 hover:bg-green-600 p-2 rounded text-white cursor-pointer"
                  @click="console.log('Action clicked for', item.id)"
                >
                  approve
                </button>
                <button
                  class="bg-red-400 hover:bg-red-500 p-2 rounded text-white cursor-pointer"
                  @click="console.log('Action clicked for', item.id)"
                >
                  reject
                </button>
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
