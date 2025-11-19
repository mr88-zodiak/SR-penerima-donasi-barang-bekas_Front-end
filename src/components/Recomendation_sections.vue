<script setup>
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'
import { onMounted, onUnmounted } from 'vue'

const data = useDataKlasifikasi()

let interval
onMounted(async () => {
  data.getDataD()
  interval = setInterval(() => {
    data.getDataD()
  }, 3000)
})
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div class="recomendation bg-transparent w-full p-4 relative">
    <div class="flex justify-center items-center">
      <h1 class="text-2xl font-bold text-white">Rekomendasi</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div
        v-for="item in data.klasifikasiData"
        :key="item.id"
        @click="item.isClick = !item.isClick"
        class="deskripsi p-5 rounded-lg shadow-lg cursor-pointer transition-all duration-300"
        :class="item.isClick ? 'shadow-green-500 shadow-md' : 'shadow-blue-500'"
      >
        <p class="text-gray-300 mb-2"><strong>Nama:</strong> {{ item.name }}</p>
        <p class="text-gray-300 mb-2">
          <strong>Jenis Kebutuhan:</strong> {{ item.jenisKebutuhan }}
        </p>
        <div class="mt-4 text-center">
          <router-link
            :to="`/DonasiKita/donatur/donate/${item.id}/checkout`"
            class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Donate Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
