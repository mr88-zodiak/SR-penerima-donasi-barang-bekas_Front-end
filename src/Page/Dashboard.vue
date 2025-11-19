<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useDataDonasi } from '@/store/dataDonasi'
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'
import { useDonatur } from '@/store/donatur'
import { usePenerima } from '@/store/penerima'
import { useBarang } from '@/store/barang'
import { useTheme } from '@/store/themeStore'
import socket from '@/plugins/socket'

const donatur = useDonatur()
const penerima = usePenerima()
const barang = useBarang()
const donasi = useDataDonasi()
const klasifikasi = useDataKlasifikasi()
const theme = useTheme()
const isDark = ref(localStorage.getItem('DarkMode') === 'true')
onMounted(async () => {
  await penerima.getDataPenerima()
  await donatur.getDataDonatur()
  await barang.getDataBarang()
  await donasi.getData()
  await klasifikasi.getData()
  await barang.fetchChartData()
  await barang.fetchPieChartData()

  socket.on('data_update', async () => {
    await penerima.getDataPenerima()
    await donatur.getDataDonatur()
    await barang.getDataBarang()
    await donasi.getData()
    await klasifikasi.getData()
    await barang.fetchChartData()
    await barang.fetchPieChartData()
  })
  window.addEventListener('storage', updateTheme)
})
onUnmounted(() => {
  socket.off('data_update')
  window.removeEventListener('storage', updateTheme)
})
const updateTheme = () => {
  isDark.value = localStorage.getItem('DarkMode') === 'true'
}

const getBgColor = (id) => {
  if (id === 1) return 'bg-green-200'
  if (id === 2) return 'bg-blue-200'
  if (id === 3) return 'bg-yellow-200'
  if (id === 4) return 'bg-red-200 hover:bg-red-400 cursor-pointer'
  if (id === 5) return 'bg-purple-400'
  return 'bg-pink-300 hover:bg-pink-400 cursor-pointer'
}

const activeChart = ref(null)

const Infodonations = computed(() => [
  {
    id: 1,
    name: 'Total penerima tidak layak',
    jumlah: klasifikasi.totalTidakLayak,
  },
  {
    id: 2,
    name: 'Total penerima layak',
    jumlah: klasifikasi.totalLayak,
  },
  {
    id: 3,
    name: 'Total penerima',
    jumlah: penerima.totalDataPenerima,
  },
  {
    id: 4,
    name: 'Total donasi',
    jumlah: donasi.totalData,
    OpenComponent: 'bar', // klik ini buka bar chart
  },
  {
    id: 5,
    name: 'Total donatur',
    jumlah: donatur.totalData,
  },
  {
    id: 6,
    name: 'Total barang',
    jumlah: barang.totalDataBarang,
    OpenComponent: 'pie', // klik ini buka pie chart
  },
])
watch(
  () => theme.isdarkMode,
  (val) => {
    localStorage.setItem('DarkMode', val)
    isDark.value = val
  },
  () => barang.categoriesBar,
  (val) => console.log('📅 X-Axis Dates Updated:', val),
)

const chartOptionsBar = computed(() => ({
  chart: {
    type: 'bar',
    background: 'transparent',
    foreColor: isDark.value ? '#fff' : '#000',
  },
  grid: {
    borderColor: isDark.value ? '#444' : '#e0e0e0',
  },
  title: {
    text: 'Total Donasi per Kategori',
    style: {
      color: isDark.value ? '#fff' : '#000',
    },
  },
  xaxis: {
    categories: barang.categoriesBar, // 🟢 tambahkan ini
    labels: {
      rotate: -45,
      style: {
        colors: isDark.value ? '#fff' : '#000',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDark.value ? '#fff' : '#000',
      },
    },
  },
}))

const chartOptionsPie = computed(() => ({
  chart: { type: 'pie', background: 'transparent' },
  theme: { mode: isDark.value ? 'dark' : 'light' },
  labels: barang.labelsPie,
  legend: { labels: { colors: isDark.value ? '#ffffff' : '#000000' } },
}))
</script>

<template>
  <div
    class="flex flex-col items-center mt-4 justify-center shadow-md p-4 bg-inherit rounded-lg max-w-screen max-h-screen overflow-auto"
    :class="theme.isdarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white text-black'"
  >
    <!-- Info Cards -->
    <div
      class="information-blo mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-3"
    >
      <div
        v-for="info in Infodonations"
        :key="info.id"
        @click="info.OpenComponent ? (activeChart = info.OpenComponent) : null"
      >
        <div
          class="kotak w-full p-4 rounded-lg dark:shadow-lg text-black transition-all duration-300"
          :class="getBgColor(info.id)"
        >
          <h2 class="text-lg font-semibold">{{ info.name }}</h2>
          <p class="text-2xl font-bold">{{ info.jumlah }}</p>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="w-full h-[500px] p-4 mt-4">
      <apexchart
        v-if="activeChart === 'bar'"
        type="bar"
        :options="chartOptionsBar"
        :series="barang.seriesBar"
        width="100%"
        height="100%"
      />
      <apexchart
        v-else-if="activeChart === 'pie'"
        type="pie"
        :options="chartOptionsPie"
        :series="barang.seriesPie"
        width="100%"
        height="100%"
      />
      <div v-else class="text-center text-gray-400">
        Klik salah satu kotak untuk menampilkan grafik
      </div>
    </div>
  </div>
</template>
