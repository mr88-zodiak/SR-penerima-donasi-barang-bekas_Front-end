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
              <span class="font-medium">Pengajuan</span>
            </button>
            <button
              @click="activeTab = 'pengajuan'"
              :class="[
                'flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all',
                activeTab === 'pengajuan'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              <Send :size="20" />
              <span class="font-medium">Pengajuan</span>
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
            @click="isOpenModalAjuanBarang = true"
            class="bg-blue-600 cursor-pointer hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Pengajuan barang
          </button> -->
        </div>
        <ModalPengajuanBarang
          :isOpen="isOpenModalAjuanBarang"
          @close="isOpenModalAjuanBarang = false"
        />

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
                  <td
                    class="px-6 py-4 text-gray-400"
                    :class="{
                      'text-green-400': donation.status === 'approved',
                      'text-amber-400': donation.status === 'pending',
                      'text-red-400': donation.status === 'rejected',
                    }"
                  >
                    {{ donation.status }}
                  </td>
                  <td
                    class="px-6 py-4"
                    :class="
                      donation.statusPengiriman !== 'Selesai' ? 'text-amber-300' : 'text-green-400'
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
      <div v-if="activeTab === 'pengajuan'" class="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="flex justify-between items-center mb-8">
            <div>
              <h1 class="text-3xl font-bold text-white mb-2">Pengajuan Barang Donasi</h1>
              <p class="text-gray-400">Kelola pengajuan barang donasi Anda</p>
            </div>

            <button
              @click="showModal = true"
              class="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <Plus size="20" />
              Ajukan Barang
            </button>
          </div>

          <!-- Table -->
          <div class="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-900">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Gambar</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Nama Barang
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Tanggal Pengajuan
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Tanggal Approve
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Tanggal Reject
                    </th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Pesan Penolakan
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-700">
                  <tr
                    v-for="request in requests"
                    :key="request.id"
                    class="hover:bg-gray-750 transition-colors"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-gray-300">{{ request.id }}</td>

                    <td class="px-6 py-4">
                      <img
                        :src="request.gambarBarang"
                        :alt="request.namaBarang"
                        class="w-16 h-16 object-cover rounded-lg border border-gray-600"
                      />
                    </td>

                    <td class="px-6 py-4 text-sm font-medium text-gray-200">
                      {{ request.namaBarang }}
                    </td>

                    <td class="px-6 py-4 text-sm text-gray-400">
                      {{ request.tanggalPengajuan }}
                    </td>

                    <td class="px-6 py-4">
                      <span
                        class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                        :class="getStatusBadge(request.status).class"
                      >
                        <component :is="getStatusBadge(request.status).icon" size="16" />
                        {{ getStatusBadge(request.status).label }}
                      </span>
                    </td>

                    <td class="px-6 py-4 text-sm text-gray-400">
                      {{ request.tanggalApprove || '-' }}
                    </td>

                    <td class="px-6 py-4 text-sm text-gray-400">
                      {{ request.tanggalReject || '-' }}
                    </td>

                    <td class="px-6 py-4 text-sm text-gray-400 max-w-xs">
                      <span v-if="request.pesanPenolakan" class="text-red-400">
                        {{ request.pesanPenolakan }}
                      </span>
                      <span v-else>-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Modal -->
          <div
            v-if="showModal"
            class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          >
            <div class="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
              <div class="p-6">
                <h2 class="text-2xl font-bold text-white mb-6">Ajukan Barang Baru</h2>

                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-300 mb-2">Nama Barang</label>
                  <input
                    type="text"
                    v-model="formData.namaBarang"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Beras 10kg"
                  />
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-300 mb-2">Upload Gambar</label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    @change="handleImageUpload"
                    class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                  />

                  <div v-if="formData.gambarBarang" class="mt-3">
                    <img
                      :src="formData.gambarBarang"
                      alt="Preview"
                      class="w-32 h-32 object-cover rounded-lg border border-gray-600"
                    />
                  </div>
                </div>

                <div class="flex gap-3">
                  <button
                    @click="showModal = false"
                    class="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    @click="handleSubmit"
                    class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Ajukan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- End Modal -->
        </div>
      </div>
    </main>
  </div>

  <ModalLogout :token="'token_penerima'" :isOpen="isOpenModal" @close="isOpenModal = false" />
</template>

<script setup>
import ModalLogout from '@/components/Modal/ModalLogout.vue'
import socket from '@/plugins/socket'
import ModalPengajuanBarang from '@/components/Modal/ModalPengajuanBarang.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Home,
  Send,
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
  XCircle,
} from 'lucide-vue-next'
import { useBarang } from '@/store/barang'
import { useDonatur } from '@/store/donatur'
import { useDataDonasi } from '@/store/dataDonasi'
const requests = ref([
  {
    id: 'REQ001',
    namaBarang: 'Beras 10kg',
    gambarBarang:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
    tanggalPengajuan: '2024-11-15',
    tanggalApprove: '2024-11-16',
    tanggalReject: null,
    status: 'approved',
    pesanPenolakan: null,
  },
  {
    id: 'REQ002',
    namaBarang: 'Minyak Goreng 2L',
    gambarBarang:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
    tanggalPengajuan: '2024-11-18',
    tanggalApprove: null,
    tanggalReject: null,
    status: 'pending',
    pesanPenolakan: null,
  },
  {
    id: 'REQ003',
    namaBarang: 'Paket Sembako',
    gambarBarang: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
    tanggalPengajuan: '2024-11-10',
    tanggalApprove: null,
    tanggalReject: '2024-11-12',
    status: 'rejected',
    pesanPenolakan: 'Stok barang sedang habis, silakan ajukan kembali bulan depan',
  },
])

const showModal = ref(false)
const formData = ref({
  namaBarang: '',
  gambarBarang: '',
})

const handleSubmit = () => {
  if (!formData.value.namaBarang.trim()) return

  const newRequest = {
    id: `REQ${String(requests.value.length + 1).padStart(3, '0')}`,
    namaBarang: formData.value.namaBarang,
    gambarBarang:
      formData.value.gambarBarang ||
      'https://images.unsplash.com/photo-1558769132-cb1aea19d909?w=100&h=100&fit=crop',
    tanggalPengajuan: new Date().toISOString().split('T')[0],
    tanggalApprove: null,
    tanggalReject: null,
    status: 'pending',
    pesanPenolakan: null,
  }

  requests.value.push(newRequest)
  formData.value = { namaBarang: '', gambarBarang: '' }
  showModal.value = false
}

const getStatusBadge = (status) => {
  switch (status) {
    case 'approved':
      return {
        class: 'bg-green-500/20 text-green-400',
        label: 'Disetujui',
        icon: CheckCircle,
      }
    case 'rejected':
      return {
        class: 'bg-red-500/20 text-red-400',
        label: 'Ditolak',
        icon: XCircle,
      }
    default:
      return {
        class: 'bg-yellow-500/20 text-yellow-400',
        label: 'Menunggu',
        icon: Clock,
      }
  }
}
const isOpenModal = ref(false)
const isOpenModalAjuanBarang = ref(false)
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
