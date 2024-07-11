<template>
  <div class="Ticket_Section">
    <h2>票券一覽</h2>
    <h3 class="Area_TicketTitle">日本-沖繩</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in tickets.slice(0, 3)" :key="ticket.t_id"
        @click="goToDetail(ticket.t_id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="parseServerImg(ticket.t_image)" :alt="ticket.t_name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.t_name }}</h4>
            <p>{{ ticket.t_title }}</p>
            <p class="TicketPrice">TWD {{ ticket.t_price }}</p>
            <p class="viewers">{{ ticket.t_viewers }} 人氣</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">日本-大阪</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in tickets.slice(3, 6)" :key="ticket.t_id"
        @click="goToDetail(ticket.t_id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="parseServerImg(ticket.t_image)" :alt="ticket.t_name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.t_name }}</h4>
            <p>{{ ticket.t_title }}</p>
            <p class="TicketPrice">TWD {{ ticket.t_price }}</p>
            <p class="viewers">{{ ticket.t_viewers }} 人氣</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">泰國-曼谷</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in tickets.slice(6, 9)" :key="ticket.t_id"
        @click="goToDetail(ticket.t_id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="parseServerImg(ticket.t_image)" :alt="ticket.t_name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.t_name }}</h4>
            <p>{{ ticket.t_title }}</p>
            <p class="TicketPrice">TWD {{ ticket.t_price }}</p>
            <p class="viewers">{{ ticket.t_viewers }} 人氣</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">韓國-首爾</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in tickets.slice(9, 12)" :key="ticket.t_id"
        @click="goToDetail(ticket.t_id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="parseServerImg(ticket.t_image)" :alt="ticket.t_name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.t_name }}</h4>
            <p>{{ ticket.t_title }}</p>
            <p class="TicketPrice">TWD {{ ticket.t_price }}</p>
            <p class="viewers">{{ ticket.t_viewers }} 人氣</p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="Area_TicketTitle">港澳</h3>
    <div class="TicketCard_Wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <div class="Card_Container col" v-for="ticket in tickets.slice(12, 15)" :key="ticket.t_id"
        @click="goToDetail(ticket.t_id)">
        <div class="ticket_Card">
          <div class="ticket-img">
            <img :src="parseServerImg(ticket.t_image)" :alt="ticket.t_name" />
          </div>
          <div class="Ticket_Txt">
            <h4>{{ ticket.t_name }}</h4>
            <p>{{ ticket.t_title }}</p>
            <p class="TicketPrice">TWD {{ ticket.t_price }}</p>
            <p class="viewers">{{ ticket.t_viewers }} 人氣</p>
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

  },
  mounted() {
    this.loadJsonData();
  },
  methods: {
    async loadJsonData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getTickets.php`, { //使用fetch 發送請求
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' //設置headers 指定請求內容為json檔
          },
          // 放有需要傳遞的資料
          body: JSON.stringify({ //將 JavaScript 對象 { t_id: t_id } 轉換為JSON字符串，並將其作為請求的body發送。
            // 可以放你要傳遞的資料的物件
            t_id: this.id
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response:', responseData);
        // 將後端返回的票券資料存入 tickets 中
        this.tickets = responseData.tickets;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    goToDetail(id) {
      this.$router.push({ name: 'TicketInner', params: { id } }); //跳頁設置
    },
    parseImg(imgURL) {
      // 將相對路徑解析成正確的 URL
      return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
    },
    parseServerImg(imgURL) {
      // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
      return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';


.Ticket_Section {
  padding: 100px;

  h2 {
    margin: 50px 0px;
    text-align: center;
    color: $secondColor-2;
  }

  .Area_TicketTitle {
    padding: 30px 0px;
    color: $secondColor-2;
  }
}

@media (max-width: 768px) {
  .Ticket_Section {
    padding: 5% 0px;

    h3 {
      margin: 0px 5%;
    }
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, .5);
      cursor: pointer;
      transform: translate(0, -10%);
      transition: scale .5s ease-in-out;

      &:hover {
        scale: 1.05;
        transition: scale .5s ease-in-out;
      }
    }

    .Ticket_Txt {
      padding: 10px 20px;
      color: $gray;
      cursor: pointer;

      .TicketPrice {
        color: $secondColor-2;
        margin: 2% 0px;
      }

      &:hover {
        color: $secondColor-2;
      }

      .viewers {
        font-size: 12px;
      }
    }
  }
}
</style>