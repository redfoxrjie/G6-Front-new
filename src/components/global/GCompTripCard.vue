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
                <user-account :uName="tcMemName" />

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

})
</script>
<style lang="scss">
@import '../../assets/styles/base/font';
@import '../../assets/styles/base/color';

.trip-card-wrapper {
    // background-color: #8b3535;
    box-sizing: border-box;
    padding: 5px;  max-width: 400px;


}

.trip-card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .1);

    .tc-img {
        width: 100%;
        aspect-ratio: 456/200;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .tc-content{
        padding: 21px 20px 8px;

    }
}
</style>