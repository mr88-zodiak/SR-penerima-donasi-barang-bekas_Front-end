<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useTheme } from '@/store/themeStore'
import axios from 'axios'

const props = defineProps({
  isOpen: Boolean,
  data_modal_target: String,
  urlDelete: String,
  dataId: Number,
  token: String,
  itemName: String,
})

const emit = defineEmits(['close', 'success'])
const theme = useTheme()

const deleteData = async () => {
  try {
    const respon = await axios.delete(`${props.urlDelete}${props.dataId}`, {
      headers: { Authorization: `Bearer ${props.token}` },
    })
    if (respon.status === 200) {
      alert(respon.data.message)
      emit('success') // parent akan trigger handleDeleteSuccess()
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="delete" :data-modal-target="data_modal_target" :data-modal-toggle="data_modal_target">
    <div
      id="popup-modal"
      tabindex="-1"
      class="overflow-y-auto bg-black/80 fixed top-0 right-0 left-0 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
      :class="isOpen ? 'flex' : 'hidden'"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div
          class="relative rounded-lg shadow-sm"
          :class="theme.isdarkMode ? 'dark:bg-gray-700' : 'bg-white'"
        >
          <!-- Tombol close -->
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 hover:text-gray-900"
            data-modal-hide="popup-modal"
            @click="$emit('close')"
          >
            ✕
          </button>

          <!-- Isi modal -->
          <div class="p-4 md:p-5 text-center">
            <h3
              class="mb-5 text-lg font-normal"
              :class="theme.isdarkMode ? 'dark:text-gray-400' : 'text-gray-500'"
            >
              Yakin mau hapus <b>{{ itemName }}</b
              >?
            </h3>
            <button
              type="button"
              @click="deleteData"
              class="cursor-pointer text-white bg-red-600 hover:bg-red-800 px-5 py-2.5 rounded-lg"
            >
              Yakin
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="cursor-pointer ml-3 py-2.5 px-5 border rounded-lg"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
