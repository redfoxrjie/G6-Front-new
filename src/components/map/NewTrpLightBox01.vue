<template>
  <!--目前沒有使用到此份檔案-->
  <div class="light-box" @click.self="closeAllDropdowns">
    <div class="light-box-container">
      <div class="header-block">
        <div class="title">
          <h3>建立新行程</h3>
          <p>套用現有行程或從空白行程開始</p>
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
        <div class="selections">
          <div class="drop-down-box" @click.stop="toggleDropdown('name')">
            <div id="trp_name">{{ selectedTrip }}</div>
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </div>
          <ul v-if="showNameDropdown" class="drop-down-list">
            <li v-for="(trip, index) in trips" :key="index" @click="selectTrip(trip)">
              {{ trip }}
            </li>
          </ul>
          <hr />
        </div>
        <div class="create-blank" @click="$emit('close')">
            <font-awesome-icon icon="plus" />
            新建空白行程
        </div>
      </div>
      <div class="footer-block">
        <div class="btn-wrapper">
          <button class="btn cancel" @click="goBack">取消</button>
          <button class="btn confirm" @click="$emit('close')">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areas: ['日本', '韓國', '泰國', '港澳'],
      trips: ['北九州五天四夜雙人行', '京阪神絕景賞楓五天四夜', '東京下町散策之旅'],
      showAreaDropdown: false,
      showNameDropdown: false,
      selectedArea: '日本',
      selectedTrip: '北九州五天四夜雙人行'
    }
  },
  methods: {
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
    selectTrip(trip) {
      this.selectedTrip = trip
      this.closeAllDropdowns()
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  mounted() {
    window.addEventListener('click', this.closeAllDropdowns);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeAllDropdowns);
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
    top: 12%;
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
        h3 {
          margin-bottom: 16px;
        }

        p {
          font-size: 0.875rem;
        }
      }

      .selections {
        position: relative;

        .drop-down-box {
          font-family: 'HunInn';
          width: 100%;
          display: block;
          box-sizing: border-box;
          padding: 8px 18px;
          margin: 12px 0;
          border: 1px solid $black;
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
      .create-blank {
          border: 2px dotted $secondColor-1;
          text-align: center;
          color: $secondColor-2;
          padding: 12px;
          cursor: pointer;

          &:hover {
            border: 2px dotted #fff;
            background-color: $secondColor-1;
            color: #fff;
          }
        }
    }

    .footer-block {
      .btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 60px;

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
