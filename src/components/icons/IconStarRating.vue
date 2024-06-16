<template>
    <div>
      <div class="rating">
        <span
          v-for="(star, i) in 5"
          :key="i"
          :class="starClass(i)"
          @mouseover="handleMouseOver(i)"
          @click="handleClick(i)"
          @mouseout="handleMouseOut"
        >
          <font-awesome-icon icon="fa-regular fa-star" size="sm" />
        </span>
      </div>
      <div id="rating-value">{{ ratingMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ratingValue: null,
        index: -1 // 目前選中的星星索引
      };
    },
    computed: {
      ratingMessage() {
        return this.ratingValue ? `${this.ratingValue} /5` : '0/5';
      }
    },
    methods: {
      // 根據 index 設定星星樣式
      starClass(index) {
        if (this.ratingValue !== null && index < this.ratingValue) {
          return 'fa-solid fa-star'; // 實心星星
        } else {
          return 'fa-regular fa-star'; // 空心星星
        }
      },
      // 當鼠標移動到的星星的索引 i，更新評分值
      handleMouseOver(i) {
        // 評分值始終設定為 i+1，即當前星星數量
        this.ratingValue = i + 1;
      },
      // 當點擊時將 ratingValue 設為 i+1，index 設為 i
      handleClick(i) {
        this.ratingValue = i + 1;
        this.index = i;
      },
      // 當鼠標移出區域時，如果沒有點擊星星，則顯示評分值對應的狀態
      handleMouseOut() {
        // 如果沒有點擊星星，則將評分值設為 null，顯示空心星星
        if (this.index === -1) {
          this.ratingValue = null;
        }
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/base/color';
  @import '@/assets/styles/base/font';

  .rating:hover {
    .fa-star {
        width: 1.1rem;
        transition: width 250ms ease-in;
    }
  }
  .rating {
    margin-bottom: 4px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
      .fa-star {
      font-size: 1rem;
      color: $accentColor-2;
      cursor: pointer;
      width: 0;
      transition: width 250ms ease;
    }
  }
  #rating-value {
    color: #fff;
    font-size: 0.75rem;
    text-align: right;
  }
  </style>
  