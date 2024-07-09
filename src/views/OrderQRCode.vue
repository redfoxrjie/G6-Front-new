<template>
    <h3>您的訂購資訊</h3>
    <div class="contain">
        <div>
            <h5>訂購編號： {{ order.o_id }}</h5>
            <h5>訂購人： {{ order.o_name }}</h5>
            <h5>票券名稱： {{ order.t_name }}</h5>
            <h5>票券數量： {{ order.o_count }}</h5>
            <h5>票券總金額： {{ order.o_price }}</h5>
            <h5>訂購日期： {{ order.o_date }}</h5>
            <h5>付款狀態： {{ orderStatus }}</h5>
            <h5>票券是否有效：{{ ticketStatus }}</h5>
            <button class="btn-1" :disabled="!isPaymentCompleted">驗票</button>
        </div>
        <div class="btn_1">
            <img :src="order.tq_url" alt="tq_url" ref="ticketImage" />
            <button @click="download">點我下載</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'OrderQRCode',
    data() {
        return {
            order: {}
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        ticketStatus() {
            console.log(this.order.tq_status)
            if (this.order && this.order.tq_status !== undefined) {
                return this.order.tq_status === '1' ? '有效' : '無效';
            }
            return '';
        },
        orderStatus() {
            if (this.order && this.order.o_status !== undefined) {
                return this.order.o_status === '1' ? '已付款' : '未付款';
            }
            return '';
        },
        isPaymentCompleted() {
            return this.order && this.order.o_status === '1';
        }
    },
    mounted() {
        this.loadJsonData();
    },
    created() {
        this.loadJsonData();
    },
    methods: {
        async loadJsonData(){
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/getOrderticket.php`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    
                    body: JSON.stringify({ 
                        o_id: this.id                   
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                this.order = responseData.order[0];
                console.log('Response:', responseData);
                // 將後端返回的票券資料存入 order 中

            } catch (error) {
                console.error('Error:', error);
                
            }
        },
        download() { //下載QRCode
            const imageElement = this.$refs.ticketImage; //取img元素
            const imageUrl = imageElement.src; //取img元素的src屬性 即url
            const link = document.createElement('a'); //用於觸發下載操作
            link.href = imageUrl; //設置a元素的href屬性為url
            link.download = 'Ticket_QR.jpg' //設置a元素的download屬性 指定下載文件名
            link.click();
        },
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

h3{
    margin: 5% 3%;
    margin-top: 15%;
}
.contain{
    display: flex;
    margin-left: 1%;
    gap: 3%;
}
.contain h5{
    margin: 3% 3%;
}
.btn-1{
    margin: 0px 3%;
    margin-top: 5%;
    .btn-1:hover{
        background-color: $accentColor-2;
        color: $secondColor-3;
        }
}
.btn-1:disabled {
    cursor: not-allowed;
    background-color: grey; 
    color: white;
}
.btn_1{
    text-align:center;
}
</style>