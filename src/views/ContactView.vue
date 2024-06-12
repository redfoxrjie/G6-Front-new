<template>
    <h3>聯絡我們</h3>
    <section>
        <div class="contactus_pic">
            <img class="head" src="../assets/images/contactusDog_01.png" alt="">
            <img class="leftHand" src="../assets/images/contactusDog_03.png" alt="">
            <img class="rightHand" src="../assets/images/contactusDog_02.png" alt="">
        </div>

        <table class="container">
            <tbody id="contactus">
                <tr class="form_group form_name">  
                    <td>姓名</td>
                    <td><input type="text" id="name"></td>
                </tr>
                <tr class="form_group">
                    <td>聯絡電話</td>
                    <td><input type="tel" id="tel"></td>
                </tr>
                <tr class="form_group">
                    <td>e-mail</td>
                    <td><input for="email" id="email"></td>
                </tr>
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
            </tbody>
        </table>
        <div class="btn">
            <button class="btn-1">確認送出</button>
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
        @media (max-width: 768px) {
            .head{
                width: 50%;
                left: 25%;
            }
            .leftHand{
                width: 20%;
                position: absolute;
                left: 25%;
                z-index: 5;
            }
            .rightHand{
                width: 20%;
                position: absolute;
                left: 55%;
                bottom: -40px;
                z-index: 5;
            }
        }
    }

    .container{
        // outline: 1px solid red;
        display: flex;
        justify-content: center;
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
            .form_group{
                padding: 0px 80px;
                padding-top: 50px;
                color:$secondColor-2;
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
                // padding: 0px 20px;
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
        }
    }
    .btn{
        text-align: center;
        margin: 20px 0px;
    }
</style>
    