<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { useTheme } from '@/store/themeStore'
// import { ref } from 'vue'
import { useDokumentasi } from '@/store/dokumentasi'
import { X, File, EyeIcon, FileText } from 'lucide-vue-next'
import socket from '@/plugins/socket'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

const theme = useTheme()
const storeDokumentasi = useDokumentasi()

const removeDocument = (id) => {
  storeDokumentasi.deleteDokumentasi(id)
}
onMounted(async () => {
  await storeDokumentasi.getDokumentasi()
  socket.on('data_update', async (data) => {
    console.log(data)
    await storeDokumentasi.getDokumentasi()
  })
})
const first = ref(0)
const rows = ref(10)

const paginatedData = computed(() => {
  return storeDokumentasi.dokumen.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}
</script>

<template>
  <div
    class="min-h-screen p-4 md:p-8 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'"
  >
    <div class="max-w-7xl mx-auto">
      <div
        v-if="storeDokumentasi.dokumen.length > 0"
        class="flex items-center justify-between mb-8"
      >
        <div>
          <h2 class="text-2xl font-bold tracking-tight">Dokumentasi Terkini</h2>
          <p class="text-xs opacity-60">
            Total {{ storeDokumentasi.dokumen.length }} file tersimpan
          </p>
        </div>
      </div>

      <div v-if="storeDokumentasi.dokumen.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="doc in paginatedData"
            :key="doc.id"
            class="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border"
            :class="
              theme.isdarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200 shadow-sm'
            "
          >
            <div
              class="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <img
                v-if="doc.filename"
                :src="doc.filename"
                :alt="doc.file"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <File v-else class="w-12 h-12 text-gray-400 opacity-50" />

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <EyeIcon
                  class="h-10 w-10 text-white cursor-pointer transform scale-90 group-hover:scale-100 transition-transform"
                />
              </div>
            </div>

            <div class="p-4 flex flex-col flex-1">
              <div class="flex items-start justify-between mb-3">
                <div class="min-w-0 flex-1">
                  <h3 class="font-bold text-sm truncate pr-2" :title="doc.file">
                    {{ doc.file }}
                  </h3>
                  <p
                    class="text-[10px] text-blue-600 dark:text-blue-400 font-medium uppercase tracking-tighter"
                  >
                    Donatur: {{ doc.donaturName }}
                  </p>
                </div>

                <button
                  @click="removeDocument(doc.id)"
                  class="p-1.5 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-all"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>

              <div
                class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-[10px] opacity-70"
              >
                <div class="flex items-center gap-1">
                  <span class="font-mono">{{ doc.ukuranFile }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span>{{ doc.tanggalDokumentasi }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="min-h-[70vh] flex items-center justify-center">
        <div class="text-center space-y-4">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-2xl rotate-3 shadow-inner"
            :class="theme.isdarkMode ? 'bg-gray-800' : 'bg-gray-200'"
          >
            <FileText class="w-10 h-10 text-gray-500" :stroke-width="1.5" />
          </div>
          <div class="space-y-1">
            <h2 class="text-lg font-bold text-gray-400">Belum ada dokumentasi</h2>
            <p class="text-sm text-gray-500">Foto atau file yang diupload akan muncul di sini.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <Paginator
        v-model:first="first"
        :rows="rows"
        :totalRecords="storeDokumentasi.dokumen.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        v-if="storeDokumentasi.dokumen.length > 0"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :class="
          theme.isdarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
        "
      />
    </div>
  </div>
</template>
