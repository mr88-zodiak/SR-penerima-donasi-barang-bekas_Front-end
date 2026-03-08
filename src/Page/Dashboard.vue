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

  socket.on('data_update', async () => {
    await penerima.getDataPenerima()
    await donatur.getDataDonatur()
    await barang.getDataBarang()
    await donasi.getData()
    await klasifikasi.getData()
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
  if (id === 4) return 'bg-red-200'
  if (id === 5) return 'bg-purple-400'
  return 'bg-pink-300'
}

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
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen w-full p-4 md:p-6 transition-colors duration-300"
    :class="theme.isdarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-50 text-gray-900'"
  >
    <div class="w-full max-w-7xl mb-6">
      <h1 class="text-2xl font-extrabold tracking-tight">Ringkasan Statistik</h1>
      <p class="text-sm opacity-60">Pantau performa donasi dan aktivitas pengguna Anda.</p>
    </div>

    <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl gap-6">
      <div
        v-for="info in Infodonations"
        :key="info.id"
        @click="info.OpenComponent ? (activeChart = info.OpenComponent) : null"
        class="relative group cursor-pointer"
      >
        <div
          class="relative overflow-hidden p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-white/20"
          :class="getBgColor(info.id)"
        >
          <div
            class="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-125 group-hover:-rotate-12"
          >
            <svg class="w-24 h-24 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
          </div>

          <div class="relative z-10">
            <h2 class="text-xs font-bold uppercase tracking-wider text-black/60 mb-1">
              {{ info.name }}
            </h2>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl font-black text-black">
                {{ info.jumlah }}
              </p>
              <!-- <span
                class="text-[10px] bg-white/40 px-1.5 py-0.5 rounded-full font-bold text-black/70"
              >
                +12%
              </span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
