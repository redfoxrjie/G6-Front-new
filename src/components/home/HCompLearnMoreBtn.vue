<script setup>
import { defineProps } from 'vue';

import { useRouter } from 'vue-router';
    const router = useRouter();
    const goToPage=(toLink)=>{
        router.push(toLink)
    }
    const props = defineProps({
    link: {
        type: String,
        default: '/' //沒給值預設值是回到首頁的link      
    }
});
</script>
<template>
    <div class="hs-section-btn-wrap col-6 col-md-3">
        <button class="hs-btn" @click="goToPage(link)">
            查看更多
        </button>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/base/font';
    @import '@/assets/styles/base/color';
    .hs-section-btn-wrap{
        padding: $base-fontSize 0;
        margin: 0 auto;
    }
    .hs-btn{
        display: block;
        background-color: $accentColor-2;
        margin: auto;
        border-radius: 10px;
        padding: 2px 30px ;
    }
</style>
