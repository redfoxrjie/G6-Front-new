<template>
    <div class="myTrip-section">
        <button class="creat-new-plan">建立行程</button>
        <h2>我的行程</h2>
        <div class="trip-card-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="card-container col" v-for="card in cards" :key="card.trp_id"
                @click="navigateToTripMap(card.trp_id)">
                <div class="trip-card">
                    <div class="option-btn"></div>
                    <div class="trip-img">
                        <img :src="card.trp_img" :alt="card.trp_name">
                    </div>
                    <div class="trip-info">
                        <div class="trip-title">{{ card.trp_name }}</div>
                        <div class="trip-dates font-time">{{ card.trp_sdate }} ~ {{ card.trp_edate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cards: []
        };
    },
    mounted() {
        this.loadJsonData();
    },
    methods: {
        loadJsonData() {
            fetch('../../json/mytrips.json')
                .then((response) => response.json())
                .then(data => {
                    this.cards = data;
                })
                .catch((error) => {
                    console.error('Error loading JSON data:', error);
                });
        },
        navigateToTripMap(trp_id) {
            this.$router.push({
                name: 'mytrip',
                params: { trp_id }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.myTrip-section {
    .creat-new-plan {
        width: fit-content;
        background-color: $secondColor-2;
        padding: 12px 26px;
        color: $primaryColor;
        font-size: $base-fontSize * 1.125;
        letter-spacing: $base-fontSize * 1.125 * 0.1;
        border-radius: 36px;
        margin-left: auto;
        margin-top: 18px;
        display: block;
        cursor: pointer;

        &::before {
            content: '';
            width: 18px;
            aspect-ratio: 1/1;
            background: no-repeat center/cover url(@/assets/images/global/icons/add-icon.svg);
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            transform: translateY(-5%);
        }
    }

    h2 {
        color: $secondColor-2;
        margin: 24px 0;
    }

    .trip-card-wrapper {
        box-sizing: border-box;
        margin: 48px -16px;

        .card-container {
            box-sizing: border-box;
            padding: 0 16px;
            margin-bottom: 86px;
            position: relative;

            .trip-card {
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
                cursor: pointer;
                position: relative;

                .option-btn {
                    width: 28px;
                    aspect-ratio: 1/1;
                    background: no-repeat center/contain url(@/assets/images/global/icons/option-btn.png);
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 1;
                }

                .trip-img {
                    width: 100%;
                    aspect-ratio: 2.28/1;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: auto;
                        transform: translate(0, -5%);
                        transition: scale .5s ease-in-out;

                        &:hover {
                            scale: 1.06;
                            transition: scale .5s ease-in-out;
                        }
                    }
                }

                .trip-info {
                    display: flex;
                    flex-direction: column;
                    padding: 0 24px 24px;

                    .trip-title {
                        font-size: $base-fontSize;
                        line-height: 140%;
                        letter-spacing: $base-fontSize * 0.1;
                        margin: 14px 0;
                        color: $black;
                    }

                    .trip-dates {
                        color: $gray;
                        flex-grow: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>