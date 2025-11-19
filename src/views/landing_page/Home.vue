<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import {
  CubeIcon,
  UsersIcon,
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/solid'
import {
  Globe,
  HandHeart,
  Users,
  UserPlus,
  CheckCircle,
  LogIn,
  Shield,
  FileText,
  Heart,
  Package,
} from 'lucide-vue-next'

import { onMounted, reactive, ref } from 'vue'

const stats = reactive([
  {
    id: 1,
    icon: CubeIcon,
    value: 2543,
    label: 'Barang Terkumpul',
    current: 0,
  },
  {
    id: 2,
    icon: UsersIcon,
    value: 1234,
    label: 'Donatur',
    current: 0,
  },
  {
    id: 3,
    icon: HeartIcon,
    value: 987,
    label: 'Penerima Manfaat',
    current: 0,
  },
])

const categories = reactive([
  {
    name: 'Pakaian',
    desc: 'Baju, celana, sepatu yang masih layak pakai',
    items: '856 item',
    aos: 'fade-up',
    duration: '0',
  },
  {
    name: 'Elektronik',
    desc: 'HP, laptop, TV, dan perangkat elektronik lainnya',
    items: '234 item',
    aos: 'fade-up',
    duration: '200',
  },
  {
    name: 'Furniture',
    desc: 'Meja, kursi, lemari, dan perabotan rumah',
    items: '189 item',
    aos: 'fade-up',
    duration: '400',
  },
  {
    name: 'Buku & Media',
    desc: 'Buku, majalah, CD/DVD edukatif',
    items: '456 item',
    aos: 'fade-up',
    duration: '600',
  },
  {
    name: 'Mainan',
    desc: 'Mainan anak yang masih berfungsi dengan baik',
    items: '312 item',
    aos: 'fade-up',
    duration: '800',
  },
  {
    name: 'Sepatu dan sandal',
    desc: 'Sepatu dan sandal dalam kondisi baik',
    items: '496 item',
    aos: 'fade-up',
    duration: '1000',
  },
])
const isOpen = ref(true)
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
const isScrolled = ref(false)
onMounted(() =>
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  }),
)

