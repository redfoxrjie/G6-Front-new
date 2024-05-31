// js入口執行檔案(盡量不要動main.js)
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

// 引入全局 SCSS 檔案
import '@/assets/styles/style.scss'

//Vue.createApp(App).mount('#app')
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
