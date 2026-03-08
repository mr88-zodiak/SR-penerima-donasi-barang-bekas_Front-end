<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed, ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { useTheme } from '@/store/themeStore'
import ModaladdDataDiri from './ModaladdKebutuhan.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  display: {
    type: String,
    default: '',
  },
})

const formData = ref({
  name: '',
  email: '',
  username: '',
  password: '',
  role: 'penerima',
})

const disableButton = computed(
  () =>
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.username ||
    !formData.value.password ||
    !formData.value.role,
)

const emits = defineEmits(['close', 'next'])

const registerPost = async () => {
  try {
    const respon = await axios.post(`http://localhost:5000/user/api/post/daftar`, formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    alert(respon.data.message)
    emits('next')
  } catch (e) {
    console.error(e)
    alert(e.response?.data?.message || 'Terjadi kesalahan')
  } finally {
    formData.value = {
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'penerima',
    }
  }
}

const theme = useTheme()
</script>

<template>
  <div>
    <section
      class="overflow-y-auto bg-black/80 shadow-lg overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0"
      :class="isOpen ? 'flex flex-col' : 'hidden'"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="adduser shadow-lg rounded-lg p-4 w-full max-w-md max-h-full"
        :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
      >
        <header class="flex justify-end">
          <button
            type="button"
            @click="emits('close')"
            aria-label="Close"
            class="focus:outline-none"
          >
            <XMarkIcon
              class="h-6 w-6 cursor-pointer"
              :class="theme.isdarkMode ? 'dark:text-white' : 'text-black'"
            />
          </button>
        </header>

        <main class="addManual mx-auto mt-4">
          <h3 class="text-xl font-medium mb-4 text-center">Tambah Akun Penerima</h3>

          <form class="space-y-4 md:space-y-6" @submit.prevent="registerPost">
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
                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :class="
                  theme.isdarkMode
                    ? 'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    : 'border-gray-300 text-gray-900 '
                "
                required
              />
            </div>

            <button
              type="submit"
              :disabled="disableButton"
              :class="[
                'w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none',
                disableButton
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
              ]"
            >
              Submit
            </button>
          </form>
        </main>
      </div>
    </section>

    <ModaladdDataDiri :isOpen="display === 'next'" @close="$emit('close')" />
  </div>
</template>
