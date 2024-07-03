<template>
  <div class="light-box">
    <div class="light-box-container">
      <div class="header-block">
        <div class="title">
          <h3>建立新行程</h3>
          <p>為你的行程命名並設定日期</p>
        </div>
        <div class="selections">
          <div class="drop-down-box" @click.stop="toggleDropdown('area')">
            <div id="trp_area">{{ selectedArea }}</div>
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </div>
          <ul v-if="showAreaDropdown" class="drop-down-list">
            <li v-for="(area, index) in areas" :key="index" @click="selectArea(area)">
              {{ area }}
            </li>
          </ul>
        </div>
        <div class="input-name">
          <label for="trpName">
            <h5>行程名稱</h5>
          </label>
          <input type="text" id="trpName" name="trp_name" maxlength="14" v-model="tripName" required>
        </div>
        <div class="set-date">
          <div class="date-select">
            <label for="sdate">
              <h5>開始日期</h5>
            </label>
            <input type="date" id="sdate" name="trp_sdate" v-model="startDate" @input="updateEndDateMin">
          </div>
          <div class="date-select">
            <label for="edate">
              <h5>結束日期</h5>
            </label>
            <input type="date" id="edate" name="trp_edate" v-model="endDate" :min="endDateMin">
          </div>
        </div>
        <div class="setting">
          <div class="ispublic" @click="handlePublicClick">
            <div class="lock-icon" :class="{ 'right-icon': isPublic }">
              <font-awesome-icon :icon="isPublic ? 'lock-open' : 'lock'" size="sm"/>
            </div>
            <span class="text">{{ isPublic ? '公開' : '私人' }}</span>
          </div>
        </div>
      </div>
      <div class="footer-block">
        <div class="btn-wrapper">
          <button class="btn cancel" @click="goBack">取消</button>
          <button class="btn confirm" @click="submitForm">建立</button>
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
        tripName: '',
        startDate: '', // 開始日期
        endDate: '', // 結束日期
        endDateMin: '', // 結束日期的最小值
        isPublic: false, // 是否公開
        areas: ['日本', '韓國', '泰國', '港澳'],
        showAreaDropdown: false,
        selectedArea: '日本',
      };
    },
    methods: {
      updateEndDateMin() {
        // 更新結束日期的最小值為開始日期的下一天
        var startDate = new Date(this.startDate);
        startDate.setDate(startDate.getDate() + 1);
        this.endDateMin = startDate.toISOString().split('T')[0];
        
        // 同時更新結束日期的值，確保其不小於最小日期
        if (this.endDate < this.endDateMin) {
          this.endDate = this.endDateMin;
        }
      },
      handlePublicClick() {
        if (!this.isPublic) {
          this.showPublicWarning();
        } else {
          this.togglePublic();
        }
      },
      togglePublic() {
        this.isPublic = !this.isPublic;
      },
      showPublicWarning() {
        Swal.fire({
          title: "確定將行程設為公開？",
          text: "公開的行程不可再恢復成「私人」狀態",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "確認",
          confirmButtonColor: '#4F82D4',
          cancelButtonText: "取消"
        }).then((result) => {
          if (result.isConfirmed) {
            this.togglePublic();
          }
        });
      },
      goBack(){
        this.$router.go(-1);
      },
      toggleDropdown(type) {
        if (type === 'area') {
          this.showAreaDropdown = !this.showAreaDropdown
          this.showNameDropdown = false
        } else if (type === 'name') {
          this.showNameDropdown = !this.showNameDropdown
          this.showAreaDropdown = false
        }
      },
      closeAllDropdowns() {
      this.showAreaDropdown = false
      this.showNameDropdown = false
      },
      selectArea(area) {
        this.selectedArea = area
        this.closeAllDropdowns()
      },
      submitForm() {
        if (!this.tripName || !this.startDate || !this.endDate || !this.selectedArea) {
          Swal.fire({
            icon: 'warning',
            title: '部分資料未填寫',
            text: '請確認所有欄位均填寫完畢',
            confirmButtonColor: '#4F82D4'
          });
        } else {
          const tripData = {
            tripName: this.tripName,
            startDate: this.startDate,
            endDate: this.endDate,
            selectedArea: this.selectedArea,
          };
          this.$emit('submit-trip', tripData);
          this.$emit('update:showBlackLayout', false);
          this.$emit('update:showNewTrpLightBox02', false);
        }
      }
    },
    mounted() {
      // 取得當前日期
      var today = new Date().toISOString().split('T')[0];
  
      // 設定開始日期和結束日期的初始值
      this.startDate = today;
  
      // 設定結束日期的初始值為開始日期加一天
      var startDate = new Date(today);
      startDate.setDate(startDate.getDate() + 1);
      this.endDate = startDate.toISOString().split('T')[0];
  
      // 設定開始日期輸入框的最小日期為當前日期
      document.getElementById('sdate').setAttribute('min', today);
  
      // 設定結束日期輸入框的最小日期為startDate加一天
      this.endDateMin = startDate.toISOString().split('T')[0];

      window.addEventListener('click', this.closeAllDropdowns);
    },
    beforeUnmount() {
      window.removeEventListener('click', this.closeAllDropdowns);
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/styles/base/color';
  @import '@/assets/styles/base/font';
  
  .hidden {
    display: none;
  }
  .light-box {
    position: absolute;
    top: 1%;
    left: 47.5vw;
    transform: translateX(-47.5%);
    z-index: 401;
    width: 95%;
    min-width: 300px;
    max-width: 330px;
    background-color: #fff;
    padding: 32px 26px;
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
        .input-name {
          width: 100%;
          margin: 12px 0;
          input {
            font-family: 'HunInn';
            width: 100%;
            padding: 6px 18px;
            margin: 6px 0;
            border: 2px solid $secondColor-1;
            border-radius: 8px;
            box-sizing: border-box;
            &:focus {
              border: 2px solid $secondColor-2;
              outline: none;
            }
          }
        }
        .set-date {
          width: 100%;
          .date-select {
            width: 100%;
            margin: 12px 0;
            input {
              margin: 6px 0;
              padding: 6px 18px;
              box-sizing: border-box;
              border-radius: 8px;
              border: 2px solid $secondColor-1;
              &:focus {
                border: 2px solid $secondColor-2;
                outline: none;
              }
            }
          }
        }
        .setting {
          width: 100%;
          .radio-wrapper {
            display: flex;
            gap: 10%;
            input {
              margin-right: 6px;
            }
          }
          .ispublic {
            width: fit-content;
            padding: 8px 30px;
            margin: 20px 0;
            border: 1.5px solid $secondColor-2;
            border-radius: 22px;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            .lock-icon {
              background-color: $secondColor-2;
              width: 25px;
              height: 25px;
              border-radius: 50%;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 6%;
              left: 2%;
              &.right-icon {
                left: auto;
                right: 2%;
                background-color: $gray;
              }
            }
            &:hover {
              .lock-icon {
                background-color: darken($color: $secondColor-2, $amount: 5);
                transition: all .2s ease;
                &.right-icon {
                    left: auto;
                    right: 2%;
                    background-color: $gray;
                }
              }
            }
            .text { font-size: 0.875rem; }
          }
        }
        .selections {
          position: relative;
          .drop-down-box {
            font-family: 'HunInn';
            font-size: 0.875rem;
            width: 100%;
            display: block;
            box-sizing: border-box;
            padding: 8px 18px;
            margin: 12px 0;
            border: 2px solid $secondColor-1;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
          }

          .drop-down-list {
            width: 100%;
            position: absolute;
            top: 36px;
            left: 0px;
            z-index: 1;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            background-color: #fff;

            li {
              font-size: 0.875rem;
              display: block;
              padding: 8px;
              cursor: pointer;
              letter-spacing: 1.05px;

              &:hover {
                background-color: $secondColor-1;
                color: #fff;
              }
            }
          }
          hr {
            border-top: 1px solid $secondColor-1;
            margin: 16px 0;
          }
        }
      }
  
      .footer-block {
        margin-top: 20px;
        .btn-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 12px;
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
  