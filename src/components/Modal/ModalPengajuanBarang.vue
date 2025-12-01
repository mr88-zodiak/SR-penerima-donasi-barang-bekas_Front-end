<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
  >
    <!-- Modal Content -->
    <div
      class="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md border border-slate-700 animate-in zoom-in-95 duration-200"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-700">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-blue-600/20 rounded-lg">
            <Package class="text-blue-400 w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-white">Pengajuan Barang</h2>
        </div>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-lg cursor-pointer"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Form -->
      <div class="p-6 space-y-5">
        <!-- Jenis Barang -->
        <div>
          <label for="jenisBarang" class="block text-sm font-medium text-gray-300 mb-2">
            Jenis Barang
          </label>
          <input
            type="text"
            id="jenisBarang"
            v-model="jenisBarang"
            placeholder="Contoh: Laptop, Printer, ATK"
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label for="jumlah" class="block text-sm font-medium text-gray-300 mb-2"> Jumlah </label>
          <input
            type="text"
            id="nama_barang"
            v-model="nama_barang"
            placeholder="Masukkan Nama Barang"
            min="1"
            class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <!-- Submit Button -->
        <button
          @click="handleSubmit"
          class="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50 mt-6"
        >
          Submit Pengajuan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { X, Package } from 'lucide-vue-next'
import { useBarang } from '@/store/barang'

const barang = useBarang()
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
  },
})
const jenisBarang = ref('')
const nama_barang = ref('')
const emit = defineEmits(['close'])
const handleSubmit = () => {
  if (!jenisBarang.value || !nama_barang.value) {
    alert('Mohon lengkapi semua field')
    return
  }
  barang.pengajuanBarang({
    jenis_barang: jenisBarang.value,
    nama_barang: nama_barang.value,
  })

  // alert(`Pengajuan berhasil!\nJenis Barang: ${jenisBarang.value}\nJumlah: ${jumlah.value}`)
  // Reset form
  jenisBarang.value = ''
  nama_barang.value = ''
  emit('close')
}
</script>
