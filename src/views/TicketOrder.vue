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
                  <td><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />名字</td>
                  <td><input v-model="formData.name" type="text" required /></td>
                  <td><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />生日</td>
                  <td><input v-model="formData.birthdate" type="date" required /></td>
                </tr>
                <tr class="Infor_Title">
                  <td><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />國家地區</td>
                  <td><input v-model="formData.country" type="text" required /></td>
                  <td><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />連絡電話</td>
                  <td><input v-model="formData.phone" type="tel" required /></td>
                </tr>
                <tr class="Infor_Title">
                  <td><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />Email</td>
                  <td><input v-model="formData.email" type="email" required /></td>
                </tr>
              </tbody>
            </table>
            <div class="continue_1">
              <button class="btn-1" type="submit">繼續</button>
              <div class="container">
              </div>
            </div>
          </form>
        </div>
        <div class="Order_Check frame">
          <h5>確認行程</h5>
          <div class="Check_Card">
            <img :src="parseServerImg(ticket.image)" :alt="ticket.image" />
            <div class="Check_Txt">
              {{ ticket.name }}
              <p>{{ todayDate }}<br>無有效期限</p>
            </div>
          </div>
          <div class="Check_Note">
            <textarea placeholder="特殊需求備註" id = "remark"></textarea>
          </div>
        </div>
        <div class="Order_Purchase frame" ref="accountSection" >
          <h5><font-awesome-icon :icon="['fas', 'star']" style="color: #FFD43B;" />請確認付款資訊</h5>
          <!-- <div class="ECPay">
            <input type="checkbox" v-model="formData.ecpay" @change="handleChange('ecpay')">
            <label>綠界</label>
          </div> -->
          <div class="Account">
            <input type="checkbox" v-model="formData.transfer" @change="handleChange('transfer')">
            <label>轉帳</label>
            <table class="Account_Title">
              <tr class="Account_Price">
                <td>轉出金額</td>
                <td><input type="text" v-model="formData.transferAmount"></td>
              </tr>
              <tr class="Account_Number1">
                <td>銀行代碼</td>
                <td><input type="text" v-model="formData.bankCode" @input="isAccountNB1Valid"></td>
              </tr>
              <tr class="Account_Number1">
                <td>轉出帳號</td>
                <td><input type="text" v-model="formData.accountNumber" @input="isAccountNB2Valid"></td>
              </tr>
            </table>
          </div>
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />      
          <p>請注意本平台不會向您收取任何平台交易手續費，<br>但您下單時使用的第三方支付平台可能會向您收取相關手續費，<br>請參考其相關服務政策和規定，並向您所選的交易服務商取得更多資訊。</p>
        </div>
      </div>
      <div class="Ordertest2">
        <div class="Order">
          <div>
            <h4><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 訂單總項目</h4>
            <p>{{ ticket.count }}項商品</p>
            <p class="ticket_name">{{ ticket.name }}</p>
            <p>支付總金額: TWD {{ ticket.totalPrice }}</p>
          </div>    
          <button class="btn-1" @click="orderFinish">立即訂購</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { useUserStore } from '@/stores/userStore';

