<template>
  <main>
    <PageHeader />
    <SectionHotTrips />
    <SectionHotBlog />
    <SectionNews />
    <SectionTicket />
    <LoginRegisterModal />
  </main>
</template>

<script setup>
import PageHeader from '../components/home/PageHeader.vue';
import SectionHotBlog from '../components/home/SectionHotBlog.vue'
import SectionNews from '../components/home/SectionNews.vue';
import SectionHotTrips from '../components/home/SectionHotTrips.vue';
import SectionTicket from '../components/home/SectionTicket.vue';
import LoginRegisterModal from '../components/layout/LoginRegisterBox.vue';
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
</style>
