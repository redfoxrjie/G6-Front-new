<template>
    <h3>聯絡我們</h3>
    <section>
        <div class="contactus_pic">
            <img class="head" src="../assets/images/contactusDog_01.png" alt="">
            <img class="leftHand" src="../assets/images/contactusDog_03.png" alt="">
            <img class="rightHand" src="../assets/images/contactusDog_02.png" alt="">
        </div>
        <div id="contactus">
            <div class="form_frame">
                <form @submit.prevent="contactFinish">
                    <table>
                        <tbody>
                            <tr class="form_group form_name">  
                                <td><input type="text" id="name" v-model="formData.name" placeholder="請輸入姓名" required></td>
                            </tr>
                            <tr class="form_group form_phone">
                                <td><input type="tel" id="tel" v-model="formData.tel" placeholder="請輸入電話" required></td>
                            </tr>
                            <tr class="form_group form_email">
                                <td><input type="email" id="email" v-model="formData.email" placeholder="請輸入e-mail" required></td>
                            </tr>
                        </tbody>
                        <div class="form_group form_choice">
                            <p>想詢問項目</p>
                            {{ checkbox }}<br />
                            <label >
                            <input type="checkbox" v-model="formData.aboutIF" @change="handleChange('aboutIF')" >介面操作
                            </label>
                            <label >
                            <input type="checkbox" v-model="formData.aboutTK" @change="handleChange('aboutTK')" >已購入票券
                            </label>
                            <label >
                            <input type="checkbox" v-model="formData.aboutOT" @change="handleChange('aboutOT')" >其他
                            </label>
                        </div>
                        <div class="form_group">
                            <label for="message"></label>
                            <textarea id="message" v-model="formData.message" placeholder="想詢問什麼呢" required></textarea>
                        </div>
                        <div class="btn">
                            <button type="submit" class="btn-1">確認送出</button>
                        </div>
                    </table>
                </form> 
            </div>
            
        </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2';
// import axios from 'axios';
export default {
    data() {
        return {
            formData: {
                id: '',
                name: '',
                tel: '',
                email: '',
                message: '',
                aboutIF: false,
                aboutTK: false,
                aboutOT: false,
                aboutClass: ''
            }
        }
    },
    methods:{
        async contactFinish(event){
            event.preventDefault(); // 阻止按钮的默认提交行为
            try{
                if (this.isFormValid){
                    await this.saveContact();
                    this.showSuccessAlert();
                    this.resetForm();
                }else{
                    this.showErrorAlert();
                }
            } catch (error) {
                console.error('Error finishing order:', error);
            }
        },
        showSuccessAlert(){
            Swal.fire({
                title: '已送出',
                text: '系統已送出訊息 請耐心等候專人回覆',
                icon: 'success',
                iconColor: '#4F82D4',
                confirmButtonText: '確定',
                confirmButtonColor: '#4F82D4'
            })
        },
        showErrorAlert(){
            Swal.fire({
                title: '尚未填寫完成無法訂購',
                text: '請完整填寫所有必填項目',
                icon: 'warning',
                confirmButtonText: '確定',
            })
        },
        resetForm(){
            this.formData.name = '';
            this.formData.tel = '';
            this.formData.email = '';
            this.formData.message = '';
            this.formData.aboutIF = false;
            this.formData.aboutTK = false;
            this.formData.aboutOT = false;
        },
        async saveContact() {
            
            let aboutClass; //問題分類選項 1.介面操作2.已購入票券3.其他	
            if(this.formData.aboutIF){
                aboutClass = 1;
            }else if(this.formData.aboutTK){
                aboutClass = 2;
            }else if(this.formData.aboutOT){
                aboutClass = 3;
            }

            console.log(this.formData.name);
            console.log(this.formData.tel);
            console.log(this.formData.email);
            console.log(aboutClass);
            console.log(this.formData.message);

            try {             
                const response = await fetch(`${import.meta.env.VITE_API_URL}/saveContact.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // 如果有需要傳遞的資料，可以透過 body 屬性傳遞
                    body: JSON.stringify({
                        // 可以放你要傳遞的資料的物件
                        // u_id: userStore.userInfo.u_id,
                        // cu_id: this.formData.id,
                        cu_name: this.formData.name,
                        cu_phone: this.formData.tel,
                        cu_email: this.formData.email,
                        cu_class: aboutClass,
                        cu_message: this.formData.message,
                        cu_time: this.formData.time
                    })
                });
            } catch (error) {
                console.error('Failed to send email:', error);
                alert('Failed to send email. Please try again later.');
            }
        },
        handleChange(option){
            if(option === 'aboutIF' && this.formData.aboutIF){
                this.formData.aboutTK  = false;
                this.formData.aboutOT = false;
            }else if (option === 'aboutTK' && this.formData.aboutTK){
                this.formData.aboutIF  = false;
                this.formData.aboutOT = false;
            }else{
                this.formData.aboutIF  = false;
                this.formData.aboutTK = false;
            }
        }   
    },
    computed: {
        isFormValid(){
            return this.formData.name !== ''&&
                this.formData.email !== ''&&
                this.formData.message !== '';
        }
    }
}
</script>

    
    
<style lang="scss" scoped>
    @import '@/assets/styles/base/color';
    @import '@/assets/styles/base/font';  
    
    h3{
        text-align: center;
        margin-top: 120px;
        margin-bottom: 230px;
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
        @media (max-width: 996px) {
            .head{
                width: 25%;
                left: 38%;
            }
            .leftHand{
                width: 10%;
                position: absolute;
                left: 38%;
                z-index: 5;
            }
            .rightHand{
                width: 10%;
                position: absolute;
                left: 53%;
                bottom: -40px;
                z-index: 5;
            }
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
    #contactus{
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: auto;
        width: 450px;
        margin: 0 auto;
        // outline: 1px solid red;
        border-radius: 30px;
        background-color: #E2F1FF;
        position: relative;
        .form_frame{
            // border: 1px solid red;
            padding: 20px;
        }
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
        }
        .form_group input{
            border: 1px solid $secondColor-1;
            // width: 100%;
            height: 25px;
            box-sizing: border-box;
            border-radius: 5px;
        }
        .form_group textarea{
            padding: 10px;
            margin-bottom: 30px;
            height: 200px;
            width: 100%;
            // box-sizing: border-box;
            border: 1px solid $secondColor-1;
            border-radius: 5px;
            resize: none;
        }
    }
    .form_frame .form_name input{
        margin-top: 15%;
        margin-left: 20%;
    }
    .form_frame .form_phone input{
        margin: 5% 0px;
        margin-left: 20%;
    }
    .form_frame .form_email input{
        margin-left: 20%;
    }
    .btn{
        text-align: center;
        margin-bottom: 30px;
    }
</style>
    