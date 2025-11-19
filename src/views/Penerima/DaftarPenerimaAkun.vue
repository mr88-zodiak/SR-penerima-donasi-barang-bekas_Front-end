<script setup>
import { useAuth } from '@/store/auth'

const auth = useAuth()
</script>

<template>
  <div class="daftarPenerima">
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
            <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="auth.penerimaRegister">
              <div>
                <label
                  for="nama"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nama</label
                >
                <input
                  v-model="auth.formDataRegisterPenerima.name"
                  type="text"
                  id="nama"
                  placeholder="your name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  v-model="auth.formDataRegisterPenerima.email"
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
                  v-model="auth.formDataRegisterPenerima.username"
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
                  v-model="auth.formDataRegisterPenerima.password"
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
                :disabled="!auth.isFormValidPenerimaRegister"
                :class="
                  !auth.formDataRegisterPenerima.email ||
                  !auth.formDataRegisterPenerima.name ||
                  !auth.formDataRegisterPenerima.username ||
                  !auth.formDataRegisterPenerima.password
                    ? 'opacity-50 cursor-not-allowed bg-blue-600'
                    : 'cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                "
                class="w-full text-white focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <router-link
                  to="/DonasiKita/penerima/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login here</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
