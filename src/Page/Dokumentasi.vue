<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { useTheme } from '@/store/themeStore'
import { ref } from 'vue'
import { Upload, Plus, X, File, Image as ImageIcon, EyeIcon } from 'lucide-vue-next'

const documents = ref([])
const dragActive = ref(false)
const theme = useTheme()

const handleDrag = (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.type === 'dragenter' || e.type === 'dragover') {
    dragActive.value = true
  } else if (e.type === 'dragleave') {
    dragActive.value = false
  }
}

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  dragActive.value = false

  const files = Array.from(e.dataTransfer.files)
  handleFiles(files)
}

const handleFileInput = (e) => {
  const files = Array.from(e.target.files)
  handleFiles(files)
}

const handleFiles = (files) => {
  const newDocs = files.map((file) => ({
    id: Date.now() + Math.random(),
    name: file.name,
    size: (file.size / 1024).toFixed(2) + ' KB',
    type: file.type,
    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    uploadDate: new Date().toLocaleDateString('id-ID'),
  }))

  documents.value = [...documents.value, ...newDocs]
}

const removeDocument = (id) => {
  documents.value = documents.value.filter((doc) => doc.id !== id)
}

// const handleCreateDocumentation = () => {
//   alert('Dokumentasi berhasil dibuat!')
// }
</script>
<template>
  <div
    class="min-h-screen p-8"
    :class="theme.isdarkMode ? 'dark:bg-gray-900 dark:text-gray-100' : 'bg-gray-100 text-black'"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Dokumentasi Upload</h1>
          <p class="text-gray-400">Unggah dan kelola dokumentasi gambar Anda</p>
        </div>

        <!-- <button
          v-if="documents.length > 0"
          @click="handleCreateDocumentation"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors shadow-lg"
        >
          Buat Dokumentasi
        </button> -->
      </div>

      <!-- Upload Area -->
      <template v-if="documents.length === 0">
        <div
          class="border-2 border-dashed rounded-lg p-12 mb-8 text-center transition-all"
          :class="dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'"
          @dragenter="handleDrag"
          @dragleave="handleDrag"
          @dragover="handleDrag"
          @drop="handleDrop"
        >
          <Upload class="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <h3 class="text-xl font-semibold mb-2">Seret & Lepas Gambar</h3>
          <p class="text-gray-400 mb-4">atau</p>

          <label
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
          >
            <Plus class="w-5 h-5" />
            <span class="font-medium">Pilih File</span>
            <input type="file" multiple accept="image/*" class="hidden" @change="handleFileInput" />
          </label>

          <p class="text-sm text-gray-500 mt-4">Mendukung: JPG, PNG, GIF, SVG (Max. 10MB)</p>
        </div>

        <!-- <div class="mb-8 text-center">
          <label
            class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg cursor-pointer transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus class="w-6 h-6" />
            <span class="font-semibold text-lg">Tambahkan Dokumentasi</span>
            <input type="file" multiple accept="image/*" @change="handleFileInput" class="hidden" />
          </label>
        </div> -->
      </template>

      <!-- Documents Grid -->
      <div v-if="documents.length > 0">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold">Dokumentasi ({{ documents.length }})</h2>

          <label
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors"
          >
            <Plus class="w-5 h-5" />
            <span class="font-medium">Tambah Dokumentasi</span>
            <input type="file" multiple accept="image/*" @change="handleFileInput" class="hidden" />
          </label>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-0">
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <div
              class="group relative h-48 flex items-center justify-center"
              :class="theme.isdarkMode ? 'bg-gray-700' : 'bg-gray-400'"
            >
              <EyeIcon
                class="h-10 w-10 absolute opacity-0 group-hover:opacity-100 cursor-pointer m-auto text-gray-600 transition-opacity"
              />

              <img
                v-if="doc.preview"
                :src="doc.preview"
                :alt="doc.name"
                class="w-full h-full cursor-pointer object-cover"
              />
              <File v-else class="w-16 h-16 text-gray-500" />
            </div>

            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2 flex-1 min-w-0">
                  <ImageIcon class="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <h3 class="font-medium truncate text-white">{{ doc.name }}</h3>
                </div>

                <button
                  @click="removeDocument(doc.id)"
                  class="p-1 hover:bg-red-500/20 rounded transition-colors flex-shrink-0"
                >
                  <X class="w-5 h-5 cursor-pointer text-red-400" />
                </button>
              </div>

              <div class="text-sm text-gray-400 space-y-1">
                <p>Ukuran: {{ doc.size }}</p>
                <p>Tanggal: {{ doc.uploadDate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <!-- <div v-show="documents.length === 0" class="text-center py-12 text-gray-500">
        <ImageIcon class="w-20 h-20 mx-auto mb-4 opacity-50" />
        <p class="text-lg">Belum ada dokumentasi yang diunggah</p>
        <p class="text-sm">Mulai unggah gambar dokumentasi Anda</p>
      </div> -->
    </div>
  </div>
</template>