function animateValue(stat, duration = 2000) {
  const start = 0
  const end = stat.value
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    stat.current = Math.floor(progress * (end - start) + start)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  const section = document.getElementById('stats-section')

  if (!section) return

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.forEach((stat) => {
            if (stat.current === 0) {
              animateValue(stat, 2000)
            }
          })
          observer.unobserve(section) // supaya animasi cuma sekali
        }
      })
    },
    { threshold: 0.3 },
  )

  observer.observe(section)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
    <!-- Header -->
    <header
      :class="[
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-gray-900/70 backdrop-blur-lg shadow-md' : 'bg-transparent',
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center gap-3">
            <div class="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
              <ArrowPathIcon class="w-8 h-8 text-white" />
            </div>
            <div>
              <h1
                class="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
              >
                DonasiKita
              </h1>
              <p class="text-xs md:text-sm text-gray-400">Berbagi untuk Berkelanjutan</p>
            </div>
          </div>
          <nav class="hidden md:flex gap-6">
            <a href="#home" class="text-gray-300 hover:text-green-400 transition-colors">Beranda</a>
            <a href="#about" class="text-gray-300 hover:text-green-400 transition-colors"
              >Tentang</a
            >
            <a href="#stats-section" class="text-gray-300 hover:text-green-400 transition-colors"
              >Dampak</a
            >
            <a href="#donasi" class="text-gray-300 hover:text-green-400 transition-colors"
              >Donasi</a
            >
            <a href="#panduan" class="text-gray-300 hover:text-green-400 transition-colors"
              >Panduan</a
            >
            <a href="#contact" class="text-gray-300 hover:text-green-400 transition-colors"
              >Kontak</a
            >
          </nav>
          <div class="md:hidden flex items-center transition duration-300 ease-in-out">
            <Bars3Icon
              class="h-8 w-8 text-gray-50 cursor-pointer ml-2"
              @click="toggleSidebar"
              :class="isOpen ? 'hidden' : 'block'"
            />
            <XMarkIcon
              class="h-8 w-8 text-gray-50 cursor-pointer ml-2"
              :class="isOpen ? 'block' : 'hidden'"
              @click="toggleSidebar"
            />
          </div>
        </div>
      </div>
      <div class="md:hidden bg-gray-800 border-t border-gray-700" :class="{ hidden: !isOpen }">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">Beranda</a>
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">Tentang Kami</a>
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">Donasi</a>
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">
            Penerima Bantuan
          </a>
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">Dampak</a>
          <a class="block px-3 py-2 text-gray-300 hover:text-white cursor-pointer">Kontak</a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
      id="home"
      class="flex flex-col justify-center items-center min-h-screen bg-[#0d1321] text-center md:py-32"
    >
      <h1
        class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        Berikan Kehidupan Baru untuk Barang Bekas Anda
      </h1>
      <p class="mt-4 text-gray-300 max-w-3xl sm:text-lg">
        Bergabunglah dengan gerakan berkelanjutan kami. Donasikan barang bekas berkualitas dan bantu
        mereka yang membutuhkan sambil mengurangi jejak karbon untuk planet yang lebih hijau.
      </p>
      <div class="flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center p-3">
        <router-link
          to="/DonasiKita/login"
          class="bg-gradient-to-r cursor-pointer from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
        >
          Mulai Donasi Sekarang
        </router-link>
        <router-link
          to="#"
          class="border-2 cursor-pointer border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all"
        >
          Pelajari Lebih Lanjut
        </router-link>
      </div>
      <div class="flex justify-center mt-10">
        <!-- pakai heroicons chevron-down -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-10 h-10 text-gray-400 animasi-fade-up cursor-pointer"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- tentang -->
    <section id="about" class="py-20 bg-gray-800" data-aos="zoom-in">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6 text-green-400">Tentang DonasiKita</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Kami adalah organisasi nirlaba yang berkomitmen untuk mengurangi limbah dan membantu
            masyarakat yang membutuhkan melalui program donasi barang bekas.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="text-center p-6 bg-gray-700 rounded-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Globe class="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold mb-3">Visi Kami</h3>
            <p class="text-gray-300">
              Menciptakan dunia yang lebih berkelanjutan dengan mengurangi sampah dan memberikan
              akses barang layak pakai kepada yang membutuhkan.
            </p>
          </div>

          <div
            class="text-center p-6 bg-gray-700 rounded-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <HandHeart class="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold mb-3">Misi Kami</h3>
            <p class="text-gray-300">
              Memfasilitasi donasi barang bekas berkualitas dan mendistribusikannya kepada keluarga
              kurang mampu, sekolah, dan komunitas yang membutuhkan.
            </p>
          </div>

          <div
            class="text-center p-6 bg-gray-700 rounded-lg"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <Users class="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold mb-3">Tim Kami</h3>
            <p class="text-gray-300">
              Dikelola oleh tim volunteer berpengalaman yang berkomitmen penuh untuk menciptakan
              dampak positif bagi lingkungan dan masyarakat.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Stats -->
    <section id="stats-section" data-aos="zoom-in" class="py-16 bg-gray-800">
      <div class="gunung relative overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#101828"
            fill-opacity="1"
            color="fill-gray-900"
            class="w-full h-auto"
            d="M0,256L80,234.7C160,213,320,171,480,154.7C640,139,800,149,960,170.7C1120,192,1280,224,1360,240L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6 text-green-400">Dampak Yang Telah Dicapai</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Berkat dukungan para donatur, kami telah berhasil menciptakan dampak positif yang
              signifikan.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center group" v-for="item in stats" :key="item.id">
            <div
              class="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <component :is="item.icon" class="w-8 h-8 text-white" />
            </div>
            <div class="text-2xl md:text-3xl font-bold text-green-400 mb-2">
              {{ item.current.toLocaleString() }}
            </div>
            <div class="text-gray-300">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section id="donasi" data-aos="fade-up" class="py-16 bg-gray-900">
      <!-- Wave terbalik -->
      <!-- <div class="gunung-terbalik relative bottom-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto">
          <path
            fill="#1e2939"
            fill-opacity="1"
            d="M0,256L8,245.3C16,235,32,213,48,176C64,139,80,85,96,90.7C112,96,128,160,144,165.3C160,171,176,117,192,101.3C208,85,224,107,240,112C256,117,272,107,288,90.7C304,75,320,53,336,42.7C352,32,368,32,384,37.3C400,43,416,53,432,48C448,43,464,21,480,16C496,11,512,21,528,42.7C544,64,560,96,576,96C592,96,608,64,624,85.3C640,107,656,181,672,208C688,235,704,213,720,181.3C736,149,752,107,768,85.3C784,64,800,64,816,80C832,96,848,128,864,122.7C880,117,896,75,912,90.7C928,107,944,181,960,197.3C976,213,992,171,1008,170.7C1024,171,1040,213,1056,240C1072,267,1088,277,1104,266.7C1120,256,1136,224,1152,176C1168,128,1184,64,1200,64C1216,64,1232,128,1248,144C1264,160,1280,128,1296,101.3C1312,75,1328,53,1344,37.3C1360,21,1376,11,1392,42.7C1408,75,1424,149,1432,186.7L1440,224L1440,0L0,0Z"
          ></path>
        </svg>
      </div> -->

      <!-- Judul -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Kategori Barang yang Kami Terima</h3>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Berbagai jenis barang bekas berkualitas yang dapat memberikan manfaat bagi orang lain
          </p>
        </div>

        <!-- Kategori -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, idx) in categories"
            :key="idx"
            :data-aos="item.aos"
            :data-aos-delay="item.duration"
            class="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:bg-gray-750 transition-all hover:scale-105"
          >
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-lg md:text-xl font-semibold text-green-400">
                {{ item.name }}
              </h4>
              <!-- <span class="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs md:text-sm">
                {{ item.items }}
              </span> -->
            </div>
            <p class="text-gray-300 text-sm md:text-base">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- panduan donasi -->

      <div class="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up" id="panduan">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6 text-green-400">Panduan Donasi</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Bergabunglah dengan komunitas donatur DonasiKita dan berikan dampak nyata melalui donasi
            barang bekas berkualitas.
          </p>
        </div>
        <!-- <h3 class="text-2xl font-semibold mb-6">Proses Donasi</h3> -->

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6">Untuk Donatur</h3>
            <div class="bg-gray-700 p-6 rounded-lg mb-6">
              <div class="flex items-center space-x-3 mb-4">
                <UserPlus class="h-6 w-6 text-green-500" color="green" />
                <h4 class="text-xl font-semibold">Wajib Daftar Akun Donatur</h4>
              </div>
              <p class="text-gray-300 mb-4">
                Untuk memastikan transparansi dan keamanan dalam proses donasi, setiap donatur
                diwajibkan untuk mendaftarkan akun terlebih dahulu sebelum melakukan donasi barang.
              </p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <CheckCircle class="h-4 w-4 text-green-500" color="green" />
                  <span class="text-sm">Tracking donasi Anda secara real-time</span>
                </div>
                <div class="flex items-center space-x-2">
                  <CheckCircle class="h-4 w-4 text-green-500" color="green" />
                  <span class="text-sm">Mendapat laporan dampak donasi</span>
                </div>
                <div class="flex items-center space-x-2">
                  <CheckCircle class="h-4 w-4 text-green-500" color="green" />
                  <span class="text-sm">Riwayat donasi tersimpan aman</span>
                </div>
                <div class="flex items-center space-x-2">
                  <CheckCircle class="h-4 w-4 text-green-500" color="green" />
                  <span class="text-sm">Sertifikat donasi digital</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <router-link
                to="/DonasiKita/register"
                class="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <UserPlus class="h-5 w-5" />
                <span>Daftar Donatur</span>
              </router-link>
              <router-link
                to="/DonasiKita/login"
                class="border border-green-600 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <LogIn class="h-5 w-5" />
                <span>Login Donatur</span>
              </router-link>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold mb-6">Cara Kerja Donasi</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="0">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  1
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Daftar & Login</h4>
                  <p class="text-gray-300">
                    Buat akun donatur atau login ke akun yang sudah ada untuk mengakses sistem
                    donasi.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="10">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  2
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Pilih Barang Donasi</h4>
                  <p class="text-gray-300">
                    Masuk ke dashboard dan pilih kategori barang yang ingin Anda donasikan beserta
                    deskripsi kondisi.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="30">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  3
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Jadwal Penjemputan</h4>
                  <p class="text-gray-300">
                    Sistem akan mencocokkan dengan penerima dan menjadwalkan penjemputan di alamat
                    Anda.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  4
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Verifikasi & Distribusi</h4>
                  <p class="text-gray-300">
                    Barang diverifikasi kualitasnya, lalu didistribusikan kepada penerima yang
                    sesuai.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="70">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  5
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Laporan Dampak</h4>
                  <p class="text-gray-300">
                    Dapatkan laporan real-time tentang bagaimana donasi Anda memberikan dampak
                    kepada penerima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-700 p-8 rounded-lg mt-12" data-aos="fade-down">
          <h3 class="text-2xl font-semibold mb-6 text-center">
            Keuntungan Menjadi Donatur Terdaftar
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col items-center text-center">
              <Shield class="h-12 w-12 stroke-green-500 mx-auto mb-4" color="green" />
              <h4 class="font-semibold mb-2">Keamanan Terjamin</h4>
              <p class="text-gray-300 text-sm">
                Data dan donasi Anda dilindungi dengan sistem keamanan berlapis
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <FileText class="h-12 w-12 stroke-blue-500 mx-auto mb-4" color="blue" />
              <h4 class="font-semibold mb-2">Transparansi Penuh</h4>
              <p class="text-gray-300 text-sm">
                Lihat perjalanan donasi dari penjemputan hingga ke tangan penerima
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <Heart class="h-12 w-12 stroke-red-500 mx-auto mb-4" color="red" />
              <h4 class="font-semibold mb-2">Dampak Terukur</h4>
              <p class="text-gray-300 text-sm">
                Dapatkan laporan dampak sosial dan lingkungan dari setiap donasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- penerima -->
    <section id="recipient" class="py-20 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-6 text-green-400">Untuk Penerima Manfaat</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Apakah Anda membutuhkan bantuan barang? Daftarkan diri Anda sebagai penerima manfaat
            untuk mendapatkan akses ke donasi barang berkualitas.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 class="text-2xl font-semibold mb-6">Syarat & Ketentuan Penerima</h3>
            <div class="space-y-4">
              <div
                class="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <CheckCircle class="h-6 w-6 text-green-500 mt-1" color="green" />
                <div>
                  <h4 class="font-semibold mb-2">Keluarga Prasejahtera</h4>
                  <p class="text-gray-300 text-sm">
                    Diutamakan untuk keluarga dengan kondisi ekonomi yang membutuhkan bantuan
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="10"
              >
                <CheckCircle class="h-6 w-6 text-green-500 mt-1" color="green" />
                <div>
                  <h4 class="font-semibold mb-2">Lembaga Sosial</h4>
                  <p class="text-gray-300 text-sm">
                    Panti asuhan, sekolah, atau lembaga sosial yang terdaftar resmi
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="30"
              >
                <CheckCircle class="h-6 w-6 text-green-500 mt-1" color="green" />
                <div>
                  <h4 class="font-semibold mb-2">Korban Bencana</h4>
                  <p class="text-gray-300 text-sm">
                    Individu atau keluarga yang terkena dampak bencana alam
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <CheckCircle class="h-6 w-6 text-green-500 mt-1" color="green" />
                <div>
                  <h4 class="font-semibold mb-2">Verifikasi Dokumen</h4>
                  <p class="text-gray-300 text-sm">
                    Memiliki dokumen pendukung seperti KTP, KK, dan surat keterangan tidak mampu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold mb-6">Cara Mendaftar</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="0">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  1
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Daftar Akun</h4>
                  <p class="text-gray-300">
                    Buat akun baru dengan mengisi data diri dan informasi kebutuhan Anda.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="10">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  2
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Verifikasi Data</h4>
                  <p class="text-gray-300">
                    Tim kami akan memverifikasi data dan dokumen yang Anda berikan.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="30">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  3
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Persetujuan</h4>
                  <p class="text-gray-300">
                    Setelah disetujui, Anda akan mendapat notifikasi dan akses ke program donasi.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="50">
                <div
                  class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold"
                >
                  4
                </div>
                <div>
                  <h4 class="font-semibold text-lg mb-2">Terima Bantuan</h4>
                  <p class="text-gray-300">
                    Dapatkan notifikasi ketika ada barang yang sesuai dengan kebutuhan Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-700 p-8 rounded-lg mb-8">
          <h3 class="text-2xl font-semibold mb-6 text-center">Jenis Bantuan Yang Tersedia</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="flex flex-col items-center text-center">
              <Package class="h-12 w-12 stroke-blue-500 mx-auto mb-4 block" color="blue" />
              <h4 class="font-semibold mb-2">Pakaian</h4>
              <p class="text-gray-300 text-sm">Pakaian layak pakai untuk segala usia</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <FileText class="h-12 w-12 stroke-yellow-500 mx-auto mb-4 block" color="orange" />
              <h4 class="font-semibold mb-2">Alat Tulis</h4>
              <p class="text-gray-300 text-sm">Buku, pensil, dan perlengkapan sekolah</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <Heart class="h-12 w-12 stroke-red-500 mx-auto mb-4 block" color="red" />
              <h4 class="font-semibold mb-2">Peralatan Rumah</h4>
              <p class="text-gray-300 text-sm">Perabot dan peralatan rumah tangga</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <Users class="h-12 w-12 stroke-green-500 mx-auto mb-4 block" color="green" />
              <h4 class="font-semibold mb-2">Mainan Anak</h4>
              <p class="text-gray-300 text-sm">Mainan edukatif untuk anak-anak</p>
            </div>
          </div>
        </div>

        <div class="text-center space-y-4">
          <p class="text-lg text-gray-300 mb-6">
            Sudah memiliki akun atau ingin mendaftar sebagai penerima manfaat?
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/DonasiKita/register"
              data-aos="fade-left"
              data-aos-delay="0"
              class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <UserPlus class="h-5 w-5" />
              <span>Daftar Sebagai Penerima</span>
            </router-link>
            <router-link
              to="/DonasiKita/login"
              data-aos="fade-right"
              data-aos-delay="20"
              class="border border-blue-600 hover:bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2"
            >
              <LogIn class="h-5 w-5" />
              <span>Login Penerima</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="80">
        <router-link
          to="/DonasiKita/login"
          class="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
        >
          Donasi sekarang
        </router-link>
      </div>
    </section>

    <!-- Contact -->
    <section data-aos="fade-left" id="contact" class="py-16 bg-gray-800">
      <div class="pinhead relative bottom-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#101828"
            fill-opacity="1"
            class="w-full h-auto"
            d="M0,256L48,192L96,32L144,224L192,64L240,128L288,96L336,32L384,32L432,64L480,0L528,32L576,128L624,32L672,256L720,192L768,64L816,64L864,160L912,32L960,256L1008,128L1056,256L1104,288L1152,192L1200,0L1248,192L1296,96L1344,32L1392,0L1440,224L1440,0L1392,0L1344,0L1296,0L1248,0L1200,0L1152,0L1104,0L1056,0L1008,0L960,0L912,0L864,0L816,0L768,0L720,0L672,0L624,0L576,0L528,0L480,0L432,0L384,0L336,0L288,0L240,0L192,0L144,0L96,0L48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Hubungi Kami</h3>
          <p class="text-gray-400">Ada pertanyaan? Kami siap membantu Anda</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div class="text-center">
            <div
              class="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <PhoneIcon class="w-8 h-8 text-white" />
            </div>
            <h4 class="text-lg md:text-xl font-semibold mb-2 text-green-400">Telepon</h4>
            <p class="text-gray-300 text-sm md:text-base">+62 21 1234 5678</p>
            <p class="text-gray-300 text-sm md:text-base">+62 812 3456 7890</p>
          </div>
          <div class="text-center">
            <div
              class="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <EnvelopeIcon class="w-8 h-8 text-white" />
            </div>
            <h4 class="text-lg md:text-xl font-semibold mb-2 text-green-400">Email</h4>
            <p class="text-gray-300 text-sm md:text-base">info@DonasiKita.id</p>
            <p class="text-gray-300 text-sm md:text-base">support@DonasiKita.id</p>
          </div>
          <div class="text-center">
            <div
              class="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <MapPinIcon class="w-8 h-8 text-white" />
            </div>
            <h4 class="text-lg md:text-xl font-semibold mb-2 text-green-400">Alamat</h4>
            <p class="text-gray-300 text-sm md:text-base">Jl. Berkelanjutan No. 123</p>
            <p class="text-gray-300 text-sm md:text-base">Jakarta Selatan, 12345</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 py-12 border-t border-gray-800">
      <div class="gunung-anakan relative bottom-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#1e2939"
            fill-opacity="1"
            class="w-full h-auto"
            d="M0,224L0,160L60,160L60,192L120,192L120,288L180,288L180,96L240,96L240,224L300,224L300,288L360,288L360,160L420,160L420,192L480,192L480,160L540,160L540,128L600,128L600,192L660,192L660,160L720,160L720,288L780,288L780,192L840,192L840,32L900,32L900,224L960,224L960,288L1020,288L1020,128L1080,128L1080,32L1140,32L1140,288L1200,288L1200,224L1260,224L1260,160L1320,160L1320,32L1380,32L1380,32L1440,32L1440,0L1380,0L1380,0L1320,0L1320,0L1260,0L1260,0L1200,0L1200,0L1140,0L1140,0L1080,0L1080,0L1020,0L1020,0L960,0L960,0L900,0L900,0L840,0L840,0L780,0L780,0L720,0L720,0L660,0L660,0L600,0L600,0L540,0L540,0L480,0L480,0L420,0L420,0L360,0L360,0L300,0L300,0L240,0L240,0L180,0L180,0L120,0L120,0L60,0L60,0L0,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <ArrowPathIcon class="w-6 h-6 text-white" />
              </div>
              <span
                class="text-lg md:text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
              >
                DonasiKita
              </span>
            </div>
            <p class="text-gray-400 text-sm md:text-base">
              Platform donasi barang bekas yang menghubungkan donatur dengan penerima manfaat untuk
              menciptakan dampak positif bagi lingkungan.
            </p>
          </div>
          <div>
            <h5 class="text-base md:text-lg font-semibold mb-4 text-green-400">Layanan</h5>
            <ul class="space-y-2 text-gray-400 text-sm md:text-base">
              <li><a href="#" class="hover:text-green-400 transition-colors">Donasi Barang</a></li>
              <li><a href="#" class="hover:text-green-400 transition-colors">Pickup Gratis</a></li>
              <li><a href="#" class="hover:text-green-400 transition-colors">Laporan Dampak</a></li>
              <li>
                <a href="#" class="hover:text-green-400 transition-colors">Program Edukasi</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 class="text-base md:text-lg font-semibold mb-4 text-green-400">Tentang</h5>
            <ul class="space-y-2 text-gray-400 text-sm md:text-base">
              <li><a href="#" class="hover:text-green-400 transition-colors">Visi Misi</a></li>
              <li><a href="#" class="hover:text-green-400 transition-colors">Tim Kami</a></li>
              <li><a href="#" class="hover:text-green-400 transition-colors">Transparansi</a></li>
              <li><a href="#" class="hover:text-green-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 class="text-base md:text-lg font-semibold mb-4 text-green-400">Jam Operasional</h5>
            <div class="space-y-2 text-gray-400 text-sm md:text-base">
              <div class="flex items-center gap-2">
                <ClockIcon class="w-4 h-4" />
                <span>Senin - Jumat: 08:00 - 17:00</span>
              </div>
              <div class="flex items-center gap-2">
                <ClockIcon class="w-4 h-4" />
                <span>Sabtu: 08:00 - 14:00</span>
              </div>
              <div class="flex items-center gap-2">
                <ClockIcon class="w-4 h-4" />
                <span>Minggu: Tutup</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-xs md:text-sm"
        >
          <p>&copy; 2024 DonasiKita. All rights reserved. Made with 🍌 for a sustainable future.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fade-up-loop {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.animasi-fade-up {
  animation: fade-up-loop 2s ease-in-out infinite;
}
</style>
