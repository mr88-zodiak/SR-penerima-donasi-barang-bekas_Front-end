<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Search_action from '@/components/Search_action.vue'
import { computed, onMounted, onUnmounted } from 'vue'
import { usePenerima } from '@/store/penerima'
import { useTheme } from '@/store/themeStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import socket from '@/plugins/socket'
import { ref } from 'vue'
const penerima = usePenerima()
const theme = useTheme()

onMounted(async () => {
  await penerima.getDataRole(true)
  socket.on('data_update', async (data) => {
    console.log(data)
    await penerima.getDataRole(false)
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
    class="penerima w-full min-h-screen p-4 transition-colors duration-300"
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
            <th scope="col" class="px-6 py-4">Profil Pengguna</th>
            <th scope="col" class="px-6 py-4">Username</th>
            <th scope="col" class="px-6 py-4">Role & Status</th>
            <th scope="col" class="px-6 py-4">Aktivitas Tanggal</th>
            <th
              scope="col"
              class="px-6 py-4 text-center"
              v-if="penerima.dataRole.some((item) => item.status === 'pending')"
            >
              Konfirmasi
            </th>
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
              <div class="text-[10px] opacity-60 lowercase">{{ item.email }}</div>
            </td>

            <td class="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
              @{{ item.username }}
            </td>

            <td class="px-6 py-4">
              <div class="mb-1">
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                  :class="roleStyle(item)"
                >
                  {{ item.role }}
                </span>
              </div>
              <div
                v-if="['penerima', 'donatur'].includes(item.role)"
                class="text-[10px] font-medium"
                :class="cekStatus(item.status)"
              >
                {{ item.status }}
              </div>
            </td>

            <td class="px-6 py-4 text-[10px] space-y-1">
              <div
                v-if="item.approved && ['penerima', 'donatur'].includes(item.role)"
                class="text-green-600 dark:text-green-400 flex items-center"
              >
                <span class="w-12 opacity-60">Acc:</span>
                <span>{{ item.approved }}</span>
              </div>
              <div
                v-if="item.rejected && ['penerima', 'donatur'].includes(item.role)"
                class="text-red-500 flex items-center"
              >
                <span class="w-12 opacity-60">Rej:</span>
                <span>{{ item.rejected }}</span>
              </div>
              <div v-if="!item.approved && !item.rejected" class="text-gray-400 italic">
                No activity
              </div>
            </td>

            <td class="px-6 py-4" v-if="penerima.dataRole.some((r) => r.status === 'pending')">
              <div
                class="flex items-center justify-center space-x-2"
                v-if="['penerima', 'donatur'].includes(item.role) && item.status === 'pending'"
              >
                <button
                  @click="penerima.approved(item.no)"
                  class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition-all active:scale-95 uppercase"
                >
                  Approve
                </button>
                <button
                  @click="penerima.rejected(item.no)"
                  class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-[10px] font-bold transition-all active:scale-95 uppercase"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="penerima.totalDataRole === 0">
            <td class="text-center py-16" colspan="6">
              <div class="flex flex-col items-center opacity-30">
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p class="text-xs font-bold uppercase tracking-widest">Akun belum ditambahkan</p>
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

  <Loading v-model:active="penerima.isLoading" :is-full-page="true" :lock-scroll="true" />
</template>
