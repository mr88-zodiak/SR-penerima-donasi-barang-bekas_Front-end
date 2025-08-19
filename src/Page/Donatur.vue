<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { inject, onMounted } from 'vue'
import { useDataDonatur } from '@/store/dataDonatur'
const donatur = useDataDonatur()
const isdarkMode = inject('isdarkMode')
onMounted(() => {
  donatur.tableData
})
</script>

<template>
  <div class="donatur w-full h-screen bg-gray-100 p-4" :class="{ 'dark:bg-gray-800': isdarkMode }">
    <Search_action />
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs"
          :class="isdarkMode ? 'dark:bg-gray-700 dark:text-gray-400' : 'bg-gray-50 text-gray-700'"
        >
          <tr>
            <th scope="col" class="px-6 py-3 uppercase">#id</th>
            <th scope="col" class="px-6 py-3 uppercase">nama</th>
            <th scope="col" class="px-6 py-3 uppercase">email</th>
            <th scope="col" class="px-6 py-3 uppercase">username</th>
            <th scope="col" class="px-6 py-3 uppercase">password</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal daftar</th>
            <th scope="col" class="px-6 py-3 uppercase">tanggal login</th>
            <th scope="col" class="px-6 py-3 uppercase">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b"
            :class="
              isdarkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'border-gray-200 bg-white'
            "
            v-for="item in donatur.tableData"
            :key="item.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap"
              :class="isdarkMode ? 'dark:text-white' : 'text-gray-900'"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.nama }}</td>
            <td class="px-6 py-4">{{ item.email }}</td>
            <td class="px-6 py-4">{{ item.username }}</td>
            <td class="px-6 py-4">{{ item.password }}</td>
            <td class="px-6 py-4">{{ item.tanggalDaftar }}</td>
            <td class="px-6 py-4">{{ item.tanggalLogin }}</td>
            <td class="px-6 py-4 flex items-center space-x-2">
              <button
                class="text-white p-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                class="text-white p-2 rounded dark:bg-red-500 dark:hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
