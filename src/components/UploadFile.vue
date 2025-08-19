<script setup>
import { ref } from 'vue'

const fileName = ref(null)
const isLoading = ref(false)

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
  }
}

function clearFile() {
  fileName.value = null
}

async function handleAnalyze() {
  if (!fileName.value) {
    alert('⚠️ Silakan pilih file dulu sebelum upload & analyze!')
    return
  }

  // set loading
  isLoading.value = true

  // simulasi proses 3 detik (misalnya upload/analisis ke server)
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // selesai proses
  isLoading.value = false
  alert(`✅ File "${fileName.value}" berhasil diproses!`)
}
</script>

<template>
  <div class="uplo">
    <!-- Area upload -->
    <div class="flex items-center justify-center w-full">
      <label
        v-if="!fileName"
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">CSV atau Excel (MAX. 5MB)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          accept=".csv, .xls, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="handleFileUpload"
        />
      </label>

      <!-- Preview file -->
      <div
        v-else
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg bg-green-50 dark:bg-gray-800"
      >
        <p class="text-lg font-medium">📄 {{ fileName }}</p>
        <button
          @click="clearFile"
          class="mt-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          :disabled="isLoading"
        >
          Hapus File
        </button>
      </div>
    </div>

    <!-- Tombol Upload -->
    <div class="mt-4 flex items-center justify-center">
      <button
        class="flex items-center justify-center gap-2 px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer disabled:opacity-60"
        :class="isLoading ? 'bg-gray-400 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'"
        :disabled="isLoading"
        @click="handleAnalyze"
      >
        <!-- Spinner saat loading -->
        <svg
          v-if="isLoading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span>{{ isLoading ? 'Processing...' : 'Upload and analyze' }}</span>
      </button>
    </div>
  </div>
</template>
