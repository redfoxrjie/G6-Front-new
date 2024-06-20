<template>
    <section class="home-section-news page-section">
        <div class="container">
            <HCompSectionTitle title="最新消息" />
            <div class="hs-news-items-wrap">
                <div class="hs-news-items " v-for="(n,index) in newsContentDate" :key="n" @click="goToPage(`/news/${n.id}`)">
                    <div class="hs-news-item">
                        <span class="hs-news-published-date ">
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

<script setup>
import { ref, onMounted } from 'vue';

import HCompSectionTitle from './HCompSectionTitle.vue';
import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';

const newsContentDate = ref([])
const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}json/news.json`);
        const data = await response.json();
        // console.log(data)
        const selection = data.slice(0,3)
        newsContentDate.value = selection;
    } catch (error) {
        console.log('fetch error:',error)
    }

}

import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToPage=(toLink)=>{
        router.push(toLink)
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