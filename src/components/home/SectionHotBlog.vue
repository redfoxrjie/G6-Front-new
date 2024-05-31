<template>
  <section>
    <div class="pop-blog-cards">
      <div v-for="(card, index) in cards" :key="index" class="card" :class="{ 'active': index === activeIndex }"
        :style="{ backgroundImage: 'url(' + card.imageSrc + ')' }" @mouseenter="activeIndex = index"
        @mouseleave="resetActiveIndex">
        <h4>{{ card.title }}</h4>
        <p>{{ card.content }} <a href="#">《More》</a></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
  {
    title: '北九州五天四夜|浪漫花海、私房夜景看不完',
    content: '這次來到日本北九州，感受到了獨特的歷史與現代交織的魅力。品嚐了當地美食，探索了壯麗的自然景觀與文遺產。參觀了古老的城堡和博物館，體驗了溫泉的放鬆...',
    imageSrc: '/src/assets/images/japan_yufuin-kinrinko.jpg'
  },
  {
    title: '東京粉色自由行| 沉浸式賞櫻與參拜之旅',
    content: '春天的東京，粉色花海美不勝收。本次自由行深入東京的隱秘角落，賞櫻並體驗日本的傳統文化。參拜歷史悠久的淺草寺，感受古老神社的神聖氛圍...',
    imageSrc: '/src/assets/images/japan_asakusa_street.jpg'
  },
  {
    title: '濟州島fun輕鬆|走進神話般的壯麗美景',
    content: '從濟州的火山岩石海岸線到神秘的瀑布，每一處都讓人感覺如同步入了神話世界。遊覽青翠的山巒，探索隱藏在深林中的寺廟，每一刻都讓人心曠神怡...',
    imageSrc: '/src/assets/images/korea_jeju-island.jpg'
  },
  // {
  //   title: '濟州島fun輕鬆|走進神話般的壯麗美景',
  //   content: '從濟州的火山岩石海岸線到神秘的瀑布，每一處都讓人感覺如同步入了神話世界。遊覽青翠的山巒，探索隱藏在深林中的寺廟，每一刻都讓人心曠神怡...',
  //   imageSrc: '/src/assets/images/korea_jeju-island.jpg'
  // },

]);
const activeIndex = ref(0);

function resetActiveIndex() {
  activeIndex.value = 0;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pop-blog-cards {
  display: flex;
  width: 100%;
  height: 400px;
}

.card {
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
  width: 0px;
  flex-grow: 1;
  object-fit: cover;
  opacity: .5;
  transition: .5s ease;
  border-radius: 20px;
  margin: 1%;
  background-position: center center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card:hover {
  flex-grow: 1;
  width: 200px;
  opacity: 1;
  filter: contrast(120%);
}

.card.active {
  width: 200px;
  opacity: 1;
}

.card:hover p {
  display: block;
  /* Show paragraph on hover */
}

.card p {
  display: none;
  /* Hide paragraph by default */
}

.card.active p {
  display: block;
  /* Always show paragraph when active */
}

.card h4 {
  line-height: 1.4;
  color: #fff;
  margin-bottom: 1rem;
}

.card p,
.card a {
  line-height: 1.4;
  color: #fff;
}
</style>
