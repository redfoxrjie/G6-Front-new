
<script setup>
import PageHeader from '../components/home/PageHeader.vue';
import SectionHotBlog from '../components/home/SectionHotBlog.vue'
import SectionNews from '../components/home/SectionNews.vue';
import SectionHotTrips from '../components/home/SectionHotTrips.vue';
import SectionTicket from '../components/home/SectionTicket.vue';
</script>

<template>
  <main>
    <PageHeader />
    <SectionNews />
    <SectionHotTrips/>
    <SectionHotBlog />
    <SectionTicket />
  </main>
</template>


