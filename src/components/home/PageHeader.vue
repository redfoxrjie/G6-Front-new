<template>
    <div>
        <nav id="menu" ref="menu" :class="{ closed: isMenuClosed }">
            <button class="menu-button" @click="toggleMenu">
                <div></div>
                <div></div>
                <div></div>
            </button>
            <ul>
                <li>
                    <RouterLink to="/about">關於我們</RouterLink>
                </li>
                <li>
                    <RouterLink to="/alltrips">行程一覽</RouterLink>
                </li>
                <li>
                    <RouterLink to="/blog">旅行筆記</RouterLink>
                </li>
                <li>
                    <RouterLink to="/news">最新消息</RouterLink>
                </li>
                <li>
                    <RouterLink to="/tickets">票券訂購</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact">聯絡我們</RouterLink>
                </li>
                <!-- <li><RouterLink to="/trips">暫時的地圖編輯位置等到學會怎麼在icon切換頁面</RouterLink></li> -->
                <li v-if="isLoggedIn">
                    <router-link to="/member">
                        <img :src="userInfo.u_avatar"
                            style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid;"><br>
                        <span>{{ userInfo.u_nickname }}</span>
                    </router-link><br>
                    <button @click="logout" class="logout">登出</button>
                </li>
                <li v-else>
                    <button class="openLoginModal" @click="openLoginModal">會員登入</button>
                </li>
            </ul>
            <div class="bottom-section" @click="goToPage('/trips')">
                <img src="@/assets/images/global/icons/Vector.svg" alt="map icon" crossorigin="anonymous">
                <span>開始規劃</span>
            </div>
        </nav>

        <header>
            <div id="amoeba-container">
                <div class="amoeba"></div>
                <div class="slogan">土狗陪您 TOGO 展開新的旅程</div>
                <div class="togo-large-text">TOGO</div>
                <div class="dog-pic dog-0">
                    <img src="@/assets/images/airplane-dog.png" alt="飛機狗">
                </div>
                <div class="dog-pic dog-1">
                    <img src="@/assets/images/dog-1.png" alt="地圖狗">
                </div>
                <div class="dog-pic dog-2">
                    <img src="@/assets/images/dog-2.png" alt="行李狗">
                </div>
                <div class="dog-pic dog-3">
                    <img src="@/assets/images/dog-3.png" alt="購物狗">
                </div>
            </div>
            <RouterLink to="/" class="logo">
                <img src="@/assets/images/global/logo/logo.png" alt="Logo">
            </RouterLink>
        </header>

        <section class="content">
            <div class="center-background"></div>
            <div class="content-item content-item-1">
                <div class="pic"></div>
                <div class="text">行程共享群組化<br>多團規劃不緊張</div>
            </div>
            <div class="content-item content-item-2">
                <div class="pic">
                </div>
                <div class="text">票券，行程一站搞定<br>自由行也能從容優雅</div>
            </div>
            <div class="content-item content-item-3">
                <div class="pic">
                </div>
                <div class="text">精選目的地<br>享受無盡無礙的旅行</div>
            </div>
            <div class="content-item content-item-4">
                <div class="pic">
                </div>
                <div class="text">世界各地美景<br>隨時隨地<br>輕鬆計劃您的下一次冒險</div>
            </div>
        </section>
        <section class="ocean-img">
            <!-- 海洋波浪遮罩 -->
            <div class="oceanwave-container-up">
                <svg class="oceanwave" viewBox="0 0 1800 100" preserveAspectRatio="none">
                    <path d="M -150 25 Q -125 12.5, -100 25 T -50 25 T 0 25 T 50 25 T 100 25 T 150 25 
                   T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25 
                   T 550 25 T 600 25 T 650 25 T 700 25 T 750 25 T 800 25 T 850 25 
                   T 900 25 T 950 25 T 1000 25 T 1050 25 T 1100 25 T 1150 25
                   T 1200 25 T 1250 25 T 1300 25 T 1350 25 T 1400 25 T 1450 25 T 1500 25 
                   T 1550 25 T 1600 25 T 1650 25 T 1700 25 T 1750 25 T 1800 25 V 0 H -150 Z" fill="#F6F5F1" />
                    <path d="M -150 25 Q -125 12.5, -100 25 T -50 25 T 0 25 T 50 25 T 100 25 T 150 25 
                   T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25 
                   T 550 25 T 600 25 T 650 25 T 700 25 T 750 25 T 800 25 T 850 25 
                   T 900 25 T 950 25 T 1000 25 T 1050 25 T 1100 25 T 1150 25
                   T 1200 25 T 1250 25 T 1300 25 T 1350 25 T 1400 25 T 1450 25 T 1500 25 
                   T 1550 25 T 1600 25 T 1650 25 T 1700 25 T 1750 25 T 1800 25" stroke="#F6F5F1" stroke-width="3"
                        fill="none" />
                </svg>
            </div>
            <div class="ocean-pic">
                <img src="@/assets/images/ocean-img.jpg" alt="海洋圖片">
            </div>
            <div class="text">TOGO</div>
            <div class="oceanwave-container-down">
            <svg class="oceanwave" viewBox="0 0 1800 50" preserveAspectRatio="none">
                <path d="M -150 25 Q -125 12.5, -100 25 T -50 25 T 0 25 T 50 25 T 100 25 T 150 25 
                   T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25 
                   T 550 25 T 600 25 T 650 25 T 700 25 T 750 25 T 800 25 T 850 25 
                   T 900 25 T 950 25 T 1000 25 T 1050 25 T 1100 25 T 1150 25
                   T 1200 25 T 1250 25 T 1300 25 T 1350 25 T 1400 25 T 1450 25 T 1500 25 
                   T 1550 25 T 1600 25 T 1650 25 T 1700 25 T 1750 25 T 1800 25 V 100 H -150 Z"
                    fill="#F6F5F1" />
                <path d="M -150 25 Q -125 12.5, -100 25 T -50 25 T 0 25 T 50 25 T 100 25 T 150 25 
                   T 200 25 T 250 25 T 300 25 T 350 25 T 400 25 T 450 25 T 500 25 
                   T 550 25 T 600 25 T 650 25 T 700 25 T 750 25 T 800 25 T 850 25 
                   T 900 25 T 950 25 T 1000 25 T 1050 25 T 1100 25 T 1150 25
                   T 1200 25 T 1250 25 T 1300 25 T 1350 25 T 1400 25 T 1450 25 T 1500 25 
                   T 1550 25 T 1600 25 T 1650 25 T 1700 25 T 1750 25 T 1800 25" stroke="#F6F5F1"
                    stroke-width="3" fill="none" />
            </svg>
        </div>
        </section>
        <!-- 會員登入彈窗 -->
        <LoginRegisterModal :isVisible="isLoginModalVisible" @close="closeLoginModal"
            @login-success="loginSuccessHandler" />
        <!-- <RouterView /> -->
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import LoginRegisterModal from '../layout/LoginRegisterBox.vue';

