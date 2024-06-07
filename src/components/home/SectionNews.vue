<template>
    <section class="home-section-news page-section">
        <div class="container">
            <HCompSectionTitle title="最新消息"/>
            <div class="hs-news-items-wrap">
                <div class="hs-news-items" v-for="n in 4" :key="n">
                    <div class="hs-news-item">
                        <span class="hs-news-published-date col-2">
                            2022/05/18
                        </span>
                        <p class="hs-news-item-title col-10">
                            <span class="hs-news-item-title-category col-1">限時優惠</span>
                            樂園門票、國外網路卡限時特價，立即搶購，享受更多折扣
                        </p>
                    </div>
                </div>
            </div>
            <HCompLearnMoreBtn/>
        </div>
    </section>
</template>

<script setup>
    import HCompSectionTitle from './HCompSectionTitle.vue';
    import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';
</script>

<style lang="scss" scoped>
@import '../../assets/styles/base/color';
@import '../../assets/styles/base/font';

// "col-12 col-md-6 col-lg-4 col-xl-3"
section{
    background-color: $secondColor-1;
    // min-height: 300px;
    font-size: $base-fontSize;
    color: $black;
    padding: 50px 0
}

.hs-news-item{
    display: flex;
    position: relative;
    padding: $base-fontSize 0px;
    width: 100%;
    border-radius: 10px;
    background-color: $primaryColor;
    margin-bottom: $base-fontSize;
}

.hs-news-item-title-category{
    display: inline-block;
    line-height: 120%;
    border-right: 1px solid $black;
    text-align: center;

}
.hs-news-published-date{
    display: inline-block;
    // padding: 0 12px;
    // background-color: #b4df73;
    line-height: 120%;
    text-align: center;

}
</style>