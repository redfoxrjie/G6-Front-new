<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner" :style="memBannerImg"></div>
            <!-- 目前路由{{ route.params.id }} -->
            <!-- {{ memData }} -->
            <!-- {{ tripData }}
            {{ blogData }} -->
            <div class="mem-info">
                <div class="mem-headshot">
                    <img :src=parseUserImg(memData.u_avatar) alt="member headshot photo">
                </div>
                <div class="mem-name">{{ memData.u_nickname }}</div>
                <div class="mem-id">@{{ memData.u_account }}</div>
                <!-- <div class="mem-quote">一台相機，一只皮箱，一趟說走就走的旅行</div> -->
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
                <MyBlog v-if="selectedTab === '旅行筆記'" :memPageBlogData=blogData  />
                <MyTrip v-if="selectedTab === '我的行程'" :memPageTripData=tripData />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import MyBlog from '@/components/layout/MyBlog.vue';
import MyTrip from '@/components/layout/MyTrip.vue';

// 1. 設定"旅行筆記"是預選狀態
const selectedTab = ref('');

// 2. 點選tab時更新selectedTab的值
const selectTab = (tabName) => {
    selectedTab.value = tabName;
};


selectTab('旅行筆記')


// 帳號資料
const memData = ref([]);
const tripData = ref([]);
const blogData = ref([]);

// 路由方法
const router = useRouter();
const goToPage = (toLink) => {
    router.push(toLink);
};

const route = useRoute();


// 資料圖片轉檔名 parse
function parseBgImg(imgURL) {
    // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
    if (imgURL) return `${import.meta.env.VITE_IMG_URL}/${imgURL}`;
    return `${import.meta.env.VITE_IMG_URL}/default-userBg.png`
}
function parseUserImg(imgURL) {
    // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
    if (imgURL) return `${import.meta.env.VITE_IMG_URL}/${imgURL}`;
    return `${import.meta.env.VITE_IMG_URL}/default-userImg.png`
}

// 修改banner
const memBannerImg = computed(() => ({
        background: `no-repeat center/cover url(${parseBgImg()})`
    }));


const fetchData = async () => {
    try {

        let path = `${import.meta.env.VITE_API_URL}`;
        let url = path + `/memPageView.php?keyword=` + route.params.id;


        const response = await fetch(url);
        const data = await response.json();
        console.log('http://localhost/phpG6/api/blogView.php')
        console.log('url:', url)
        console.log(data)

        // 存取資料到陣列中
        memData.value = data.memData;
        tripData.value = data.tripData;
        blogData.value = data.blogData;
    } catch (error) {
        console.log('erro link at', `${import.meta.env.VITE_API_URL}/api/blogView.php`)
        console.error('Error fetching data:', error);
    }
};
onMounted(() => {
    fetchData();
});


</script>







<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.section-full-width {
    .mem-page-banner {
        width: 100%;
        height: 200px;
        // aspect-ratio: 16/9;
        // background: no-repeat center/cover url(@/assets/images/mem-page-banner.jpg);
    }

    .mem-info {
        text-align: center;
        position: relative;
        padding: 50px 0;

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