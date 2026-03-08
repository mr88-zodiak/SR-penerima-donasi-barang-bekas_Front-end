<script setup>
import { Edit2, Trash2 } from 'lucide-vue-next'
import { usePengajuanPenerimaStore } from '@/store/pengajuanPenerima'
import { computed, onMounted, onUnmounted } from 'vue'
import socket from '@/plugins/socket'
import { useTheme } from '@/store/themeStore'
import Search_action from '@/components/Search_action.vue'
import { ref } from 'vue'

const pengajuan = usePengajuanPenerimaStore()
const theme = useTheme()

const handleApproved = (id) => {
  pengajuan.approvedPengajuan(id)
}
const handleReject = (id) => {
  pengajuan.rejectPengajuan(id)
}

onMounted(async () => {
  await pengajuan.getPengajuanDataB()
  socket.on('data_update', async () => {
    await pengajuan.getPengajuanDataB()
  })
})

onUnmounted(() => socket.off('data_update'))
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return pengajuan.pengajuanDataB.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="min-h-screen p-4 md:p-8 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'"
  >
    <div class="max-w-7xl mx-auto">
      <Search_action :display="'hidden'" :displayB="'hidden'" />

      <div
        class="mt-6 relative overflow-x-auto shadow-md rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <table class="w-full text-xs text-left">
          <thead
            class="text-[11px] uppercase tracking-wider border-b border-gray-200 dark:border-gray-700"
            :class="theme.isdarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'"
          >
            <tr>
              <th scope="col" class="px-6 py-4">ID</th>
              <th scope="col" class="px-6 py-4">Penerima</th>
              <th scope="col" class="px-6 py-4">Nama Barang</th>
              <th scope="col" class="px-6 py-4">Jumlah</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Timeline Pengajuan</th>
              <th
                scope="col"
                class="px-6 py-4 text-center"
                v-if="pengajuan.pengajuanDataB.some((item) => item.status === 'pending')"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="(item, id) in paginatedData"
              :key="item.id"
              class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              :class="theme.isdarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'"
            >
              <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">
                {{ id + 1 }}
              </td>

              <td class="px-6 py-4 font-medium uppercase tracking-tight">
                {{ item.nama_penerima }}
              </td>

              <td class="px-6 py-4">
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ item.nama_barang }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ item.jumlah }}
                </div>
              </td>

              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border shadow-sm"
                  :class="{
                    'bg-yellow-100 text-yellow-700 border-yellow-200': item.status === 'pending',
                    'bg-green-100 text-green-700 border-green-200': item.status === 'approved',
                    'bg-red-100 text-red-700 border-red-200': item.status === 'rejected',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>

              <td class="px-6 py-4 text-[10px] space-y-1">
                <div class="flex items-center gap-2">
                  <span class="w-12 opacity-60">Diajukan:</span>
                  <span>{{ item.tanggal_pengajuan }}</span>
                </div>
                <div
                  v-if="item.tanggal_approve"
                  class="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium"
                >
                  <span class="w-12 opacity-60">Approve:</span>
                  <span>{{ item.tanggal_approve }}</span>
                </div>
                <div
                  v-if="item.tanggal_reject"
                  class="flex items-center gap-2 text-red-500 font-medium"
                >
                  <span class="w-12 opacity-60">Reject:</span>
                  <span>{{ item.tanggal_reject }}</span>
                </div>
              </td>

              <td
                class="px-6 py-4 text-center"
                v-if="pengajuan.pengajuanDataB.some((item) => item.status === 'pending')"
              >
                <div class="flex justify-center gap-2" v-if="item.status === 'pending'">
                  <button
                    @click="handleApproved(item.id)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                  >
                    <Edit2 size="14" />
                    Approve
                  </button>

                  <button
                    @click="handleReject(item.id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-all active:scale-95 flex items-center gap-1.5 text-[10px] font-bold uppercase"
                  >
                    <Trash2 size="14" />
                    Reject
                  </button>
                </div>
                <span v-else class="text-gray-400 italic text-[10px]">No action needed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <Paginator
          v-model:first="first"
          :rows="rows"
          :totalRecords="pengajuan.pengajuanDataB.length"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          @page="onPageChange"
          v-if="pengajuan.pengajuanDataB.length > 0"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :class="
            theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
          "
        />
      </div>
    </div>
  </div>
</template>
