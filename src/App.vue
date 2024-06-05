<template>
  <header>
 
    <div class="wrapper">
      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/about">關於我們</RouterLink>
        <RouterLink to="/trips">行程一覽</RouterLink>
        <RouterLink to="/blog">旅行筆記</RouterLink>
        <RouterLink to="/news">最新消息</RouterLink>
        <RouterLink to="/tickets">票券訂購</RouterLink>
        <RouterLink to="/login">會員登入</RouterLink>
      </nav>

    </div>
  </header>
  <RouterView />
  <PageFooter />
  <ProductCard />
  
</template>

<script>
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import PageFooter from './components/footer/PageFooter.vue'
import SectionHotBlog from './components/home/SectionHotBlog.vue'
import SectionTicket from './components/home/SectionTicket.vue'
// import PageHeader from './components/home/PageHeader.vue'
import ProductCard from './components/layout/ProductCard.vue'
import'./assets/styles/style.scss'


export default defineComponent({
  components: {
    RouterLink,
    RouterView,
    SectionHotBlog,
    SectionTicket,
    PageFooter,
    ProductCard
  }
})
</script>