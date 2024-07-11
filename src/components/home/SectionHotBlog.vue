<template>
  <section>
    <HCompSectionTitle title="旅遊隨筆" />
    <div class="hot-blog-card-wrapper">
      <div v-for="(card, index) in cards" :key="index" class="hot-blog-card"
        :class="{ 'active': index === activeIndex }" :style="{ backgroundImage: 'url(' + card.imageSrc + ')' }"
        @mouseenter="activeIndex = index" @mouseleave="resetActiveIndex">
        <h4>{{ card.title }}</h4>
        <p>{{ card.content }} <a href="#">《More》</a></p>
      </div>
    </div>
    <HCompLearnMoreBtn link="/blog" />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import HCompSectionTitle from './HCompSectionTitle.vue';
import HCompLearnMoreBtn from './HCompLearnMoreBtn.vue';

const cards = ref([
  {
    title: '北九州五天四夜|浪漫花海、私房夜景看不完',
    content: '這次來到日本北九州，感受到了獨特的歷史與現代交織的魅力。品嚐了當地美食，探索了壯麗的自然景觀與文遺產。參觀了古老的城堡和博物館，體驗了溫泉的放鬆...',
    imageSrc: 'https://tibamef2e.com/cid101/g6/assets/japan_yufuin-kinrinko.jpg'
  },
  {
    title: '東京粉色自由行| 沉浸式賞櫻與參拜之旅',
    content: '春天的東京，粉色花海美不勝收。本次自由行深入東京的隱秘角落，賞櫻並體驗日本的傳統文化。參拜歷史悠久的淺草寺，感受古老神社的神聖氛圍...',
    imageSrc: 'https://tibamef2e.com/cid101/g6/assets/japan_asakusa_street.jpg'
  },
  {
    title: '濟州島fun輕鬆|走進神話般的壯麗美景',
    content: '從濟州的火山岩石海岸線到神秘的瀑布，每一處都讓人感覺如同步入了神話世界。遊覽青翠的山巒，探索隱藏在深林中的寺廟，每一刻都讓人心曠神怡...',
    imageSrc: 'https://tibamef2e.com/cid101/g6/assets/korea_jeju-island.jpg'
  }
]);
const activeIndex = ref(0);

function resetActiveIndex() {
  activeIndex.value = 0;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/styles/base/color';

section {
  margin: 50px;
}

.hot-blog-card-wrapper {
  display: flex;
  width: 100%;
  height: 400px;
  margin-bottom: 60px;
  cursor: pointer;

  .hot-blog-card {
    flex-direction: column;
    justify-content: flex-end;
    display: flex;
    width: 0px;
    height: 100%;
    flex-grow: 1;
    opacity: .5;
    transition: .5s ease;
    border-radius: 20px;
    margin: 1%;
    background-position: center center;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    p {
      display: none;
      /* Hide paragraph by default */
    }

    &:hover {
      opacity: 1;
      filter: contrast(100%);

      p {
        display: block;
        /* Show paragraph on hover */
      }
    }

    h4,
    p,
    a {
      line-height: 1.4;
      color: $primaryColor;
      margin-bottom: 1rem;
    }
  }

  .hot-blog-card.active {
    height: 400px;
    flex-grow: 2;
    opacity: 1;

    p {
      display: block;
      /* Always show paragraph when active */
    }
  }
}

@media (max-width: 480px) {
  .hot-blog-card-wrapper {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;

    .hot-blog-card {
      width: 100%;
      opacity: 1;
      height: auto;
      margin: 10px 0;
      opacity: 1;
      padding: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-size: cover;
      background-repeat: no-repeat;
    }

    .hot-blog-card.active {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
