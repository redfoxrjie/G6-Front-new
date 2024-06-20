<template>
  <div>
    <div class="frame_change">
      <div class="Ordertest1">
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
                <input type="checkbox" id="ticketSplit" @change="showSplit">
                <label for="ticketSplit">是否分票</label>
              </div>
            </div>
          </form>
        </div>
        <div class="Order_Check frame">
          <h5>確認行程</h5>
          <div class="Check_Card">
            <img :src="parseServerImg(formData.ticketImage)" :alt="formData.ticketName" />
            <div class="Check_Txt">
              {{ formData.ticketName }}
              <p>{{ todayDate }}<br>無有效期限</p>
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
              </tr>
              <tr class="Account_Number1">
                <td>轉出帳號</td>
                <td><input type="text"></td>
              </tr>
            </table>
          </div>
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />      
          <p>請注意本平台不會向您收取任何平台交易手續費，<br>但你下單時使用的第三方支付平台可能會向您收取相關手續費，<br>請參考其相關服務政策和規定，並向你所選的交易服務商取得更多資訊。</p>
        </div>
      </div>
      <div class="Ordertest2">
        <div class="Order">
          <div>
            <h4><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 訂單總項目</h4>
            <p>{{ formData.count }}項商品</p>
            <p class="ticket_name">{{ formData.ticketName }}</p>
            <p>支付總金額: TWD {{ formData.totalPrice }}</p>
          </div>    
          <button class="btn-1" @click="orderFinish">立即訂購</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

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
        ticketImage: this.$route.query.ticketImage || '',
        totalPrice: parseFloat(this.$route.query.totalPrice) || 0
      },
      todayDate: ''
    };
  },
  methods:{
    getTodayDate(){
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth()+1).padStart(2,'0');
      const day = String(today.getDate()).padStart(2,'0');
      return `${year}-${month}-${day}`;
    },
    orderFinish(){
      this.showSuccessAlert();
    },
    showSuccessAlert(){
      Swal.fire({
        title: '已完成訂單',
        text: '請到gmail信箱領取您的QRcode票券',
        icon: 'success',
        iconColor: '#4F82D4',
        confirmButtonText: '確定',
        confirmButtonColor: '#4F82D4'
      })
    },
    showSplit(e){
      if(e.target.checked){
        Swal.fire({
          title: '受票者資訊',
          html:`
          <input type="text" id="name" class="swal_input" placeholder="請輸入姓名">
          <input type="email" id="email" class="swal_input" placeholder="請輸入電子信箱">`,
          width: 450,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: '確認',
          confirmButtonColor: '#FFC800',
          cancelButtonColor: '#888',
          cancelButtonText: '取消',
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value;
            const email = Swal.getPopup().querySelector('#email').value;
            if (!name || !email) {
              Swal.showValidationMessage('Please fill out all fields');
            }
            return { name, email };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('User details:', result.value);
            Swal.fire('Submitted!', 'Your details have been submitted.', 'success');
          } else {
            e.target.checked = false; // Uncheck the checkbox if user cancels
          }
        });
      }
    },
    parseImg(imgURL) {
      // 將相對路徑解析成正確的 URL
      return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
    },
    parseServerImg(imgURL) {
          // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
                return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
    }
  },
  mounted(){
    this.todayDate = this.getTodayDate();
  }
};

</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';
@import '@/assets/styles/components/btn';

.frame_change{
  display: flex;
  gap: 5%;
}
@media (max-width: 768px) {
  .frame_change{
    display: block;
  }
}
.Ordertest1{
  // border: 1px solid red;
  box-sizing: border-box;
  flex: 3;
}
.Ordertest2{
  // border: 1px solid #000;
  flex: 2;
  box-sizing: border-box;

}
.Order_Info{
  margin-top: 150px;
  .Infor_Title td{
    padding: 10px 4px;
  }
  .Infor_Title td input{
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      // width: 100%;
      height: 25px;
      padding: 0px 10px;
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
  margin-top: 80px;
  h5{
    margin-bottom: 1%;
  }
  .Check_Card{
    display: flex;
    // border: 1px solid $secondColor-1;
    .Check_Txt{
      padding: 5px 25px;
    }
    img{
      width: 30%;
      object-fit: cover;
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
      padding: 10px;
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      resize: none;
    }
  }
}
.Order_Purchase{
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
      padding: 0px 10px;
      border: 1px solid $secondColor-2;
      border-radius: 10px;
      width: 100%;
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
  display: flex;
  flex-direction: column;
  border: 2px solid #9FC3E7; 
  padding: 25px 25px;
  background-color: $primaryColor;
  height: auto;
  border-radius: 30px;
  color:$secondColor-2;
  position: sticky ;
  box-sizing: border-box;
  top:150px;
  margin-right: 20%;
  .btn-1{
    margin: 0px 30%;
    margin-top: 15%;
  }
  .ticket_name{
    margin: 10% 0px;
  }
}
@media (max-width: 768px) {
  .Order{
    width: 70%;
    margin-top: 80px;
    position: static;
  }
}
  .frame{
      border: 2px solid #9FC3E7; 
      padding:25px 25px;
      background-color: $primaryColor;
      height: auto;
      margin-left: 5%;
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