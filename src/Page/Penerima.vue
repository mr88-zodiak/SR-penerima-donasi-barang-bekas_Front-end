<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, onMounted, provide } from 'vue'
import { useDataPenerima } from '@/store/dataPenerima'
import Search_action from '@/components/Search_action.vue'
// import UploadFile from '@/components/UploadFile.vue'
const penerima = useDataPenerima()

onMounted(() => {
  penerima.dataTable
})

const cekLayak = (item) => {
  if (item.layak == true) {
    return 'Layak'
  } else {
    return 'Tidak'
  }
}
const colorKelayakan = (item) => {
  return item.layak ? 'text-green-500' : 'text-red-500'
}
const isdarkMode = inject('isdarkMode')
provide('data', penerima)
</script>

<template>
  <div class="penerima w-full h-screen bg-gray-100 p-4" :class="{ 'dark:bg-gray-800': isdarkMode }">
    <Search_action />
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right"
        :class="isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
      >
        <thead
          class="text-xs uppercase"
          :class="isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50 text-gray-700'"
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
            :class="isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200'"
            v-for="item in penerima.dataTable.items"
            :key="item.no"
          >
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item.no }}
            </td>
            <td class="px-6 py-4">{{ item.nama }}</td>
            <td class="px-6 py-4">{{ item.penghasilan }}</td>
            <td class="px-6 py-4">{{ item.tanggungan }}</td>
            <td class="px-6 py-4">{{ item.kendaraan }}</td>
            <td class="px-6 py-4">{{ item.statusTinggal }}</td>
            <td class="px-6 py-4">{{ item.jenisKebutuhan }}</td>
            <td class="px-6 py-4" :class="colorKelayakan(item)">{{ cekLayak(item) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
