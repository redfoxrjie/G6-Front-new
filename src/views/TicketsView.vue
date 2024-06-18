<template>
  <div class="Ticket_Section">
    <h2>票券一覽</h2>
    <h3 class="Area_TicketTitle">日本-沖繩</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in okinawaTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="ticket.image" :alt="ticket.name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.name }}</h4>
            <p>{{ ticket.content }}</p>
            <p class="TicketPrice">{{ ticket.price }}</p>
            <p>{{ ticket.viewers }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">日本-大阪</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in osakaTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="ticket.image" :alt="ticket.name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.name }}</h4>
            <p>{{ ticket.content }}</p>
            <p class="TicketPrice">{{ ticket.price }}</p>
            <p>{{ ticket.viewers }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">泰國-曼谷</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in thailandTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="ticket.image" :alt="ticket.name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.name }}</h4>
            <p>{{ ticket.content }}</p>
            <p class="TicketPrice">{{ ticket.price }}</p>
            <p>{{ ticket.viewers }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">韓國-首爾</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in koreaTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="ticket.image" :alt="ticket.name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.name }}</h4>
            <p>{{ ticket.content }}</p>
            <p class="TicketPrice">{{ ticket.price }}</p>
            <p>{{ ticket.viewers }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">越南-富國島</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in vietnamTickets" :key="ticket.id" @click="goToDetail(ticket.id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="ticket.image" :alt="ticket.name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.name }}</h4>
            <p>{{ ticket.content }}</p>
            <p class="TicketPrice">{{ ticket.price }}</p>
            <p>{{ ticket.viewers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
    };
  },
  computed: {
    okinawaTickets() {
      return this.tickets.filter(ticket => [1, 2, 3].includes(ticket.id));
    },
    osakaTickets() {
      return this.tickets.filter(ticket => [4, 5, 6].includes(ticket.id));
    },
    koreaTickets() {
      return this.tickets.filter(ticket => [7, 8, 9].includes(ticket.id));
    },
    thailandTickets() {
      return this.tickets.filter(ticket => [10, 11, 12].includes(ticket.id));
    },
    vietnamTickets() {
      return this.tickets.filter(ticket => [13, 14, 15].includes(ticket.id));
    }
  },
  mounted() {
    this.loadJsonData();
  },
  methods: {
    loadJsonData() {
      fetch(`${import.meta.env.BASE_URL}json/tickets.json`)
        .then(response => response.json())
        .then(data => {
          this.tickets = data.tickets;
        })
        .catch(error => {
          console.error('Error loading JSON data:', error);
        });
    },
    goToDetail(id){
      this.$router.push({ name: 'TicketInner', params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.Ticket_Section {
  padding: 100px;
  h2{
    margin-top: 100px;
    margin-bottom: 80px;
    text-align: center;
    color: $secondColor-2;
  }
  .Area_TicketTitle{
    padding: 30px 0px;
    color: $secondColor-2;
  }
}

.TicketCard_Wrapper {
  display: flex;
  flex-wrap: wrap;
  .ticket_Card {
    padding: 20px;
    .ticket-img img { 
    width: 90%;
    border-radius: 80px;
    box-shadow: 0 4px 12px rgba(0,0,0,.5);
    cursor: pointer;
    transform: translate(0, -10%);
    transition: scale .5s ease-in-out;
    &:hover{
        scale: 1.05;
        transition: scale .5s ease-in-out;
    }
  }
    .Ticket_Txt {
      padding: 10px 20px;
      color: $gray;
      cursor: pointer;
      .TicketPrice{
        color: $secondColor-2;
      }
      &:hover {
        color: $secondColor-2;
      }
    }
  }
}


</style>