<template>
    <div class="panelwrap">
        <div class="tabsList row">
            <div class="tab col-3" @click="changetab('profile')" :class="{ 'active': tabview == 'profile' }">
                <h4>基本資料</h4>
            </div>
            <div class="tab col-3" @click="changetab('password')" :class="{ 'active': tabview == 'password' }">
                <h4>修改密碼</h4>
            </div>
        </div>
        <div class="panelContent">
            <div class="formwrap">
                <form action="" class="panelForm">


                    <div class="profileInputRow inputrow" v-if="tabview == 'profile'">
                        <div class="profileInput col col-3" v-for="(value, key) in profileInput" :key="key">
                            <p>{{ value }}</p>
                            <input type="text" name="" id="">
                        </div>

                    </div>
                    <div class="pswInputRow inputrow" v-else-if="tabview == 'password'">
                        <div class="pswInput" v-for="(value, key) in passwordInput" :key="key">
                            <p>{{ value }}</p>
                            <input type="text" name="" id="">
                        </div>

                    </div>
                </form>                
            </div>

            <div class="panelBtns">
                <button id="cancelbtn" class="btn-2">取消編輯</button>
                <button id="savebtn" class="btn-2">儲存</button>
            </div>
        </div>
    </div>
</template>
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
        .formwrap{
            padding: 20px 0;
            .panelForm{
                .inputrow{
                    input{
                        line-height: 24px;
                        border: 1px solid $secondColor-2;
                        padding: 0 2px;
                        border-radius: 5px;
                    }

                }                
            }

        }
        .panelBtns{
            float: right;
            button{
                margin-left: 10px;
            }
        }
    }
}


form {
    width: 100%;
}
</style>
<script>
export default {
    data() {
        return {
            tabview: 'profile',
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