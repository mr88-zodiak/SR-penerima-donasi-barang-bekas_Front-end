<!-- DonationDashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <!-- Navbar -->
    <nav class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-1"></div>
          <div class="flex items-center space-x-8">
            <button
              @click="activeTab = 'home'"
              :class="[
                'flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all',
                activeTab === 'home'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              <Home :size="20" />
              <span class="font-medium">Home</span>
            </button>

            <button
              @click="activeTab = 'donasi'"
              :class="[
                'flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all',
                activeTab === 'donasi'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              <Heart :size="20" />
              <span class="font-medium">Donasi</span>
            </button>
          </div>

          <div class="flex-1 flex justify-end">
            <button
              @click="handleLogout"
              class="flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut :size="20" />
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- HOME TAB -->
      <div v-if="activeTab === 'home'">
        <h1 class="text-3xl font-bold mb-2">Dashboard Penerima Donasi Barang Bekas</h1>
        <p class="text-gray-400 mb-8">Kelola dan pantau donasi barang bekas yang Anda terima</p>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="(stat, idx) in stats"
            :key="idx"
            class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div :class="`${stat.color} p-3 rounded-lg`">
                <component :is="stat.icon" :size="24" class="text-white" />
              </div>
            </div>
            <p class="text-gray-400 text-sm mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
        </div>

        <!-- Barang dan Kategori -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <!-- Barang Masuk -->
          <div class="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-bold mb-4">Barang Masuk Terbaru</h2>
            <div class="space-y-4">
              <div
                v-for="item in donasi.DataDonasiTerkini"
                :key="item.id"
                class="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-all"
              >
                <div class="flex items-center space-x-4">
                  <div class="bg-emerald-500 p-3 rounded-lg">
                    <component :is="cekKategoriIcon(item.kategori)" :size="20" class="text-white" />
                  </div>
                  <div>
                    <p class="font-semibold">{{ item.namaBarang }}</p>
                    <p class="text-sm text-gray-400">dari {{ item.namaDonatur }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <span class="text-xs bg-gray-600 px-2 py-1 rounded">
                        {{ item.jumlah }}
                      </span>
                      <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        {{ item.kondisi }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-400 mb-2">{{ item.tanggalDonasi }}</p>
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded-full',
                      item.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.status === 'pending'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400',
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Kategori -->
          <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-bold mb-4">Kategori Barang</h2>
            <div class="space-y-3">
              <div
                v-for="(category, idx) in categories"
                :key="idx"
                class="flex items-center justify-between"
              >
                <div class="flex items-center space-x-3">
                  <div :class="`w-3 h-3 rounded-full ${category.color}`"></div>
                  <span class="text-gray-300">{{ category.name }}</span>
                </div>
                <span class="font-bold text-gray-100">{{ category.count }}</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-700">
              <div class="flex items-center justify-between font-bold">
                <span>Total</span>
                <span class="text-emerald-400">
                  {{ totalCategories }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Banner -->
        <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
          <div class="flex items-center space-x-4">
            <div class="bg-white/20 p-3 rounded-lg">
              <Package :size="32" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1">Terima kasih kepada semua donatur!</h3>
              <p class="text-emerald-100">
                Barang bekas yang Anda terima memberikan manfaat besar bagi mereka yang membutuhkan.
                Terus berbagi kebaikan!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- DONASI TAB -->
      <div v-if="activeTab === 'donasi'">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold">Daftar Donasi</h1>
          <!-- <button
            class="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Donasi Baru
          </button> -->
        </div>

        <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-700">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Barang</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Donatur</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Jumlah</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Kondisi</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold">Status Pengiriman</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr
                  v-for="donation in donasi.DataDonasiTerkini"
                  :key="donation.id"
                  class="hover:bg-gray-750 transition-all"
                >
                  <td class="px-6 py-4">{{ donation.namaBarang }}</td>
                  <td class="px-6 py-4 text-gray-400">
                    {{ donation.namaDonatur }}
                  </td>
                  <!-- <td class="px-6 py-4 font-semibold text-emerald-400">
                    Rp {{ donation.amount.toLocaleString('id-ID') }}
                  </td> -->
                  <td class="px-6 py-4 text-gray-400">{{ donation.jumlah }}</td>
                  <td class="px-6 py-4 text-gray-400">{{ donation.kondisi }}</td>
                  <td class="px-6 py-4 text-gray-400">{{ donation.tanggalDonasi }}</td>
                  <td class="px-6 py-4 text-gray-400">{{ donation.status }}</td>
                  <td
                    class="px-6 py-4 text-green-400"
                    :class="
                      donation.statusPengiriman !== 'selesai' ? 'text-amber-300' : 'text-green-400'
                    "
                  >
                    {{ donation.statusPengiriman }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>

  <ModalLogout :token="'token_penerima'" :isOpen="isOpenModal" @close="isOpenModal = false" />
</template>

<script setup>
import ModalLogout from '@/components/Modal/ModalLogout.vue'
import socket from '@/plugins/socket'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Home,
  Heart,
  Package,
  Users,
  LogOut,
  Clock,
  CheckCircle,
  Shirt,
  Book,
  Sofa,
  Laptop,
  ChefHat,
} from 'lucide-vue-next'
import { useBarang } from '@/store/barang'
import { useDonatur } from '@/store/donatur'
import { useDataDonasi } from '@/store/dataDonasi'
const isOpenModal = ref(false)
const activeTab = ref('home')

const cekKategoriIcon = (item) => {
  switch (item) {
    case 'elektronik':
      return Laptop
    case 'furniture':
      return Sofa
    case 'pakaian':
      return Shirt
    case 'buku':
      return Book
    case 'peralatan dapur':
      return ChefHat
  }
}

const barang = useBarang()
const donatur = useDonatur()
const donasi = useDataDonasi()

// let interval
onMounted(async () => {
  await barang.getDataBarangP()
  await donatur.getDataDonaturP()
  await donasi.getDataP()
  await barang.getDataBarangPR()
  await donasi.getKategori('pakaian')
  await donasi.getKategori('buku')
  await donasi.getKategori('furniture')
  await donasi.getKategori('elektronik')
  await donasi.getKategori('peralatan dapur')
  await donasi.getDonasiTerbaru()
  socket.on('data_update', async (data) => {
    console.log(data)
    await barang.getDataBarangP()
    await donatur.getDataDonaturP()
    await donasi.getDataP()
    await barang.getDataBarangPR()
    await donasi.getKategori('pakaian')
    await donasi.getKategori('buku')
    await donasi.getKategori('furniture')
    await donasi.getKategori('elektronik')
    await donasi.getKategori('peralatan dapur')
    await donasi.getDonasiTerbaru()
  })
  // interval = setInterval(() => {
  //   barang.getDataBarangP()
  //   donatur.getDataDonaturP()
  //   donasi.getDataP()
  //   barang.getDataBarangPR()
  //   donasi.getKategori('pakaian')
  //   donasi.getKategori('buku')
  //   donasi.getKategori('furniture')
  //   donasi.getKategori('elektronik')
  //   donasi.getKategori('peralatan dapur')
  //   donasi.getDonasiTerbaru()
  // }, 3000)
})

onUnmounted(() => socket.off('data_update'))

const stats = computed(() => [
  {
    label: 'Total Barang Diterima',
    value: barang.totalDataBarangP,
    icon: Package,
    color: 'bg-emerald-500',
  },
  {
    label: 'Total Donatur',
    value: donatur.totalDataP,
    icon: Users,
    color: 'bg-blue-500',
  },
  { label: 'Dalam Proses', value: donasi.totalDataP, icon: Clock, color: 'bg-amber-500' },
  {
    label: 'Barang Disalurkan',
    value: barang.totalDataBarangPR,
    icon: CheckCircle,
    color: 'bg-purple-500',
  },
])

const categories = computed(() => [
  { name: 'Pakaian', count: donasi.totalKategoriPakaian, color: 'bg-pink-500' },
  { name: 'Buku', count: donasi.totalKategoriBuku, color: 'bg-blue-500' },
  { name: 'Elektronik', count: donasi.totalKategoriElektronik, color: 'bg-purple-500' },
  { name: 'Furniture', count: donasi.totalKategoriFurniture, color: 'bg-green-500' },
  { name: 'Peralatan Dapur', count: donasi.totalKategoriDapur, color: 'bg-orange-500' },
])

const totalCategories = computed(() => categories.value.reduce((acc, cat) => acc + cat.count, 0))

const handleLogout = () => {
  isOpenModal.value = !isOpenModal.value
}
</script>
