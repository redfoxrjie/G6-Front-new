<template>
    <div class="myblog-section">
        <h2>旅行筆記</h2>
        <div class="journey-card-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="card-container col" v-for="card in articles" :key="card.b_id" @click="goToBlogPage(card)">
                <div class="journey-card">
                    <div class="journey-img">
                        <img :src="getImageUrl(card.b_img)" :alt="card.b_title" @error="handleImageError">
                    </div>
                    <div class="journey-info">
                        <div class="journey-title">{{ card.b_title }}</div>
                        <div class="journey-data">
                            <div class="publish-date font-time">{{ card.b_date }}</div>
                            <div class="viewers font-viewers">收到 {{ card.b_likes }} 次喜愛</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
    name: 'EditMyBlog',
    data() {
        return {
            articles: [],
            baseUrl: `${import.meta.env.VITE_IMG_URL}`// 初始化 baseUrl
        };
    },
    mounted() {
        this.loadArticlesFromDatabase();
    },
    methods: {
        getImageUrl(imagePath) {
            return imagePath ? `${import.meta.env.VITE_IMG_URL}/${imagePath}` : 'https://tibamef2e.com/cid101/g6/images/default-userBg.png';
        },
        handleImageError(event) {
            event.target.src = 'https://tibamef2e.com/cid101/g6/images/default-userBg.png';
        },
        async loadArticlesFromDatabase() {
            const userStore = useUserStore();
            const userId = userStore.userId;
            if (!userId) {
                console.error('User is not logged in');
                return;
            }
            try {
                const apiUrl = `${import.meta.env.VITE_API_URL}/get_blog.php?user_id=${userId}`;
                console.log('API URL:', apiUrl);
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Loaded articles data:', data);
                if (data.error) {
                    throw new Error(data.error);
                }
                this.articles = data;
            } catch (error) {
                console.error('Error loading articles:', error);
            }
        },
        goToBlogPage(card) {
            this.$router.push({
                name: 'blogPage',
                params: { query: card.b_id },
                query: {
                    b_id: card.b_id,
                    b_title: card.b_title,
                    b_date: card.b_date,
                    b_likes: card.b_likes,
                    b_viewers: card.b_viewers,
                    b_img: card.b_img,
                    b_content: card.b_content
                }
            });
        }
    }
};
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
                transition: .1s ease;

                &:hover {
                    transform: scale(1.02);
                }

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
                    // width: 100%;
                    aspect-ratio: 1/1.18;
                    overflow: hidden;
                    background-color: #d3c7c7;

                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        // object-position: center;
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