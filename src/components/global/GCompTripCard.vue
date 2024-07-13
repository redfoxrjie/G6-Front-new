<template>
    <div class="trip-card-wrapper col">
        <div class="trip-card">
            <div class="tc-img">
                <img :src="tcImg">
            </div>
            <div class="tc-content">
                <div class="tc-title">
                    <h5>{{ tcTitle }}</h5>
                </div>
                <user-account :uName="tcMemName " :uImg="tcMemImg" />

            </div>
        </div>

    </div>

</template>
<script setup>
const props = defineProps({
    tcTitle: {
        type: String,
        required: true
    },
    tcImg: {
        type: String,
    },
    tcMemName: {
        type: String,
    },
    tcMemImg: {
        type: String,
        default: null
    }

})
</script>
<style lang="scss">
@import '../../assets/styles/base/font';
@import '../../assets/styles/base/color'; 

.trip-card-wrapper {
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
}

.trip-card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .1);

    &:hover{
        .tc-content{
            background-color: #e1f4fb;
        }
        .tc-img img{
            transform: scale(1.05) rotate(1deg)
        }
    }
    .tc-img {
        width: 100%;
        aspect-ratio: 456/200;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: .4s ease;
        }
    }

    .tc-content{
        padding: 21px 20px 8px;
        background-color: rgb(246, 246, 250);
        transition: .4s ease;


    }
}
</style>