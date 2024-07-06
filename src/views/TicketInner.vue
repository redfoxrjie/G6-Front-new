<template>
    <div>
        <div class="frame_change">
            <div class="Ordertest1">
                <div class="Ticket_pic">
                    <img :src="parseServerImg(tickets.t_image)" :alt="tickets.t_name" />
                    <div class="Ticket_pic_txt">
                        <h4 class="Title_2" v-for="(feature, index) in [tickets.t_feature1, tickets.t_feature2, tickets.t_feature3]" :key="index"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> {{ feature }}</h4>
                    </div>
                </div>
                <div class="Ticket_txt Title">
                    <h4 class="Title_2 Title_color">景點介紹</h4>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> {{ tickets.t_spot }}</h5>
                    <p v-html="tickets.t_content"></p>
                </div>
                <div class="Purchase Title">
                    <h4 class="Title_2 Title_color">票券說明</h4>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 未滿 6 歲的孩童可免費入場，敬請知悉。</h5>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 【有關訂購後未使用票券之取消】<br>恕無法進行訂單中的票券取消作業敬請知悉。</h5>
                </div>
                <div class="Use Title">
                    <h4 class="Title_2 Title_color">使用說明</h4>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 請直接至入口處出示附有「QR CODE」的電子憑證。</h5>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> 第一次使用後 1 天之內有效，逾期無效</h5>
                </div>
            </div>
            <div class="Ordertest2">
                <div class="Order Title">
                    <h4>{{ tickets.t_name }}</h4>
                    <div class="Order_Count">
                        <h5 class="Title_2">選擇數量</h5>
                        <div class="Count_1">
                            <p>TWD {{ tickets.t_price }} / 每人</p>
                            <button @click ="minus"><font-awesome-icon :icon="['fas', 'minus']" /></button>
                            <input type="number" v-model.number="ticketNum.count">
                            <button @click ="plus"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                        </div>
                        <div class="Count_2">
                            <h4>總金額</h4>
                            <h4 class="totalPrice_color">TWD {{ totalPrice }}</h4>
                        </div>
                        <button class="btn-1" type="button" @click = "goToOrderPage(tickets)">立即訂購</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'TicketInner',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tickets:{
                t_id: '',
                t_name: '',
                t_feature1:'',
                t_feature2:'',
                t_feature3:'',
                t_spot: '',
                t_content: '',
                t_image: '',
                t_price: 0,
                count:1
            },
            ticketNum:{
                count:1
            }
        };
    },
    mounted() {
        this.loadJsonData();
    },
    computed: {
        totalPrice(){
            return this.tickets.t_price * this.ticketNum.count;
        }
    },
    methods: {
        async loadJsonData(){
            try {
                const response = await fetch('http://localhost/phpG6/front/getTicketInner.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // 如果有需要傳遞的資料，可以透過 body 屬性傳遞
                    body: JSON.stringify({
                        // 可以放你要傳遞的資料的物件
                        // t_id: this.$route.params.id //方式一
                        t_id: this.id //方式二較快且簡潔
                    })
                });

                // const data = await response.json();
                // console.log('Ticket Data:'+ data);

                const responseData = await response.json();
                console.log('Response:', responseData);
                // 將後端返回的票券資料存入 tickets 中
                this.tickets = responseData.tickets[0];
            } catch (error) {
                console.error('Error:', error);
            }

        },
        plus(){
            if (this.ticketNum.count < 10)
            this.ticketNum.count += 1;
        },
        minus(){
            if (this.ticketNum.count > 1) {
                this.ticketNum.count -= 1;
            }
        },
        goToOrderPage(tickets){
            this.$router.push({ //導航至新頁面
                name: 'TicketOrder', //目標頁面
                query: {
                    id: tickets.t_id,
                    name: tickets.t_name,
                    image: tickets.t_image,
                    totalPrice: this.totalPrice,
                    count: this.ticketNum.count
                }
            });
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
    @import '@/assets/styles/components/btn';
    
    .frame_change{
        display: flex;
    }
    @media (max-width: 768px) {
        .frame_change{
            display: block;
        }
    }
    .Ordertest2{
        // border: 1px solid #000;
        flex: 2;
        box-sizing: border-box;
    }
    .Ordertest1{
        // border: 1px solid red;
        box-sizing: border-box;
        flex: 3;
    }
    .Ticket_pic img{
        margin-top: 5%;
        width: 85%;
        }
    @media (max-width: 768px) {
        .Ticket_pic img{
            width: 100%;
        }
    }
    .Ticket_pic_txt{
        margin-top: 50px;
        margin-left: 5%;
        h4{
            padding: 10px 0px;
        }
    }
    .Ticket_txt{
        line-height: 30px;
    }
    .Title{
        margin-left: 5%;
        margin-top: 5%;
    }
    .Title_2{
        padding-bottom: 20px;
        
    }
    .Order{
        color:#4F82D4;
        position: sticky;
        top: 120px;
        box-sizing: border-box;
        h4{
            margin: 30px 2%;
        }
    @media (max-width: 768px) {
        .Order {
            position: static;
            margin-left: 0px;
        }
    }

    .Order_Count{
        display: flex;
        flex-direction: column;
        border: 2px solid #9FC3E7; 
        padding: 25px 25px;
        margin-right: 20%;
        background-color: $primaryColor;
        height: auto;
        border-radius: 30px;
        h5{
            font-size: 12px;
        };
        .Count_1{
            display: flex;
            padding: 10px 0px;
            input{
                width: 10%;
                height: auto;
                text-align: center;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }        
            }
            button{
                color:$secondColor-2;
                cursor: pointer;
                &:hover{
                    color:$accentColor-2;
                }
            }
        };
        .Count_2{
            display: flex;
            gap: 10%;
            .totalPrice_color{
                color: $secondColor-2;
                // background-color: $accentColor-2;
            }
        };
        .btn-1{
            margin: 0px 30%;
        }
        .btn-1:hover{
            background-color: $accentColor-2;
            color: $secondColor-3;
        }
    };
    }
    .Title_color{
        color: $secondColor-2;
    }
</style>