<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner">
                <div>
                    <label for="banner-upload" class="banner-lable"><font-awesome-icon
                            :icon="['fas', 'pen-to-square']" />編輯封面</label>
                    <input id="banner-upload" type="file" @change="uploadImage" accept="image/*" style="display: none;">
                    <!-- 如果沒有圖片顯示的默認背景 -->
                    <div v-if="!imageUrl" class="default-background"></div>
                </div>
            </div>
            <div class="mem-info">
                <div class="mem-headshot">
                    <img src="@/assets/images/mem-headshot-01.jpg" alt="member headshot photo">
                </div>
                <label for="headshot-upload" class="headshot-lable"><font-awesome-icon
                        :icon="['fas', 'camera']" /></label>
                <input id="headshot-upload" type="file" @change="headshotImage" accept="image/*" style="display: none;">

                <div class="mem-name">Josh Cheng</div>
                <div class="mem-id">@用戶ID</div>
                <!-- <div class="mem-quote">一台相機，一只皮箱，一趟說走就走的旅行 </div> -->
                <input id="edit-quote" type="text" @change="headshotImage" class="input-quote"
                    placeholder="Write your quote...">
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
                <MyTrip v-if="selectedTab === '我的行程'" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import MyBlog from '@/components/layout/MyBlog.vue';
import MyTrip from '@/components/layout/MyTrip.vue';

const imageUrl = ref('');

const uploadImage = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const formData = new FormData();
    formData.append('image', files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        imageUrl.value = result.filePath;  // 保存返回的文件路徑
    } catch (error) {
        console.error('上傳過程發生錯誤', error);
        alert('上傳失敗');
    }
};


// 1. 設定"旅行筆記"是預選狀態
const selectedTab = ref('');


// 2. 點選tab時更新selectedTab的值
const selectTab = (tabName) => {
    selectedTab.value = tabName;
};

// 將這些變量和方法暴露出去以在模板中使用
// export { selectedTab, selectTab};
selectTab('旅行筆記')
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.section-full-width {
    .mem-page-banner {
        width: 100%;
        aspect-ratio: 3.72/1;
        background: no-repeat center/cover url(@/assets/images/mem-page-banner.jpg);
        position: relative;
    }


    .banner-lable {
        padding: 10px;
        border-radius: 23px;
        background-color: rgb(79, 130, 212, 70%);
        font-size: $base-fontSize;
        color: $primaryColor;
        border-color: transparent;
        font-size: $base-fontSize * 0.8125;
        position: absolute;
        bottom: 0%;
        right: 0%;
        transform: translate(-50%, -50%);
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
            ;
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
            }

            .fa-camera {
                background-color: $primaryColor ;
                border-radius: 50%;
                bottom: 0;
                cursor: pointer;
                height: 28px;
                padding: 4px;
                position: absolute;
                right: 0;
                width: 25px;
                color: $secondColor-2;
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