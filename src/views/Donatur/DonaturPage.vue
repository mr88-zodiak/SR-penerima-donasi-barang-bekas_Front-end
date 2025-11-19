<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Search,
  Heart,
  Package,
  Shirt,
  Book,
  Utensils,
  Sofa,
  Laptop,
  Bell,
  Clock,
  Check,
  XCircle,
} from 'lucide-vue-next'
import ModalLogout from '@/components/Modal/ModalLogout.vue'
import { useDataKlasifikasi } from '@/store/dataKlasifikasi'
import { useAuth } from '@/store/auth'
import { useNotif } from '@/store/notif'
import { useDataDonasi } from '@/store/dataDonasi'
import socket from '@/plugins/socket'

// --- State ---
const selectedCategory = ref('semua')
const searchQuery = ref('')
const isModalOpen = ref(false)
const showNotifications = ref(false)
const activeView = ref('browse')

// --- Stores ---
const donatur = useDataKlasifikasi()
const notif = useNotif()
const auth = useAuth()
const donasi = useDataDonasi()

// --- Computed pending donations ---
// ambil hanya yang statusnya pending, processing, atau on_delivery
const pendingDonations = computed(() =>
  donatur.klasifikasiData.filter((item) =>
    ['pending', 'processing', 'on_delivery'].includes(item.status),
  ),
)

// --- Category Icons ---
const categories = [
  { name: 'semua', icon: Package },
  { name: 'pakaian', icon: Shirt },
  { name: 'buku', icon: Book },
  { name: 'peralatan dapur', icon: Utensils },
  { name: 'furniture', icon: Sofa },
  { name: 'elektronik', icon: Laptop },
]

// --- Computed filtered donations ---
const filteredDonations = computed(() =>
  donatur.klasifikasiData.filter((item) => {
    const selected = selectedCategory.value.toLowerCase()
    const itemKategori = item.kategori.toLowerCase()
    const search = searchQuery.value.toLowerCase()

    const matchCategory = selected === 'semua' || itemKategori === selected
    const matchSearch =
      item.jenis_kebutuhan.toLowerCase().includes(search) ||
      item.kategori.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search)

    return matchCategory && matchSearch
  }),
)

// --- Badge & Text ---
const getStatusBadge = (status) => {
  const map = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    on_delivery: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  }
  return map[status] || map.pending
}

