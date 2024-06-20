<template>
    <section class="home-section-news page-section">
        <div class="container">
            <HCompSectionTitle title="最新消息" />
            <div class="hs-news-items-wrap">

                <div class="hs-news-items" v-for="n in state.newsContentFirstFour" :key="n.id" @click="navigateToNewsPage(n.id)">
                    <div class="hs-news-item">
                        <span class="hs-news-published-date">
                            {{ n.date }}
                        </span>
                        <span class="hs-news-item-title-category">{{ n.type }}</span>
                        <p class="hs-news-item-title">

                            {{ n.title }}
                        </p>
                    </div>
                </div>
            </div>
            <HCompLearnMoreBtn link="/news" />
        </div>
    </section>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HCompSectionTitle from './HCompSectionTitle.vue';
import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';


export default {
    components: {
        HCompSectionTitle,
        HCompLearnMoreBtn
    },
    setup() {
        const state = reactive({
            newsContentFirstFour: []
        });

        const router = useRouter();

        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}json/news.json`); // 使用相對路徑
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data); // 打印完整資料
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data format');
                }
                // 只取前四筆資料
                state.newsContentFirstFour = data.slice(0, 4);
                console.log('First four news items:', state.newsContentFirstFour); // 打印前四筆資料
            } catch (error) {
                console.log('fetch error:', error);
            }
        };

        const navigateToNewsPage = (id) => {
            console.log('Clicked news item with ID:', id);
            if (router) {
                router.push({ name: 'newsPage', params: { id } });
            } else {
                console.error('Router instance is not available.');
            }
        };

        onMounted(() => {
            fetchData();
        });

        return {
            state,
            navigateToNewsPage
        };
    }
};

</script>





<style lang="scss" scoped>
@import '../../assets/styles/base/color';
@import '../../assets/styles/base/font';

section {
    background-color: $secondColor-1;
    font-size: $base-fontSize;
    color: $black;
    padding: 50px 0
}

.hs-news-item {
    display: flex;
    position: relative;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: $base-fontSize;
    border-radius: 10px;
    background-color: $primaryColor;
    margin-bottom: $base-fontSize;

    transition: .1s ease-in-out;
    cursor: pointer;
    &:hover{
        box-shadow:  4px 4px 1px rgba(243, 215, 58, 0.897);
    }



    .hs-news-item-title-category {
        line-height: 120%;
        text-align: center;
        background-color: $accentColor-2;
        padding: 0 10px;
    }

    .hs-news-published-date {
        display: inline-block;
        line-height: 120%;
        text-align: center;
        padding: 0 10px;

    }

    .hs-news-item-title {
        margin: 10px;
    }
}
</style>