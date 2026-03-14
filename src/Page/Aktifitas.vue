<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePenerima } from '@/store/penerima'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'
import { computed } from 'vue'
const penerima = usePenerima()
const theme = useTheme()

onMounted(async () => {
  await penerima.getDataRole()
  socket.on('data_update', async (data) => {
    console.log(data)
    await penerima.getDataRole()
  })
})
const roleStyle = (item) => {
  if (item.role === 'admin') return 'font-bold text-yellow-500'
  if (item.role === 'penerima') return 'font-bold text-purple-500'
  if (item.role === 'donatur') return 'font-bold text-blue-500'
  return ''
}
onUnmounted(() => socket.off('data_update'))
const cekStatus = (status) => {
  if (status === 'rejected') return 'text-red-500'
  if (status === 'approved') return 'text-green-500'
  if (status === 'pending') return 'text-yellow-400'
  return ''
}
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return penerima.dataRole.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="aktifitas w-full min-h-screen p-4 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <Search_action />

    <div
      class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
          :class="theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'"
        >
          <tr>
            <th scope="col" class="px-6 py-4">#ID</th>
            <th scope="col" class="px-6 py-4">Informasi Akun</th>
            <th scope="col" class="px-6 py-4">Kredensial</th>
            <th scope="col" class="px-6 py-4">Role & Status</th>
            <th scope="col" class="px-6 py-4">Log Aktivitas</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, id) in paginatedData"
            :key="item.no"
            class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            :class="theme.isdarkMode ? 'bg-gray-800' : 'bg-white'"
          >
            <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
              {{ id + 1 }}
            </td>

            <td class="px-6 py-4">
              <div class="font-semibold text-gray-900 dark:text-white">{{ item.nama }}</div>
              <div class="text-[10px] opacity-60">{{ item.email }}</div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center space-x-1">
                <span class="text-[10px] font-medium text-blue-600 dark:text-blue-400"
                  >@{{ item.username }}</span
                >
              </div>
              <div class="text-[10px] font-mono opacity-50">PW: {{ item.password }}</div>
            </td>

            <td class="px-6 py-4">
              <div class="mb-1">
                <span
                  class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border"
                  :class="roleStyle(item)"
                >
                  {{ item.role }}
                </span>
              </div>
              <div class="text-[10px] font-medium italic" :class="cekStatus(item.status)">
                {{ item.status }}
              </div>
            </td>

            <td class="px-6 py-4 text-[10px] leading-relaxed">
              <div
                v-if="item.approved"
                class="flex items-center text-green-600 dark:text-green-400"
              >
                <span class="w-14 opacity-60 font-medium">Acc:</span>
                <span>{{ item.approved }}</span>
              </div>
              <div v-if="item.rejected" class="flex items-center text-red-500">
                <span class="w-14 opacity-60 font-medium">Reject:</span>
                <span>{{ item.rejected }}</span>
              </div>
              <div v-if="!item.approved && !item.rejected" class="text-gray-400 italic">
                Menunggu tindakan...
              </div>
            </td>
          </tr>

          <tr v-if="penerima.totalDataRole === 0">
            <td class="text-center py-16" colspan="5">
              <div class="flex flex-col items-center opacity-30">
                <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-8m0 0V9m0 4h8m-8 0l4-4m0 0l4 4"
                  />
                </svg>
                <p class="text-sm font-medium">Akun penerima belum ditambahkan :)</p>
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
        :totalRecords="penerima.dataRole.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="penerima.dataRole.length > 0"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :class="
          theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        "
      />
    </div>
  </div>
</template>
