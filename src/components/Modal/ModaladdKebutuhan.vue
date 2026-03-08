<!-- eslint-disable no-unused-vars -->
<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

defineProps({
  isOpen: Boolean,
  disable: { type: Boolean, default: true },
  dispay: { type: String, default: 'hidden' },
})
const emits = defineEmits(['close'])

const formData = ref({
  penghasilan: null,
  tanggungan: null,
  kendaraan: null,
  status_tempat_tinggal: '',
  alamat: '',
})

const statusOptions = ['milik sendiri', 'ngontrak', 'menumpang']

const errors = computed(() => ({
  penghasilan:
    !formData.value.penghasilan || formData.value.penghasilan <= 0
      ? 'Penghasilan perbulan harus lebih dari 0'
      : '',
  tanggungan:
    formData.value.tanggungan !== null && formData.value.tanggungan < 0
      ? 'Jumlah tanggungan tidak boleh negatif'
      : '',
  kendaraan:
    formData.value.kendaraan !== null && formData.value.kendaraan < 0
      ? 'Jumlah kendaraan tidak boleh negatif'
      : '',
  status_tempat_tinggal: !formData.value.status_tempat_tinggal
    ? 'Status tempat tinggal harus dipilih'
    : '',
  alamat: !formData.value.alamat.trim() ? 'Alamat tidak boleh kosong' : '',
}))

const disableSubmit = computed(() => Object.values(errors.value).some((e) => e !== ''))

const resetForm = () => {
  formData.value = {
    penghasilan: null,
    tanggungan: null,
    kendaraan: null,
    status_tempat_tinggal: '',
    alamat: '',
  }
}

const handleSubmit = async () => {
  if (disableSubmit.value) return

  try {
    const respon = await axios.post(
      'http://localhost:5000/user/api/post/personalData',
      formData.value,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      },
    )
    alert(respon.data.message)
    resetForm()
    emits('close')
  } catch (err) {
    alert(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data')
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div
      class="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-lg shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-xl font-semibold mb-4">Tambah Data Diri</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Penghasilan -->
        <div>
          <label class="block mb-1">Penghasilan Perbulan</label>
          <input
            v-model.number="formData.penghasilan"
            type="number"
            min="1"
            class="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          <p v-if="errors.penghasilan" class="text-red-400 text-sm mt-1">
            {{ errors.penghasilan }}
          </p>
        </div>

        <!-- Tanggungan -->
        <div>
          <label class="block mb-1">Jumlah Tanggungan</label>
          <input
            v-model.number="formData.tanggungan"
            type="number"
            min="0"
            class="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          <p v-if="errors.tanggungan" class="text-red-400 text-sm mt-1">{{ errors.tanggungan }}</p>
        </div>

        <!-- Kendaraan -->
        <div>
          <label class="block mb-1">Jumlah Kendaraan</label>
          <input
            v-model.number="formData.kendaraan"
            type="number"
            min="0"
            class="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          <p v-if="errors.kendaraan" class="text-red-400 text-sm mt-1">{{ errors.kendaraan }}</p>
        </div>

        <!-- Status Tempat Tinggal -->
        <div>
          <label class="block mb-1">Status Tempat Tinggal</label>
          <select
            v-model="formData.status_tempat_tinggal"
            class="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option disabled value="">-- Pilih Status --</option>
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <p v-if="errors.status_tempat_tinggal" class="text-red-400 text-sm mt-1">
            {{ errors.status_tempat_tinggal }}
          </p>
        </div>
        <!-- Alamat -->
        <div>
          <label class="block mb-1">Alamat</label>
          <input
            v-model="formData.alamat"
            type="text"
            class="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
          <p v-if="errors.alamat" class="text-red-400 text-sm mt-1">{{ errors.alamat }}</p>
        </div>
        <!-- Buttons -->
        <div class="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            Reset
          </button>
          <button
            type="submit"
            :disabled="disableSubmit"
            :class="[
              'px-4 py-2 rounded font-medium',
              disableSubmit
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer',
            ]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
