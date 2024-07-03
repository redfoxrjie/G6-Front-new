<script setup>
const props = defineProps({
    uName: {
        type: String,
        default: 'Josh'
    },
    uImg: {
        type: String,
        default: 'public/default-userBg.png'
    },
    uSize: {
        type: Number,
        default: 30
    }

})
const parseUserImg = (imgURL) => {
    // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
    if(imgURL) return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
    return 'public/default-userBg.png'
}

</script>
<template>
    <div class="user-account-wrapper">
        <div class="ua-img">
            <img :src= parseUserImg(uImg)>
        </div>
        <div class="ua-name">
            <p>{{ uName }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../assets/styles/base/font';

    $compSize:40px;
    .user-account-wrapper{
        width: fit-content;
        height: $compSize;
        padding: 2px 0px;
        display: flex; 
        align-items: center;
        .ua-name{
            height: fit-content;
            margin-left: 5px;
            font-size: $compSize * .43;
        }   

        .ua-img{
        // height: 100%;
        width: $compSize * .6;
        aspect-ratio: 1/1;

        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
}
</style>
