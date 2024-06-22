<template>
    <div class="notFound">
        <div class="notFound_txt">
            <h1>404 ERROR</h1>
            <h2>這個網頁似乎出現了一些問題...</h2>
            <div class="btn">
                <button @click="goHome">返回首頁</button>   
            </div>
        </div>
        <div class="notFound_pic">
            <img src="../assets/images/404_NotFound.png" alt="">
        </div>
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
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #a4a1a0;
        margin-top: 15%;
    .notFound_txt h1 {
        font-size: 4rem;
        margin: 0;
    }
    .notFound_pic img{
        width: 55%;
    }
}
@media (max-width: 768px) {
    .notFound{
        display: flex;
        flex-direction: column;
        margin-top: 25%;
    }
    .notFound_pic{
        order: 1;
    }
    .notFound_txt{
        order: 2;
    }
}
.btn button {
        cursor: pointer;
        margin-top: 5%;
        color:$primaryColor;
        background-color: $secondColor-2;
        padding: 7px 15px;
        border-radius: 20px;
    }
</style>