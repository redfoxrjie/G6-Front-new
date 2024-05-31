<template>
    <section class="home-section-news page-section">
        <div class="container">
            <div class="hs-news-items-wrap">
                <div class="hs-news-items">
                    <div class="hs-news-item">
                        <span class="hs-news-published-date">
                            2022/05/18
                        </span>
                        <p class="hs-news-item-title">
                            <span class="hs-news-item-title-category">限時優惠</span>
                            樂園門票、國外網路卡限時特價，立即搶購，享受更多折扣
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script></script>

<style lang="scss" scoped>
@import '../../assets/styles/base/color';
@import '../../assets/styles/base/font';


h3{
    color: $black;
    background-color: $secondColor-1;
}
.hs-news-item{
    display: flex;
    position: relative;
    padding: 20px 0px;
}
.hs-news-item-title-category{
    display: inline-block;
    line-height: 120%;
    // margin-right: 100px;
    border-right: 1px solid $black;
    background-color: #776e6e;
}
.hs-news-published-date{
    display: inline-block;
    padding: 0 12px;
    // background-color: #b4df73;
    line-height: 120%;
}
</style>