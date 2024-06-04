<template>
    <div v-if="item">
        {{ item.name || '' }}
        ${{ item.price || 0 }}
        {{  item.rating || 0 }}
        <span v-for="star in item.rating" :key="star">
            *</span>
        <img v-if="item.img" :src="parseIcon(item.img)" alt="">
        <!-- <button @click="$emit('add')">加入購物車</button> -->
    </div>
</template>

<script>
export default {
    props:['item'],
    
    methods: {  
        parseIcon(file){
            return new URL(`../assets/images/${file}`, import.meta.url).href 
        } 
        },

}

</script>

<style>
</style>