<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>忘記密碼</h2>
            <form @submit.prevent="sendResetEmail">
                <input type="email" v-model="resetEmail" placeholder="請輸入您的郵件地址" required />
                <button class="btn-1" type="submit">發送重置密碼郵件</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const props = defineProps({
    isVisible: Boolean
});

const emit = defineEmits(['close']);

const resetEmail = ref('');

const closeModal = () => {
    emit('close');
};

const sendResetEmail = () => {
    emailjs.send('service_ujrojgv', 'template_9uh3s4p', {
        to_email: resetEmail.value
    }, 'zt6hW0em0zGYoWgOo')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            Swal.fire('成功', '重置密碼郵件已發送，請檢查您的郵箱。', 'success');
            closeModal();
        }, (error) => {
            console.log('FAILED...', error);
            Swal.fire('失敗', '發送失敗，請重試。', 'error');
        });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles//components/_btn';

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    position: relative;
    border-radius: 10px;

    input {
        margin-right: 10px;
    }
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>