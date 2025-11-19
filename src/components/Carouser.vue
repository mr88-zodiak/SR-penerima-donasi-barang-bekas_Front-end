<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

const carousel = ref([
  {
    id: 1,
    image:
      'https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    image:
      'https://plus.unsplash.com/premium_photo-1661964021703-59bbdcdbfdab?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1683134050449-080429c850a4?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1591522810850-58128c5fb089?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRvbmF0aW9ufGVufDB8fDB8fHww',
  },
])

const currentIndex = ref(1)

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % carousel.value.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + carousel.value.length) % carousel.value.length
}
</script>

<template>
  <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <!-- Loop langsung di data-carousel-item -->
      <div
        v-for="(item, index) in carousel"
        :key="item.id"
        v-show="index === currentIndex"
        class="absolute inset-0 transition-all duration-700 ease-in-out w-full h-full"
      >
        <img
          :src="item.image"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 filter brightness-50"
          alt="..."
        />
      </div>
    </div>

    <!-- Slider indicators -->
    <!-- <div
      class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
    >
      <button
        v-for="(item, index) in carousel"
        :key="item.id"
        type="button"
        class="w-3 h-3 rounded-full"
        :aria-label="`Slide ${index}`"
      ></button>
    </div> -->

    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prevSlide"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50"
      >
        <svg
          class="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nextSlide"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50"
      >
        <svg
          class="w-4 h-4 text-white rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </span>
    </button>
  </div>
</template>
