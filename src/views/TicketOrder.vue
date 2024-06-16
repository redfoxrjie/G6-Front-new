<template>
  <div class="Order_Info frame">
    <h5 class="accordion">訂購人資料</h5>
    <form @submit.prevent="submitForm">
      <table>
        <tbody class="panel">
          <tr class="Infor_Title">
            <td>名字</td>
            <td><input v-model="formData.name" type="text" required /></td>
            <td>生日</td>
            <td><input v-model="formData.birthdate" type="date" required /></td>
          </tr>
          <tr class="Infor_Title">
            <td>國家地區</td>
            <td><input v-model="formData.country" type="text" required /></td>
            <td>連絡電話</td>
            <td><input v-model="formData.phone" type="tel" required /></td>
          </tr>
          <tr class="Infor_Title">
            <td>Email</td>
            <td><input v-model="formData.email" type="email" required /></td>
          </tr>
        </tbody>
      </table>
      <div class="continue_1">
        <button class="btn-1" type="submit">繼續</button>
        <div class="container">
          <input type="checkbox" id="ticketSplit">
          <label for="ticketSplit">是否分票</label>
        </div>
      </div>
    </form>
  </div>
  <div class="Order_Check frame">
    <h5>確認行程</h5>
    <div class="Check_Card">
      <img src="../assets/images/ticket_01.jpg" alt="">
      <div class="Check_Txt">
        <h5>日本-沖繩</h5>
        <h5>美麗水族館 Okinawa Churaumi Aquariu 電子票券
        <p>2024-05-20起<br>無有效期限</p>
        </h5>
      </div>
    </div>
    <div class="Check_Note">
      <textarea placeholder="特殊需求備註"></textarea>
    </div>
    <button class="btn-1">繼續</button>
  </div>
  <div class="Order_Purchase frame">
    <h5>請確認付款資訊</h5>
    <div class="ECPay">
      <input type="checkbox">
      <label for="">綠界</label>
    </div>
    <div class="Account">
      <input type="checkbox">
      <label for="">轉帳</label>
      <table class="Account_Title">
        <tr class="Account_Price">
          <td>轉出金額</td>
          <td><input type="text"></td>
        </tr>
        <tr class="Account_Number1">
          <td>銀行代碼</td>
          <td><input type="text"></td>
          <td>轉出帳號</td>
          <td><input type="text"></td>
        </tr>
      </table>
    </div>
    <font-awesome-icon :icon="['fas', 'circle-exclamation']" />      
    <p>請注意本平台不會向您收取任何平台交易手續費，<br>但你下單時使用的第三方支付平台可能會向您收取相關手續費，<br>請參考其相關服務政策和規定，並向你所選的交易服務商取得更多資訊。</p>
  </div>
  <div class="Order">
    <div>
      <h4><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 訂單總項目</h4>
      <p>{{ formData.count }}項商品</p>
      <p class="ticket_name">{{ formData.ticketName }}</p>
      <p>支付總金額: TWD {{ formData.totalPrice }}</p>
    </div>    
    <button class="btn-1">立即訂購</button>
  </div>
</template>

<script>
export default {
  name: "TicketOrder",
  data() {
    // console.log("接回來的值");
    // console.log("ticketId:"+ this.$route.query.ticketId);
    // console.log("count:"+  parseInt(this.$route.query.count));
    // console.log("totalPrice:"+ this.$route.query.totalPrice);
    return {
      formData: {
        count: parseInt(this.$route.query.count) || 0,
        ticketName: this.$route.query.ticketName || '',
        totalPrice: parseFloat(this.$route.query.totalPrice) || 0
      },
    };
  }
};

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';
@import '@/assets/styles/components/btn';

.Order_Info{
  margin: 0px 5%;
  margin-top: 200px;
  .Infor_Title td{
    padding: 10px 5px;
  }
  .Infor_Title td input{
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      width: 100%;
      height: 25px;
    }
  .continue_1{
    color:$secondColor-1;
    padding-top: 30px;
    position: relative;
    .container{
      position: absolute;
      left: 20%;
      top: 60%;
    }
  }
}
@media (max-width: 768px) {
  .Infor_Title{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
}
.Order_Check{
  margin: 0px 5%;
  margin-top: 80px;
  .Check_Card{
    display: flex;
    border: 1px solid $secondColor-1;
    img{
      width: 30%;
      object-fit: cover;
    }
    h5{
      padding: 5px 5px;
      font-size: 14px;
    }
    p{
      padding-top: 15px;
      padding-bottom: 5px;
      font-size: 12px;
    }
  }
  .Check_Note{
    textarea{
      width: 80%;
      height: 150px;
      margin: 30px 0px;
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      resize: none;
    }
  }
}
.Order_Purchase{
  margin: 0px 5%;
  margin-top: 80px;
  .ECPay{
    border-top: 1px solid $secondColor-2;
    border-bottom: 1px solid $secondColor-2;
    padding: 10px 0px;
    }
  .Account{
    padding: 10px 0px;
    }
    .Account td input{
      margin: 10px 5px;
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      // width: 100%;
      height: 25px;
    }
  p{
    font-size: 12px;
    line-height: 20px;
  }
}
@media (max-width: 768px) {
  .Account_Title tr{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }
  }
.Order{
  border: 2px solid #9FC3E7; padding:25px 25px;
  background-color: $primaryColor;
  height: auto;
  width: 28%;
  border-radius: 30px;
  color:$secondColor-2;
  margin: 0px 5%;
  margin-top: 200px;
  position: fixed;
  top:0;
  right:0;
  z-index: 10;
  .ticket_name{
    margin: 10% 0px;
  }
  .btn-1{
    margin: 5px 8rem;
    margin-top: 30px;
  }
}
@media (max-width: 768px) {
  .Order{
    width: 70%;
    margin-top: 80px;
    position: static;
    .btn-1{
      margin: auto;
    }
  }
}
  .frame{
      border: 2px solid #9FC3E7; padding:25px 25px;
      background-color: $primaryColor;
      height: auto;
      width: 40%;
      border-radius: 30px;
      color:$secondColor-2;
  }
  @media (max-width: 768px) {
  .frame{
      width: 70%;
  }
  }
  .btn-1:hover{
      background-color: $accentColor-2;
      color: $secondColor-3;
  }
</style>