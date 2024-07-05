<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner"
                :style="{ backgroundImage: `url(${bannerImageUrl || defaultBannerImageUrl})` }">
                <div>
                    <label for="banner-upload" class="banner-label">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" /> 編輯封面
                    </label>
                    <input id="banner-upload" type="file" @change="uploadImage('bannerImage', $event)" accept="image/*"
                        style="display: none;">
                </div>
            </div>
            <div class="mem-info">
                <div class="mem-headshot">
                    <img :src="headshotImageUrl || defaultHeadshotImageUrl" alt="member headshot photo">

                    <input id="headshot-upload" type="file" @change="uploadImage('headshotImage', $event)"
                        accept="image/*" style="display: none;">
                </div>
                <label for="headshot-upload" class="headshot-label">
                    <font-awesome-icon :icon="['fas', 'camera']" />
                </label>
                <div class="mem-name">Josh Cheng</div>
                <div class="mem-id">@用戶ID</div>
                <input id="edit-quote" type="text" class="input-quote" placeholder="Write your quote...">
                <label for="edit-quote" class="edit-quote">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </label>
            </div>
            <div class="content-block container">
                <div class="tabs-wrapper">
                    <div class="tab" :class="{ 'selected': selectedTab === '旅行筆記' }" @click="selectTab('旅行筆記')">旅行筆記
                    </div>
                    <div class="tab" :class="{ 'selected': selectedTab === '我的行程' }" @click="selectTab('我的行程')">我的行程
                    </div>
                    <div class="tab" :class="{ 'selected': selectedTab === '團隊行程' }" @click="selectTab('團隊行程')">團隊行程
                    </div>
                </div>
                <MyBlog v-if="selectedTab === '旅行筆記'" />
                <EditMyTrip v-if="selectedTab === '我的行程'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MyBlog from '@/components/layout/MyBlog.vue';
import EditMyTrip from '@/components/layout/EditMyTrip.vue';


// const defaultBannerImageUrl = require('@/assets/images/mem-page-banner.jpg');
// const defaultHeadshotImageUrl = require('../assets/images/global/logo/logo.png');

const bannerImageUrl = ref('');
const headshotImageUrl = ref('');

//更換背景照片及大頭照
const uploadImage = (type, event) => {
    const files = event.target.files;
    if (!files.length) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        if (type === 'bannerImage') {
            bannerImageUrl.value = e.target.result;
            localStorage.setItem('bannerImage', e.target.result);
        } else if (type === 'headshotImage') {
            headshotImageUrl.value = e.target.result;
            localStorage.setItem('headshotImage', e.target.result);
        }
    };
    reader.readAsDataURL(files[0]);
};

// 設定"旅行筆記"為預選狀態
const selectedTab = ref('旅行筆記');

const selectTab = (tabName) => {
    selectedTab.value = tabName;
};

// 從localStorage 加載圖片
onMounted(() => {
    const storedBannerImage = localStorage.getItem('bannerImage');
    if (storedBannerImage) {
        bannerImageUrl.value = storedBannerImage;
    }

    const storedHeadshotImage = localStorage.getItem('headshotImage');
    if (storedHeadshotImage) {
        headshotImageUrl.value = storedHeadshotImage;
    }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.section-full-width {
    .mem-page-banner {
        width: 100%;
        aspect-ratio: 3.72/1;
        // background: no-repeat center/cover url(@/assets/images/mem-page-banner.jpg);
        position: relative;
    }

    .banner-label {
        padding: 10px;
        border-radius: 23px;
        background-color: rgba(79, 130, 212, 0.7);
        font-size: $base-fontSize;
        color: $primaryColor;
        border-color: transparent;
        position: absolute;
        bottom: 0;
        right: 0;
        line-height: 1.25;
        letter-spacing: .1em;
        transform: translate(-50%, -50%);
    }

    .fa-camera {
        background-color: $primaryColor ;
        border-radius: 50%;
        top: 25px;
        cursor: pointer;
        height: 28px;
        padding: 4px;
        position: absolute;
        right: 578px;
        width: 25px;
        color: $secondColor-2;
    }

    .mem-info {
        text-align: center;
        position: relative;
        padding: 50px 0;

        .headshot-lable {
            padding: 7px;
            border-radius: 23px;
            background-color: $primaryColor;
            font-size: $base-fontSize;
            color: $secondColor-2;
            border-color: transparent;
            letter-spacing: 1.3px;
            position: absolute;
            bottom: 68%;
            right: 45%;
            transform: translate(-50%, -50%);
        }

        .mem-headshot {
            width: 100px;
            aspect-ratio: 1/1;
            border-radius: 50%;
            background-color: #ddd;
            margin: 0 auto;
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, .2);

            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }
        }



        .mem-name {
            font-size: $base-fontSize * 1.375;
            margin-top: 18px;
            color: $black;
        }

        .mem-id {
            font-size: $base-fontSize;
            color: $gray;
            margin: 18px 0;
        }

        .mem-quote {
            font-size: $base-fontSize * 0.8125;
            letter-spacing: $base-fontSize * 0.8125 * 0.1;
            color: $gray;
        }

        .input-quote {
            text-align: center;
            padding: 8px 12px;
            color: $black;
            margin-top: 8px;
            border: none;
            // box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
            font-size: $base-fontSize*0.875;
            background-color: $primaryColor;
        }

        .input-quote:focus {
            border-bottom: $gray solid 0.1rem;
            border-color: $grey;
            outline: none;
            box-shadow: 0 0 8px $grey;
        }
    }
}

.content-block {
    .tabs-wrapper {
        display: flex;
        gap: 26px;
        border-bottom: solid 3px $secondColor-2;

        .tab {
            background-color: $primaryColor;
            border: 2px solid $secondColor-2;
            border-bottom: unset;
            border-radius: 8px 8px 0 0;
            padding: 16px 40px;
            color: $secondColor-2;
            font-size: $base-fontSize * 0.875;
            letter-spacing: $base-fontSize * 0.875 * 0.05;
            cursor: pointer;

            &:hover {
                background-color: $secondColor-2;
                color: $primaryColor;
            }
        }
    }
}
</style>