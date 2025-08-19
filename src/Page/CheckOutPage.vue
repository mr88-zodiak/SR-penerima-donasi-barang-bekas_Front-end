<script setup>
import { inject, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const isdarkMode = ref(localStorage.getItem('DarkMode') === 'true')

// inject array dari parent
const RekomendasiPenerima = inject('RekomendasiPenerima', ref([]))

// ambil id dari route (misal: /donatur/donasi/2/checkout)
const route = useRoute()
const penerimaId = Number(route.params.id)

// cari data sesuai id
const dataDeskripsi = computed(() =>
  RekomendasiPenerima.value.find((item) => item.id === penerimaId),
)
</script>

<template>
  <div class="checkout">
    <div
      class="container mx-auto overflow-auto bg-white shadow-md p-4 max-w-full h-full transition-all duration-300 ease-in-out text-black fixed"
      :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
    >
      <div
        class="row flex items-center justify-between shadow-lg p-4 bg-inherit rounded-lg"
        :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
      >
        <div class="flex items-center space-x-10">
          <router-link to="/donatur/home"
            ><ArrowLeftIcon class="cursor-pointer w-6 h-6"
          /></router-link>
          <h1 class="text-2xl font-bold">Checkout Page</h1>
        </div>

        <!-- tampilkan description sesuai id -->
        <p class="dark:text-white">
          {{ dataDeskripsi?.description || 'Deskripsi tidak tersedia' }}
        </p>
      </div>
    </div>

    <div class="content relative top-40 p-4">
      <p class="text-lg font-semibold text-white">Order Summary</p>
      <ul class="list-disc pl-5 text-white">
        <li>Item 1: $10.00</li>
        <li>Item 2: $15.00</li>
        <li>Item 3: $20.00</li>
      </ul>
      <p class="mt-2 font-bold">Total: $45.00</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @click="$emit('proceedToPayment')"
      >
        Proceed to Payment
      </button>
    </div>
  </div>
</template>
