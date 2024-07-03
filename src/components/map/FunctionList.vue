<template>
    <ul class="function-list">
        <li id="uploadCover" @click="triggerFileUpload">
            上傳封面照片
            <font-awesome-icon icon="image" />
        </li>
        <!-- 隱藏的上傳圖片用 input  -->
        <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileUpload" 
            style="display: none;" 
            accept="image/*" 
        />
        <li id="editPlanSetting" @click="handleEditPlanSetting">
            行程設定
            <font-awesome-icon icon="gear" />
        </li>
    </ul>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            coverImageUrl: sessionStorage.getItem('coverImage') || ''
        };
    },
    mounted() {
        // 監聽 beforeunload 事件
        window.addEventListener('beforeunload', this.clearCoverImage);
    },
    beforeUnmount() {
    // 移除 beforeunload 事件監聽
    window.removeEventListener('beforeunload', this.clearCoverImage);
    },
    methods: {
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const files = event.target.files;
            if (!files.length) {
                console.log('沒有選擇任何檔案');
                return;
            }
            const file = files[0];
            console.log('選擇的檔案:', file.name);

            // 檢查檔案是否為圖片格式
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    title: '圖片格式錯誤',
                    text: '請選擇圖片格式的檔案',
                    icon: 'error',
                    confirmButtonText: '確定'
                });
                return;
            }

            // 檢查檔案大小是否超過2MB
            const maxSizeMB = 2;
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size > maxSizeBytes) {
                Swal.fire({
                    title: '超過檔案大小限制',
                    text: `請選擇小於 ${maxSizeMB}MB 的檔案`,
                    icon: 'error',
                    confirmButtonText: '確定',
                    confirmButtonColor: '#4F82D4'
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                // 將圖片資料傳遞給父組件
                this.$emit('coverImageUploaded', e.target.result);
            
                // 儲存圖片資料到 sessionStorage
                sessionStorage.setItem('coverImage', e.target.result);
                this.coverImageUrl = e.target.result;
            
                console.log('檔案已上傳並儲存:', e.target.result);
            };
            reader.readAsDataURL(files[0]);
        },
        clearCoverImage() {
            // 清除 sessionStorage 中的 coverImage 資料
            sessionStorage.removeItem('coverImage');
            console.log('coverImage 已清除');
        },
        // 處理並傳送點擊EditPlanSetting觸發的事件到父組件
        handleEditPlanSetting() {
            this.$emit('edit-plan-setting');
        },
    },
};
</script>

<style lang="scss" scoped>
    @import '@/assets/styles/base/color';
    @import '@/assets/styles/base/font';

    .function-list {
        background-color: #fff;
        padding: 4px 0;
        border-radius: 0 0 5px 5px;
        position: absolute;
        width: 45%;
        top: 34px;
        right: 16px;
        z-index: 1;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        li {
            width: 100%;
            padding: 8px 12px;
            color: $black;
            font-size: 0.875rem;
            display: block;
            cursor: pointer;
            &:hover {
                background-color: $secondColor-2;
                color: #fff;
            }
        }
    }
</style>