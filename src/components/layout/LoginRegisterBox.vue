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
                    <div class="form-input"><input v-model="registerPassword" :type="registerPasswordType"
                            placeholder="設定密碼">
                        <font-awesome-icon
                            :icon="registerPasswordType === 'password' ? ['fas', 'lock'] : ['fas', 'unlock']"
                            class="input-icon" @click="togglePasswordVisibility('register')" />
                    </div>
                    <div class="form-input"><input v-model="registerPasswordConfirm" :type="registerPasswordConfirmType"
                            placeholder="再次確認密碼">
                        <font-awesome-icon
                            :icon="registerPasswordConfirmType === 'password' ? ['fas', 'lock'] : ['fas', 'unlock']"
                            class="input-icon" @click="togglePasswordVisibility('registerConfirm')" />
                    </div>
                    <button class="register-btn" @click="register" type="submit">註冊</button>
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
                        <input v-model="email" type="email" placeholder="Email">
                        <font-awesome-icon :icon="['fas', 'envelope']" class="input-icon" />
                    </div>
                    <div class="form-input"><input v-model="password" :type="loginPasswordType" placeholder="輸入密碼">
                        <font-awesome-icon
                            :icon="loginPasswordType === 'password' ? ['fas', 'lock'] : ['fas', 'unlock']"
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
import { ref, defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';
import { isValidEmail, isValidPassword } from '@/components/layout/validation';

const props = defineProps({
    isVisible: Boolean
});

const emit = defineEmits(['close']);

const switchLogin = ref(true);
const formBox = ref(null);
const registerBox = ref(null);
const loginBox = ref(null);

// 登入表單的輸入綁定
const email = ref('');
const password = ref('');
const loginPasswordType = ref('password');

// 註冊表單的輸入綁定
// const registerEmail = ref('');
// const registerUsername = ref('');
// const registerPassword = ref('');
// const registerPasswordConfirm = ref('');
// const registerPasswordType = ref('password');
// const registerPasswordConfirmType = ref('password');

// 切換密碼可見性
const togglePasswordVisibility = (field) => {
    if (field === 'login') {
        loginPasswordType.value = loginPasswordType.value === 'password' ? 'text' : 'password';
    } else if (field === 'register') {
        registerPasswordType.value = registerPasswordType.value === 'password' ? 'text' : 'password';
    } else if (field === 'registerConfirm') {
        registerPasswordConfirmType.value = registerPasswordConfirmType.value === 'password' ? 'text' : 'password';
    }
};

// 登入事件
const login = async () => {
    if (!email.value && !password.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請輸入email及密碼'
        });
    } else if (!email.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '請輸入有效email'
        });
    } else if (!isValidEmail(email.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'email格式錯誤'
        });
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
            text: '(必須為8字元，且包含半形英文字母小寫及數字)',
        });
    } else {
        try {
            // 模擬API請求
            const response = await fetch('/public/json/users.json');
            const data = await response.json();
            const user = data.users.find(u => u.email === email.value && u.password === password.value);

            if (user) {
                Swal.fire({
                    icon: 'success',
                    title: '登入成功!',
                    showConfirmButton: false,
                });
                emit('close');  //假設登入後關閉彈窗
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
    }
};

// // 註冊事件
// const register = async () => {
//     if (!registerEmail.value && !registerUsername.value && !registerPassword.value && !registerPasswordConfirm.value) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: '請輸入所有必填字段'
//         });
//     } else if (!registerEmail.value) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: '請輸入有效email'
//         });
//     } else if (!isValidEmail(registerEmail.value)) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Invalid Email',
//             text: 'email格式錯誤'
//         });
//     } else if (!registerUsername.value) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: '請輸入用戶名稱'
//         });
//     } else if (!registerPassword.value) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: '請輸入密碼'
//         });
//     } else if (!isValidPassword(registerPassword.value)) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Invalid Password',
//             text: '(必須為8字元，且包含半形英文字母小寫及數字)',
//         });
//     } else if (registerPassword.value !== registerPasswordConfirm.value) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: '兩次密碼輸入不一致'
//         });
//     } else {
//         try {
//             // 模擬API請求
//             const response = await fetch('/public/json/users.json');
//             const data = await response.json();
//             const user = data.users.find(u => u.email === registerEmail.value);

//             if (!user) {
//                 data.users.push({
//                     email: registerEmail.value,
//                     username: registerUsername.value,
//                     password: registerPassword.value
//                 });
//                 Swal.fire({
//                     icon: 'success',
//                     title: '註冊成功!',
//                     showConfirmButton: false,
//                 });
//                 emit('close');  //假設註冊後關閉彈窗
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Registration Failed',
//                     text: '該email已存在'
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration Failed',
//                 text: '註冊失敗'
//             });
//             console.error('Registration error:', error);
//         }
//     }
// };

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
