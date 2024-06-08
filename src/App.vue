<template>
    <div id="app">
        <header>
            <div v-if="!isHomePage" id="menuBar">
                <nav>
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
    </div>
<RouterView />
<PageFooter />
</template>

<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/footer/PageFooter.vue'
import LoginRegisterModal from './components/layout/LoginRegisterBox.vue'

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    PageFooter,
  },
  setup(){
    const isHomePage = window.location.pathname === '/' 

    return {
        isHomePage
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
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .router-wrapper{
                display: flex;
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
    }
}
</style>
