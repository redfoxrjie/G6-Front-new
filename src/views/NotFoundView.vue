<template>
    <div class="notFound">
    <h1>404</h1>
    <img src="" alt="">
    <button @click="goHome">回到首頁</button>
    </div>
</template>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push({ 
                name: 'home'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.notFound {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }
    h1 {
        font-size: 6rem;
        margin: 0;
    }
    button {
        padding: 10px 20px;
        background-color: $secondColor-2;
        border: none;
        color: white;
        cursor: pointer;
        margin-top: 20px;
    }
    button:hover {
        background-color: #138496;
    }
</style>