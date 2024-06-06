// js入口執行檔案(盡量不要動main.js)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

// 引入全局 SCSS 檔案
import '@/assets/styles/style.scss'
import 'leaflet/dist/leaflet.css'

import '@/fixLeafletIcons.js'  // 導入 Leaflet 圖標路徑的文件

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')