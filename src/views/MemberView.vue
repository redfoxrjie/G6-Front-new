<template>
    <div class="container">
        <div class="panel-row row row-cols-1 row-cols-md-2">
            <div class="panel-sidenav col-12 col-md-3
                row row-cols-2 row-cols-md-1">
                <div class="p-s-mem col-2 col-md-12">
                    <div class="p-s-m-imgwrap"><img :src="userAvatarUrl" alt="avatar"></div>
                    <div class="p-s-m-name">
                        <h4>{{ userInfo.u_nickname }}</h4>
                    </div>
                </div>
                <div class="p-s-nav col-12 col-md-12 
                row">
                    <div class="p-s-n-linkslist col-12 col-md-10 row row-cols-3 ">
                        <div class="p-s-n-link col-5 col-md-12">
                            <p @click="goToPage('editMemberMain')"><font-awesome-icon
                                    :icon="['fas', 'user']" /><span>我的主頁</span></p>
                        </div>
                        <div class="p-s-n-link col-5 col-md-12" @click="changeView('profile')"
                            :class="{ 'active-view': panelView == 'profile' }">
                            <p><font-awesome-icon :icon="['fas', 'gear']" /><span>會員資料設定</span></p>
                        </div>
                        <div class="p-s-n-link col-5 col-md-12" @click="changeView('msg')"
                            :class="{ 'active-view': panelView == 'msg' }">
                            <p><font-awesome-icon :icon="['fas', 'bell']" /><span>我的通知</span></p>
                        </div>
                        <div class="p-s-n-link col-5 col-md-12" @click="confirmLogout">
                            <p><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /><span>登出</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="panel-view col-12 col-md-9">
                <div class="p-v-title">
                    <h1>{{ panelTitle[panelView] }}</h1>
                </div>
                <MCompPanelMsg v-if="panelView == 'msg'" />
                <MCompPanelProfile v-if="panelView == 'profile'" />
            </div>
        </div>
        <!-- :class="{ 'active-view': panelView == 'profile' }" -->
    </div>
</template>
<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
import MCompPanelMsg from '@/components/member/MCompPanelMsg.vue';
import MCompPanelProfile from '@/components/member/MCompPanelProfile.vue';
const panelView = ref('profile');
const panelTitle = { 'profile': '會員資料設定', 'msg': '我的通知' }
const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const changeView = (tabName) => {
    panelView.value = tabName;
}
const goToPage = (toLink) => {
    router.push(toLink)
}

const confirmLogout = () => {
    Swal.fire({
        title: '您確定要登出嗎?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
        }
    });
}
const logout = () => {
    userStore.logout();
    Swal.fire({
        title: '您已成功登出',
        icon: 'success',
        confirmButtonText: '確定'
    }).then(() => {
        router.push('/');
        openLoginModal(); // 登出後重新打開登錄彈窗
    });
};
const userAvatarUrl = computed(() => {
    return userInfo.value && userInfo.value.u_avatar ? `${import.meta.env.VITE_IMG_URL}/${userInfo.value.u_avatar}` : new URL('@/assets/images/default-userImg.png', import.meta.url).href;
});


</script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.panel-row {
    padding-top: 200px;
    align-items: start;

    .panel-sidenav {
        box-sizing: border-box;
        padding-right: 2%;


        .p-s-mem {
            background-color: #fff;
            margin-bottom: 15px;
            padding: 20px 0;
            border-radius: 4px;

            .p-s-m-imgwrap {
                width: 100px;
                aspect-ratio: 1;
                overflow: hidden;
                border-radius: 50%;
                margin: auto;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .p-s-m-name {
                h4 {
                    text-align: center;
                    padding: 4px 0;
                    margin-top: 10px;
                }

            }
        }

        .p-s-nav {
            background-color: #fff;
            box-sizing: border-box;
            padding: 10px 5px;
            border-radius: 4px;
            margin-bottom: 10px;



            .p-s-n-linkslist {
                margin: auto;
                padding: 20px;

                .p-s-n-link {
                    padding: 2px 5px;
                    margin: 5px 0px;
                    cursor: pointer;

                    svg {
                        color: $secondColor-2;
                        padding: 0 4px;
                        margin-right: 5px;

                    }

                    &:hover {
                        background-color: #afafaf;
                        transition: .1s;
                    }

                    &.active-view {
                        box-shadow: inset 3px 0px 0px $accentColor-1
                    }
                }



            }

        }
    }

    .panel-view {
        background-color: #fff;
        border: 1px solid $secondColor-2;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 0px 20px;
        min-height: 600px;

        .p-v-title {
            color: $secondColor-2;
            margin-top: 60px;
            margin-bottom: 20px
        }
    }
}

@media screen and (max-width: 768px) {

    .panel-row {
        .panel-sidenav>.p-s-mem {
            display: none;
            background: none;
            margin-bottom: 0px;
            padding: 5px 0;

            .p-s-m-imgwrap {
                width: 50px;
            }

            h4 {
                // font-size: 16px;
                display: none;
            }
        }

        .panel-sidenav>.p-s-nav {

            .p-s-n-linkslist {
                padding: 5px 0;
                padding-left: 5px;
                justify-content: space-around;

                .p-s-n-link {
                    // width: 70%;
                    // background-color: #7e1a1a;
                    padding: 2px;
                    margin: 0px;
                    margin-right: 4px;

                    svg {
                        margin: 0;
                    }

                    span {
                        // display: none;
                        font-size: 16px;
                        max-width: 0px;
                    }
                }
            }
        }
    }
}

// @media screen and (max-width: 576px) {
//     .panel-row>.panel-sidenav>.p-s-mem{
//         width: 20%;
//         display: none;

//     }
//     .panel-row>.panel-sidenav>.p-s-nav{
//         width: 100%;
//     }
//     .panel-sidenav{align-items: center;
// }

//     .p-s-n-linkslist{justify-content: center;
//     position: relative;}
//     .panel-row>.panel-sidenav>.p-s-nav>.p-s-n-linkslist>.p-s-n-link{
//         span{
//             font-size: 14px;
//         }
//         svg{
//             font-size: 14px;
//             padding: 0 10px
//         }
//     }
// }</style>
