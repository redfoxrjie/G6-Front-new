<!-- 
 用於一覽頁搜尋結果 會需要切分資料頁面
 顯示數量 參數傳入顯示和點擊事件 -->
 
 <template>
    <div class="pagination-wrap">
        <div class="indexButton" 
        v-for="n in pagesCount" 
        :key="n" 
        @click="clickEmitHandle(n)"
        :class="{ active: n === pageIndex }"
        >
            {{ n }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    pageIndex: {
        type: Number,
        default: 1
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

const emit = defineEmits(['emitClick']);

// 使用computed計算總頁數，確保頁數會隨著資料總數變動而更新
const pagesCount = computed(() => { 
    return Math.ceil(props.totalItems / props.pageLimit);
});

// 點擊處理
function clickEmitHandle(n){
    emit('emitClick', n);
    console.log('Clicked page', n);
}
</script>


<style lang="scss" scope>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.pagination-wrap {
    margin: 80px auto 40px;
    width: fit-content;
    display: flex;
    gap: 10px;
    .indexButton {
        display: inline-block;
        width: 40px;
        line-height: 40px;
        border-radius: 20px;
        background-color: $secondColor-1;
        color: $primaryColor;
        text-align: center;
        cursor: pointer;
        user-select: none;
        &:hover {
            background-color: $secondColor-2;
            transition: background-color .2s ease;
        }
    }
    .active {
        background-color: $secondColor-2;
        transition: background-color .2s ease;
    }
}
</style>
