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
                <div class="s-msgwrap"><p>您的文章登上熱門排行</p></div>
                <div class="s-msgwrap"><p>您的文章「北海道旅遊一天一夜」被檢舉並確認違規，已移除。 </p></div>
            </div>
            <div class="commentMsgView" v-else-if="tabview == 'comment'">
                <p>1天前</p>
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
            }

        }
    },
    methods: {
        changetab(tab) {
            if (tab == this.tabview) return
            this.tabview = tab;
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
    .panelContent{
        .systemMsgView{
            margin: 20px 0;
            .s-msgwrap{
                box-sizing: border-box;
                padding: 5px 10px;
                border-bottom: 1px solid $gray;
                margin:4px 0;
            }
        }
        // .commentMsgView{

        // }
    }
}
</style>