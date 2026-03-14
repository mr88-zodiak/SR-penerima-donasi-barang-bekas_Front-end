<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps } from 'vue'
defineProps({
  total: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
})
</script>

<template>
  <nav class="flex items-center justify-between p-4">
    <button
      :disabled="currentPage === 1"
      @click="$emit('changePage', currentPage - 1)"
      class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span class="py-1">Halaman {{ currentPage }} dari {{ totalPages }}</span>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('changePage', currentPage + 1)"
      class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </nav>
</template>
