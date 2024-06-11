<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner">
                <!-- action放置API -->
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
                    :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">
                        <font-awesome-icon :icon="['fas', 'file-pen']" />
                        編輯封面</el-button>
                </el-upload>

                <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">將圖片拖曳至此處，或<em>點擊上傳</em></div>
                    <div class="el-upload__tip" slot="tip">只能上傳jpg/png檔案，且不超過500KB</div>
                </el-upload> -->
                <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
                    :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text"><em>點擊上傳</em></div>
                </el-upload> -->
            </div>
            <div class="mem-info">

                <div class="mem-headshot">
                    <img src="@/assets/images/mem-headshot-01.jpg" alt="member headshot photo">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">

                        <font-awesome-icon :icon="['fas', 'camera']" />
                    </el-upload>
                </div>

                <div class="mem-name">Josh Cheng</div>
                <div class="mem-id">@用戶ID</div>
                <div class="mem-quote">一台相機，一只皮箱，一趟說走就走的旅行 </div>

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
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faFilePen, faCamera, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// library.add(faFilePen, faCamera, faCircleExclamation);

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

    .el-button {
        width: 120px;
        height: 40px;
        border-radius: 23px;
        background-color: rgb(79, 130, 212, 70%);
        font-size: $base-fontSize;
        border-color: transparent;
        letter-spacing: $base-fontSize * 0.8125 * 0.1;
        position: absolute;
        bottom: 0%;
        right: 0%;
        transform: translate(-50%, -50%);
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