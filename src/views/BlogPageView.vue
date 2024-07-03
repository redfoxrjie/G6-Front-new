<template>
    <article>
        <div class="container">
            <div class="goback-wrapper">
                <div class="prev-arrow" @click="goBack">
                    <font-awesome-icon icon="arrow-left" />
                </div>
                <span>返回</span>
            </div>
            <p style="color: orange;">資料傳回確認(done)</p>
            {{ blogpost }}
            <hr>
            <p style="color: orange;">留言資料傳回確認(done)</p>
            {{ blogrp }}
            <hr>
            <div class="journey-banner" :style="{ backgroundImage: 'url(' + parseServerImg(blogpost.trp_img) + ')' }">
                <div class="journey-data">
                    <div class="publish-date font-time">{{ blogpost.b_date }} </div>
                    <div class="journey-title">{{ blogpost.b_title }}</div>
                </div>
                <div class="like-count" @click="toggleLikes">

                    <font-awesome-icon :icon="['fas', 'bone']" class="like_icon" /> {{ blogpost.b_likes }} 個讚
                </div>

            </div>
            <div class="journey-main row">
                <div class="journey-content col-12 col-md-9">
                    <div class="journey-info">
                        <div class="member">
                            <!-- <div class="mem-data">
                                <div class="mem-headshot">
                                    <img src="https://picsum.photos/300/200/?random=10">
                                </div>
                                <div class="title-wrapper">
                                    <div class="mem-name">Nabi</div>
                                    <div class="mem-slogan">一台相機，一只皮箱，一趟說走就走的旅行</div>
                                </div>

                            </div> -->
                            <!-- <button class="report-btn">檢舉文章</button> -->

                        </div>
                    </div>
                    <div class="journey-column">
                        <div class="journey-block">
                            <div class="block-img">
                                <img src="https://picsum.photos/300/200/?random=9">
                            </div>
                            <div class="paragraph">
                                <p v-html="formattedContent(blogpost.b_content)"></p>
                            </div>
                        </div>
                    </div>
                    <div class="comment-section">
                        <div class="comment-count">留言({{ blogrp.length }})</div>
                        <div class="comment-list">
                            <div class="comment-item" v-for="rp in blogrp">
                                <div class="comment-head">
                                    <div class="comment-mem">
                                        <div class="mem-headshot">
                                            <img :src=parseUserImg(rp.u_avatar)>
                                        </div>
                                        <div class="mem-name">{{ rp.u_nickname }}</div>
                                    </div>
                                    <div class="timediff">{{ rp.rp_date }}</div>
                                </div>
                                <div class="comment-text">{{ rp.rp_content }}
                                </div>
                            </div>
                        </div>
                        <div class="comment-input">
                            <div class="comment-item">
                                <div class="comment-head">
                                    <div class="comment-mem">
                                        <div class="mem-headshot">
                                            <img src="/public/default-userImg.png">
                                        </div>
                                        <div class="mem-name">訪客</div>
                                    </div>
                                </div>
                                <form class="comment-text">
                                    <textarea placeholder="留言回覆"></textarea>
                                    <button class="submit-btn" name="回覆" type="submit">回覆</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="trip-plan col-12 col-md-3">
                    <div class="day-trip-wrapper">
                        <div class="day-trip">
                            <div class="day-index">DAY 1</div>
                            <ul class="spot-list">
                                <li class="spot">博多一番街</li>
                                <li class="spot">川端通商店街</li>
                                <li class="spot">櫛田神社</li>
                                <li class="spot">石村萬盛堂本店</li>
                                <li class="spot">中洲屋台街</li>
                            </ul>
                        </div>
                        <div class="day-trip">
                            <div class="day-index">DAY 2</div>
                            <ul class="spot-list">
                                <li class="spot">門司港</li>
                                <li class="spot">和布刈神社</li>
                                <li class="spot">關門橋</li>
                                <li class="spot">小倉城</li>
                                <li class="spot">皿蒼山展望台</li>
                            </ul>
                        </div>
                        <button class="show-plan-btn">查看行程</button>
                    </div>

                </div>
            </div>
        </div>
    </article>
</template>

<script>
import GCompUserAcoount from '@/components/global/GCompUserAcoount.vue';

