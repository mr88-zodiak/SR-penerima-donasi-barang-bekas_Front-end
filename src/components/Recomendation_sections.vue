<script setup>
import { provide, ref } from 'vue'

const RekomendasiPenerima = ref([
  {
    id: 1,
    name: 'Penerima A',
    description: 'Deskripsi penerima A',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Penerima B',
    description: 'Deskripsi penerima B',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Penerima C',
    description: 'Deskripsi penerima C',
    image: 'https://via.placeholder.com/150',
  },
])
provide('RekomendasiPenerima', RekomendasiPenerima)
</script>

<template>
  <div class="recomendation bg-transparent w-full p-4 relative">
    <div class="flex justify-center items-center">
      <h1 class="text-2xl font-bold text-white">Rekomendasi</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <slot />
    </div>
    <div
      class="flex flex-col justify-center mt-4"
      v-for="item in RekomendasiPenerima"
      :key="item.id"
    >
      <router-link
        :to="`/donatur/donasi/${item.id}/checkout`"
        class="px-4 cursor-pointer py-2 text-left border-2 border-gray-500 bg-transparent hover:bg-gray-500 text-white rounded transition-colors duration-300"
        @click="$emit('loadMore')"
      >
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>
