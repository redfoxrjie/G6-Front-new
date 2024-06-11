// js入口執行檔案(盡量不要動main.js)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.js'

// 引入全局 SCSS 檔案
import '@/assets/styles/style.scss'
import 'leaflet/dist/leaflet.css'

// 引入fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilePen, faCamera, faSkullCrossbones, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
library.add(fas,faFilePen, faCamera, faSkullCrossbones, faCircleExclamation)

// import './fixLeafletIcons.js'  // 導入 Leaflet 圖標路徑的文件

const app = createApp(App)
import GCompUserAccount from './components/global/GCompUserAcoount.vue'
import GCompTripCard from './components/global/GCompTripCard.vue'
app.component('user-account',  GCompUserAccount
)
app.component('trip-card',  GCompTripCard
)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.mount('#app')