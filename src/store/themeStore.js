import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTheme = defineStore('theme', () => {
  const isdarkMode = ref(localStorage.getItem('DarkMode') === 'true')
  watch(isdarkMode, (value) => {
    localStorage.setItem('DarkMode', value)
  })
  return { isdarkMode }
})
