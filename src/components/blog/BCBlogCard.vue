<template>
    <div class="blog-card-wrapper col ">
        <div class="blog-card">

            <div class="bc-imgWrap">
                <img class="bc-i-img" :src="bcImg">
                <div class="bc-i-likes">
                    <div class="bc-i-likes-icon">
                        <img src="@/assets/images/global/icons/bones-xs-svg.svg" alt="" class="likes-iconImg">
                    </div>
                    <p class="bc-i-likes-count">{{ bcLikesCount }}個讚</p>
                </div>
            </div>
            <div class="bc-contentWrap">
                <h4 class="bc-c-title">{{ bcTitle }}</h4>
                <div class="bc-c-data">
                    <p class="bc-c-date">{{ bcDate }}</p>
                    <!-- <div class="bc-c-viewsWrap">
                        <div class="bc-c-v-icon">
                            <img src="@/assets/images/global/icons/views-xs-svg.svg" alt="">
                        </div>
                        <p class="bc-c-v-count">
                            {{ bcViewsCount }} 次觀看
                        </p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    bcLikesCount: {
        type: Number,
        default: 100
    },
    bcImg: {
        type: String,
        default: "https://picsum.photos/400/200/?random=10"
    },
    bcTitle: {
        type: String,
        default: "北九州五天四夜|浪漫花海、私房夜景看不完"
    },
    bcViewsCount: {
        type: Number,
        default: 666
    },
    bcDate: {
        type: String,
        default: "2022/10/21"
    }

})
import { useRouter } from 'vue-router';
const router = useRouter();
const goToPage = (toLink) => {
    router.push(toLink)
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.blog-card-wrapper {
    position: relative;
    box-sizing: border-box;
    padding: 20px 10px 5px;
    margin: 18px 0 16px;
    &::before {
        content: '';
            width: 20%;
            max-width: 80px;
            min-width: 60px;
            aspect-ratio: 1/0.77;
            display: block;
            background: no-repeat center/contain url(@/assets/images/tape-sticker.png);
            position: absolute;
            top: 0%;
            left: 50%;
            transform: translate(-50%, -10%);
            z-index: 1;
    }
    .blog-card {
        box-sizing: border-box;
        padding: 33px 21px 15px;
        background-color: #fff;
        aspect-ratio: 3/4;
        box-shadow: 1px 2px 8px rgba(0, 0, 0, .15);
        width: 100%;
        max-width: 300px;
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        cursor: pointer;
        .bc-imgWrap {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            .bc-i-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center bottom;
            }
            .bc-i-likes {
                position: absolute;
                bottom: 0;
                right: 0;
                padding: 5px;
                .bc-i-likes-icon {
                    margin-left: 25%;
                    margin-right: 25%;
                    width: 50%;
                    aspect-ratio: 1;
                    img {
                        width: 100%;
                        aspect-ratio: 1;
                    }
                }
                .bc-i-likes-count {
                    color: $primaryColor;
                    font-size: 14px;
                    text-shadow: .5px .1px $black;
                }
            }
        }
        .bc-contentWrap {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            box-sizing: border-box;
            margin-top: 5%;
            .bc-c-title{
                margin-bottom: 12px;
            }
            .bc-c-data {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                font-size: 0.875rem;
                .bc-c-date { 
                    color: $grey;
                    margin-top: auto;
                    // display: inline-block;
                    letter-spacing: unset;
                }
                .bc-c-viewsWrap{
                    display: flex;
                    display: block;
                    margin-top: auto;
                    .bc-c-v-icon {
                        width: $base-fontSize;
                        aspect-ratio: 1;
                        display: inline-block;
                        margin-right: 4px;
                        img{
                            display: inline-block;
                            width: 1rem;
                            vertical-align: middle;
                            aspect-ratio: 1;
                        }
                    }
                    .bc-c-v-count {
                        letter-spacing: unset;
                        display: inline-block;
                        text-align: right;
                        color: $secondColor-2;
                    }
                }
            }
        }
    }
}

</style>