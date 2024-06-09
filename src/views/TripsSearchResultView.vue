<template>
    <section class="section-resultHeader">
        <div class="container">
            <h2>搜尋結果</h2>
            <h3>找到 2 筆 符合的行程</h3>
        </div>
    </section>
    <div class="section-resultDisplay">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <trip-card v-for="(n, i) in tripsResultData" :tcImg="tripsResultData[i].trp_img"
                    :tc-title="tripsResultData[i].trp_name" :tcMemName="tripsResultData[i].u_nickname"
                    :key="tripsResultData[i].trp_id" />

            </div>
            <div class="button-wrap col-6 col-md-3 col-lg-2">
                <button @click="goToPage('/alltrips')"><h4>返回</h4></button>
            </div>

        </div>
    </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const tripsResultData = ref([]);
const fetchData = async () => {
    try {
        const response = await fetch('/json/searchData.json');
        const data = await response.json();
        tripsResultData.value = data.tripsSearch;
        console.log(data.tripsSearch);
    } catch (error) {
        console.log('fetch error:', error)
    }
}


    const router = useRouter();
    const goToPage=(toLink)=>{
        router.push(toLink);
    }


fetchData();
</script>
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.section-resultHeader {
    margin-top: 80px;
    margin-bottom: 20px;

    h2,
    h3 {
        color: $secondColor-2;
        padding: 10px 0;
    }


}
.section-resultDisplay{
    .container{
        border-top: 2px solid $secondColor-2;
        padding: 30px 0;
    .button-wrap{
        margin: auto;
        margin-top: 40px;
        button{
        display: block;
        cursor: pointer;
        background-color: $secondColor-2 ;
        color:$black ;
        border-radius: 15px;
        padding: 5px 0px ;
        width: 90%;
        margin: auto;
        h4{
            text-align: center;
            color: $primaryColor;
        }
        }
    }
    .hs-section-btn-wrap{
        padding: $base-fontSize 0;
        margin: 0 auto;
    }
    .hs-btn{
        display: block;
        background-color: $accentColor-2;
        margin: auto;
        border-radius: 10px;
        padding: 2px 30px ;
    }
    }
}
</style>