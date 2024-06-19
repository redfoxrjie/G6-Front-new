<template>
    <div class="blog-card-wrapper col ">
        <div class="blog-card">
            <div class="bc-imgWrap" @click="goToPage('/blogpage')">
                <img class="bc-i-tape" src="@/assets/images/tape-sticker.png" alt="">
                <img class="bc-i-img" :src="bcImg"></img>
                <div class="bc-i-likes">
                    <div class="bc-i-likes-icon">
                        <img src="@/assets/images/global/icons/bones-xs-svg.svg" alt="" class="likes-iconImg">
                    </div>
                    <p class="bc-i-likes-count">{{ bcLikesCount }}個讚</p>
                </div>
                <!-- <img src="https://fakeimg.pl/300x200/200"> -->
            </div>
            <div class="bc-contentWrap">
                <h4 class="bc-c-title">{{ bcTitle }}</h4>
                <p class="bc-c-date">{{ bcDate }}</p>
                <div class="bc-c-viewsWrap">
                    <div class="bc-c-v-icon">
                        <img src="@/assets/images/global/icons/views-xs-svg.svg" alt="">
                    </div>
                    <p class="bc-c-v-count">

                        {{ bcViewsCount }}次觀看
                    </p>
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
    box-sizing: border-box;
    padding: 5px 10px;
    padding-top: 50px; //需要多計算貼紙空間
    margin-bottom: 5px;

}





.blog-card {
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    aspect-ratio: 3/4;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, .15);
    max-width: 300px; // 相片解析度不高
    margin: auto;
    transition: .2s;

    &:hover {
        transform: scale(1.02);
    }

    .bc-imgWrap {
        position: relative;
        aspect-ratio: 3/4;
        // overflow: hidden;

        .bc-i-tape {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-80%)
        }

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
                // text-shadow: ;
            }


        }

    }

    .bc-contentWrap {
        box-sizing: border-box;
        // padding: 0 5%;
        margin-top: 5%;

        .bc-c-date {
            color: $grey;
        }

        .bc-c-viewsWrap {
            display: flex;
            width: 100%;
            justify-content: end;
            gap: 5px;

            .bc-c-v-icon {
                width: $base-fontSize;
                aspect-ratio: 1;
                position: relative;

                img {
                    display: block;
                    width: 100%;
                    aspect-ratio: 1;
                }
            }

            .bc-c-v-count {
                text-align: right;
                color: $secondColor-1;
            }

        }
    }
}
</style>