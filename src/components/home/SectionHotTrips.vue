<template>
    <section class="hot-trips">
        <div class="container">
            <h2>熱門行程</h2>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div class="col card-container" v-for="(trip, index) in hotTripsData" :key="index">
                    <a href="#">
                        <div class="trip-card">
                            <div class="card-img">
                                <img :src="trip.imgUrl" alt="行程圖片">
                            </div>
                            <div class="card-content">
                                <div class="card-title--myTrip">{{ trip.title }}</div>
                                <div class="member">
                                    <div class="member-photo"><img :src="trip.memPicUrl" alt="會員頭像"></div>
                                    <div class="member-name">{{ trip.memberName }}</div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="btn"><a href="#">查看更多</a></div>
        </div>
    </section>
</template>


<script setup>
const hotTripsData = [
    { title: '北九州五天四夜雙人行', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_yufuin-kinrinko.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
    { title: '濟州島六天五夜家族旅遊', memberName: '會員名稱', imgUrl: new URL('@/assets/images/korea_jeju-island.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
    { title: '京阪神絕景賞楓五天四夜', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_kyoto-street.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
    { title: '墾丁四天三夜畢業旅行', memberName: '會員名稱', imgUrl: new URL('@/assets/images/taiwan_kenting.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
    { title: '韓國釜山放鬆之旅', memberName: '會員名稱', imgUrl: new URL('@/assets/images/korea_busan.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
    { title: '東京下町散策之旅', memberName: '會員名稱', imgUrl: new URL('@/assets/images/japan_asakusa-street.jpg', import.meta.url).href, memPicUrl: 'https://picsum.photos/300/200/?random=10' },
];
const props = defineProps({
    hotTrips: {
        type: Array,
        required: true
    }
});
</script>

<style lang="scss" scoped>
@import '../../assets/styles/base/font';
@import '../../assets/styles/base/color';

.card-container {
    box-sizing: border-box;
    padding: 0 12px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
}

.trip-card {
    background-color: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .1);
    border-radius: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    color: $black;
}

.card-img {
    width: 100%;
    aspect-ratio: 456/200;
    overflow: hidden;
}

img {
    object-fit: cover;
    width: 100%;
    border-radius: 10px 10px 0 0;
}

.card-content {
    padding: 21px 20px 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.hot-trips h2 {
    color: $black;
    margin: 46px;
    text-align: center;
}

.card-title--myTrip {
    font-size: 1rem;
    margin-bottom: 16px;
}

.member {
    display: flex;
    align-items: center;
    margin-top: auto;
}

.member-photo {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 7px;
}

.member-photo img {
    width: 100%;
    height: 100%;
}

.member-name {
    font-size: 0.8125rem;
    display: block;
    vertical-align: middle;
}

.btn {
    width: fit-content;
    background-color: $accnetColor-2;
    text-align: center;
    font-size: 0.83rem;
    line-height: 0.83rem;
    border-radius: 1.33rem;
    overflow: hidden;
    margin: 20px auto;
}

.btn a {
    display: block;
    padding: 6px 28px;
    color: $black;
}
</style>