const getStatusText = (status) => {
  const map = {
    pending: 'Menunggu Konfirmasi',
    processing: 'Sedang Diproses',
    on_delivery: 'Dalam Pengiriman',
  }
  return map[status] || status
}
onMounted(async () => {
  await donasi.getDataRiwayat()
  await donatur.getDataD()
  await auth.getUser()
  await notif.getCallback()
  socket.on('data_update', async (data) => {
    console.log(data)
    await donatur.getDataD()
    await auth.getUser()
    await donasi.getDataRiwayat()
    await notif.getCallback()
  })
})
onUnmounted(() => socket.off('data_update'))
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <Heart class="text-emerald-400" size="32" fill="currentColor" />
            <h1 class="text-2xl font-bold text-emerald-400">hello, {{ auth.getUsername }}</h1>
          </div>

          <div class="flex items-center gap-3">
            <!-- Notification Bell -->
            <div class="relative">
              <button
                @click="showNotifications = !showNotifications"
                class="relative p-2 cursor-pointer hover:bg-gray-700 rounded-lg transition"
              >
                <Bell class="text-gray-300 cursor-pointer" size="24" />
                <span
                  v-if="notif.getTotalnotif > 0"
                  class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
                >
                  {{ notif.getTotalnotif }}
                </span>
              </button>

              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-[999]"
              >
                <div class="p-4 border-b border-gray-700 z-50">
                  <h3 class="font-semibold text-lg">Notifikasi</h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-for="donation in notif.notifData"
                    :key="donation.jenis_kebutuhan"
                    class="p-4 border-b border-gray-700 hover:bg-gray-750 transition"
                  >
                    <div class="flex items-start gap-3">
                      <!-- ⏰ Jika masih pending -->
                      <Clock
                        v-if="donation.status === 'pending'"
                        class="text-yellow-400 mt-1 flex-shrink-0"
                        size="20"
                      />

                      <!-- ✅ Jika sudah disetujui -->
                      <Check
                        v-else-if="donation.status === 'approved'"
                        class="text-emerald-500 mt-1 flex-shrink-0"
                        size="20"
                      />

                      <!-- ❌ Jika ditolak -->
                      <XCircle
                        v-else-if="donation.status === 'rejected'"
                        class="text-red-500 mt-1 flex-shrink-0"
                        size="20"
                      />

                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-200 truncate">
                          {{ donation.jenis_kebutuhan }}
                        </p>
                        <p class="text-xs text-gray-400 mt-1">Status: {{ donation.status }}</p>
                        <p class="text-xs text-gray-500 mt-1">{{ donation.tanggal }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="notif.getTotalnotif" class="p-3 border-t border-gray-700">
                  <button
                    @click="((showNotifications = false), (activeView = 'pending'))"
                    class="w-full cursor-pointer text-center text-sm text-emerald-400 hover:text-emerald-300 transition"
                  >
                    Lihat Selengkapnya
                  </button>
                </div>
              </div>
            </div>

            <!-- Switch View Button -->
            <button
              @click="activeView = activeView === 'browse' ? 'pending' : 'browse'"
              class="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-medium transition"
              :class="
                activeView === 'pending'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              "
            >
              <Clock size="20" />
              <span>Donasi Saya</span>
              <span
                v-if="pendingDonations.length"
                class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
                >{{ pendingDonations.length }}</span
              >
            </button>

            <!-- Logout Button -->
            <button
              @click="isModalOpen = true"
              class="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Log out
            </button>
          </div>
        </div>

        <!-- Search -->
        <div v-if="activeView === 'browse'" class="relative z-40">
          <Search
            class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size="20"
          />
          <input
            type="text"
            placeholder="Cari barang yang kamu butuhkan..."
            v-model="searchQuery"
            class="w-full bg-gray-700 text-gray-100 pl-12 pr-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Browse -->
      <template v-if="activeView === 'browse'">
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Kategori</h2>
          <div class="flex gap-3 overflow-x-auto pb-2">
            <button
              v-for="cat in categories"
              :key="cat.name"
              @click="selectedCategory = cat.name"
              :class="[
                'flex items-center cursor-pointer gap-2 px-5 py-3 rounded-lg font-medium transition whitespace-nowrap',
                selectedCategory === cat.name
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
              ]"
            >
              <component :is="cat.icon" size="20" />
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <!-- Rekomendasi Barang -->
        <div>
          <h2 class="text-xl font-semibold mb-4">
            {{ selectedCategory === 'semua' ? 'Semua Donasi' : `Donasi ${selectedCategory}` }}
            <span class="text-gray-400 text-base ml-2"
              >({{ filteredDonations.length }} barang)</span
            >
          </h2>
          <!-- recomendation system -->

          <!-- end -->

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in filteredDonations"
              :key="item.id"
              class="bg-gray-800 rounded-lg border border-gray-700 hover:border-emerald-500 transition p-4"
            >
              <h3 class="font-semibold text-lg mb-1 text-gray-100">{{ item.jenis_kebutuhan }}</h3>
              <p class="text-emerald-400 text-sm mb-2">{{ item.kategori }}</p>

              <div class="border-t border-gray-700 pt-3 mt-3">
                <p class="text-gray-400 text-sm">
                  Penerima: <span class="text-gray-300">{{ item.name }}</span>
                </p>
              </div>

              <router-link :to="`/DonasiKita/donatur/donate/${item.id}/checkout`">
                <button
                  class="cursor-pointer w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition"
                >
                  Donate now
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <!-- Pending -->
      <template v-else>
        <h2 class="text-2xl font-bold mb-6">Donasi Saya yang Sedang Diproses</h2>

        <div
          v-if="donasi.totalRiwayat > 0"
          class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-750 border-b border-gray-700">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">id</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    nama penerima
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    nama barang
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">kategori</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    kondisi barang
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    tanggal donasi
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    tanggal approve
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    tanggal reject
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">pesan</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    status pengiriman
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr
                  v-for="donation in donasi.riwayatDonasi"
                  :key="donation.id"
                  class="hover:bg-gray-750 transition"
                >
                  <td class="px-6 py-4 text-sm text-gray-300">#{{ donation.id }}</td>
                  <td class="px-6 py-4 text-gray-100">{{ donation.nama }}</td>
                  <td class="px-6 py-4 text-gray-100">{{ donation.nama_barang }}</td>
                  <td class="px-6 py-4 text-gray-100">{{ donation.kategori }}</td>
                  <td class="px-6 py-4 text-gray-100">
                    {{ donation.kondisi }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-300">{{ donation.tanggal_donasi }}</td>
                  <td
                    class="px-6 py-4 text-sm text-gray-300"
                    :class="getStatusBadge(donation.status)"
                  >
                    {{ getStatusText(donation.status) }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-400">{{ donation.tanggal_approve }}</td>
                  <td class="px-6 py-4 text-sm text-gray-400">{{ donation.tanggal_reject }}</td>
                  <td class="px-6 py-4 text-sm text-gray-400">{{ donation.pesan }}</td>
                  <td class="px-6 py-4 text-sm text-gray-400">{{ donation.statusPengiriman }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else class="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
          <Clock class="mx-auto text-gray-600 mb-4" size="64" />
          <p class="text-gray-400 text-lg">Belum ada donasi yang sedang diproses</p>
        </div>
      </template>
    </div>

    <!-- Modal -->
    <ModalLogout :is-open="isModalOpen" @close="isModalOpen = false" token="token_donatur" />
  </div>
</template>
