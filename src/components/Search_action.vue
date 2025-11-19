<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import addKebutuhan from './Modal/ModaladdKebutuhan.vue'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import AddAkunPenerima from './Modal/ModalAddAkunPenerima.vue'
import AddAkunDonatur from './Modal/ModalAddAkunDonatur.vue'
import { useTheme } from '@/store/themeStore'
const theme = useTheme()
const isModalAddOpen = ref(false)
const props = defineProps({
  display: {
    type: String,
    default: 'hidden',
  },
  displayA: {
    type: String,
    default: 'hidden',
  },
  displayB: {
    type: String,
    default: 'hidden',
  },
  displayC: {
    type: String,
    default: 'hidden',
  },
  role: {
    type: String,
  },
})

const currentStep = ref('register')

const closeModal = () => {
  isModalAddOpen.value = false
  currentStep.value = 'register'
}

const openModal = () => {
  currentStep.value = 'register'
  isModalAddOpen.value = true
}

const openDataDiri = () => {
  currentStep.value = 'datadiri'
  isModalAddOpen.value = true
}
</script>

<template>
  <div class="callToAction flex items-center justify-between p-4">
    <div class="form">
      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm rounded-md shadow-sm"
            :class="
              theme.isdarkMode
                ? 'text-white border border-gray-700 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500'
                : 'dark:bg-gray-50 dark:border-gray-400 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md'
            "
            placeholder="Search..."
            required
          />
        </div>
      </form>
    </div>
    <div class="addData">
      <button
        class="cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        :class="display"
        @click="openModal"
      >
        Add Data
      </button>
    </div>
    <AddAkunPenerima
      v-show="currentStep === 'register' && props.role === 'penerima'"
      :isOpen="isModalAddOpen"
      @close="closeModal"
      :display="props.displayA"
      :role="'penerima'"
      @next="openDataDiri"
    />

    <addKebutuhan
      v-show="currentStep === 'datadiri' && props.role === 'penerima'"
      :isOpen="isModalAddOpen"
      @close="closeModal"
      :display="props.displayB"
      :role="props.role"
    />

    <AddAkunDonatur
      v-show="props.role === 'donatur'"
      :isOpen="isModalAddOpen"
      @close="isModalAddOpen = false"
      :display="props.displayC"
    />
  </div>
</template>
