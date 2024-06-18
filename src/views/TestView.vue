<template>
    <div class="">
        <button @click="filter(1)">*</button>
        <button @click="filter(2)">**</button>
        <button @click="filter(3)">***</button>
        <button @click="filter(4)">****</button>
        <button @click="filter(5)">*****</button>
        <button @click="clear()">clear</button>
        <div v-if="displayList.length === 0">
            Loading...
        </div>
        <div v-else>
        <ProductList 
        v-for="prod in displayList"
        :key = "prod.id"
        :item = "prod"
        />  
        </div>
        
        <!-- <ProductList
        :item = "product[0]"
        /> -->
        <!-- <ProductCard :money="1666666000000" name ="libo"></ProductCard> -->
    </div>
</template>

<script>
import ProductList from '@/components/layout/ProductList.vue'
//引入、註冊、插入
export default{
    components:{
        ProductList
    },
    data(){
        return{
        product:[],
        displayList:[],
        }
    },
    mounted() {
        fetch(`${import.meta.env.BASE_URL}product.json`)
        .then(data=>data.json())
        .then(res=>{
            //備份用
            this.product =res
            //顯示用
            this.displayList =res
        })
    },
    methods: {
        clear(){
            this.displayList = this.product
        } ,
        filter(star){
            console.log(star);
            this.displayList = this.product.filter(item=>{
                return item.rating === star
                // console.log(item)
            })
        },
        payMoney(){
            this.pay += 100
        }
        },
        parseIcon(file){
            return new URL(`../assets/images/${file}`, import.meta.url).href 
        } 
    }
</script>

<style lang ="scss">
    img{
        width: 10%;
    }
    .card{
        width: 10rem;
        height: 10rem;
        // background-image: url('@/assets/images/IndexTicket_01.jpg');
        // background-size: cover;
}
</style>