<script setup>
import { ref } from 'vue'
import { Edit2, Trash2 } from 'lucide-vue-next'

const data = ref([
  {
    id: 1,
    namaPenerima: 'Ahmad Santoso',
    namaBarang: 'Laptop Dell Latitude',
    tanggalPengajuan: '2024-11-15',
    tanggalApprove: '2024-11-20',
    tanggalReject: null,
  },
  {
    id: 2,
    namaPenerima: 'Siti Nurhaliza',
    namaBarang: 'Mouse Wireless Logitech',
    tanggalPengajuan: '2024-11-18',
    tanggalApprove: null,
    tanggalReject: '2024-11-22',
  },
  {
    id: 3,
    namaPenerima: 'Budi Prakoso',
    namaBarang: 'Monitor LG 24 inch',
    tanggalPengajuan: '2024-11-20',
    tanggalApprove: '2024-11-25',
    tanggalReject: null,
  },
  {
    id: 4,
    namaPenerima: 'Dewi Lestari',
    namaBarang: 'Keyboard Mechanical',
    tanggalPengajuan: '2024-11-22',
    tanggalApprove: null,
    tanggalReject: null,
  },
  {
    id: 5,
    namaPenerima: 'Eko Wijaya',
    namaBarang: 'Webcam HD Logitech',
    tanggalPengajuan: '2024-11-25',
    tanggalApprove: '2024-11-28',
    tanggalReject: null,
  },
])

const handleEdit = (id) => {
  alert(`Edit data dengan ID: ${id}`)
}

const handleDelete = (id) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    data.value = data.value.filter((item) => item.id !== id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-8">Verifikasi Pengajuan Barang</h1>

      <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-700">
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Nama Penerima
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Nama Barang
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Tanggal Pengajuan
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Tanggal Approve
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Tanggal Reject
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-700">
              <tr v-for="item in data" :key="item.id" class="hover:bg-gray-750 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {{ item.namaPenerima }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {{ item.namaBarang }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {{ item.tanggalPengajuan }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span v-if="item.tanggalApprove" class="text-green-400">{{
                    item.tanggalApprove
                  }}</span>
                  <span v-else class="text-gray-500">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span v-if="item.tanggalReject" class="text-red-400">{{
                    item.tanggalReject
                  }}</span>
                  <span v-else class="text-gray-500">-</span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="flex gap-2">
                    <button
                      @click="handleEdit(item.id)"
                      class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Edit2 size="16" />
                      <span>Edit</span>
                    </button>

                    <button
                      @click="handleDelete(item.id)"
                      class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Trash2 size="16" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4 text-gray-400 text-sm">Total: {{ data.length }} pengajuan</div>
    </div>
  </div>
</template>
