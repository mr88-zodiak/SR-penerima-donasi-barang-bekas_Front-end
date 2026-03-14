<script setup>
// import { useRoute } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import FormData from '@/views/Donatur/FormData.vue'
import { ref } from 'vue'

const isdarkMode = ref(true)
</script>

<template>
  <div
    class="checkout min-h-screen transition-colors duration-300"
    :class="isdarkMode ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md"
      :class="
        isdarkMode
          ? 'bg-gray-800/80 border-gray-700 text-white'
          : 'bg-white/80 border-gray-200 text-black'
      "
    >
      <div class="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <div class="flex items-center">
          <router-link
            to="/DonasiKita/donatur/dashboard"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            <ArrowLeftIcon
              class="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors"
            />
          </router-link>
        </div>

        <h1
          class="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600"
        >
          Checkout Donasi
        </h1>

        <div class="w-10"></div>
      </div>
    </nav>

    <main class="container mx-auto pt-32 pb-12 px-4 flex flex-col items-center">
      <div
        class="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Langkah Terakhir
      </div>

      <div class="content relative pt-32 p-5 flex items-center flex-col w-full">
        <div
          class="w-full max-w-xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-2 border border-gray-100 dark:border-gray-700"
        >
          <FormData />
        </div>
      </div>

      <div
        class="mt-8 flex items-center gap-4 opacity-40 grayscale group hover:grayscale-0 transition-all"
      >
        <p class="text-[10px] font-medium tracking-tighter uppercase italic">
          Secure Donation Process
        </p>
      </div>
    </main>
  </div>
</template>
