<template>
  <div class="tickets-container">
    <div v-for="(ticket, index) in tickets" :key="index" class="ticket">
      <img :src="ticket.image" :alt="ticket.title" class="ticket-image" />
      <h3 class="ticket-title">{{ ticket.title }}</h3>
      <p class="ticket-description">{{ ticket.description }}</p>
    </div>
  </div>
</template>
<script>
import ticket1 from '@/assets/images/ticket1.jpg';
import ticket2 from '@/assets/images/ticket_02.jpg';
import ticket3 from '@/assets/images/ticket_03.jpg';
import ticket4 from '@/assets/images/ticket_04.jpg';
import ticket5 from '@/assets/images/ticket_05.jpg';
import ticket6 from '@/assets/images/ticket_06.jpg';
import ticket7 from '@/assets/images/ticket_07.jpg';
import ticket8 from '@/assets/images/ticket_08.jpg';
import ticket9 from '@/assets/images/ticket_09.jpg';
import ticket10 from '@/assets/images/ticket_10.jpg';
import ticket11 from '@/assets/images/ticket_11.jpg';
import ticket12 from '@/assets/images/ticket_12.jpg';
import ticket13 from '@/assets/images/ticket_13.jpg';
import ticket14 from '@/assets/images/ticket_14.jpg';
import ticket15 from '@/assets/images/ticket15.jpg';

export default {
  data() {
    return {
      tickets: [
        { image: ticket1, title: 'Title 1', description: 'Description 1' },
        { image: ticket2, title: 'Title 2', description: 'Description 2' },
        { image: ticket3, title: 'Title 3', description: 'Description 3' },
        { image: ticket4, title: 'Title 4', description: 'Description 4' },
        { image: ticket5, title: 'Title 5', description: 'Description 5' },
        { image: ticket6, title: 'Title 6', description: 'Description 6' },
        { image: ticket7, title: 'Title 7', description: 'Description 7' },
        { image: ticket8, title: 'Title 8', description: 'Description 8' },
        { image: ticket9, title: 'Title 9', description: 'Description 9' },
        { image: ticket10, title: 'Title 10', description: 'Description 10' },
        { image: ticket11, title: 'Title 11', description: 'Description 11' },
        { image: ticket12, title: 'Title 12', description: 'Description 12' },
        { image: ticket13, title: 'Title 13', description: 'Description 13' },
        { image: ticket14, title: 'Title 14', description: 'Description 14' },
        { image: ticket15, title: 'Title 15', description: 'Description 15' }
      ]
    }
  }
}
</script>
<!-- <script>
export default {
  data() {
    return {
      tickets: [
        { image: require('@/assets/images/ticket1.jpg'), title: 'Title 1', description: 'Description 1' },
        { image: require('@/assets/images/ticket_02.jpg'), title: 'Title 2', description: 'Description 2' },
        { image: require('@/assets/images/ticket_03.jpg'), title: 'Title 3', description: 'Description 3' },
        { image: require('@/assets/images/ticket_04.jpg'), title: 'Title 4', description: 'Description 4' },
        { image: require('@/assets/images/ticket_05.jpg'), title: 'Title 5', description: 'Description 5' },
        { image: require('@/assets/images/ticket_06.jpg'), title: 'Title 6', description: 'Description 6' },
        { image: require('@/assets/images/ticket_07.jpg'), title: 'Title 7', description: 'Description 7' },
        { image: require('@/assets/images/ticket_08.jpg'), title: 'Title 8', description: 'Description 8' },
        { image: require('@/assets/images/ticket_09.jpg'), title: 'Title 9', description: 'Description 9' },
        { image: require('@/assets/images/ticket_10.jpg'), title: 'Title 10', description: 'Description 10' },
        { image: require('@/assets/images/ticket_11.jpg'), title: 'Title 11', description: 'Description 11' },
        { image: require('@/assets/images/ticket_12.jpg'), title: 'Title 12', description: 'Description 12' },
        { image: require('@/assets/images/ticket_13.jpg'), title: 'Title 13', description: 'Description 13' },
        { image: require('@/assets/images/ticket_14.jpg'), title: 'Title 14', description: 'Description 14' },
        { image: require('@/assets/images/ticket15.jpg'), title: 'Title 15', description: 'Description 15' }
      ]
    }
  }
}
</script> -->


<!-- <template>
  <div class="carousel-container">
    <div class="owl-carousel owl-theme">
      <div class="item" v-for="(item, index) in items" :key="index">
        <img :src="item.image" :alt="item.title">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data() {
    return {
      items: [
        { image: '../assets/images/ticket_01.jpg', title: 'Image 1', description: 'Description 1' },
        { image: '../assets/images/ticket_01.jpg', title: 'Image 2', description: 'Description 2' },
        { image: '../assets/images/ticket_01.jpg', title: 'Image 3', description: 'Description 3' }
      ]
    }
  },
  mounted() {
    this.initOwlCarousel();
  },
  methods: {
    initOwlCarousel() {
      // 等待 DOM 完全渲染後初始化 OwlCarousel
      this.$nextTick(() => {
        $('.owl-carousel').owlCarousel({
          items: 1,
          loop: true,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true
        });
      });
    }
  }
}
</script> -->