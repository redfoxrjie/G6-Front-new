<template>
    <div class="blog-card-wrapper col">
        <div class="blog-card">
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
    }

})
</script>
<style lang="scss">
@import '../../assets/styles/base/font';
@import '../../assets/styles/base/color';

</style>