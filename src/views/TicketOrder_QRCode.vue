<template>
    <div class="title">
        <h3>您訂購的票券資訊</h3>
    </div>
    <div class="content">
        <h4>訂購人{{  }}</h4>
        <h4>訂購票券{{ ticket.name }}</h4>
        <h4>訂購日期{{ ticket.date }}</h4>
        <h4>訂購張數{{ ticket.count }}</h4>
        <h4>訂購總金額{{ ticket.totalPrice }}</h4>
    </div>
</template>

<script>
	function $id(id) {
		return document.getElementById(id);
	}
	function show_QRcode(order_no) {
		$id("QRcode_img").src =  `https://quickchart.io/qr?text=https://tibamef2e.com/sara/get_ticket_order.php?order_no=${order_no}&size=256`
	}
</script>

<script>
    export default {
    data() {
        return {

            },
            ticket: {
            id: '',
            name: '',
            },
        };
    },




</script>


<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';
@import '@/assets/styles/components/btn';

.title{
    margin: 10% 0px;
}

</style>