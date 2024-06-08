<template>
    <main>
        <div class="section-full-width">
            <div class="mem-page-banner"></div>
            <div class="mem-info">
                <div class="mem-headshot">
                    <img src="@/assets/images/mem-headshot-01.jpg" alt="member headshot photo">
                </div>
                <div class="mem-name">Josh Cheng</div>
                <div class="mem-id">@用戶ID</div>
                <div class="mem-quote">一台相機，一只皮箱，一趟說走就走的旅行</div>
            </div>
            <div class="content-block container">
                <div class="tabs-wrapper">
                    <div
                        class="tab"
                        :class="{ 'selected': selectedTab === '旅行筆記' }"
                        @click="selectTab('旅行筆記')"
                    >旅行筆記</div>
                    <div class="tab" 
                        :class="{ 'selected': selectedTab === '我的行程' }" 
                        @click="selectTab('我的行程')"
                    >我的行程</div>
                    <div class="tab" 
                        :class="{ 'selected': selectedTab === '團隊行程' }" 
                        @click="selectTab('團隊行程')"
                    >團隊行程</div>
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
            .mem-name{ 
                font-size: $base-fontSize * 1.375;
                margin-top: 18px;
                color: $black;
            }
            .mem-id{ 
                font-size: $base-fontSize;
                color: $gray;
                margin: 18px 0;
            }
            .mem-quote{
                font-size: $base-fontSize * 0.8125;
                letter-spacing: $base-fontSize * 0.8125 * 0.1;
                color: $gray;
            }
        }
    }
    .content-block {
        .tabs-wrapper{
            display: flex;
            gap: 26px;
            border-bottom: solid 3px $secondColor-2;
            .tab{
                background-color: $primaryColor;
                border: 2px solid $secondColor-2;
                border-bottom: unset;
                border-radius: 8px 8px 0 0;
                padding: 16px 40px;
                color: $secondColor-2;
                font-size: $base-fontSize * 0.875;
                letter-spacing: $base-fontSize * 0.875 * 0.05;
                cursor: pointer;
                &:hover{
                background-color: $secondColor-2;
                color: $primaryColor;
                }
            } 
        }
    }
    
</style>