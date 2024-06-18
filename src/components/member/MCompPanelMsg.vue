<template>
    <div class="panelwrap">
        <div class="tabsList row">
            <div class="tab col-3" @click="changetab('system')" :class="{ 'active': tabview == 'system' }">
                <h4>系統公告</h4>
            </div>
            <div class="tab col-3" @click="changetab('comment')" :class="{ 'active': tabview == 'comment' }">
                <h4>留言</h4>
            </div>
        </div>
        <div class="panelContent">
            <div class="systemMsgView" v-if="tabview == 'system'">
                <div class="s-msgwrap">
                    <p>您的文章登上熱門排行</p>
                </div>
                <div class="s-msgwrap">
                    <p>您的文章「北海道旅遊一天一夜」被檢舉並確認違規，已移除。 </p>
                </div>
            </div>
            <!-- 我的通知/留言 -->
            <div class="commentMsgView" v-else-if="tabview == 'comment'">
                <div class="container">
                    <div class="faq" id="accordion">
                        <div v-for="(item, index) in faqItems" :key="index" class="card">
                            <div class="card-header" :id="'faqHeading-' + index">
                                <div class="mb-0">
                                    <h5 class="faq-title" :data-toggle="'collapse'"
                                        :data-target="'#faqCollapse-' + index" :aria-expanded="index === 0"
                                        :aria-controls="'faqCollapse-' + index" @click="toggle(index)">
                                        <span>{{ item.time }}</span>
                                        <span>{{ item.author }}</span>
                                        <span>{{ item.title }}</span>
                                    </h5>
                                </div>
                            </div>
                            <div v-show="index === activeIndex" class="card-body">
                                <div class="card-body">
                                    <p>{{ item.content }}</p>
                                    <div class="reply-textbox">
                                        <textarea v-model="item.reply" placeholder="Type your reply..."></textarea>
                                    </div>
                                </div>
                            </div>
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
            tabview: 'system',
            profileInput: {
                memName: "姓名",
                birthdate: "出生日期",
                memNickname: "暱稱",
                email: "聯絡Email",
                mobile: "聯絡電話",
            },
            passwordInput: {
                orginalPsw: "輸入舊密碼",
                newPsw: "輸入新密碼",
                confirmNewPsw: "確認新密碼",
            },
            // ========我的通知/留言
            activeIndex: null,
            faqItems: [
                {
                    time: '1天前',
                    author: '貪吃鬼霓虹狗',
                    title: '北九州五天四夜|浪漫花海、私房夜景看不完',
                    content:
                        '我也超喜歡門司港的バナナカステラ~香蕉的味道很濃厚，而且底層砂糖顆粒脆脆的嚼感很讚~ 可惜當時買太少了，分給家裡弟弟妹妹之後就沒剩幾塊，下次去一定要買多一點。',
                    reply: ''
                },
                {
                    time: '1週前',
                    author: '金煌芒狗勾',
                    title: '北九州五天四夜|浪漫花海、私房夜景看不完',
                    content:
                        '北九州風景優美，人文歷史豐富，適合深度旅行。推薦參觀小倉城、門司港、和士的河口，體驗當地美食與溫泉。',
                    reply: ''
                }
            ]

        }
    },
    methods: {
        changetab(tab) {
            if (tab == this.tabview) return
            this.tabview = tab;
        },
        // ========我的通知/留言
        toggle(index) {
            this.activeIndex = this.activeIndex === index ? null : index
        }
    },
}


</script>
<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';
@import '@/assets/styles/components/btn';

.panelwrap {
    .tabsList {
        border-bottom: 2px solid $secondColor-2 ;

        .tab {
            box-sizing: border-box;
            text-align: center;
            // padding-right:100/12*1%;
            padding-right: 20px;
            cursor: pointer;

            h4 {
                padding: 8px 0;
                border: 1.5px solid $secondColor-2;
                border-bottom: 0;
                // letter-spacing: 5px;
                color: $secondColor-2;
            }

            &.active h4 {
                background-color: $secondColor-2;
                color: $primaryColor;
            }
        }

    }

    .panelContent {
        .systemMsgView {
            margin: 20px 0;

            .s-msgwrap {
                box-sizing: border-box;
                padding: 5px 10px;
                border-bottom: 1px solid $gray;
                margin: 4px 0;
            }
        }
        // 我的通知/留言
        .commentMsgView {
            margin: 20px 0;
        }
        .faq-title h2 {
            position: relative;
            margin-bottom: 45px;
            display: inline-block;
            font-weight: 600;
            line-height: 1;
        }
        .faq-title h2::before {
            content: '';
            position: absolute;
            left: 50%;
            width: 60px;
            height: 2px;
            background: #e91e63;
            bottom: -25px;
            margin-left: -30px;
        }
        .faq-title p {
            padding: 0 190px;
            margin-bottom: 10px;
        }
        .faq {
            // background: #ffffff;
            border-radius: 4px;
        }
        .faq .card {
            border: none;
            background: none;
            border-bottom: 1px dashed #cee1f8;
            width: 48vw;
        }
        .faq .card .card-header {
            padding: 0px;
            border: none;
            background: none;
            transition: all 0.3s ease 0s;
        }
        .faq .card .card-header:hover {
            background: #f4da7b;
            border-radius: 1vw;
            padding-left: 10px;
        }
        .faq .card .card-header .faq-title {
            width: 100%;
            text-align: left;
            padding: 0px 30px;
            font-weight: 400;
            font-size: 15px;
            letter-spacing: 1px;
            color: #fff;
            background-color: #4f82d4;
            border-radius: 1vw;
            cursor: pointer;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .faq .card .card-header .faq-title span {
            margin-right: 2vw;
            letter-spacing: 0.25vw;
        }
        .faq .card .card-body {
            padding: 30px 35px 16px;
            font-weight: 400;
            font-size: 16px;
            color: #1c1c1c;
            line-height: 28px;
            letter-spacing: 1px;
            border-top: 1px solid #f3f8ff;
        }
        .faq .card .card-body p {
            margin-bottom: 14px;
        }
        .reply-textbox textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
        }
        @media (max-width: 991px) {
            .faq {
                margin-bottom: 30px;
            }
            .faq .card .card-header .faq-title {
                line-height: 26px;
                margin-top: 10px;
            }
        }
    }
}
</style>
