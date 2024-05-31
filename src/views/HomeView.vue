
<script setup>

import SectionHotBlog from '../components/home/SectionHotBlog.vue'
import SectionNews from '../components/home/SectionNews.vue';
import SectionHotTrips from '../components/home/SectionHotTrips.vue';
import SectionTicket from '../components/home/SectionTicket.vue';
</script>

<template>
  <main>


    <SectionHotBlog />

  </main>
</template>
    <SectionNews />
    <SectionTicket />
    <SectionHotTrips/>
  </main>
</template>

<!-- <script setup>
  import SectionHotTrips from '../components/home/SectionHotTrips.vue';

  const hotTripsData = [
  { title: '北九州五天四夜雙人行', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_yufuin-kinrinko.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10'},
  { title: '濟州島六天五夜家族旅遊', memberName: '會員名稱', imgUrl: new URL('@/assets/images/korea_jeju-island.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10'  },
  { title: '京阪神絕景賞楓五天四夜', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_kyoto-street.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
  { title: '墾丁四天三夜畢業旅行', memberName: '會員名稱', imgUrl: new URL('@/assets/images/taiwan_kenting.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10'  },
  { title: '韓國釜山放鬆之旅', memberName: '會員名稱', imgUrl: new URL('@/assets/images/korea_busan.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10'  },
  { title: '東京下町散策之旅', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_asakusa-street.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
  ];
</script> -->

