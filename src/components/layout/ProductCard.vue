<template>
    <div class="">
        {{ money }}
        {{ name }}
        <div class="card"
        v-for="item in menu"
        :key="item.id"
        :style="{'background-image':`url(${parseIcon(item.img)})`}"
        >    
        <div>
            <img  :src="parseIcon(item.img)" alt="">
        </div>
        <div>
            {{ item.name }}
            <span v-for="star in item.rating" :key="star">*</span>
            ${{ item.price }}
        </div>
        <div>
            <button>+</button>
        </div>
        </div>
    </div>
</template>

<script>

export default{
    props:['money','name'],
    data(){
        return{
            product:{
                id:1,
                name:'商品1',
                img:'IndexTicket_01.jpg',
                price:100,
                rating:4
            },
        }
    },
    methods: { 
        parseIcon(file){
            return new URL(`../assets/images/${file}`, import.meta.url).href 
        } 
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