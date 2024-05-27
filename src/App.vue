<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="It's hard to find this" /> -->

      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/about">關於我們</RouterLink>
        <RouterLink to="/trips">行程一覽</RouterLink>
        <RouterLink to="/blog">關於我們</RouterLink>
      </nav>
      <!-- <section>A</section>
      <section>B</section>
      <section>C</section> -->
      <SectionA></SectionA>
      <SectionB></SectionB>
      <SectionC></SectionC>
      <p>測試測試</p>
      <p>測試02</p>
    </div>
  </header>

  <RouterView />
</template>
<!-- <template>
  <RouterView />
</template> -->

<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SectionA from './components/home/SectionA.vue'
import SectionB from './components/home/SectionB.vue'
import SectionC from './components/home/SectionC.vue'

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    HelloWorld,
    SectionA,
    SectionB,
    SectionC
  }
})
</script>

<style scoped>
section {
  bottom: #ddd;
  height: 90vh;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10rem;
}
</style>
