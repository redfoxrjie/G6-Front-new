// js入口執行檔案(盡量不要動main.js)

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


import App from './App.vue'
import router from './router/index.js'
// 引入 userStore
import { useUserStore } from '@/stores/userStore'; 

// 引入全局 SCSS 檔案
import '@/assets/styles/style.scss'
import 'leaflet/dist/leaflet.css'

// 引入fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFilePen, faCamera, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
library.add(fas,faFilePen, faCamera, faCircleExclamation)

//引入sweetAlert2
import Swal from 'sweetalert2';

// import './fixLeafletIcons.js'  // 導入 Leaflet 圖標路徑的文件

// 創建 Pinia 實例
const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
import GCompUserAccount from './components/global/GCompUserAcoount.vue'
import GCompTripCard from './components/global/GCompTripCard.vue'
app.component('user-account',  GCompUserAccount
)
app.component('trip-card',  GCompTripCard
)
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$swal = Swal;

import vue3GoogleLogin from 'vue3-google-login'
app.use(vue3GoogleLogin, {
    clientId:'451967960846-83b5ehqsliuurjdh9tihtopin79u9fp5.apps.googleusercontent.com'
})

app.use(pinia)
app.use(createPinia())
app.use(router)
app.mount('#app')


// 在 setup 方法中初始化會員狀態
const userStore = useUserStore(pinia);
userStore.initializeStore();