export default {
  name: "TicketOrder",
  data() {
    return {
      formData: {
        name: '',
        birthdate: '',
        country: '',
        phone: '',
        email: '',
        ecpay: false,
        transfer: false,
        transferAmount: '',
        bankCode: '',
        accountNumber: '',
      },
      ticket: {
        id: '',
        name: '',
        image:'',
        totalPrice: 0,
        count :0
      },
      todayDate: '',
    };
    
  },
  created() { //在組件創建時，從 URL 的 query 參數中獲取票券資訊並初始化 ticket 對象
    this.ticket.id = this.$route.query.id;
    this.ticket.name = this.$route.query.name;
    this.ticket.image = this.$route.query.image;
    this.ticket.totalPrice = this.$route.query.totalPrice;
    this.ticket.count = this.$route.query.count;
    this.formData.transferAmount = this.$route.query.totalPrice;
  },
  computed: {
    isFormValid() { //確認框一是否都有填寫
      return this.formData.name !== '' &&
        this.formData.birthdate !== '' &&
        this.formData.country !== '' &&
        this.formData.phone !== '' &&
        this.formData.email !== '';
    },
    isOrderValid() { //確認框一框二填寫
      const isTransferValid = this.formData.transfer ? (
      this.formData.transferAmount !== '' &&
      this.formData.bankCode.length === 3 &&
      this.formData.accountNumber !== '' 
    ): true;
      
      return this.isFormValid && (this.formData.ecpay || (this.formData.transfer && isTransferValid));     
    },
    // ...mapStores(useUserStore)
  },
  methods:{
    async saveTicketOrder(){
      const userStore = useUserStore();

      let payment; //付款方式0 or 1
      if(this.formData.ecpay){
        payment = 0;
      }else if(this.formData.transfer){
        payment = 1;
      }
      
      const remark = document.getElementById('remark');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/saveTicketOrder.php`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              // 放要傳遞的資料的物件
              u_id: userStore.userInfo.u_id,
              t_id: this.ticket.id,
              t_name: this.ticket.name,
              o_name: this.formData.name,
              o_count: this.ticket.count,
              o_price: this.ticket.totalPrice,
              o_payment: payment,
              o_remarks: remark.value
          })
          
        });
        const data = await response.json();
        if (data.tq_url) {
          this.ticketInfo = { tq_url: data.tq_url }; //將data.tq_url值放入this.ticketInfo
          const url = this.ticketInfo.tq_url;
          this.showSuccessAlert(url); //tq_url存在且ticketInfo被正確設置\才調用showSuccessAlert
          console.log(url);
        } else {
          console.error('Error:', data.error);
        }

      } catch (error) {
          console.error('Error:', error);
      }
    },
    handleChange(option){ //控制付款選項單選
      if(option === 'ecpay' && this.formData.ecpay){
        this.formData.transfer = false;
      }else if(option === 'transfer' && this.formData.transfer){
        this.formData.ecpay = false;
      } 
    },
    isAccountNB1Valid(e){
      let value = e.target.value; 
      value = value.replace(/\D/g, ''); //移除所有非數字字符
      if(value>3){
        value = value.slice(0,3);
      }
      this.formData.bankCode = value;
    },
    isAccountNB2Valid(e){
      let value = e.target.value; 
      value = value.replace(/\D/g, '');
      if(value>14){
        value = value.slice(0,14);
      }
      this.formData.accountNumber = value;
    },
    getTodayDate(){ //抓訂購當天日期
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth()+1).padStart(2,'0');
      const day = String(today.getDate()).padStart(2,'0');
      return `${year}-${month}-${day}`;
    },
    orderFinish(event){ //條件完全符合or不符合
      event.preventDefault(); // 阻止按钮的默认提交行为
      try{
        if (this.isOrderValid){
          this.saveTicketOrder(); //等待訂單保存完成
          this.resetForm();
        }else{
          this.showErrorAlert();
        }
      } catch (error) {
          console.error('Error finishing order:', error);
      }
    },
    showSuccessAlert(url) {
      Swal.fire({
        title: '已完成訂單',
        // html: `<p>請掃此QRCode取得訂單資訊及下載：</p><img src='${url}'alt="tq_url" />`,
        icon: 'success',
        iconColor: '#4F82D4',
        confirmButtonText: '確定',
        confirmButtonColor: '#4F82D4'
      }).then(() => {
        this.$router.push({ //導航至新頁面
          name: 'OrderQRCode', //目標頁面
        });
      });
    },
    showErrorAlert(){ //失敗彈窗
      Swal.fire({
        title: '尚未填寫完成無法訂購',
        text: '請完整填寫所有必填項目',
        icon: 'warning',
        confirmButtonText: '確定',
      })
    },
    resetForm(){ //提交後重置
      this.formData.name = '',
      this.formData.birthdate = '',
      this.formData.country = '',
      this.formData.phone = '',
      this.formData.email = '',
      this.formData.ecpay = false,
      this.formData.transfer = false,
      this.formData.transferAmount = '',
      this.formData.bankCode = '',
      this.formData.accountNumber = ''
    },
    // populateFormData() {
    //   const user = this.userStore.user;
    //   this.formData.name = user.name;
    //   this.formData.birthdate = user.birthdate;
    //   this.formData.country = user.country;
    //   this.formData.phone = user.phone;
    //   this.formData.email = user.email;
    // },
    parseImg(imgURL) {
      // 將相對路徑解析成正確的 URL
      return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
    },
    parseServerImg(imgURL) {
          // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
                return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
    },
    submitForm() {
      if (this.isFormValid) {
        this.scrollnext(); 
      } else {
        alert('請填入完整資訊');
      }
    },
    scrollnext(){
      // 使用$refs 獲取accountSection元素，進行scroll
      this.$refs.accountSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  mounted(){
    this.todayDate = this.getTodayDate();
    // this.populateFormData();
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