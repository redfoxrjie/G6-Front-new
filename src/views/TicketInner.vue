me<template>
    <div>
        <div class="frame_change">
            <div class="Ordertest1">
                <div class="Ticket_pic">
                    <img :src="ticket.image" :alt="ticket.name" />
                    <div class="Ticket_pic_txt">
                        <h4 class="Title_2" v-for="feature in ticket.features" :key="feature"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> {{ feature }}</h4>
                    </div>
                </div>
                <div class="Ticket_txt Title">
                    <h4 class="Title_2 Title_color">景點介紹</h4>
                    <h5 class="Title_2"><font-awesome-icon :icon="['fas', 'paw']" style="color: #FFD43B;" /> {{ ticket.spot }}</h5>
                    <p v-html="ticket.content"></p>
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
                    <h4>{{ ticket.name }}</h4>
                    <div class="Order_Count">
                        <h5 class="Title_2">選擇數量</h5>
                        <div class="Count_1">
                            <p>TWD {{ ticket.price }} / 每人</p>
                            <button @click ="minus"><font-awesome-icon :icon="['fas', 'minus']" /></button>
                            <input type="number" v-model.number="ticket.count">
                            <button @click ="plus"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                        </div>
                        <div class="Count_2">
                            <h4>總金額</h4>
                            <h4 class="totalPrice_color">TWD {{ totalPrice }}</h4>
                        </div>
                        <button class="btn-1" type="button" @click = "goToOrderPage">立即訂購</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ticketsData from '../../public/json/ticketinner.json';
export default {
    name:'TicketInner',
    data() {
        return {
            ticket: {
                id: '',
                name: '',
                features: [],
                spot: '',
                content: '',
                image: '',
                price: 0,
                count: 0
            }
        };
    },
    watch: {
        '$route.params.id': 'fetchTicketData'
        
    },
    mounted() {
        this.fetchTicketData();
        },
    computed: {
        totalPrice(){
            return this.ticket.price * this.ticket.count;
        }
    },
    methods: {
        fetchTicketData() {
            const id = this.$route.params.id;
            const ticket = ticketsData.ticketinner.find(ticket => ticket.id === Number(id));
            if (ticket) {
                this.ticket = {
                ...ticket,
                features: [ticket.feature1, ticket.feature2, ticket.feature3],
                price:parseFloat(ticket.price),
                count: 0
            };
            } else {
            console.error(`Ticket with id ${id} not found.`);
            // 可以处理未找到票券的情况，例如跳转到错误页面或其他处理
            }
        },
        plus(){
            this.ticket.count += 1;
        },
        minus(){
            if (this.ticket.count > 0) {
                this.ticket.count -= 1;
            }
        },
        goToOrderPage(){
            // console.log("傳出去的值");
            // console.log("ticketId:"+ this.ticket.id);
            // console.log("count:"+ this.ticket.count);
            // console.log("totalPrice:"+ this.totalPrice);
            this.$router.push({
                name:'TicketOrder',
                query:{
                    ticketImage: this.ticket.image,
                    ticketName: this.ticket.name,
                    count: this.ticket.count,
                    totalPrice: this.totalPrice
                }
            });
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
        width: 70%;
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
            margin: 30px 0px;
            text-align: center;
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
            gap: 20%;
            .totalPrice_color{
                color: $secondColor-3;
                background-color: $accentColor-2;
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