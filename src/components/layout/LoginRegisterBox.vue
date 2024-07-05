<template>
    <section class="modal" v-if="isVisible">
        <div class="container">
            <div class="form-box" ref="formBox">
                <div class="register-box" ref="registerBox" :class="{ hidden: !switchLogin }">
                    <h1>register</h1>
                    <!-- Input fields -->
                    <div class="form-input"><input type="text" placeholder="用戶名稱" v-model="registerUsername">
                        <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                    </div>
                    <div class="form-input"><input type="text" placeholder="帳號" v-model="registerAccount">
                        <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                    </div>
                    <div class="form-input"><input v-model="registerPws" :type="registerPwsType" placeholder="設定密碼">
                        <font-awesome-icon
                            :icon="registerPwsType === 'password' ? ['fas', 'eye-slash'] : ['fas', 'eye']"
                            class="input-icon" @click="togglePasswordVisibility('register')" />
                    </div>
                    <div class="form-input"><input v-model="registerPwsConfirm" :type="registerPwsConfirmType"
                            placeholder="再次確認密碼">
                        <font-awesome-icon
                            :icon="registerPwsConfirmType === 'password' ? ['fas', 'eye-slash'] : ['fas', 'eye']"
                            class="input-icon" @click="togglePasswordVisibility('registerConfirm')" />
                    </div>
                    <button class="register-btn" @click="handleRegistration" type="submit">註冊</button>
                    <button class="else-way">
                        <img src="/src/assets/images/global/icons/google.png" alt="">使用google帳號註冊
                    </button>
                    <div class="rwd-btn">
                        <p>已有會員?</p>
                        <button @click="switchLoginEvent">會員登入</button>
                    </div>
                </div>
                <div class="login-box" ref="loginBox" :class="{ hidden: switchLogin }" @submit="submitOrder">
                    <h1>login</h1>
                    <!-- Input fields -->
                    <div class="form-input">
                        <input type="text" v-model="account" placeholder="輸入帳號">
                        <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                    </div>
                    <div class="form-input"><input v-model="password" :type="loginPasswordType" placeholder="輸入密碼">
                        <font-awesome-icon
                            :icon="loginPasswordType === 'password' ? ['fas', 'eye-slash'] : ['fas', 'eye']"
                            class="input-icon" @click="togglePasswordVisibility('login')" />
                    </div>
                    <div class="credentials-container">
                        <input type="checkbox" id="remember-email">
                        <label for="remember-email">記住Email</label>
                        <a href="#" class="forgot-password">忘記密碼?</a>
                    </div>
                    <button class="login-btn" @click="login" type="submit">登入</button>
                    <button class="else-way">
                        <img src="/src/assets/images/global/icons/google.png" alt="">使用google帳號登入
                    </button>
                    <div class="rwd-btn">
                        <p>還沒有帳號?</p>
                        <button @click="switchLoginEvent">立即註冊</button>
                    </div>
                </div>
            </div>
            <div class="con-box left">
                <button class="close-left-btn" @click="$emit('close')">✖</button>

                <h2>歡迎來到<span>土狗旅遊</span></h2>
                <p>快來踏上屬於你的旅程吧</p>
                <img src="/src/assets/images/register_box.png" alt="註冊燈箱圖片">
                <p>還沒有帳號?</p>
                <button @click="switchLoginEvent">立即註冊</button>
            </div>
            <div class="con-box right">
                <button class="close-right-btn" @click="$emit('close')">✖</button>
                <h2>歡迎來到<span>土狗旅遊</span></h2>
                <p>快來踏上屬於你的旅程吧</p>
                <img src="/src/assets/images/login_box.png" alt="登入燈箱圖片">
                <p>已經是會員了?</p>
                <button @click="switchLoginEvent">會員登入</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import apiInstance from '@/plugins/api';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { ref, defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';
import { isValidPassword } from '@/components/layout/validation';

const userStore = useUserStore();
const { isLoggedIn, userInfo } = storeToRefs(userStore);

const props = defineProps({
    isVisible: Boolean
});

const emit = defineEmits(['close']);

const switchLogin = ref(true);
const formBox = ref(null);
const registerBox = ref(null);
const loginBox = ref(null);

// 登入表單的輸入綁定
const account = ref('');
const password = ref('');
const loginPasswordType = ref('password');

// 註冊表單的輸入綁定
const registerUsername = ref('');
const registerAccount = ref('');
const registerPws = ref('');
const registerPwsConfirm = ref('');
const registerPwsType = ref('password');
const registerPwsConfirmType = ref('password');

// 切換密碼可見性
const togglePasswordVisibility = (field) => {
    if (field === 'login') {
        loginPasswordType.value = loginPasswordType.value === 'password' ? 'text' : 'password';
    } else if (field === 'register') {
        registerPwsType.value = registerPwsType.value === 'password' ? 'text' : 'password';
    } else if (field === 'registerConfirm') {
        registerPwsConfirmType.value = registerPwsConfirmType.value === 'password' ? 'text' : 'password';
    }
};

watch(isLoggedIn, (newValue) => {
    if (newValue) {
        console.log('用戶已登入:', userInfo.value);
        // 可以在這裡執行其他登入後的操作
    }
});

// 登入事件
const login = async () => {
    if (!account.value && !password.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請輸入帳號及密碼'
        });
    } else if (!account.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請輸入有效帳號'
        });
        // } else if (!isValidEmail(account.value)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Invalid Email',
        //         text: 'email格式錯誤'
        //     });
    } else if (!password.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請輸入密碼'
        });
    } else if (!isValidPassword(password.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text: '(必須為6字元，且包含半形英文字母小寫及數字)',
        });
        return;
    }
    const formData = new FormData();
    formData.append('u_account', account.value);
    formData.append('u_psw', password.value);

    try {
        const response = await apiInstance.post('http://localhost/phpG6/api/login.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.code === 1 && response.data.memInfo) {
            console.log('登入成功，會員資料：', response.data.memInfo)

            // 更新 Pinia store
            userStore.setUser(response.data.memInfo)

            // 驗證狀態是否正確更新
            console.log('更新後的登入狀態：', userStore.isLoggedIn)
            console.log('更新後的用戶信息：', userStore.userInfo)

            emit('close', { status: 'login-success', user: response.data.memInfo });
            ;  //假設登入後關閉彈窗
            Swal.fire({
                icon: 'success',
                title: '登入成功!',
                timer: 1500,
                showConfirmButton: false,
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: '無法找到該用戶'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: '查無此帳號存在'
        });
        console.error('Login error:', error);
    }
};

