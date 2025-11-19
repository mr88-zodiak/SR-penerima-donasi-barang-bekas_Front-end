<script setup>
import { useAuth } from '@/store/auth'

const auth = useAuth()
</script>

<template>
  <div class="daftar">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create an account
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="auth.Register">
              <!-- Nama -->
              <div>
                <label
                  for="nama"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nama</label
                >
                <input
                  v-model="auth.formDataRegister.name"
                  type="text"
                  id="nama"
                  placeholder="Enter your nickname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="nama"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Jenis akun</label
                >
                <select
                  v-model="auth.formDataRegister.role"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">pilih role</option>
                  <option value="penerima">penerima</option>
                  <option value="donatur">donatur</option>
                </select>
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  v-model="auth.formDataRegister.email"
                  type="email"
                  id="email"
                  placeholder="test@example.com"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <!-- Username -->
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Username</label
                >
                <input
                  v-model="auth.formDataRegister.username"
                  type="text"
                  id="username"
                  placeholder="your username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <!-- Password -->
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  v-model="auth.formDataRegister.password"
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <!-- Button -->
              <button
                type="submit"
                :disabled="!auth.isFormValidRegister"
                :class="
                  !auth.formDataRegister.email ||
                  !auth.formDataRegister.name ||
                  !auth.formDataRegister.username ||
                  !auth.formDataRegister.password
                    ? 'opacity-50 cursor-not-allowed bg-blue-600'
                    : 'cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                "
                class="w-full text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <!-- <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-600"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-gray-800 text-gray-400">Atau</span>
                  </div>
                </div>

                <div class="mt-6 flex justify-center">
                  <button
                    class="w-48 cursor-pointer inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-600 rounded-lg bg-gray-700/50 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285f4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34a853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#fbbc05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#ea4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div> -->

              <div class="mt-6 text-center">
                <p class="text-gray-300">
                  Sudah punya akun?
                  <router-link
                    to="/DonasiKita/login"
                    class="ml-1 cursor-pointer text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Masuk di sini
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
