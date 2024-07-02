<template>
    <div class="light-box">
        <div class="light-box-container">
            <div class="header-block">
                <div class="title">
                    <h3>設定當天出發時間</h3>
                </div>
                <div class="input-wrapper">
                    <label for="editTime">
                        <h4>出發時間</h4>
                    </label>
                    <!-- 使用 v-model 雙向綁定 -->
                    <input type="time" id="editTime" name="edit-time" min="00:00" max="23:59" pattern="([01]?[0-9]|2[0-3]): [0-5][0-9]" required v-model="selectedTime">
                </div>
            </div>
            <div class="footer-block">
                <div class="btn-wrapper">
                    <button class="btn cancel" @click="cancel">取消</button>
                    <button class="btn confirm" @click="saveTime">儲存</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            selectedTime: ''  // 使用的時間數據
        };
    },
    methods: {
        // 儲存時間的方法
        saveTime() {
            // 檢查是否選擇了時間
            if (!this.selectedTime) {
                // 顯示 SweetAlert 提示
                Swal.fire({
                    title: '錯誤',
                    text: '請選擇出發時間',
                    icon: 'error',
                    confirmButtonText: '確定',
                    confirmButtonColor: '#4F82D4'
                });
                return;
            }
            // 觸發自定義事件，將選擇的時間傳遞給父組件
            this.$emit('time-saved', this.selectedTime);
            console.log('選擇的時間：', this.selectedTime);
        },
        // 取消按鈕的處理邏輯
        cancel() {
            this.$emit('close');
        }
    }
}
</script>


<style lang="scss" scoped>
  @import '@/assets/styles/base/color';
  @import '@/assets/styles/base/font';
  
.hidden {
    display: none;
  }
  .light-box {
    position: absolute;
    top: 25vh;
    left: 47.5vw;
    transform: translateX(-47.5%);
    z-index: 401;
    width: 95%;
    min-width: 300px;
    max-width: 330px;
    background-color: #fff;
    padding: 38px 35px;
    box-sizing: border-box;
    border-radius: 20px;
    .light-box-container {
      width: 100%;
      .header-block {
        .title {
            h3 { margin-bottom: 12px; }
            p { 
                font-size: 0.875rem;
                color: $secondColor-2;
            }
        }
        .input-wrapper {
          input {
            border: 2px solid $secondColor-1;
            border-radius: 5px;
            padding: 4px 16px;
            margin: 12px 0 0;
            font-family: 'HunInn';
            &:focus {
              border: 2px solid $secondColor-2;
              outline: unset;
            }
          }
        }
      }
      .footer-block {
        .btn-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
          .btn {
            flex-grow: 1;
            border-radius: 22px;
            padding: 8px;
            background-color: red;
            cursor: pointer;
            &.cancel {
              background-color: #fff;
              border: 1px solid $secondColor-2;
              color: $secondColor-2;
  
              &:hover {
                color: darken($color: $secondColor-2, $amount: 10);
                transition: background-color 0.3s ease;
              }
            }
  
            &.confirm {
              background-color: $secondColor-2;
              border: 1px solid #fff;
              color: #fff;
  
              &:hover {
                background-color: darken($color: $secondColor-2, $amount: 10);
                transition: background-color 0.3s ease;
              }
            }
          }
        }
      }
    }
  }
</style>