<script setup>
import { ref, reactive } from 'vue'
import { Upload, X, Package, CheckCircle } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useDataDonasi } from '@/store/dataDonasi'

const route = useRoute()
const donasi = useDataDonasi()

const formData = reactive({
  name_barang: '',
  kondisi_barang: '',
  gambar_barang: null,
  // jumlah_barang: null,
})

const preview = ref(null)
const submitted = ref(false)

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

// Submit form
const handleSubmit = (e, id) => {
  e.preventDefault()

  const data = new FormData()
  data.append('name_barang', formData.name_barang)
  data.append('kondisi_barang', formData.kondisi_barang)
  data.append('gambar_barang', formData.gambar_barang)
  // data.append('jumlah_barang', formData.jumlah_barang)

  donasi.dataPost(id, data)

  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    formData.name_barang = ''
    formData.kondisi_barang = ''
    formData.gambar_barang = null
    preview.value = null
  }, 3000)
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div class="flex items-center justify-center mb-6">
          <div class="bg-blue-600 p-3 rounded-full">
            <Package class="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 class="text-3xl font-bold text-center text-white mb-2">Form Donasi</h2>
        <p class="text-gray-400 text-center mb-8">Bantu sesama dengan barang yang Anda miliki</p>

        <form class="space-y-6" @submit="handleSubmit($event, route.params.id)">
          <!-- Nama Barang -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nama Barang</label>
            <input
              type="text"
              v-model="formData.name_barang"
              placeholder="Contoh: Buku Pelajaran, Pakaian, dll"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <!-- <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Masukan Jumlah</label>
            <input
              type="number"
              v-model.number="formData.jumlah_barang"
              placeholder="0"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div> -->
          <!-- <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Masukan Alamat</label>
            <input
              type="text"
              v-model="formData.alamat"
              placeholder="Contoh: jl.xxx.no x kota x"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div> -->

          <!-- Kondisi Barang -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Kondisi Barang</label>
            <select
              v-model="formData.kondisi_barang"
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Pilih kondisi barang</option>
              <option value="1">Kurang Baik</option>
              <option value="2">Cukup Baik</option>
              <option value="3">Bekas</option>
              <option value="4">Masih Baru</option>
            </select>
          </div>

          <!-- Upload Gambar -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Gambar Barang</label>

            <div v-if="!preview">
              <label
                class="flex flex-col items-center justify-center w-full h-48 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-650 transition"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload class="w-10 h-10 text-gray-400 mb-3" />
                  <p class="mb-2 text-sm text-gray-400">
                    <span class="font-semibold">Klik untuk upload</span>
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, atau JPEG (MAX. 5MB)</p>
                </div>
                <input type="file" accept="image/*" @change="handleImageChange" class="hidden" />
              </label>
            </div>

            <div v-else class="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden">
              <img :src="preview" alt="Preview" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeImage"
                class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Tombol Submit -->
          <button
            type="submit"
            :disabled="!formData.name_barang || !formData.kondisi_barang || !formData.gambar_barang"
            class="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Kirim Donasi
          </button>
        </form>

        <!-- Pesan sukses -->
        <div
          v-if="submitted"
          class="mt-6 bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 animate-pulse"
        >
          <CheckCircle class="w-5 h-5" />
          <span>Terima kasih! Donasi Anda telah berhasil dikirim.</span>
        </div>
      </div>

      <p class="text-center text-gray-500 text-sm mt-6">
        Setiap donasi Anda sangat berarti bagi yang membutuhkan
      </p>
    </div>
  </div>
</template>

<style scoped>
.hover\:bg-gray-650:hover {
  background-color: #4b5563;
}
</style>
