<template>
    <div class="page-container container">
        <div class="prev-arrow" @click="goBack">
            <font-awesome-icon icon="arrow-left" />
        </div>
        <h2>最新消息</h2>
        <div class="news-content" v-if="item">
            <div class="news-info">
                <div class="news-title">{{ item.title }}</div>
                <span class="published-date font-time">{{ item.date }}</span>
                <span class="news-type font-time">{{ item.type }}</span>
            </div>
            <div class="news-img">
                <img :src="parseServerImg(item.img)" alt="news image">
            </div>
            <p class="news-paragraph">
                {{ item.content }}
            </p>
        </div>
        <button class="prev-btn" @click="goBack">返回</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    data() {
        return {
            item: []
        };
    },
    methods: {
        loadJsonData() {
            const newsId = this.$route.params.id;
            fetch(`${import.meta.env.BASE_URL}json/news.json`)
                .then(res => res.json())
                .then(data => {
                    this.item = data.find(news => news.id == newsId);
                    console.log('Loaded item:', this.item);
                })
                .catch((error) => {
                    console.error('Error loading JSON data:', error);
                });
        },
        parseImg(imgURL) {
            // 將相對路徑解析成正確的 URL
            return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
        },
        parseServerImg(imgURL) {
	        // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
        },
        goBack() {
            window.history.back(); // 返回前一頁
        }
    },
    mounted() {
        this.loadJsonData(); // 在组件挂载后加载数据
    },
};
</script>


<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.page-container {
    margin-top: 120px;
    width: 75vw;
    .prev-arrow {
        border: 1px solid $black;
        width: fit-content;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
            color: $secondColor-2;
            border: 1px solid $secondColor-2;
            transition: all .3s ease;
        }
    }
    h2 { 
        color: $secondColor-2;
        margin: 36px 0;
    }
    .news-content {
        .news-info {
            .news-title {
                font-size: $base-fontSize * 1.33;
                line-height: 140%;
            }
            .news-type {
                background-color: $accentColor-1;
                padding: 2px 4px;
            }
            .published-date, .news-type {
                color:$black;
                display: inline-block;
                margin: 20px 0;
                margin-right: 16px;
            }
        }
        .news-img {
            width: 100%;
            aspect-ratio: 1.77/1;
            overflow: hidden;
            margin: 12px 0 12px;
            img {
                width: 100%;
            }
        }
        p.news-paragraph {
            font-size: $base-fontSize * 1.125;
            letter-spacing: $base-fontSize * 1.125 * 0.05;
            line-height: 180%;
            margin-top: 20px;
            margin-bottom: 60px;
        }
    }
    button.prev-btn {
        background-color: $secondColor-2;
        padding: 14px 52px;
        color: $primaryColor;
        text-align: center;
        border-radius: 44px;
        width: 80%;
        margin: 0 auto;
        display: block;
        cursor: pointer;
        &:hover {
            background-color: darken($color: $secondColor-2, $amount: 10);
        }
    }
}
@media screen and (min-width: 768px) {
    .page-container{
        width: 62.1vw;
        button.prev-btn {
        background-color: $secondColor-2;
        padding: 14px 52px;
        color: $primaryColor;
        text-align: center;
        border-radius: 44px;
        width: 30%;
        margin: 0 auto;
        display: block;
        cursor: pointer;
        &:hover {
            background-color: darken($color: $secondColor-2, $amount: 10);
        }
    }
    }
}
</style>