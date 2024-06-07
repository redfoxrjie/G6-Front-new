<script setup>
import { defineProps } from 'vue';
// 定義 props
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>
<template>
    <div class="hs-title-wrap">
        <div class="hs-title-deco-img">
            <img src="../../assets/images/global/icons/paw-sm.svg" alt="" srcset="">
        </div>
        <h2 class="section-title">
            {{ props.title }}
        </h2>
    </div>
</template>
<style lang="scss" scoped>
.hs-title-wrap {
    position: relative;
    padding: 0px 0px;
    width: fit-content;
    margin: 0px auto;
    padding: 25px 0;
    margin-bottom: 30px;
}

h3.section-title {
    width: fit-content;
    position: relative;
    margin: auto;
    /* background-color: #fff; */
    /* padding: 0px 10px; */
    font-size: 28px;
}

.hs-title-deco-img {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateX(calc(50% + 10px)) translateY(calc(50% + 25px - 16px));
}

.hs-title-deco-img img {
    object-fit: contain;
    width: 100%;
    height: 100%;

}
</style>