export default {
    data() {
        return {
            item: [],
            liked: false,

            blogpost: {},
            blogrp: {}

        }
    },
    methods: {
        async loadJsonData() {
            const blogId = this.$route.params.b_id;
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}json/data.json`);
                const data = await response.json();

                // 確認 data 中的 blog 是一個陣列
                if (data.blog && Array.isArray(data.blog)) {
                    this.item = data.blog.find(blog => blog.b_id == blogId);
                    console.log('Loaded item:', this.item);
                } else {
                    throw new Error('Data format is incorrect');
                }
            } catch (error) {
                console.error('Error loading JSON data:', error);
            }
        },
        async fetchData() {
            try {

                let path = `${import.meta.env.VITE_API_URL}/front`;
                let url = path + `/blogPostView.php?keyword=` + this.$route.params.query;

                const response = await fetch(url);
                const data = await response.json();
                console.log('http://localhost/g6-php-main/front/blogPageView.php')
                console.log('url:', url)
                console.log(data)

                // 存取資料到陣列中
                this.blogpost = data.blogpost;
                this.blogrp = data.blog_rp;
                // blogsCount.value = data.blogs.length; //計算blog總數
            } catch (error) {
                console.log('erro link at', `${import.meta.env.VITE_API_URL}/front/blog...View.php`)
                console.error('Error fetching data:', error);
            }
        },
        toggleLikes() {
            if (this.item.liked) {
                this.item.b_likes -= 1;
            } else {
                this.item.b_likes += 1;
            }
            this.item.liked = !this.item.liked;
        },
        parseImg(imgURL) {
            // 將相對路徑解析成正確的 URL
            return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
        },
        parseServerImg(imgURL) {
            // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
        },
        parseUserImg(imgURL) {
            // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            if (imgURL) return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
            return '/public/default-userBg.png'
        },
        goBack() {
            window.history.back(); // 返回前一頁
        },
        formattedContent(raw) {
            if (raw) {
                return raw.replace(/\\n/g, '<br>');
            } else { return '' }

        }
    },
    mounted() {
        // this.loadJsonData(); // 在組件mounted之後載入data
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.whitespace {
    white-space: pre-line;
}

article {
    margin-top: 120px;

    .container {
        .goback-wrapper {
            margin: 12px 0 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            width: fit-content;

            .prev-arrow {
                border: 1px solid $black;
                width: fit-content;
                padding: 8px;
                margin-right: 8px;
                border-radius: 50%;
                cursor: pointer;
            }

            &:hover {
                color: $secondColor-2;

                .prev-arrow {
                    border: 1px solid $secondColor-2;
                }
            }
        }

        .journey-banner {
            width: 100%;
            aspect-ratio: 2.87/1;
            background: no-repeat center/cover URL(https://picsum.photos/300/200/?random=1);
            color: $primaryColor;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            box-sizing: border-box;
            padding: 18px 20px;

            .journey-data {
                .publish-date {
                    letter-spacing: $base-fontSize * 0.75 * 0.1;
                }

                .journey-title {
                    font-size: $base-fontSize * 1.375;
                    line-height: 140%;
                    letter-spacing: $base-fontSize * 1.375 * 0.1;
                    margin-top: 6px;
                }
            }

            .like-count {
                font-size: $base-fontSize * 0.75;

                // &::before{
                //     content: '';
                //     width: 28px;
                //     height: 24px;
                //     background: no-repeat center/contain url(@/assets/images/bone-stroke.png);
                //     display: inline-block;
                //     margin-right: 8px;
                //     vertical-align: middle;
                //     cursor: pointer;
                // }
                .like_icon {
                    font-size: 22px;
                    // color: #ffffff;
                    cursor: pointer;


                    &:hover {
                        color: $accent-bgDrop;

                    }
                }
            }
        }

        .journey-main {
            margin: 60px 0;

            .journey-content {
                box-sizing: border-box;
                padding: 0 24px;

                .journey-info {
                    .member {
                        display: flex;
                        justify-content: space-between;

                        .mem-data {
                            display: flex;
                            align-items: center;

                            .mem-headshot {
                                width: 58px;
                                aspect-ratio: 1/1;
                                overflow: hidden;
                                border-radius: 50%;
                                object-fit: cover;
                                margin-right: 16px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    display: inline-block;

                                }
                            }

                            .title-wrapper {
                                .mem-name {
                                    font-size: $base-fontSize * 1.375;
                                    margin: 6px 0;
                                }

                                .mem-slogan {
                                    font-size: $base-fontSize * 0.75;
                                    color: $gray;
                                }
                            }
                        }

                        .report-btn {
                            align-self: flex-end;
                            font-size: $base-fontSize * 0.75;
                            border: 1px solid $gray;
                            color: $gray;
                            padding: 6px 12px;
                            cursor: pointer;


                            &::before {
                                content: '';
                                vertical-align: middle;
                                display: inline-block;
                                width: 16px;
                                height: 12px;
                                background: no-repeat center/cover url(@/assets/images/report-icon.svg);
                                margin-right: 4px;

                            }
                            .report_icon{
                                &:hover{
                                    color: red;
                                }
                            }
                            // &::before {
                            //     content: '';
                            //     vertical-align: middle;
                            //     display: inline-block;
                            //     width: 16px;
                            //     height: 12px;
                            //     background: no-repeat center/cover url(@/assets/images/report-icon.svg);
                            //     margin-right: 4px;
                            // }
                        }
                    }

                    .journey-intro {
                        font-size: $base-fontSize * 0.875;
                        line-height: 140%;
                        letter-spacing: $base-fontSize * 0.875 * 0.1;
                        margin-top: 14px;
                    }
                }

                .comment-section {
                    border: 1px solid $black;
                    background-color: $secondColor-1;
                    border-radius: 10px;
                    box-sizing: border-box;
                    padding: 14px 22px 52px;

                    .comment-count {
                        font-size: $base-fontSize;
                        margin-bottom: 30px;
                    }

                    .comment-list,
                    .comment-input {
                        .comment-item {
                            border: 1px solid $black;
                            border-radius: 11px;
                            margin-bottom: 30px;

                            .comment-head {
                                font-size: $base-fontSize * 0.875;
                                background-color: $secondColor-2;
                                color: $primaryColor;
                                border-radius: 10px 10px 0 0;
                                box-sizing: border-box;
                                padding: 8px 22px;
                                line-height: 160%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .comment-mem {
                                    display: flex;
                                    align-items: center;

                                    .mem-headshot {
                                        width: 56px;
                                        aspect-ratio: 1/1;
                                        overflow: hidden;
                                        border-radius: 50%;
                                        margin-right: 18px;

                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                }
                            }

                            .comment-text {
                                background-color: $primaryColor;
                                font-size: $base-fontSize * 0.833;
                                border-radius: 0 0 10px 10px;
                                box-sizing: border-box;
                                padding: 22px;
                                line-height: 160%;

                                textarea {
                                    width: 100%;
                                    min-height: 50px;
                                    background-color: $primaryColor;
                                    resize: none;
                                }

                                .submit-btn {
                                    background-color: $accentColor-1;
                                    padding: 6px 26px;
                                    border-radius: 36px;
                                    letter-spacing: $base-fontSize * 0.1;
                                    margin-top: 12px;
                                    margin-left: auto;
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }

            .journey-column {
                border-left: 1px solid $black;
                box-sizing: border-box;
                padding: 0 48px;
                margin: 48px 0;

                .journey-block {
                    margin: 48px 0 86px;

                    .block-title {
                        margin: 24px 0;
                    }

                    .block-img {
                        width: 100%;
                        aspect-ratio: 2.43/1;
                        overflow: hidden;

                        img {
                            width: 100%;
                        }
                    }

                    .paragraph {
                        font-size: $base-fontSize * 0.875;
                        line-height: 180%;
                        margin-top: 24px;
                    }
                }
            }

            .trip-plan {
                .day-trip-wrapper {
                    background-color: unset;
                    box-sizing: border-box;
                    padding: 24px 30px;

                    .day-trip {
                        display: none;
                        gap: 12px;

                        .day-index {}

                        .spot-list {
                            li {
                                margin-bottom: 18px;
                                font-size: $base-fontSize * 0.875;
                            }
                        }
                    }

                    .show-plan-btn {
                        margin: 16px auto;
                        padding: 10px 42px;
                        border: 1px solid $black;
                        border-radius: 44px;
                        cursor: pointer;
                        font-size: $base-fontSize * 0.875;
                        display: block;
                        background-color: $accentColor-1;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 768px) {
    article {
        margin-top: 120px;

        .container {
            .journey-main {
                margin: 60px 0;

                .trip-plan {
                    .day-trip-wrapper {
                        background-color: $accentColor-1;
                        box-sizing: border-box;
                        padding: 24px 30px;

                        .day-trip {
                            display: flex;
                            gap: 12px;

                            .day-index {}

                            .spot-list {
                                li {
                                    margin-bottom: 18px;
                                    font-size: $base-fontSize * 0.875;
                                }
                            }
                        }

                        .show-plan-btn {
                            margin: 16px auto;
                            padding: 10px 42px;
                            border: 1px solid $black;
                            border-radius: 44px;
                            cursor: pointer;
                            font-size: $base-fontSize * 0.875;
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>