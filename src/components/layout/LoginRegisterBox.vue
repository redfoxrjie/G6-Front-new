<template>
    <section class="modal" v-if="isVisible">
        <div class="container">
            <div class="form-box" ref="formBox">
                <div class="register-box" ref="registerBox" :class="{ hidden: !switchLogin }">
                    <h1>register</h1>
                    <!-- Input fields -->
                    <div class="form-input"><input type="text" placeholder="用戶名稱">
                        <font-awesome-icon :icon="['fas', 'user']" class="input-icon" />
                    </div>
                    <div class="form-input"><input type="email" placeholder="Email">
                        <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
                    </div>
                    <div class="form-input"><input type="password" placeholder="設定密碼">
                        <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
                    </div>
                    <div class="form-input"><input type="password" placeholder="再次確認密碼">
                        <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
                    </div>
                    <button class="register-btn">註冊</button>
                    <button class="else-way">
                        <img src="/src/assets/images/global/icons/google.png" alt="">使用google帳號註冊
                    </button>
                </div>
                <div class="login-box" ref="loginBox" :class="{ hidden: switchLogin }">
                    <h1>login</h1>
                    <!-- Input fields -->
                    <div class="form-input">
                        <input type="email" placeholder="Email">
                        <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
                    </div>
                    <div class="form-input"><input type="password" placeholder="輸入密碼">
                        <font-awesome-icon :icon="['fas', 'lock']" class="input-icon" />
                    </div>
                    <div class="credentials-container">
                        <input type="checkbox" id="remember-email">
                        <label for="remember-email">記住Email</label>
                        <a href="#" class="forgot-password">忘記密碼?</a>
                    </div>
                    <button class="login-btn" @click="$emit('close')">登入</button>
                    <button class="else-way">
                        <img src="/src/assets/images/global/icons/google.png" alt="">使用google帳號登入
                    </button>
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
import { ref, defineProps, defineEmits } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faLock, faEnvelope);

const props = defineProps({
    isVisible: Boolean
});

const emit = defineEmits(['close']);

const switchLogin = ref(true);
const formBox = ref(null);
const registerBox = ref(null);
const loginBox = ref(null);

const switchLoginEvent = () => {
    switchLogin.value = !switchLogin.value;
    const translateValue = switchLogin.value ? '-0%' : '93%';
    formBox.value.style.transform = `translateX(${translateValue})`;
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
}

.credentials-container input[type="checkbox"] {
    width: auto;
    margin-right: 5px;
}

.credentials-container label {
    margin-right: auto;
    color: $secondColor-1
}

.credentials-container .forgot-password {
    margin-left: auto;
    color: $secondColor-1;
    text-decoration: none;
}

.credentials-container .forgot-password:hover {
    text-decoration: underline;
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
}

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
}

input:focus::placeholder {
    opacity: 1;
}

.input-icon {
    color: $secondColor-1;
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
}

.form-box button:hover {
    background-color: $accentColor-2;
    color: #fff;
    transition: background-color 0.5s ease;
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
}

.con-box.left {
    left: -1%;
}

.con-box.right {
    right: -1%;
}

.con-box h2 {
    color: #8e9aaf;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-size: 0.875rem;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}

.con-box span {
    color: $accentColor-1;
}

.con-box img {
    width: 300px;
    height: 190px;
    opacity: 0.9;
    margin: 40px 0;
}

.con-box button {
    margin-top: 3%;
    background-color: #fff;
    color: $secondColor-2;
    border: 1px solid $secondColor-2;
    padding: 6px 10px;
    border-radius: 28px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
}

.con-box button:hover {
    background-color: $secondColor-2;
    color: #fff;
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
</style>