export default defineComponent({
    components: {
        RouterLink,
        RouterView,
        LoginRegisterModal
    },
    setup() {

        const userStore = useUserStore();
        const { isLoggedIn, userInfo } = storeToRefs(userStore);

        const isMenuClosed = ref(false);
        const menu = ref(null);
        const isLoginMode = ref(true);
        const isLoginModalVisible = ref(false);
        // const user = ref(null);

        const toggleMenu = () => {
            isMenuClosed.value = !isMenuClosed.value;
        };

        onMounted(() => {
            menu.value.addEventListener('click', (event) => {
                if (event.target === menu.value || !menu.value.contains(event.target)) {
                    isMenuClosed.value = true;
                }
            });
        });

        onBeforeUnmount(() => {
            menu.value.removeEventListener('click', toggleMenu);
        });

        // 頁面切換
        const router = useRouter();
        const goToPage = (toLink) => {
            // const router = useRouter();
            router.push(toLink);
        };

        // 會員登入彈窗
        const openLoginModal = () => {
            isLoginModalVisible.value = true;
        };

        // 將登錄成功後傳送會員資料及關閉lightbox
        const closeLoginModal = () => {
            isLoginModalVisible.value = false;
        };

        // 登入成功後更新用戶資料
        const loginSuccessHandler = (userData) => {
            userStore.setUser(userData);
            closeLoginModal();
        };

        const logout = () => {
            userStore.logout();
            router.push('/'); // 重定向到首頁或其他頁面
            openLoginModal(); // 登出後重新打開登錄彈窗
        };

        const switchMode = (mode) => {
            isLoginMode.value = mode;
        };

        return {
            isMenuClosed,
            toggleMenu,
            menu,
            isLoggedIn,
            userInfo,
            isLoginModalVisible,
            openLoginModal,
            closeLoginModal,
            loginSuccessHandler,
            switchMode,
            goToPage,
            logout,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';


body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

header {
    position: relative;
}

nav {
    .menu-button div:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .menu-button div:nth-child(2) {
        opacity: 0;
    }

    .menu-button div:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    background-color: $secondColor-2;
    color: $accentColor-2;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px 30px;
    position: fixed;
    top: 0;
    right: 0;
    transition: height 0.3s ease-in-out;
    z-index: 100;

    ul {
        list-style: none;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: fit-content;
        transition: height 0.3s ease-in-out;

        li {
            text-align: center;
            flex-grow: 1;

            a {
                color: $primaryColor;
                text-decoration: none;
                font-size: 1rem;
                letter-spacing: 1.6px;

                &:hover {
                    color: $accentColor-2;
                }
            }
        }

        .openLoginModal {
            color: $primaryColor;
            text-decoration: none;
            font-size: 1rem;

            &:hover {
                color: $accentColor-2;
            }
        }

    }

    .logout {
        position: relative;
        margin-top: 20px;
        color: $primaryColor;

        &::after {
            content: " ";
            position: absolute;
            right: 50%;
            left: 50%;
            bottom: -4px;
            border-bottom: 4px solid $accentColor-1;
            transition: .3s;
        }

        &:hover::after {
            right: 0%;
            left: 0%;
        }

    }

    .bottom-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 20px 10px;
        box-sizing: border-box;
        border-top: solid 1px $primaryColor;
        cursor: pointer;

        img {
            width: 30px;
            height: 30px;
        }

        span {
            margin-top: 8px;
            letter-spacing: 1px;
            font-size: 0.875rem;
            color: $primaryColor;
        }
    }
}


.menu-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    align-self: center;

    div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 5px 0;
        transition: all 0.3s ease-in-out;
    }
}

nav.closed {
    .menu-button div:nth-child(1) {
        transform: translateY(0px) rotate(0deg);
    }

    .menu-button div:nth-child(2) {
        opacity: 1;
    }

    .menu-button div:nth-child(3) {
        transform: translateY(0px) rotate(0deg);
    }

    height: 180px;
    transition: height 0.3s ease-in-out;

    .bottom-section {
        border-top: solid 0px $primaryColor;
    }

    ul {
        height: 0;
        transition: height 0.3s ease-in-out;
    }
}

.logo {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    z-index: 2000;

    img {
        width: 100%;
    }
}

#amoeba-container {
    position: relative;
    width: 100%;
    height: auto;
    aspect-ratio: 1.9/1;
    height: fit-content;
    overflow: hidden;
}

