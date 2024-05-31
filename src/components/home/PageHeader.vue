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
            <div class="logo">Logo</div>
            <div class="slogan">土狗陪您 TOGO 展開新的旅程</div>
        </header>

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

<style scoped>
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
    background: #f9f9f9;
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
</style>