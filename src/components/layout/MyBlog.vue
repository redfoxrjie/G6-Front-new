<template>
    <div class="myblog-section">
        <h2>旅行筆記</h2>
        <div class="journey-card-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="card-container col" v-for="card in memPageBlogData" :key="card.b_id">
                <div class="journey-card" @click=navigateToBlogPage(card.b_id)>
                    <!-- <div class="option-btn"></div> -->
                    <div class="journey-img">
                        <img :src=parseServerImg(card.b_img) :alt="card.b_img">
                    </div>
                    <div class="journey-info">
                        <div class="journey-title">{{ card.b_title }}</div>
                        <div class="journey-data">
                            <div class="publish-date font-time">{{ card.b_date }}</div>
                            <div class="viewers font-viewers">收到{{ card.b_likes }} 次喜愛</div>
                        </div>
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
        // this.loadJsonData();
    },
    props: {
        memPageBlogData: {
            type: Array,
            required: true,
            default: []
        }
    },

    methods: {
        // loadJsonData() {
        //     fetch(`${import.meta.env.BASE_URL}json/myblogs.json`)
        //         .then((response) => response.json())
        //         .then(data => {
        //             this.cards = data;
        //         })
        //         .catch((error) => {
        //             console.error('Error loading JSON data:', error);
        //         });
        // },
        parseServerImg(imgURL) {
            // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            if (imgURL) return `${import.meta.env.VITE_IMG_URL}/${imgURL}`;
            return 'public/default-bgImg.png'
        },
        navigateToBlogPage(b_id){
            // this.$router.push({ name: 'blogPage', params: { b_id } });
            this.$router.push(`../blog/${b_id}`);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.myblog-section {
    h2 {
        color: $secondColor-2;
        margin: 24px 0;
    }

    .journey-card-wrapper {
        box-sizing: border-box;
        margin: 48px -16px;

        .card-container {
            box-sizing: border-box;
            padding: 0 16px;
            margin-bottom: 86px;
            position: relative;

            &::before {
                content: '';
                width: 20%;
                aspect-ratio: 1/0.77;
                display: block;
                background: no-repeat center/contain url(@/assets/images/tape-sticker.png);
                position: absolute;
                top: 0%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }

            .journey-card {
                padding: 33px 21px 15px;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
                cursor: pointer;

                .option-btn {
                    width: 28px;
                    aspect-ratio: 1/1;
                    background: no-repeat center/contain url(@/assets/images/global/icons/option-btn.png);
                    position: absolute;
                    top: 38px;
                    right: 44px;
                    z-index: 1;
                }

                .journey-img {
                    width: 100%;
                    aspect-ratio: 1/1.18;
                    overflow: hidden;
                    background-color: #d3c7c7;

                    img {
                        width: 100%;
                        height: auto;
                        object-fit: cover;

                        // transform: translate(-20%, 0);
                    }
                }

                .journey-info {
                    display: flex;
                    flex-direction: column;

                    .journey-title {
                        font-size: $base-fontSize * 1.125;
                        line-height: 140%;
                        letter-spacing: $base-fontSize * 1.125 * 0.1;
                        margin: 14px 0;
                        color: $black;
                    }

                    .journey-data {
                        flex-grow: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .publish-date {
                            color: $gray;
                        }

                        .viewers {
                            color: $secondColor-2;
                            font-size: 16px;
                            // &::before {
                            //     content: '';
                            //     background: no-repeat center/contain url(@/assets/images/viewers-icon.png);
                            //     width: 14px;
                            //     height: 12px;
                            //     display: inline-block;
                            //     vertical-align: middle;
                            //     margin-right: 6px;
                            // }
                        }
                    }
                }
            }
        }
    }
}
</style>