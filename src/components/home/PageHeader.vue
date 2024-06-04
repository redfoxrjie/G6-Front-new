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
                    <RouterLink to="/tours">行程一覽</RouterLink>
                </li>
                <li>
                    <RouterLink to="/blog">旅行筆記</RouterLink>
                </li>
                <li>
                    <RouterLink to="/news">最新消息</RouterLink>
                </li>
                <li>
                    <RouterLink to="/booking">票券訂購</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact">聯絡我們</RouterLink>
                </li>
                <li>
                    <RouterLink to="/login">會員登入</RouterLink>
                </li>
            </ul>
            <div class="bottom-section">
                <img src="../../assets/images/global/icons/Vector.svg" alt="map icon" crossorigin="anonymous">
                <span>開始規劃</span>
            </div>
        </nav>

        <header>
            <div id="amoeba-container">
            <div class="amoeba"></div>
        </div>
        <div class="logo">
            <img src="../../assets/logo.png" alt="Logo" style="width: 60px; height: 60px;">
        </div>
        <div class="slogan">土狗陪您 TOGO 展開新的旅程</div>
        <div class="togo-large-text">TOGO</div>
        </header>

        <section class="content">
        <div class="center-background"></div>
        <div class="content-item content-item-1">
            <div class="pic">
            </div>

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



        <RouterView />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

export default defineComponent({
    components: {
        RouterLink,
        RouterView,
    },
    setup() {
        const isMenuClosed = ref(true);
        const menu = ref(null);

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

        return {
            isMenuClosed,
            toggleMenu,
            menu,
        };
    },
});
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
    /* ... (您的 Media Query 樣式) ... */
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
}

nav {
    background-color: #3b82f6;
    color: white;
    width: 300px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    transition: height 0.3s ease-in-out;
    z-index: 100;
    background-image: url('/travel.jpg');
    /* 背景圖片 */
    background-size: cover;
    background-position: center;
}

nav.closed {
    height: 140px;
}

.menu-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
    align-self: center;
}

.menu-button div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
    transition: all 0.3s ease-in-out;
}

nav.closed .menu-button div:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

nav.closed .menu-button div:nth-child(2) {
    opacity: 0;
}

nav.closed .menu-button div:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    width: 100%;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
}

nav:not(.closed) ul {
    max-height: 500px;
    /* 或者一個足夠大的值 */
}

nav li {
    margin-bottom: 20px;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

.bottom-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.bottom-section img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
}

header {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: "$primaryColor";
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
}

.logo {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #aaa;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
    z-index: 1;
}

.slogan {
    font-size: 24px;
    color: black;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px 20px;
    border-radius: 10px;
    z-index: 1;
}
#amoeba-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        .amoeba {
            width: 100%;
            height: 100%;
            background: url('../../assets/images/index_banner.jpg') center/cover no-repeat;
            -webkit-mask: url('../../assets/images/amoeba/banner_amoeba.svg') center/cover no-repeat;
            mask: url('../../assets/images/amoeba/banner_amoeba.svg') center/cover no-repeat;
            -webkit-mask-size: cover;
            mask-size: cover;
            animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;
        }

        @keyframes morph {
            0% {
                border-radius: 33% 67% 70% 30%;
            }

            100% {
                border-radius: 40% 60% 42% 58%;
            }
        }

        @keyframes change {
            100% {
                background-position: 100% 100%;
            }
        }

        .togo-large-text {
            position: absolute;
            bottom: 5%;
            right: 10%;
            transform: translate(10%, -10%);
            font-size: 10rem;
            color: white;
            opacity: 0.6;
            z-index: 1;
            text-align: center;
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
                background-color: #3b82f6;
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
            color: #333;
            font-size: 1rem;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            border-radius: 5px;
        }

        .content-item-1 {
            top: 5%;
            left: 10%;
        }

        .content-item-1 .pic {
            width: 300px;
            height: 300px;
            background: url('../../assets/images/index_amoeba1.jpg') center/cover no-repeat;
            -webkit-mask: url('../../assets/images/amoeba/NO1.svg') center/cover no-repeat;
            mask: url('../../assets/images/amoeba/NO1.svg') center/cover no-repeat;
            -webkit-mask-size: cover;
            mask-size: cover;
            animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;

        }

        .content-item-1 .text {
            font-size: 1.2rem;
        }

        .content-item-2 {
            top: 10%;
            right: 20%;
        }

        .content-item-2 .pic {
            width: 300px;
            height: 300px;
            background: url('../../assets/images/index_amoeba2.jpg') center/cover no-repeat;
            -webkit-mask: url('../../assets/images/amoeba/NO2.svg') center/cover no-repeat;
            mask: url('../../assets/images/amoeba/NO2.svg') center/cover no-repeat;
            -webkit-mask-size: cover;
            mask-size: cover;
            animation: morph 30s ease-in-out infinite alternate, change 60s linear infinite alternate;

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