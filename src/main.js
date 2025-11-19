// import './assets/style.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import 'flowbite'

// import ElementPlus from 'element-plus'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import 'element-plus/dist/index.css'
// import { createPinia } from 'pinia'
// import AOS from 'aos'
// import socket from './plugins/socket'
// import 'aos/dist/aos.css'
// import VueApexCharts from 'vue3-apexcharts'

// const app = createApp(App)
// const pinia = createPinia()
// app.config.globalProperties.$socket = socket
// pinia.use(piniaPluginPersistedstate)
// app.use(pinia)
// app.use(router)
// app.use(ElementPlus)
// app.mount('#app')
// app.use(VueApexCharts)
// AOS.init({
//   duration: 800,
//   once: false,
// })
import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'flowbite'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueApexCharts from 'vue3-apexcharts'
import AOS from 'aos'
import 'aos/dist/aos.css'
import socket from './plugins/socket'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(VueApexCharts)

app.config.globalProperties.$socket = socket

app.mount('#app')
AOS.init({
  duration: 800,
  once: false,
})