.dog-pic {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2; // 設定一個較大的 z-index 值

    img {
        width: 5vw;
    }

}

//地圖狗
.dog-1 {
    position: relative;
    left: 70vw; // 將此值調整為所需的水平偏移量
    animation: move1 1.5s infinite linear;
}

@keyframes move1 {
    0% {
        transform: translate3d(0, 0%, 0);
    }

    25% {
        transform: translate3d(0, 5%, 0);
    }

    75% {
        transform: translate3d(0, -5%, 0);
    }

    100% {
        transform: translate3d(0, 0%, 0);
    }
}

//行李狗
.dog-2 {
    position: relative;
    top: 5vh;
    animation: move2 1s infinite linear;
}

@keyframes move2 {
    0% {
        transform: translate3d(0, 0%, 0);
    }

    25% {
        transform: translate3d(0, 5%, 0);
    }

    75% {
        transform: translate3d(0, -5%, 0);
    }

    100% {
        transform: translate3d(0, 0%, 0);
    }
}

//購物狗
.dog-3 {
    position: relative;
    left: 80vw; // 將此值調整為所需的水平偏移量
    top: 20vh;
    animation: move3 2s infinite linear;
}

@keyframes move3 {
    0% {
        transform: translate3d(0, 0%, 0);
    }

    25% {
        transform: translate3d(0, 5%, 0);
    }

    75% {
        transform: translate3d(0, -5%, 0);
    }

    100% {
        transform: translate3d(0, 0%, 0);
    }
}

