<script setup>
import { usePenerima } from '@/store/penerima'
import { useTheme } from '@/store/themeStore'

const penerima = usePenerima()
const theme = useTheme()
</script>

<template>
  <div class="dashboard_penerima fixed top-13 w-screen h-screen p-4 dark:bg-gray-800">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white capitalize"
      >
        edit your personal data
      </h1>
      <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="penerima.penerimaDataPost">
        <div class="mb-5">
          <label
            for="penghasilan"
            class="block mb-2 text-sm font-medium text-gray-900"
            :class="{ 'dark:text-white': theme.isdarkMode }"
            >penghasilan perbulan</label
          >
          <input
            type="text"
            id="penghasilan"
            v-model="penerima.formDataDiri.penghasilan_perbulan"
            class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light':
                theme.isdarkMode,
            }"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="tanggungan"
            class="block mb-2 text-sm font-medium text-gray-900"
            :class="{ 'dark:text-white': theme.isdarkMode }"
            >jumlah tanggunan</label
          >
          <input
            type="text"
            id="tanggungan"
            v-model="penerima.formDataDiri.jumlah_tanggungan"
            class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light':
                theme.isdarkMode,
            }"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="kendaraan"
            class="block mb-2 text-sm font-medium text-gray-900"
            :class="{ 'dark:text-white': theme.isdarkMode }"
            >jumlah kendaraan</label
          >
          <input
            type="text"
            id="kendaraan"
            v-model="penerima.formDataDiri.jumlah_kendaraan"
            class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light':
                theme.isdarkMode,
            }"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="tempat_tinggal"
            class="block mb-2 text-sm font-medium text-gray-900"
            :class="{ 'dark:text-white': theme.isdarkMode }"
            >status tempat tinggal</label
          >
          <select
            name="kategori"
            id="tempat_tinggal"
            v-model="penerima.formDataDiri.status_tempat_tinggal"
            class="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light':
                theme.isdarkMode,
            }"
            required
          >
            <option disabled value="">-- Pilih status --</option>
            <option value="menumpang">Menumpang</option>
            <option value="ngontrak">Ngontrak</option>
            <!-- <option value="milik sendiri">Milik sendiri</option> -->
          </select>
        </div>
        <div class="mb-5">
          <label
            for="kebutuhan"
            class="block mb-2 text-sm font-medium text-gray-900"
            :class="{ 'dark:text-white': theme.isdarkMode }"
            >jenis kebutuhan</label
          >
          <input
            type="text"
            id="kebutuhan"
            v-model="penerima.formDataDiri.jenis_kebutuhan"
            class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :class="{
              'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light':
                theme.isdarkMode,
            }"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="penerima.isformValid"
          class="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          :class="
            !penerima.formDataDiri.penghasilan_perbulan ||
            !penerima.formDataDiri.jumlah_tanggungan ||
            !penerima.formDataDiri.jumlah_kendaraan ||
            !penerima.formDataDiri.status_tempat_tinggal ||
            !penerima.formDataDiri.jenis_kebutuhan
              ? 'opacity-50 cursor-not-allowed bg-blue-600 '
              : 'cursor-pointer dark:hover:bg-blue-700 dark:bg-blue-600  dark:focus:ring-blue-800'
          "
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
