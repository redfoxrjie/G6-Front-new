<template>
    <article>
        <div class="container">
            <div class="goback-wrapper">
                <div class="prev-arrow" @click="goBack">
                    <font-awesome-icon icon="arrow-left" />
                </div>
                <span>返回</span>
            </div>

            <div class="journey-banner" :style="{ backgroundImage: 'url(' + parseServerImg(blogpost.trp_img) + ')' }">
                <div class="journey-data">
                    <div class="publish-date font-time">{{ blogpost.b_date }} </div>
                    <div class="journey-title">{{ blogpost.b_title }}</div>
                </div>
                <div class="like-count" @click="likeHandle">
                    <font-awesome-icon :icon="['fas', 'bone']" :class="[isLiked ? 'active' : '']" class="like_icon" />
                    <span>{{ blogpost.b_likes }} 個讚</span>

                </div>

            </div>
            <div class="journey-main row">
                <div class="journey-content col-12 col-md-9">
                    <div class="journey-info">
                        <div class="member">
                            <div class="mem-data col-9">
                                <div class="mem-headshot">
                                    <img :src=parseUserImg(blogpost.u_avatar)>
                                </div>
                                <div class="title-wrapper">
                                    <div class="mem-name">{{ blogpost.u_nickname }}</div>
                                    <div class="mem-slogan">@{{ blogpost.u_account }}</div>
                                </div>

                            </div>
                            <!-- <button class="report-btn">檢舉文章</button> -->

                        </div>
                    </div>
                    <div class="journey-column">
                        <div class="journey-block">
                            <div class="block-img" v-if="blogpost.b_img">
                                <img :src=parseServerImg(blogpost.b_img)>
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
                                            <img src="/default-userImg.png">
                                        </div>
                                        <div v-if="isLoggedIn" class="mem-name">{{ userInfo.u_nickname }}</div>
                                        <div v-else class="mem-name">訪客</div>
                                    </div>
                                </div>
                                <form class="comment-text" @submit.prevent="rpsubmit">
                                    <textarea v-model='msg' placeholder="留言回覆" required></textarea>
                                    <button class="submit-btn" name="回覆">回覆</button>
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
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            item: [],
            liked: false,

            blogpost: {},
            blogrp: {},
            //b_id 目前文章編號,rp_content 文章內容,u_id 留言會員帳號

            msg: ''
        }
    },
    computed: {
        isLoggedIn() {
            const store = useUserStore();
            return store.isLoggedIn;
        },
        userInfo() {
            const store = useUserStore();
            return store.userInfo;
        },
        formrpdata() {
            return {
                b_id: this.blogpost.b_id,
                rp_content: this.msg,
                u_id: this.userInfo.u_id
            }
        },
        isLiked() {
            // let likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
            // return likedBlogs.includes(this.blogpost.b_id);        
            return this.liked
        }
    },
    watch: {
    },
    methods: {

        async fetchData() {
            try {

                let path = `${import.meta.env.VITE_API_URL}`;
                let url = path + `/blogPostView.php?keyword=` + this.$route.params.query;

                const response = await fetch(url);
                const data = await response.json();
                console.log('http://localhost/g6-php-main/front/blogPageView.php')
                console.log('url:', url)
                console.log(data)

                // 存取資料到陣列中
                this.blogpost = data.blogpost;
                this.blogrp = data.blog_rp;
                this.initLike();
                // blogsCount.value = data.blogs.length; //計算blog總數
            } catch (error) {
                console.log('erro link at', `${import.meta.env.VITE_API_URL}/front/blog...View.php`)
                console.error('Error fetching data:', error);
            }
        }
        ,
        toggleLikes() {
            if (this.item.liked) {
                this.item.b_likes -= 1;
            } else {
                this.item.b_likes += 1;
            }
            this.item.liked = !this.item.liked;
        },
        async likeHandle() {
            const blogId = this.blogpost.b_id;
            let likes = JSON.parse(localStorage.getItem('likedBlogs')) || [];


            if (likes.includes(blogId)) {
                // 已点赞，移除点赞
                this.liked = false;

                likes = likes.filter(id => id !== blogId);
                localStorage.setItem('likedBlogs', JSON.stringify(likes));
                console.log(localStorage.getItem('likedBlogs'))
                // updateLikeStatus(blogId, 'remove');  // 发送请求到后端
            } else {
                // 未点赞，添加点赞
                this.liked = true;

                likes.push(blogId);
                localStorage.setItem('likedBlogs', JSON.stringify(likes));

                console.log(localStorage.getItem('likedBlogs'))

                // updateLikeStatus(blogId, 'add');  // 发送请求到后端
            }

        },
        async likeShowHandle() {
            const blogId = this.blogpost.b_id;

            let path = `${import.meta.env.VITE_API_URL}`;
            let url = path + `/blogLikeShow.php`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.error('Error:', error)
            }
        }
        ,
        parseImg(imgURL) {
            // 將相對路徑解析成正確的 URL
            return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
        },
        parseServerImg(imgURL) {
            // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            return `${import.meta.env.VITE_IMG_URL}/${imgURL}`;
        },
        parseUserImg(imgURL) {
            // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            if (imgURL) return `${import.meta.env.VITE_IMG_URL}/${imgURL}`;
            return '/default-userBg.png'
        },
        goBack() {
            window.history.back(); // 返回前一頁
        },
        formattedContent(raw) {
            if (raw) {
                return raw.replace(/\\n/g, '<br>');
            } else { return '' }

        },
        async rpsubmit() {
            if (!this.isLoggedIn) {
                Swal.fire({
                    icon: 'warning',
                    title: '尚未登入',
                    text: `必須登入才能對文章進行留言`
                });
            } else {
                try {
                    let path = `${import.meta.env.VITE_API_URL}`;
                    let url = path + `/responseWrite.php`;
                    console.log('url:' + url)

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.formrpdata)
                    });
                    const data = await response.json();
                    console.log(data)
                    if (data.code === 1) {
                        Swal.fire({
                            icon: 'success',
                            title: '留言送出',

                        });
                        this.msg = '';
                        this.fetchData();
                    }

                } catch (error) {
                    console.log('fetch error:', error);
                }

            }
        },
        initLike() {

            let likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];
            this.liked = likedBlogs.includes(this.blogpost.b_id);
            console.log('init');
        }

    },
    created() {
        this.initLike();

    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

@keyframes btndefault {
    40% {
        transform: rotate(10deg);
    }

    60% {
        transform: rotate(-20deg);
    }

    80% {
        transform: rotate(20deg);
    }

}

@keyframes btnhover {

    50% {
        transform: rotate(100deg);
    }

    80% {
        transform: rotate(-100deg);
    }
}

.whitespace {
    text-indent: 10px;
}

article {
    margin-top: 60px;

    .container {
        width: 100%;

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
            flex-wrap: wrap;
            box-sizing: border-box;
            padding: 18px 20px;

            .journey-data {
                .publish-date {
                    letter-spacing: $base-fontSize * 0.75 * 0.1;
                    // text-shadow: .5px 0px .6px $black;
                    text-shadow: 1px 1.5px .2px rgba(49, 49, 49, 0.781);


                }

                .journey-title {
                    font-size: $base-fontSize * 1.8;
                    line-height: 140%;
                    letter-spacing: $base-fontSize * 1.375 * 0.1;
                    text-shadow: 2px 2px .2px rgba(49, 49, 49, 0.781);
                    // background-color: $accentColor-1;
                    color: $primaryColor;
                    margin-top: 6px;
                }
            }

            .like-count {
                cursor: pointer;
                background-color: $primaryColor;
                border-radius: 40px;
                border: solid 2px rgb(186, 198, 93);
                padding: 4px 10px;
                color: $black;
                font-size: $base-fontSize * 1;
                line-height: $base-fontSize * 1;
                transition: .08s;
                box-shadow: inset 2px 2px 0px #43434325;

                // text-shadow: 1px 1px #eeeeee9a;
                span {
                    // text-shadow: 1px 1px #121212bc;
                    padding-left: 8px;
                }

                svg {
                    color: $primaryColor;
                    filter: drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.774));
                    animation: btndefault 2s infinite;


                }

                &:hover {
                    // color: $accent-bgDrop;
                    transform: scale(1.02);
                    box-shadow: inset 2px 1px 3px #434343ac;

                    svg {
                        animation: btndefault .5s infinite;
                    }

                    // .like_icon{

                    // }
                }

                &:active {
                    transform: scale(0.98);

                    svg {
                        animation: btndefault .2s infinite;
                    }
                }

                .like_icon {
                    font-size: 22px;
                    // color: #ffffff;
                    cursor: pointer;
                    transition: .2s ease-out;
                }

                .like_icon.active {
                    color: $accentColor-2;
                }
            }
        }

        .journey-main {
            // margin-bottom: 20px;
            // background-color: $subtle-bgDrop;

            .journey-content {
                box-sizing: border-box;
                padding: 10px 24px;
                padding-top: 0;

                .journey-info {
                    .member {
                        cursor: pointer;
                        margin-top: 25px;
                        display: flex;
                        justify-content: space-between;
                        box-shadow: inset 0px 0px 8px 5px rgba(146, 146, 146, 0.158);
                        background-color: $secondColor-2;

                        &:hover {
                            background-color: #2d76e4d0;

                            .mem-data {
                                transform: scale(1.03);

                            }
                        }

                        // padding: 10px 0;

                        .mem-data {
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            // background-color: rgba(240, 255, 255, 0.363);
                            // box-shadow: inset -4px 0px 18px rgba(206, 206, 206, 0.418);

                            padding: 8px 0;
                            transition: all .2s;
                            color: $primaryColor;

                            .mem-headshot {
                                margin: 0 25px;
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
                                    // color: $gray;
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

                            .report_icon {
                                &:hover {
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
                    border: 1px solid rgba(6, 11, 54, 0.098);
                    background-color: $secondColor-1;
                    border-radius: 10px;
                    box-sizing: border-box;
                    padding: 14px 22px 52px;

                    .comment-count {
                        font-size: $base-fontSize*1.4;
                        color: $black;
                        margin-bottom: 30px;
                    }

                    .comment-list,
                    .comment-input {
                        .comment-item {
                            border: 1px solid rgba(6, 11, 54, 0.098);
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
                                box-shadow: inset 2px -15px 13px rgba(80, 65, 94, 0.212);

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
                                font-size: 16px;

                                textarea {
                                    width: 100%;
                                    min-height: 50px;
                                    background-color: $primaryColor;
                                    resize: none;
                                    font-family: huninn
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
                padding-bottom: 20px;
                margin-bottom: 15PX;
                background-color: $subtle-bgDrop;

                .journey-block {
                    // margin: 48px 0 86px;
                    padding: 48px 10px;

                    .block-title {
                        margin: 24px 0;
                    }

                    .block-img {
                        width: 100%;
                        aspect-ratio: 4/3;
                        // aspect-ratio: 2/3.5;
                        overflow: hidden;
                        margin: auto;


                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: 50% 50%;
                            ;
                        }
                    }

                    .paragraph {
                        p {
                            // font-size: $base-fontSize * 1.2;
                            font-size: 16px;
                            line-height: 150%;
                            margin-top: 24px;
                            text-indent: $base-fontSize * 1.2 *2;
                        }
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

// 以下是桌機size為主 設定
@media screen and (min-width: 768px) {

    article {
        margin-top: 120px;

        .container {
            width: 75vw;

            .journey-banner {
                justify-content: space-between;
                align-items: flex-end;
                box-sizing: border-box;
                padding: 18px 20px;
            }

            .journey-main {
                margin-bottom: 20px;

                .trip-plan {
                    .day-trip-wrapper {
                        background-color: $accentColor-1;
                        box-sizing: border-box;
                        padding: 24px 30px;

                        .day-trip {
                            display: flex;
                            gap: 12px;

                            // .day-index {}

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

                .journey-column {
                    .journey-block {
                        .paragraph {
                            p {
                                // font-size: $base-fontSize * 1.2;
                                font-size: 18px;
                            }

                        }
                    }
                }
            }
        }
    }
}
</style>