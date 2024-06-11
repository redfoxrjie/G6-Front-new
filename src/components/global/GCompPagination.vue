<!-- 
 用於一覽頁搜尋結果 會需要切分資料頁面
 顯示數量 參數傳入顯示和點擊事件 -->
 
<template>
    <!-- :class="{ active: n === pageIndex }" -->
    <div class="pagination-wrap">
        <div class="indexButton" v-for="(n,i) in pagesCount" :key="n" :class="{ active: n === pageIndex }"
            @click="clickEmitHandle(n)">
            {{ n }}
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps,defineEmits } from 'vue';
const props = defineProps({
    pageIndex: {
        type: Number,
        default: 1
        // ,require: required
    },
    totalItems: {
        type: Number,
        default: 2
    },
    pageLimit: {
        type: Number,
        default: 3
    }
})
const pagesCount = Math.ceil( props.totalItems/props.pageLimit);
// console.log(props.pageIndex)
const emit = defineEmits(['emitClick']);
function clickEmitHandle(msg){
    emit('emitClick', msg);
}


</script>
<style lang="scss" scope>
.pagination-wrap {
    margin: auto;
    width: fit-content;

    .indexButton {
        display: inline-block;
        width: 40px;
        line-height: 40px;
        border-radius: 20px;
        background-color: #acacac;
        text-align: center;
    }

    .active {
        background-color: #fad1d1;
    }
}
</style>
