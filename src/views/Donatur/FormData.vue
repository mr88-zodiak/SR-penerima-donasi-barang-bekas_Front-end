<script setup>
import { ref, reactive } from 'vue'
import { Upload, X, Package, CheckCircle } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useDataDonasi } from '@/store/dataDonasi'
import { useBarang } from '@/store/barang'
import { useTheme } from '@/store/themeStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const theme = useTheme()
const donasi = useDataDonasi()
const barang = useBarang()
const { nameBarang } = storeToRefs(barang)

const formData = reactive({
  name_barang: nameBarang.value || '',
  kondisi_barang: '',
  gambar_barang: null,
  jumlah: '',
})
console.log('Form Data:', formData)

const preview = ref(null)
const submitted = ref(false)
const errorFeedback = ref(false)
const pesan = ref('')
// const regex = /^[A-Za-z0-9\s]+\/\d+KG$/i

// Upload Gambar
const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.gambar_barang = file
    const reader = new FileReader()
    reader.onloadend = () => {
      preview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// Hapus gambar
const removeImage = () => {
  formData.gambar_barang = null
  preview.value = null
}
// const errorMessage = ref('')
// Submit form
const handleSubmit = (e, id) => {
  e.preventDefault()

  const data = new FormData()
  data.append('name_barang', formData.name_barang)
  data.append('kondisi_barang', formData.kondisi_barang)
  data.append('gambar_barang', formData.gambar_barang)
  data.append('jumlah', formData.jumlah)

  donasi.dataPost(id, data)

  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    formData.name_barang = ''
    formData.kondisi_barang = ''
    formData.gambar_barang = null
    formData.jumlah = ''
    preview.value = null
  }, 3000)
}
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-500"
    :class="theme.isdarkMode ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <div class="w-full max-w-lg">
      <div
        class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 border transition-all duration-300"
        :class="
          theme.isdarkMode ? 'border-gray-700 shadow-blue-500/5' : 'border-gray-100 shadow-gray-200'
        "
      >
        <div class="flex flex-col items-center mb-8 text-center">
          <div
            class="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/40 mb-4 animate-bounce-slow"
          >
            <Package class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
            Form Donasi
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            Bantu sesama dengan menyalurkan barang layak pakai Anda melalui sistem kami.
          </p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit($event, route.params.id)">
          <div class="space-y-2">
            <label
              class="block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1"
            >
              Kondisi Barang
            </label>
            <div class="relative">
              <select
                v-model="formData.kondisi_barang"
                class="w-full px-4 py-3.5 appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
              >
                <option value="" disabled>Pilih kondisi barang</option>
                <option value="1">Kurang Baik</option>
                <option value="2">Cukup Baik</option>
                <option value="3">Bekas Layak Pakai</option>
                <option value="4">Masih Baru</option>
              </select>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <ChevronDown class="w-4 h-4" />
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <label
              class="block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1"
            >
              Jumlah Barang
            </label>
            <div class="relative">
              <input
                v-model="formData.jumlah"
                type="number"
                placeholder="Masukan jumlah barang"
                class="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="block text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1"
            >
              Foto Barang <span class="lowercase font-normal italic">(maks 5MB)</span>
            </label>

            <div v-if="!preview">
              <label
                class="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group"
                :class="
                  theme.isdarkMode
                    ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500 hover:bg-gray-700'
                    : 'bg-gray-50 border-gray-300 hover:border-blue-400 hover:bg-white'
                "
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <div
                    class="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm group-hover:scale-110 transition-transform mb-3"
                  >
                    <Upload class="w-8 h-8 text-blue-500" />
                  </div>
                  <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Klik untuk pilih foto
                  </p>
                  <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">
                    PNG, JPG, JPEG (Maks. 5MB)
                  </p>
                </div>
                <input type="file" accept="image/*" @change="handleImageChange" class="hidden" />
              </label>
            </div>

            <div
              v-else
              class="relative w-full h-56 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden ring-2 ring-blue-500 shadow-inner"
            >
              <img :src="preview" alt="Preview" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeImage"
                class="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg transition-all active:scale-90"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="submit"
              :disabled="
                !formData.name_barang ||
                !formData.kondisi_barang ||
                !formData.gambar_barang ||
                !formData.jumlah
              "
              class="cursor-pointer w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              <span>Kirim Donasi Sekarang</span>
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        <transition-group name="fade">
          <div
            v-if="submitted"
            key="success"
            class="mt-6 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
          >
            <CheckCircle class="w-6 h-6 shrink-0" />
            <p>Berhasil! Donasi Anda telah kami terima.</p>
          </div>

          <div
            v-if="errorFeedback"
            key="error"
            class="mt-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
          >
            <AlertCircle class="w-6 h-6 shrink-0" />
            <p>{{ pesan }}</p>
          </div>
        </transition-group>
      </div>

      <p class="text-center text-gray-400 dark:text-gray-500 text-xs mt-8 italic">
        "Kebaikan kecil Anda sangat berarti bagi mereka yang membutuhkan."
      </p>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<!-- <style scoped>
.hover\:bg-gray-650:hover {
  background-color: #4b5563;
} -->
