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
                        <RouterLink to="/login">會員登入</RouterLink>
                        <RouterLink to="/trips" class="btn-start-plan">開始規劃</RouterLink>
                    </div>
                </nav>
            </div>
        </header>

        <RouterView />
        <PageFooter />
    </div>

</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/footer/PageFooter.vue';


export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    PageFooter
  },
  setup(){
    const route = useRoute()
    const isHomePage = ref(route.path === '/')
    const isMobileMenuClosed = ref(true) //設置MobileMenu初始狀態為closed

    const toggleMobileMenu = () => {
        isMobileMenuClosed.value = !isMobileMenuClosed.value //設置toggleMobileMenu每次都會轉換closed/!closed狀態
    }
    
    watch(route, (newRoute) => {
        isHomePage.value = newRoute.path === '/'
    })

    return {
        isHomePage,
        isMobileMenuClosed,
        toggleMobileMenu
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';

header {
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
        .mb-burger{
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
        .mb-burger.closed{
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
            .router-wrapper{
                padding: 12px 0;
                box-sizing: border-box;
                height: 90vh; //mobile
                display: flex;
                flex-direction: column; //mobile
                flex-grow: 1;
                justify-content: space-around;
                align-items: center;
                transition: height .3s ease;
                a:hover, a.click {
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
        .mb-burger{
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
            .router-wrapper{
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                justify-content: flex-end;
                align-items: center;
                gap: 1.8vw;
                a:hover, a.click {
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
