<script setup>
// import { useRoute } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import FormData from '@/views/Donatur/FormData.vue'
import { ref } from 'vue'

const isdarkMode = ref(true)

// inject array dari parent
// const RekomendasiPenerima = inject('RekomendasiPenerima', ref([]))

// ambil id dari route (misal: /donatur/donasi/2/checkout)
// const route = useRoute()
// const penerimaId = Number(route.params.id)

// cari data sesuai id
// const dataDeskripsi = computed(() =>
//   RekomendasiPenerima.value.find((item) => item.id === penerimaId),
// )
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
          <router-link to="/DonasiKita/donatur/dashboard"
            ><ArrowLeftIcon class="cursor-pointer w-6 h-6"
          /></router-link>
        </div>

        <!-- tampilkan description sesuai id -->
        <h1
          class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
        >
          Checkout Page
        </h1>
      </div>
    </div>

    <div class="content relative top-40 p-5 flex items-center flex-col">
      <FormData />
    </div>
  </div>
</template>