// 在組件掛載時檢查並恢復登入狀態
onMounted(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserInfo = localStorage.getItem('userInfo');

    console.log('檢查本地存儲的登入狀態：', storedIsLoggedIn);
    console.log('檢查本地存儲的用戶資訊：', storedUserInfo);

    if (storedIsLoggedIn === 'true' && storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        console.log('恢復用戶登入狀態：', parsedUserInfo);
        userStore.setUser(parsedUserInfo);
    }
});

// 註冊事件
const handleRegistration = async () => {
    if (!registerUsername.value || !registerAccount.value || !registerPws.value || !registerPwsConfirm.value) {
        Swal.fire({ icon: 'error', title: '錯誤', text: '所有欄位都是必填的' });
        return;
    }
    // if (!isValidEmail(registerAccount.value)) {
    //     Swal.fire({ icon: 'error', title: '無效的Email', text: '請輸入有效的Email地址' });
    //     return;
    // }
    if (!isValidPassword(registerPws.value)) {
        Swal.fire({ icon: 'error', title: '無效的密碼', text: '密碼需要至少6個字符，並包含至少一個字母和一個數字' });
        return;
    }
    if (registerPws.value !== registerPwsConfirm.value) {
        Swal.fire({ icon: 'error', title: '密碼不匹配', text: '兩次輸入的密碼不一致' });
        return;
    }

    const formData = new FormData();
    formData.append('username', registerUsername.value);
    formData.append('account', registerAccount.value);
    formData.append('password', registerPws.value);
    formData.append('nickname', registerUsername.value); // 將使用者名稱作為暱稱

    try {
        const response = await apiInstance.post('http://localhost/phpG6/api/register.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.code === 1) {
            Swal.fire({ icon: 'success', title: '註冊成功', text: '您已成功註冊！' });
        } else {
            Swal.fire({ icon: 'error', title: '註冊失敗', text: response.data.msg });
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: '註冊失敗', text: '網絡或服務器問題' });
        console.error('Registration error:', error);
    }
};

