<template>
    <!-- <main>目前位在「票券訂購」</main> -->
    <!-- 上方導覽列用共用元件? -->
    <h3>聯絡我們</h3>
    <section>
        <div class="contactus_pic">
            <img class="head" src="../assets/images/contactusDog_01.png" alt="">
            <img class="leftHand" src="../assets/images/contactusDog_03.png" alt="">
            <img class="rightHand" src="../assets/images/contactusDog_02.png" alt="">
        </div>
        <div class="container">
            <form id="contactus">
            <div class="form_group form_name">  
                <label for="name">姓名</label>
                <input type="text" id="name">
            </div>
            <div class="form_group">
                <label for="tel">聯絡電話</label>
                <input type="tel" id="tel">
            </div>
            <div class="form_group">
                <label for="email">e-mail</label>
                <input for="email" id="email">
            </div>
            <div class="form_group form_choice">
                <p>想詢問項目</p>
                {{ checkbox }}<br />
                <label >
                <input type="checkbox" value="0" v-model="checkbox" />介面操作
                <!-- <span class="coverStyle"></span> -->
                </label>
                <label >
                <input type="checkbox" value="1" v-model="checkbox" />已購入票券
                </label>
                <label >
                <input type="checkbox" value="2" v-model="checkbox" />其他
                </label>
            </div>
            <div class="form_group">
                <label for="message"></label>
                <textarea id="message" placeholder="想詢問什麼呢"></textarea>
            </div>
            </form>
        </div>
        <div class="btn">
            <button>確認送出</button>
        </div>
    </section>
  </template>
    
  <script>
    export default{
        data(){
        return{
            name:'',
            text:'',
            checkbox:[]
        };
    },
    };
  </script>
    
  <style lang="scss" scoped>
    @import '@/assets/styles/base/color';
    @import '@/assets/styles/base/font';    
    h3{
        text-align: center;
        margin: 180px 0px;
        color:$secondColor-2;
    }
    .contactus_pic{
        position: relative;
    }
    .head{
        width: 20%;
        position: absolute;
        left: 40%;
        bottom: 0%;
    }
    .leftHand{
        width: 8%;
        position: absolute;
        left: 40%;
        bottom: -40px;
        z-index: 5;
    }
    .rightHand{
        width: 8%;
        position: absolute;
        left: 52%;
        bottom: -40px;
        z-index: 5;
    }
    .container{
        // outline: 1px solid red;
        display: flex;
        justify-content: center;
    }
    #contactus{
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: auto;
        width: 450px;
        // outline: 1px solid red;
        border-radius: 30px;
        background-color: #E2F1FF;
        position: relative;
    }
  // input[type="checkbox"]{
  //   display: none;
  // }
  // .coverStyle{
  //   display: inline-block;
  //   width: 15px;
  //   height: 15px;
  //   border: 1px solid;
  //   background-color: white;
  //   border-radius: 200px;
  //   margin-right: 10px;
  //   vertical-align: middle;
  // }
  // input[type="checkbox"]:checked + .coverStyle::after {
  //   content: '\2714';
  //   font-size: 12px; /* 调整字体大小以适应容器 */
  //   color: #727272;
  //   text-align: center;
  //   line-height: 15px; /* 匹配容器高度 */
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
    .form_group{
        padding: 0px 80px;
        padding-top: 50px;
    }
    .form_name{
        padding-top: 100px;
    }
    .form_choice p{
        color:$secondColor-2;
        padding-bottom: 10px;
    }
    .form_group label{
        color: $secondColor-2;
        padding-right: 5px;
    }
    .form_group input{
        border: 1px solid $secondColor-1;
        width: auto;
        height: 20px;
        border-radius: 5px;
    }
    .form_group textarea{
        padding: 10px;
        margin-bottom: 50px;
        height: 200px;
        width: 100%;
        // box-sizing: border-box;
        border: 1px solid $secondColor-1;
        border-radius: 5px;
        resize: none;
    }
    .btn{
        text-align: center;
        margin: 20px 0px;
    }
  </style>
    