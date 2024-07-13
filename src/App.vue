<template>
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
            <RouterLink to="/about" active-class="active-link">關於我們</RouterLink>
            <RouterLink to="/allTrips" active-class="active-link">行程一覽</RouterLink>
            <RouterLink to="/blog" active-class="active-link">旅行筆記</RouterLink>
            <RouterLink to="/news" active-class="active-link">最新消息</RouterLink>
            <RouterLink to="/tickets" active-class="active-link">票券訂購</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/member" class="memwrap">
              <img :src="parseUserImg(userInfo.u_avatar)" class="user-avatar" />
              <span class="nickname">{{ userInfo.u_nickname }}</span>
            </RouterLink>
            <!-- <button v-if="isLoggedIn" @click="logout" class="logout">登出</button> -->
            <button v-else @click="openLoginModal" class="login">會員登入</button>
            <!-- <RouterLink to="/member">會員登入</RouterLink> -->
            <span class="btn-start-plan" @click="handlePlanningClick">開始規劃</span>
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
import { defineComponent, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/footer/PageFooter.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import LoginRegisterModal from './components/layout/LoginRegisterBox.vue'

// parseUserImg(imgURL) {
//   // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
//   if (imgURL) return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
//   return '/default-userBg.png'
// }

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    PageFooter,
    LoginRegisterModal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const { isLoggedIn, userInfo } = storeToRefs(userStore)

    const isHomePage = ref(route.path === '/')
    const isMobileMenuClosed = ref(true) //設置MobileMenu初始狀態為closed
    const isLoginModalVisible = ref(false)
    const redirectToTripsAfterLogin = ref(false) //登入後自動跳轉創建行程
    const goToPage = (toLink) => {
      // const router = useRouter();
      router.push(toLink)
    }

    const toggleMobileMenu = () => {
      isMobileMenuClosed.value = !isMobileMenuClosed.value //設置toggleMobileMenu每次都會轉換closed/!closed狀態
    }
    const handleResize = () => {
      isMobileMenuClosed.value = true;
    }


    watch(route, (newRoute) => {
      isHomePage.value = newRoute.path === '/'
    })

    // 登入註冊燈箱功能
    const openLoginModal = () => {
      isLoginModalVisible.value = true
    }

    const closeLoginModal = () => {
      isLoginModalVisible.value = false
    }

    // 登入成功後更新用戶資料
    const loginSuccessHandler = (userData) => {
      userStore.setUser(userData)
      closeLoginModal()
      if (redirectToTripsAfterLogin.value) {
        goToPage('/trips')
        redirectToTripsAfterLogin.value = false // 重置變數
      }
    }

    const logout = () => {
      userStore.logout()
      router.push('/')
      openLoginModal() // 登出後重新打開登錄彈窗
    }
    const parseUserImg = (imgURL) => {
      // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
      if (imgURL) {
        return `${import.meta.env.VITE_IMG_URL}/${imgURL}`
      } else {
        return `${import.meta.env.VITE_IMG_URL}/default-userImg.png`
      }
    }
    const handlePlanningClick = () => {
      if (isLoggedIn.value) {
        goToPage('/trips')
      } else {
        openLoginModal()
        redirectToTripsAfterLogin.value = true // 設置變數
      }
    }

    // 監聽 userInfo.u_avatar 的變化並執行 parseUserImg
    watch(() => userInfo.value && userInfo.value.u_avatar, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        parseUserImg(newVal)
      }
    })

    onMounted(() => {
      userStore.initializeStore()
      window.addEventListener('resize', handleResize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
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
      parseUserImg,
      isLoggedIn,
      userInfo,
      handlePlanningClick,
      goToPage
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';

/* 全域 ::selection 樣式 */
::selection {
  background: $secondColor-2;
  /* 背景顏色 */
  color: #fff;
  /* 文字顏色 */
}

.active-link {
  border-radius: 10px;
  padding: 7px;
  background-color: $accentColor-1;
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
        transition: all 0.3s ease;

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
        transition: height 0.3s ease;

        img {
          //橫式banner頭像
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid unset;
          object-fit: cover;
        }

        .login {
          cursor: pointer;

          &:hover {
            color: $accentColor-1;
          }
        }

        .memwrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .nickname {
          position: relative;
          color: $primaryColor;
          font-size: 0.9rem;
          letter-spacing: .2;
        }

        a:hover,
        a.click {
          color: $accentColor-1;
        }

        span.btn-start-plan {
          display: unset;
          background-color: $accentColor-1;
          color: $black;
          padding: 8px 10px;
          font-size: 0.875rem;
          cursor: pointer;
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

    .router-wrapper a {
      position: relative;
      display: inline-block;
      text-decoration: none;
      color: inherit;

      &::after {
        content: ' ';
        position: absolute;
        right: 50%;
        left: 50%;
        bottom: -4px;
        border-bottom: 4px solid $accentColor-1;
        transition: 0.3s;
      }

      &:hover::after {
        right: 0%;
        left: 0%;
      }
    }


    nav.closed {
      flex-direction: row;

      .router-wrapper {
        height: 0;
        transition: height 0.3s ease;

        a {
          display: none;
        }

        // span.btn-start-plan {
        // display: none;
        // }

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

          // a:hover {
          //   color: $accentColor-1;
          // }

          button {
            color: $primaryColor;
            font-size: $base-fontSize;
            letter-spacing: $base-fontSize * 0.1;
          }


          .memwrap {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          span.btn-start-plan {
            // display: unset;

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

          .memwrap {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
