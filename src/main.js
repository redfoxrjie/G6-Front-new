// js入口執行檔案(盡量不要動main.js)
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/base/_font.scss' //引入粉圓體字體樣式

import App from './App.vue'
import router from './router'

//Vue.createApp(App).mount('#app')
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
