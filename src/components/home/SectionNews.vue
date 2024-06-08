<template>
    <section class="home-section-news page-section">
        <div class="container">
            <HCompSectionTitle title="最新消息" />
            <div class="hs-news-items-wrap">
                <div class="hs-news-items " v-for="n in newsContentDate" :key="n">
                    <div class="hs-news-item">
                        <span class="hs-news-published-date ">
                            {{ n.n_time }}
                        </span>
                        <span class="hs-news-item-title-category">{{ n.nc_name }}</span>
                        <p class="hs-news-item-title">

                            {{ n.n_title }}
                        </p>
                    </div>
                </div>
            </div>
            <HCompLearnMoreBtn />
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import HCompSectionTitle from './HCompSectionTitle.vue';
import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';

const newsContentDate = ref([])
const fetchData = async () => {
    try {
        const response = await fetch('/json/homepagedata.json');
        const data = await response.json();
        newsContentDate.value = data.news;
    } catch (error) {
        console.log('fetch error:',error)
    }

}
fetchData();
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