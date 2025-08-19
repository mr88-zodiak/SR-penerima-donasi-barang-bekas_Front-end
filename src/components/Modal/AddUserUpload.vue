<!-- eslint-disable no-unused-vars -->
<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import UploadFile from '../UploadFile.vue'
import { inject } from 'vue'
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
})
const isdarkMode = inject('isdarkMode')
const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="overflow-y-auto bg-black/80 shadow-lg overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    :class="isModalOpen ? 'flex flex-col' : 'hidden'"
  >
    <div
      class="adduser shadow-lg rounded-lg p-4 w-full max-w-md max-h-full"
      :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <div class="close">
        <XMarkIcon
          class="block h-6 w-6 cursor-pointer ml-2 relative left-96 md:right-56"
          :class="isdarkMode ? 'dark:text-white' : 'text-black'"
          @click="emit('close')"
        />
      </div>
      <div class="title mx-auto mt-4 mb-4 p-3">
        <h2 class="font-bold text-center" :class="isdarkMode ? 'dark:text-blue-400' : 'text-black'">
          Upload data excel atau csv penerima donasi di sini :)
        </h2>
      </div>
      <div class="upload-file-container mx-auto mt-4">
        <UploadFile />
      </div>
    </div>
  </div>
</template>