// 登入註冊切換
const switchLoginEvent = () => {
    switchLogin.value = !switchLogin.value;

    if (window.innerWidth > 768) {
        const translateValue = switchLogin.value ? '-0%' : '93%';
        formBox.value.style.transform = `translateX(${translateValue})`;
    }
    //RWD
    if (switchLogin.value) {
        loginBox.value.classList.add('hidden');
        registerBox.value.classList.remove('hidden');
    } else {
        registerBox.value.classList.add('hidden');
        loginBox.value.classList.remove('hidden');
    }
};

const closeForm = () => {
    isVisible.value = false;
};
</script>



<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // 半透明背景
    z-index: 1000; // 確保 z-index 高於其他元素
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-right-btn {
    position: absolute;
    top: -68px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
}

.close-left-btn {
    position: absolute;
    top: -68px;
    right: 330px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
}


.container {
    background-color: #fff;
    width: 770px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.form-box {
    position: absolute;
    // left: 5%;
    background-color: $secondColor-2;
    ;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: 0.5s ease-in-out;
    transform: translateX(-3%);
}

.register-box,
.login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.credentials-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    margin: 10px 0;

    input[type="checkbox"] {
        width: auto;
        margin-right: 5px;
    }

    label {
        margin-right: auto;
        color: $secondColor-1
    }

    .forgot-password {
        margin-left: auto;
        color: $secondColor-1;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

.hidden {
    display: none;
    transition: 0.5s;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    text-transform: uppercase;
    color: #fff;
    letter-spacing: 5px;
}

.form-input {
    width: 70%;
    margin: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);

    input {
        background-color: transparent;
        width: 90%;
        color: #fff;
        border: none;
        padding: 10px 0;
        text-indent: 10px;
        letter-spacing: 2px;
        font-size: 0.92rem;
    }

    input::placeholder {
        color: #fff;
    }

    input:focus {
        color: #fff;
        outline: none;
        border-bottom: 1px solid #fff;
        transition: 0.5s;

        input:focus::placeholder {
            opacity: 1;
        }
    }

    .input-icon {
        color: $secondColor-1;
    }
}


.register-btn,
.login-btn {
    width: 70%;
    margin-top: 5%;
    background-color: $accentColor-1;
    outline: none;
    border-radius: 28px;
    padding: 13px;
    color: #fff;
    font-size: 1rem;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: $accentColor-2;
        color: #fff;
        transition: background-color 0.5s ease;
    }
}

.con-box {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    h2 {
        color: #8e9aaf;
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 3px;
        text-align: center;
        margin-bottom: 4px;
    }

    p {
        font-size: 0.875rem;
        letter-spacing: 2px;
        color: #8e9aaf;
        text-align: center;
    }

    span {
        color: $accentColor-1;
    }

    img {
        width: 300px;
        height: 190px;
        opacity: 0.9;
        margin: 40px 0;
    }

    button {
        margin-top: 3%;
        background-color: #fff;
        color: $secondColor-2;
        border: 1px solid $secondColor-2;
        padding: 6px 10px;
        border-radius: 28px;
        letter-spacing: 1px;
        outline: none;
        cursor: pointer;

        &:hover {
            background-color: $secondColor-2;
            color: #fff;
        }
    }
}

.con-box.left {
    left: -1%;
}

.con-box.right {
    right: -1%;
}


.else-way {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    letter-spacing: 1.4;
    width: 70%;
    margin-top: 5%;
    background-color: #fff;
    outline: none;
    border-radius: 28px;
    padding: 13px;
    color: "black";
    font-size: 1rem;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}

.form-box button.else-way:hover {
    background-color: $secondColor-1;
    color: #fff;
}

.else-way img {
    width: 8%;
    padding: 0 0.3rem;
}

.rwd-btn {
    display: none;
}

@media (max-width: 768px) {
    .modal {
        height: 108%;
    }

    .container {
        width: 400px;
        margin: 5% 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .con-box img {
        display: none;
    }


    .rwd-btn {
        display: flex;
        align-items: center;
        margin-top: 5%;

        button {
            background-color: $secondColor-1;
            border-radius: 28px;
            margin-left: 10px;
            // padding: 5px;
        }

        &:hover {
            text-decoration: dashed;
        }
    }

    .close-right-btn {
        top: -227px;
        right: 184px;
    }

    .close-left-btn {
        position: absolute;
        display: none;
    }

    .form-box {
        position: relative;
        width: 100%;
        height: 100%;
        transform: translateX(0%);
        transition: transform 0.5s ease-in-out;
    }

    .hidden {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        top: 0;
    }
}
</style>