.amoeba {
    position: absolute;
    top: -100px;
    // right: -4vw;
    width: 96vw;
    height: 100%;
    background: url('../../assets/images/index_banner.jpg') center/cover no-repeat;
    // -webkit-mask: url('../../assets/images/amoeba/banner_amoeba.svg') center/cover no-repeat;
    // mask: url('../../assets/images/amoeba/banner_amoeba.svg') center/cover no-repeat;
    // -webkit-mask-size: cover;
    // mask-size: cover;
    // animation: morph 5s ease-in-out infinite alternate, change 30s linear infinite alternate;
    animation: morph 8s ease-in-out infinite both alternate;
    box-shadow: 0 4px 30px rgba(0, 0, 0, .2);
    z-index: 1; // 確保 amoeba 的 z-index 小於 dog-pic
}

.slogan {
    font-size: 1.9rem;
    letter-spacing: 16px;
    position: absolute;
    top: 40%;
    left: 20%;
    color: $black;
    background: rgba(246, 245, 241, 0.6);
    padding: 14px 20px;
    border-radius: 10px;
    z-index: 1; // 確保 slogan 的 z-index 小於 dog-pic
}

.togo-large-text {
    position: absolute;
    bottom: 10%;
    right: 20%;
    transform: translate(10%, -10%);
    font-size: 10rem;
    color: $primaryColor;
    letter-spacing: 50px;
    z-index: 1; // 確保 togo-large-text 的 z-index 小於 dog-pic
    text-align: center;
}

@keyframes morph {
    0% {
        border-radius: 14% 0% 23% 42% / 82% 48% 47% 55%;

    }

    100% {
        border-radius: 40% 60%;
    }
}

@keyframes change {
    100% {
        background-position: 100% 100%;
    }
}


