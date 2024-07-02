<template>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js">
    <div id="app">
        <header>
            <div v-if="!isHomePage" id="menuBar">
                <div :class="{ closed: isMobileMenuClosed }" class="mb-burger" @click="toggleMobileMenu">
                    <div class="burger-bar" v-for="bar in 3" :key="bar"></div>
                </div>
                <nav :class="{ closed: isMobileMenuClosed }">
                    <RouterLink to="/" class="index-logo">
                        <img src="@/assets/images/global/logo/logo-h.png" alt="horzontal logo" />
                    </RouterLink>
                    <div class="router-wrapper">
                        <RouterLink to="/about">關於我們</RouterLink>
                        <RouterLink to="/allTrips">行程一覽</RouterLink>
                        <RouterLink to="/blog">旅行筆記</RouterLink>
                        <RouterLink to="/news">最新消息</RouterLink>
                        <RouterLink to="/tickets">票券訂購</RouterLink>
                        <RouterLink v-if="isLoggedIn" to="/member">
                            <img :src="userInfo.u_avatar"
                                style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid;">
                            <span>{{ userInfo.u_nickname }}</span>
                        </RouterLink>
                        <button v-if="isLoggedIn" @click="logout" class="logout">登出</button>
                        <button v-else @click="openLoginModal">會員登入</button>
                        <!-- <RouterLink to="/member">會員登入</RouterLink> -->
                        <RouterLink to="/trips" class="btn-start-plan">開始規劃</RouterLink>
                    </div>
                </nav>
            </div>
        </header>
        <RouterView />
        <PageFooter />
        <LoginRegisterModal :isVisible="isLoginModalVisible" @close="closeLoginModal"
            @login-success="loginSuccessHandler" />
    </div>

</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/footer/PageFooter.vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import LoginRegisterModal from './components/layout/LoginRegisterBox.vue';


export default defineComponent({
    components: {
        RouterLink,
        RouterView,
        PageFooter,
        LoginRegisterModal
    },
    setup() {
        const route = useRoute()
        const router = useRouter();
        const userStore = useUserStore();
        const { isLoggedIn, userInfo } = storeToRefs(userStore);

        const isHomePage = ref(route.path === '/')
        const isMobileMenuClosed = ref(true) //設置MobileMenu初始狀態為closed
        const isLoginModalVisible = ref(false);

        const toggleMobileMenu = () => {
            isMobileMenuClosed.value = !isMobileMenuClosed.value //設置toggleMobileMenu每次都會轉換closed/!closed狀態
        }

        watch(route, (newRoute) => {
            isHomePage.value = newRoute.path === '/'
        })

        // 登入註冊燈箱功能
        const openLoginModal = () => {
            isLoginModalVisible.value = true;
        };

        const closeLoginModal = () => {
            isLoginModalVisible.value = false;
        };

        const loginSuccessHandler = (userData) => {
            userStore.setUser(userData);
            closeLoginModal();
        };

        const logout = () => {
            userStore.logout();
            router.push('/');
            openLoginModal(); // 登出後重新打開登錄彈窗
        };

        onMounted(() => {
            userStore.initializeStore();
        });

        return {
            isHomePage,
            isMobileMenuClosed,
            isLoginModalVisible,
            toggleMobileMenu,
            openLoginModal,
            closeLoginModal,
            loginSuccessHandler,
            logout,
            isLoggedIn,
            userInfo
        }
    }
})
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';

/* 全域 ::selection 樣式 */
::selection {
  background: $secondColor-2; /* 背景顏色 */
  color: #fff; /* 文字顏色 */
}

header {
    // opacity: .3;
    position: relative;

    #menuBar {
        width: 100vw;
        position: relative;
        background-color: $secondColor-2;
        color: $primaryColor;
        font-size: $base-fontSize;
        box-sizing: border-box;
        padding: 8px 16px;
        letter-spacing: $base-fontSize * 0.1;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;

        .mb-burger {
            cursor: pointer;
            position: absolute;
            top: 4px;
            right: 36px;
            width: 40px;
            height: 40px;

            .burger-bar {
                width: 100%;
                height: 2px;
                background-color: $primaryColor;
                margin: 6px 0;
                position: absolute;
                top: 50%;
                left: 0%;
                transition: all .3s ease;

                &:nth-child(1) {
                    rotate: 45deg;
                }

                &:nth-child(2) {
                    width: 0;
                    opacity: 0;
                }

                &:nth-child(3) {
                    rotate: -45deg;
                }
            }
        }

        .mb-burger.closed {
            position: absolute;
            top: 0px;
            right: 36px;
            width: 40px;
            height: 40px;

            .burger-bar {
                width: 100%;
                height: 2px;
                background-color: $primaryColor;
                margin: 6px 0;
                position: relative;
                top: 25%;
                left: 0%;

                &:nth-child(1) {
                    rotate: 0deg;
                }

                &:nth-child(2) {
                    width: 100%;
                    opacity: 1;
                }

                &:nth-child(3) {
                    rotate: 0deg;
                }
            }
        }

        nav {
            height: fit-content; //mobile
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .index-logo {
                display: block; //mobile

                img {
                    width: 90%;
                }
            }

            .router-wrapper {
                padding: 12px 0;
                box-sizing: border-box;
                height: 90vh; //mobile
                display: flex;
                flex-direction: column; //mobile
                flex-grow: 1;
                justify-content: space-around;
                align-items: center;
                transition: height .3s ease;

                .logout {
                    position: relative;

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

                a:hover,
                a.click {
                    color: $accentColor-1;
                }

                a.btn-start-plan {
                    background-color: $accentColor-1;
                    color: $black;
                    padding: 10px 14px;
                    border-radius: ($base-fontSize + 24) * 0.5;

                    &::before {
                        content: '';
                        background: no-repeat url(@/assets/images/global/icons/map-location-dot-solid.svg);
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: middle;

                        &:hover {
                            color: $black;
                        }
                    }
                }
            }
        }

        nav.closed {
            flex-direction: row;

            .router-wrapper {
                height: 0;
                transition: height .3s ease;

                a {
                    display: none;
                }
            }
        }
    }
}

@media screen and (min-width: 768px) {
    header {
        position: relative;

        #menuBar {
            width: 100vw;
            background-color: $secondColor-2;
            color: $primaryColor;
            font-size: $base-fontSize;
            box-sizing: border-box;
            padding: 22px 30px;
            letter-spacing: $base-fontSize * 0.1;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;

            .mb-burger {
                display: none;
            }

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .index-logo {
                    display: block;

                    img {
                        width: 100%;
                    }
                }

                .router-wrapper {
                    display: flex;
                    flex-direction: row;
                    flex-grow: 1;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 1.8vw;

                    a:hover,
                    a.click {
                        color: $accentColor-1;
                    }

                    button {
                        color: $primaryColor;
                        font-size: $base-fontSize;
                        letter-spacing: $base-fontSize * 0.1;
                    }

                    a.btn-start-plan {
                        background-color: $accentColor-1;
                        color: $black;
                        padding: 10px 14px;
                        border-radius: ($base-fontSize + 24) * 0.5;

                        &::before {
                            content: '';
                            background: no-repeat url(@/assets/images/global/icons/map-location-dot-solid.svg);
                            width: 18px;
                            height: 18px;
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: middle;

                            &:hover {
                                color: $black;
                            }
                        }
                    }
                }
            }

            nav.closed {
                .router-wrapper {
                    a {
                        display: inline;
                    }
                }
            }
        }
    }
}
</style>
