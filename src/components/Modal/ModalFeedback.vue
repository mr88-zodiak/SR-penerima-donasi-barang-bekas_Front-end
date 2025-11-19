<template>
  <!-- Overlay gelap transparan -->
  <transition name="fade">
    <div
      v-if="props.isOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <!-- Konten modal -->
      <div
        class="bg-gray-800 text-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative transform transition-all duration-200 scale-100 hover:scale-[1.01]"
      >
        <!-- Tombol Close -->
        <button
          type="button"
          @click="emit('close')"
          class="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>

        <form @submit.prevent="notif.rejectCallback(props.itemId)" class="space-y-4">
          <div>
            <label class="block mb-2 capitalize">Masukan alasan</label>
            <textarea
              v-model="notif.formData.message"
              rows="3"
              class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-2">
            <button type="submit" class="focus:outline-none">
              <CheckIcon
                class="h-6 cursor-pointer w-6 text-green-500 hover:text-green-400 transition"
              />
            </button>
            <button type="button" @click="emit('close')" class="focus:outline-none">
              <XMarkIcon
                class="h-6 cursor-pointer w-6 text-red-500 hover:text-red-400 transition"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useNotif } from '@/store/notif'

const notif = useNotif()

const props = defineProps({
  isOpen: Boolean,
  itemId: [String, Number],
})
const emit = defineEmits(['close'])
</script>

<style scoped>
/* Animasi fade-in dan fade-out modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