/* 響應式設計，針對寬度小於768px的設備 */
@media screen and (max-width: 768px) {
    nav {
        width: 100%;
        height: 60px;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 20px;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    nav.closed {
        height: 60px;
    }

    nav ul {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        height: calc(100vh - 60px);
        background-color: $secondColor-2;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
    }

    nav:not(.closed) ul {
        transform: translateY(0);
    }

    nav li {
        margin: 20px 0;
    }

    header {
        padding-top: 70px;
        /* 確保內容部分在導航欄下方 */
    }

    .logo {
        top: 80px;
        /* 調整 logo 位置，避免被導航欄遮擋 */
    }
}

.content {
    position: relative;
    width: 100%;
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* 防止溢出 */
}

.center-background {
    position: absolute;
    width: 60%;
    height: 80%;
    background: url('../../assets/images/amoeba/blueback.svg') center/cover no-repeat;
    z-index: -1;
    border-radius: 50%;
}

.content-item {
    position: absolute;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    flex-direction: column;
    box-sizing: border-box;
}


.text {
    color: $black;
    font-size: 1rem;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
}

.content-item-1 {
    top: 5%;
    left: 10%;

    .pic {
        width: 300px;
        height: 300px;
        background: url('../../assets/images/index_amoeba1.jpg') center/cover no-repeat;
        -webkit-mask: url('../../assets/images/amoeba/NO1.svg') center/cover no-repeat;
        mask: url('../../assets/images/amoeba/NO1.svg') center/cover no-repeat;
        -webkit-mask-size: cover;
        mask-size: cover;
        animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;
    }

    .text {
        font-size: 1.2rem;
    }
}

.content-item-2 {
    top: 10%;
    right: 20%;

    .pic {
        width: 300px;
        height: 300px;
        background: url('../../assets/images/index_amoeba2.jpg') center/cover no-repeat;
        -webkit-mask: url('../../assets/images/amoeba/NO2.svg') center/cover no-repeat;
        mask: url('../../assets/images/amoeba/NO2.svg') center/cover no-repeat;
        -webkit-mask-size: cover;
        mask-size: cover;
        animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;
    }
}

.content-item-2 .text {
    font-size: 1.2rem;
}

.content-item-3 {
    bottom: 5%;
    left: 20%;

}

.content-item-3 .pic {
    width: 300px;
    height: 300px;
    background: url('../../assets/images/index_amoeba3.jpg') center/cover no-repeat;
    -webkit-mask: url('../../assets/images/amoeba/NO3.svg') center/cover no-repeat;
    mask: url('../../assets/images/amoeba/NO3.svg') center/cover no-repeat;
    -webkit-mask-size: cover;
    mask-size: cover;
    animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;
}

.content-item-3 .text {
    font-size: 1.2rem;
}

.content-item-4 {
    bottom: 0%;
    right: 10%;
}

.content-item-4 .pic {
    width: 300px;
    height: 300px;
    background: url('../../assets/images/index_amoeba4.jpg') center/cover no-repeat;
    -webkit-mask: url('../../assets/images/amoeba/NO4.svg') center/cover no-repeat;
    mask: url('../../assets/images/amoeba/NO4.svg') center/cover no-repeat;
    -webkit-mask-size: cover;
    mask-size: cover;
    animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;
}

.content-item-4 .text {
    font-size: 1.2rem;
}

//海洋圖片
.ocean-img {
    position: relative;
    img {
        width: 100%;
    }
    .text{
        color: #FFF;
        font-family: "Noto Sans TC", sans-serif;
        font-size: 13vw;
        font-weight: 700;
        letter-spacing: 3vw; /* 調整字母間距 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) translateY(135px); /* 向下移動10px */
        text-align: center; /* 文字置中 */
        white-space: nowrap; /* 防止文字換行 */
        }
}

//海洋波浪遮罩
.oceanwave-container-up {
    width: 100%;
    height: 100px;
    /* 增加波浪容器的高度以顯示填充色塊 */
    overflow: hidden;
    position: absolute;
    top: 0; /* 確保波浪遮罩在最上方 */
    z-index: 10; /* 確保波浪遮罩在圖片之上 */
}

.oceanwave {
    position: absolute;
    width: 200%;
    height: 100%;
    background-repeat: repeat-x;
    background-position: 0 center;
    background-size: 50% 100%;
    animation: oceanwave-animation 12s linear infinite;
}

.oceanwave-container-down {
            width: 100%;
            height: 50px;
            overflow: hidden;
            position: absolute;
            bottom: 0;
            z-index: 10;
        }

@keyframes oceanwave-animation {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.footer {
    width: 100%;
    text-align: center;
    font-size: 6rem;
    color: #333;
    margin-top: 50px;
}

@media (max-width: 768px) {
    .content-item {
        width: 40%;
    }

    .text {
        font-size: 0.8rem;
    }

    .content-item-1 {
        top: 15%;
        left: 10%;
    }

    .content-item-2 {
        top: 15%;
        right: 10%;
    }

    .content-item-3 {
        bottom: 10%;
        left: 10%;
    }

    .content-item-4 {
        bottom: 10%;
        right: 10%;
    }

    .center-background {
        width: 100%;
        height: 100%;
        top: 20%;
    }
}

@media (max-width: 480px) {
    .content-item {
        width: 60%;
    }

    .text {
        font-size: 0.6rem;
    }

    .content-item-1 {
        top: 20%;
        left: 5%;
    }

    .content-item-2 {
        top: 20%;
        right: 5%;
    }

    .content-item-3 {
        bottom: 5%;
        left: 5%;
    }

    .content-item-4 {
        bottom: 5%;
        right: 5%;
    }

    .center-background {
        width: 110%;
        height: 110%;
        top: 25%;
    }
}
</style>