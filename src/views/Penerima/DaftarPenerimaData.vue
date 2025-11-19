<!-- eslint-disable no-unused-vars -->
<script setup>
import { useAuth } from '@/store/auth'
import { ref } from 'vue'
const auth = useAuth()
</script>
<template>
  <div class="addData h-screen dark:bg-gray-800">
    <section class="dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
              Masuka data pribadimu
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="auth.personalRegister">
              <div class="mb-5">
                <label for="penghasilan" class="block mb-2 text-sm font-medium dark:text-white"
                  >penghasilan perbulan</label
                >
                <input
                  type="text"
                  id="penghasilan"
                  v-model="auth.formDataPersonalRegister.penghasilan"
                  class="shadow-xs border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="tanggungan" class="block mb-2 text-sm font-medium dark:text-white"
                  >jumlah tanggunan</label
                >
                <input
                  type="text"
                  id="tanggungan"
                  v-model="auth.formDataPersonalRegister.tanggungan"
                  class="shadow-xs border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="kendaraan" class="block mb-2 text-sm font-medium dark:text-white"
                  >jumlah kendaraan</label
                >
                <input
                  type="text"
                  id="kendaraan"
                  v-model="auth.formDataPersonalRegister.kendaraan"
                  class="shadow-xs border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                />
              </div>
              <div class="mb-5">
                <label for="tempat_tinggal" class="block mb-2 text-sm font-medium dark:text-white"
                  >status tempat tinggal</label
                >
                <select
                  name="kategori"
                  id="tempat_tinggal"
                  v-model="auth.formDataPersonalRegister.status_tempat_tinggal"
                  class="text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                >
                  <option disabled value="">-- Pilih status --</option>
                  <option value="menumpang">Menumpang</option>
                  <option value="ngontrak">Ngontrak</option>
                  <option value="milik sendiri">Milik sendiri</option>
                </select>
              </div>
              <div class="mb-5">
                <label for="kategori" class="block mb-2 text-sm font-medium dark:text-white"
                  >jenis kebutuhan</label
                >
                <select
                  id="kategori"
                  v-model="auth.formDataPersonalRegister.kategori"
                  class="text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                >
                  <option disabled value="">-- Pilih jenis kebutuhan --</option>
                  <option value="pakaian">Pakaian</option>
                  <option value="buku">buku</option>
                  <option value="pelalatan dapur">pelalatan dapur</option>
                  <option value="elektronik">elektronik</option>
                </select>
              </div>
              <div class="mb-5">
                <label for="kebutuhan" class="block mb-2 text-sm font-medium dark:text-white"
                  >nama barang</label
                >
                <input
                  type="text"
                  id="kebutuhan"
                  v-model="auth.formDataPersonalRegister.jenis_kebutuhan"
                  class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                />
              </div>
              <!-- <div class="mb-5">
                <label for="kebutuhan" class="block mb-2 text-sm font-medium dark:text-white"
                  >Jumlah</label
                >
                <input
                  type="text"
                  id="kebutuhan"
                  v-model="auth.formDataPersonalRegister.jumlah"
                  class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  required
                />
              </div> -->

              <button
                type="submit"
                :disabled="auth.isFormValidPersonal"
                class="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                :class="
                  !auth.formDataPersonalRegister.penghasilan ||
                  !auth.formDataPersonalRegister.tanggungan ||
                  !auth.formDataPersonalRegister.kendaraan ||
                  !auth.formDataPersonalRegister.status_tempat_tinggal ||
                  !auth.formDataPersonalRegister.jenis_kebutuhan ||
                  !auth.formDataPersonalRegister.kategori
                    ? 'opacity-50 cursor-not-allowed bg-blue-600 '
                    : 'cursor-pointer dark:hover:bg-blue-700 dark:bg-blue-600  dark:focus:ring-blue-800'
                "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
