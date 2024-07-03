<template>
    <div class="light-box">
        <div class="light-box-container">
            <div class="header-block">
                <div class="title">
                    <h3>預計停留時間</h3>
                    <h4>
                        <font-awesome-icon icon="map-pin" />
                        JR博多車站
                    </h4>
                    <p>日本〒812-0012 Fukuoka, Hakata Ward, 博多駅中央街1−1</p>
                </div>
                <div class="input-wrapper">
                    <input type="number" id="hh" name="hh" min="0" max="23" v-model="hours"/>
                    <label for="hh">時</label>
                    <input type="number" id="mm" name="mm" min="0" max="59" step="5" v-model="minutes"/>
                    <label for="mm">分</label>
                </div>
            </div>
            <div class="footer-block">
                <div class="btn-wrapper">
                    <button class="btn cancel" @click="cancel">取消</button>
                    <button class="btn confirm" @click="saveStayTime">儲存</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';

export default {
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  data() {
      return {
          hours: 2,
          minutes: 0
      };
  },
  methods: {
      // 儲存時間的方法
      saveStayTime() {
        const { hours, minutes } = this;
        const formattedTime = `${hours}小時${minutes}分`;
        this.$emit('save-stay-time', formattedTime);
      },
      // 取消按鈕
      cancel() {
          this.$emit('close');
      },
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
            h4 { color: $secondColor-2 }
            p { 
                font-size: 0.8rem;
                color: $secondColor-1;
                letter-spacing: unset;
                line-height: 100%;
                margin: 6px 0 24px;
            }
        }
        .input-wrapper {
            margin: 16px 0;
            input {
                width: 40px;
                text-align: center;
                margin-right: 8px;
                font-size: 1rem;
            }
            label {
                margin-right: 12px;
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