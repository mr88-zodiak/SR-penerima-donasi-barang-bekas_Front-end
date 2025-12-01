<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed, inject, ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { useTheme } from '@/store/themeStore'
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String,
    default: '',
  },
})
const CloseAndOpen = ref(false)
const formData = ref({
  name: '',
  email: '',
  username: '',
  password: '',
  role: '',
})

const disableButton = computed(
  () =>
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.username ||
    !formData.value.password ||
    !formData.value.role,
)
const emits = defineEmits(['close', 'clicked'])
const registerPost = async () => {
  try {
    const respon = await axios.post(`http://localhost:5000/user/api/post/daftar`, formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    alert(respon.data.message)
    emits('close')
  } catch (e) {
    alert(e.response.data.message)
  }
}
const theme = useTheme()
</script>

<template>
  <div
    class="overflow-y-auto bg-black/80 shadow-lg overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0"
    :class="isOpen ? 'flex flex-col' : 'hidden'"
  >
    <div
      class="adduser shadow-lg rounded-lg p-4 w-full max-w-md max-h-full"
      :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <div class="close">
        <XMarkIcon
          class="block h-6 w-6 cursor-pointer ml-2 relative left-96 md:right-56"
          :class="theme.isdarkMode ? 'dark:text-white' : 'text-black'"
          @click="emits('close')"
        />
      </div>
      <div class="addManual mx-auto mt-4">
        <h3 class="text-xl font-medium mb-4 text-center">Tambah Akun Donatur</h3>
        <form class="space-y-4 md:space-y-6" @submit.prevent="registerPost">
          <!-- Nama -->
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
              >Nama</label
            >
            <input
              v-model="formData.name"
              type="text"
              id="nama"
              placeholder="Enter your nickname"
              class="bg-gray-50 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              :class="
                theme.isdarkMode
                  ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  : 'border-gray-300 text-gray-900 '
              "
              required
            />
          </div>
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
              >Jenis akun</label
            >
            <select
              v-model="formData.role"
              class="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              :class="
                theme.isdarkMode
                  ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  : 'border-gray-300 text-gray-900 '
              "
            >
              <option value="donatur">donatur</option>
            </select>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              id="email"
              placeholder="test@example.com"
              class="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              :class="
                theme.isdarkMode
                  ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  : 'border-gray-300 text-gray-900 '
              "
              required
            />
          </div>

          <!-- Username -->
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
              >Username</label
            >
            <input
              v-model="formData.username"
              type="text"
              id="username"
              placeholder="your username"
              class="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              :class="
                theme.isdarkMode
                  ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  : 'border-gray-300 text-gray-900 '
              "
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-gray-900'"
              >Password</label
            >
            <input
              v-model="formData.password"
              type="password"
              id="password"
              minlength="6"
              placeholder="••••••••"
              class="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              :class="
                theme.isdarkMode
                  ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  : 'border-gray-300 text-gray-900 '
              "
              required
            />
          </div>

          <!-- Button -->
          <button
            type="submit"
            :disabled="disableButton"
            :class="[
              disableButton
                ? 'opacity-50 cursor-not-allowed bg-blue-600'
                : 'cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
            ]"
            class="w-full text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
