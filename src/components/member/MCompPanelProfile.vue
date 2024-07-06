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
                            <div v-if="key === 'birthdate'">
                                <input type="date" v-model="userData[key]" :name="key" :id="key">
                            </div>
                            <div v-else-if="key !== 'status'">
                                <input type="text" v-model="userData[key]" :name="key" :id="key">
                            </div>
                            <div v-else>
                                <span>{{ accountStatus }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pswInputRow inputrow" v-else-if="tabview == 'password'">
                        <div class="pswInput" v-for="(value, key) in passwordInput" :key="key">
                            <p>{{ value }}</p>
                            <input type="password" v-model="passwordData[key]" :name="key" :id="key">
                        </div>
                    </div>
                </form>
            </div>
            <div class="panelBtns">
                <button id="cancelbtn" class="btn-3" @click="cancelEdit">取消編輯</button>
                <button id="savebtn" class="btn-2" @click="saveEdit">儲存</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const tabview = ref('profile');
const profileInput = {
    memNickname: "暱稱",
    birthdate: "出生日期",
    email: "聯絡Email",
    country: "國家",
    mobile: "聯絡電話",
    status: "帳號狀態:",
};
const passwordInput = {
    orginalPsw: "輸入舊密碼",
    newPsw: "輸入新密碼",
    confirmNewPsw: "確認新密碼",
};
const userData = ref({
    memNickname: '',
    birthdate: '',
    email: '',
    country: '',
    mobile: '',
    status: 1
});
const passwordData = ref({
    orginalPsw: '',
    newPsw: '',
    confirmNewPsw: '',
});
const router = useRouter();
const userStore = useUserStore();
const userId = computed(() => userStore.userId);

const changetab = (tab) => {
    if (tab == tabview.value) return;
    tabview.value = tab;
};

const fetchUserData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getUserInfo.php?userId=${userId.value}`);
        if (response.data.success) {
            userData.value = response.data.userData;
        } else {
            console.error('獲取會員資料失敗:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

// 設定密碼三個判斷

const validatePassword = () => {
    if (!passwordData.value.orginalPsw) {
        Swal.fire({
            title: '請輸入舊密碼',
            icon: 'error',
            confirmButtonText: '確定'
        });
        return false;
    }
    const newPsw = passwordData.value.newPsw;
    if (!newPsw || newPsw.length < 6 || !/[a-zA-Z]/.test(newPsw) || !/\d/.test(newPsw)) {
        Swal.fire({
            title: '新密碼需至少6碼並包含中英混合',
            icon: 'error',
            confirmButtonText: '確定'
        });
        return false;
    }
    if (newPsw !== passwordData.value.confirmNewPsw) {
        Swal.fire({
            title: '新密碼與確認密碼不一致',
            icon: 'error',
            confirmButtonText: '確定'
        });
        return false;
    }
    return true;
};

const validateOldPassword = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/validatePws.php`, {
            userId: userId.value,
            orginalPsw: passwordData.value.orginalPsw
        });
        return response.data.success;
    } catch (error) {
        console.error('Error validating old password:', error);
        return false;
    }
};

const saveEdit = async () => {
    try {
        if (tabview.value === 'profile') {
            // 保存會員基本資料
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/getUserInfo.php`, {
                ...userData.value,
                userId: userId.value,
            });
            if (response.data.success) {
                Swal.fire({
                    title: '儲存成功',
                    icon: 'success',
                    confirmButtonText: '確定'
                });
            } else {
                Swal.fire({
                    title: '儲存失敗',
                    icon: 'error',
                    confirmButtonText: '確定'
                });
            }
        } else if (tabview.value === 'password') {
            if (!validatePassword()) return;
            const oldPasswordValid = await validateOldPassword();
            if (!oldPasswordValid) {
                Swal.fire({
                    title: '舊密碼不正確',
                    icon: 'error',
                    confirmButtonText: '確定'
                });
                return;
            }
            // 保存密碼修改
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/updatePws.php`, {
                userId: userId.value,
                newPsw: passwordData.value.newPsw
            });
            if (response.data.success) {
                Swal.fire({
                    title: '密碼修改成功',
                    icon: 'success',
                    confirmButtonText: '確定'
                });
            } else {
                Swal.fire({
                    title: '密碼修改失敗',
                    icon: 'error',
                    confirmButtonText: '確定'
                });
            }
        }
    } catch (error) {
        Swal.fire({
            title: '儲存過程中出現錯誤',
            icon: 'error',
            confirmButtonText: '確定'
        });
        console.error('Error saving user data:', error);
    }
};
const accountStatus = computed(() => {
    return userData.value.status === 1 ? '停權' : '正常';
});

const cancelEdit = () => {
    fetchUserData(); //取得資料重置表單
};


onMounted(() => {
    fetchUserData(); //加載時取得會員資料
});
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

        .profileInput,
        .pswInput {
            margin-top: 10px;
        }


        .formwrap {
            padding: 20px 0;

            .panelForm {
                .inputrow {
                    input {
                        line-height: 24px;
                        border: 1px solid $secondColor-2;
                        padding: 0 2px;
                        border-radius: 5px;
                    }

                }
            }

        }

        .panelBtns {
            float: right;

            button {
                margin-left: 10px;
            }
        }
    }
}


form {
    width: 100%;
}
</style>