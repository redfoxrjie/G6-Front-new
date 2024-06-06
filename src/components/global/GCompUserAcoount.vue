<script></script>
<template>
    <div class="user-account-wrapper">
        <div class="ua-img">
            <img src="https://fakeimg.pl/300x200/200">
        </div>
        <div class="ua-id"><p>Josh</p></div>
    </div>
</template>
<style lang="scss" scoped>
@import '../../assets/styles/base/font';

    $compSize:30px;
    .user-account-wrapper{
        width: fit-content;
        height: $compSize;
        padding: 2px 0px;
        display: flex; 
        align-items: center;
        .ua-id{
            height: fit-content;
            margin-left: 5px;
            // line-height: $compSize;
        }   

        .ua-img{
        // height: 100%;
        width: $compSize * .8;
        aspect-ratio: 1;
        border-radius: 50%;
        overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

    }
    }
    


</style>
