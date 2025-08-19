<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, reactive } from 'vue'

const getBgColor = (id) => {
  if (id === 1) return 'bg-green-200'
  if (id === 2) return 'bg-blue-200'
  if (id === 3) return 'bg-yellow-200'
  if (id === 4) return 'bg-red-200'
  return 'bg-purple-200'
}
const isdarkMode = inject('isdarkMode')
// const penerima = inject('data')
const state = reactive({
  Infodonations: [
    {
      id: 1,
      name: 'Total penerima tidak layak',
      jumlah: [],
    },
    {
      id: 2,
      name: 'Total penerima layak',
      jumlah: [],
    },
    {
      id: 3,
      name: 'Total penerima',
      jumlah: [],
    },
  ],
})
</script>

<template>
  <div
    class="flex flex-col items-center mt-4 justify-center shadow-md p-4 bg-inherit rounded-lg max-w-screen max-h-screen overflow-auto"
    :class="isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
  >
    <div
      class="information-blo mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-3"
    >
      <div v-for="info in state.Infodonations" :key="info.id">
        <div
          class="kotak w-full p-4 rounded-lg dark:shadow-lg text-black"
          :class="getBgColor(info.id)"
        >
          <h2 class="text-lg font-semibold">{{ info.name }}</h2>
          <p class="text-2xl font-bold">
            {{ info.jumlah.length }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
