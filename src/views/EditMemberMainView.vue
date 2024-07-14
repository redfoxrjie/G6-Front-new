<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner"
                :style="{ backgroundImage: `url(${bannerImageUrl || defaultBannerImageUrl})` }">
                <div>
                    <label for="banner-upload" class="banner-label">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" /> 編輯封面
                    </label>
                    <input id="banner-upload" type="file" @change="uploadImage('u_background', $event)" accept="image/*"
                        style="display: none;">
                </div>
            </div>
            <div class="mem-info">
                <div class="mem-headshot">
                    <img :src="headshotImageUrl || defaultHeadshotImageUrl" alt="">
                    <input id="headshot-upload" type="file" @change="uploadImage('u_avatar', $event)" accept="image/*"
                        style="display: none;">
                </div>
                <label for="headshot-upload" class="headshot-label">
                    <font-awesome-icon :icon="['fas', 'camera']" />
                </label>
                <div class="mem-name">{{ userInfo.u_nickname }}</div>
                <div class="mem-id">{{ userInfo.u_account }}</div>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import MyBlog from '@/components/layout/EditMyBlog.vue';
import EditMyTrip from '@/components/layout/EditMyTrip.vue';
import defaultBannerImageUrl from '@/assets/images/default-userBg.png';
import defaultHeadshotImageUrl from '@/assets/images/default-userImg.png';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();
const bannerImageUrl = ref(defaultBannerImageUrl);
const headshotImageUrl = ref(defaultHeadshotImageUrl);
const userId = computed(() => userStore.userId);
const userInfo = computed(() => userStore.userInfo);

const uploadImage = async (field, event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    formData.append('image', files[0]);
    formData.append('field', field);
    formData.append('userId', userId.value);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload.php`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {
            const fullPath = `${import.meta.env.VITE_IMG_URL}/${response.data.filePath}`;
            if (field === 'u_background') {
                bannerImageUrl.value = fullPath;
                localStorage.setItem('bannerImageUrl', fullPath);
            } else if (field === 'u_avatar') {
                headshotImageUrl.value = fullPath;
                localStorage.setItem('headshotImageUrl', fullPath);
                userStore.updateUserAvatar(response.data.filePath); //頭像會即時更新
            }
        } else {
            alert('上傳失敗：' + response.data.message);
        }
    } catch (error) {
        alert('上傳圖片時出錯，請稍後再試。');
    }
};

const selectedTab = ref('旅行筆記');

const selectTab = (tabName) => {
    selectedTab.value = tabName;
};
const initialize = async () => {
    userStore.initializeStore();

    const storedBannerImageUrl = localStorage.getItem('bannerImageUrl');
    const storedHeadshotImageUrl = localStorage.getItem('headshotImageUrl');

    if (storedBannerImageUrl) {
        bannerImageUrl.value = storedBannerImageUrl;
    }
    if (storedHeadshotImageUrl) {
        headshotImageUrl.value = storedHeadshotImageUrl;
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getImages.php?userId=${userId.value}`);
        console.log('Raw API response:', response.data);
        if (response.data.success) {
            bannerImageUrl.value = response.data.bannerImage ? `${import.meta.env.VITE_IMG_URL}/${response.data.bannerImage}` : defaultBannerImageUrl;
            headshotImageUrl.value = response.data.headshotImage ? `${import.meta.env.VITE_IMG_URL}/${response.data.headshotImage}` : defaultHeadshotImageUrl;
            localStorage.setItem('bannerImageUrl', bannerImageUrl.value);
            localStorage.setItem('headshotImageUrl', headshotImageUrl.value);
        } else {
            console.error('Failed to fetch user images:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user images:', error);
    }
};

onMounted(() => {
    initialize();
});

</script>


<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.section-full-width {
    .mem-page-banner {
        width: 100%;
        aspect-ratio: 3.72/1;
        background: no-repeat 50% 30%/100%;
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
        cursor: pointer;
    }

    .fa-camera {
        background-color: $primaryColor ;
        border-radius: 50%;
        top: 13%;
        cursor: pointer;
        height: auto;
        padding: 4px;
        position: absolute;
        right: 46%;
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