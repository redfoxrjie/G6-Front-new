<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="section-banner">
    <div class="filter"></div>
    <h1>全世界最棒的旅遊體驗</h1>
    <div class="comp-searchBar col-md-7 col-12">
      <input class='' v-model="searchQuery" type="text" placeholder="下一個旅遊地點" @keyup.enter="goToSearch">
      <div class="icon-wrap" @click="goToSearch()">
        <span class="material-symbols-outlined">
          search
        </span>
      </div>
    </div>
  </div>
  <div class="section-title">
    <div class="container">
      <h3>在ToGo的熱門行程</h3>
      <p>幫助每個人，更容易規劃行程，更輕鬆分享體驗</p>
      <p>這些是受大家喜愛的熱門行程</p>
    </div>
  </div>


  <div class="section-tripRank">
    <div class="container">
      <div class="tripRank-tabs-wrapper col-11 col-md-12">
        <div class="tr-tab  col-3 col-md-2 " v-for="(area, index) in areaFormat" :key="index" @click="tabSwitch(index)"
          :class="{ 'tr-tab-active': selectedCase == index }">
          <h4 class="bdradius-half">{{ area }}</h4>
        </div>
      </div>
      <div class="tripRank-body">
        <div class="tripRank-wrapper">
          <div class="tr-item-card col-11 col-lg-11 col-xl-10 " v-for="(n, index) in 3">
            <div class="tr-item-cardTag col-2 col-md-1">
              <h3>#{{ index + 1 }}</h3>
            </div>
            <div class="tr-item shadow-v1 bdradius-sm col-10 col-md-11">
              <div class="tr-item-img col-12 col-md-3 col-xl-2">
                <img :src="parseServerImg(trips[selectedCase][index].trp_img)" alt="">
              </div>
              <div class="tr-item-content col-12 col-md-9 col-xl-10">
                <div class="content-title">
                  <h4>
                    {{ trips[selectedCase][index].trp_name }}
                  </h4>
                </div>

                <user-account :uName="trips[selectedCase][index].u_nickname " :uImg="trips[selectedCase][index].u_avatar" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section-title">
    <div class="container">
      <h3>探索所有{{ areaFormat[selectedCase] }}的行程地圖</h3>
      <p>{{ areaFormat[selectedCase] }}地區總共有{{areaTripsLength[selectedCase]}}個行程地圖，127位ToGo 創作者參與。</p>
    </div>
  </div>
  <div class="section-tripList">
    <div class="container">
      
  <!-- <p>{{ displayLimit}}</p>
  <p>目前在第displatStatus{{ displayStatus }}頁，此地區資料共有displayLimit:{{ displayLimit }}頁面</p> -->
  <!-- <p>顯示陣列{{ displayTrips }}</p> -->
  <!-- <p v-for="n in displayTrips">{{n}}</p> -->

  <div class="row-btns row">
        <button id="prevBtn" class="col-2 col-md-1" @click="btnSwitch('prev')">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>
        <button id="nextBtn" class="col-2 col-md-1" @click="btnSwitch('next')">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
      </div>
      <div class="tripList-row row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <trip-card v-for="(trip, i) in displayTrips" :tcImg="parseServerImg(trip.trp_img)"
          :tc-title="trip.trp_name" :tcMemName="trip.u_nickname" :tcMemImg='trip.u_avatar'
          :key="trip.trp_id" />
      </div>
    </div>
  </div>


</template>
<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
  data() {
    return {
      areaFormat: { 'jp': '日本', 'kr': "韓國", 'th': "泰國", 'hkmo': "港澳" },
      trips: [],
      areaTripsLength: [], //每個地區　的資料長度
      selectedCase: 'jp', //tab 地區選取狀態
      // --trip search 搜尋用變數
      searchQuery:'',
      // ---trip list　換頁區塊用變數
      displayStatus: 1, //頁數索引 (從1開始)
      displayMax: 6 //一頁的資料數量
    }
  },
  computed: {
    displayLimit() { //此地區類別的總頁數
      // 紀錄 目前tab的資料總數量
      let currentAreaLength = this.areaTripsLength[this.selectedCase]
      // 算出 根據總數所算出的頁面總數量
      let currrentPageLimit =Math.ceil(currentAreaLength / this.displayMax)
      return currrentPageLimit
    },
    displayTrips() { 
      //根據頁面索引 回傳顯示的資料
      //如果是最後一頁 要多判定剩餘的資料
      let index = 0+this.displayMax*(this.displayStatus-1) //此頁第一筆資料索引
      let lastPageLength = this.areaTripsLength[this.selectedCase]%this.displayMax
      if(this.displayStatus==this.displayLimit && lastPageLength!==0){
        const notFullList =this.trips[this.selectedCase].slice(index,index+lastPageLength)
        // return `slice list [${index},${index+lastPageLength}],` //debug
        return notFullList
      }
      const newList =this.trips[this.selectedCase].slice(index,index+this.displayMax)
      // return `slice list [${index},${index+this.displayMax}],` //debug 
      return newList
    }
  },
  methods: {
    async fetchData() {
      try {

        let path = `${import.meta.env.VITE_API_URL}`;
        let url = path + `/tripView.php`;
        // url ='/public/json/data.json'        //測試使用:本地json 資料比較多 目前資料庫不夠多
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        //先根據地區區分 暫存陣列位置
        const classifiedTrips = {
          jp: [],
          kr: [],
          th: [],
          hkmo: []
        }
        const areaTripsLength = {
          jp: 0,
          kr: 0,
          th: 0,
          hkmo: 0
        }
        data.trips.forEach(trip => {
          switch (trip.trp_area) {
            case '日本':
              classifiedTrips.jp.push(trip);
              areaTripsLength.jp++
              break;
            case '韓國':
              classifiedTrips.kr.push(trip);
              areaTripsLength.kr++
              break;
            case '泰國':
              classifiedTrips.th.push(trip);
              areaTripsLength.th++

              break;
            case '港澳':
              classifiedTrips.hkmo.push(trip);
              areaTripsLength.hkmo++
              break;

          }
        }
        );
        this.areaTripsLength = areaTripsLength;
        this.trips = classifiedTrips;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    tabSwitch(area) {
      this.selectedCase = area;
      console.log('hii', area, 'result:', this.selectedCase);
    },
    btnSwitch(action) {
      //判定目前頁數是否小於在Limit最大頁面 才執行換頁
      if (action == 'next' && this.displayStatus< this.displayLimit) {
        this.displayStatus++;
        //判定目前頁數如果為1，則無法執行換頁
      } else if (action == 'prev' &&this.displayStatus>1) {
        this.displayStatus--;
      }else{
        alert(error)
      }
    },
    goToSearch() {
      // console.log(`tripSearchResult/${this.searchQuery}`)
      if(this.searchQuery==='')return;
      this.$router.push(`tripsSearchResult/${this.searchQuery}`)
    }
    ,
    parseServerImg(imgURL) {
      return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
    },
    goToPage(toLink) {
      this.$router.push(toLink)
    }



  },
  watch:{
    selectedCase:{ //當切換tab發生(透過偵測顯示地區) 重置目前頁面索引
      immediate: true,
      handler(){
        this.displayStatus=1
      }
    }
  },
  beforeMount() {
    this.fetchData();
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.shadow-v1 {
  -webkit-box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.33);
  box-shadow: 0px 2px 4px .2px rgba(0, 0, 0, 0.25);
}

.bdradius-sm {
  border-radius: 5px;
  overflow: hidden;
}

.bdradius-half {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

}

// sass要併入的以上






// trip-item-card
.tr-item-card {
  margin: auto;
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;

  .tr-item {
    position: relative;
    margin: auto;
    display: flex;
    background-color: #efefef;

    .tr-item-img {
      aspect-ratio: 19/15;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: scale .3s ease-in-out;
      }
    }

    .tr-item-content {
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      margin: 10px 0;

      .content-title {
        width: 100%;
        margin: 5px 0;

        // border: 1px solid #000;
        h4 {
          padding: 5px 0;
        }
      }

    }
  }

  .tr-item-cardTag {
    position: relative;
    // border: 1px solid #000;

    h3 {
      line-height: 2;
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      background-color: $accentColor-1;
      transform: translateY(15%);
      text-align: center;
    }
  }
  &:hover {
    img {
      scale: 1.05;
      transition: scale .3s ease-in-out;
    }
  }
}




input {
  // margin: 0;
  // padding: 0;
  border: 0;
  // display: inline-block;
  font-family: 'Huninn';

}

.section-banner {
  height: 300px;
  background: url("@/assets/images/mc02.jpg") center center repeat;
  position: relative;
  object-fit: cover;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  // object-position: 150px 2px;
  background-position: center;
  align-content: end;
  flex-wrap: wrap;


  h1 {
    text-align: center;
    width: 100%;
    height: fit-content;
    flex-grow: 0;
    color: $primaryColor;
    margin-bottom: 10px;
    text-shadow: 2px .2px $black;

  }

  .filter {
    background: rgba(130, 130, 130, 0.425);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 300px;

  }
}

$searchBarHeight: 30px;

.comp-searchBar {

  margin: 0 auto;
  height: $searchBarHeight;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 80px;

  input {
    height: $searchBarHeight;
    width: 80%;
    box-sizing: border-box;
    padding: 0 6px;
  }

  .icon-wrap {
    margin: 0;
    padding: 0;
    display: flex;
    background-color: #ffffff;
    width: $searchBarHeight;
    height: $searchBarHeight;
    cursor: pointer;
    user-select: none;
    justify-content: center;

    span {
      display: block;
      line-height: $searchBarHeight;
      font-size: $searchBarHeight * .75;
    }
  }
}




.icon-wrap:hover {
  background-color: $secondColor-2;
}

.section-title {
  padding: 30px 0;
  margin-top: 70px;

  h3 {
    color: $secondColor-2;
    margin-bottom: 20px;
  }

  p {
    color: $black;
  }

}

.section-tripRank {
  padding: 10px 0;
  margin: 30px 0;

  // tripTab 上方地區類別標籤
  .tripRank-tabs-wrapper {
    display: flex;
    position: relative;

    .tr-tab {
      box-sizing: border-box;
      text-align: center;
      // padding-right:100/12*1%;
      padding-right: 20px;
      cursor: pointer;

      h4 {
        padding: 20px 0;
        border: 1.5px solid $secondColor-2;
        border-bottom: 0;

        letter-spacing: 5px;
        color: $secondColor-2;
      }
    }

    .tr-tab-active h4 {
      background-color: $secondColor-2;
      color: $primaryColor;
    }

  }

  // tripRank 
  .tripRank-body {
    width: 100%;
    margin: auto;
    background-color: $subtle-bgDrop;
    border-top: 2px solid $secondColor-2;
    min-height: 200px;
    padding: 60px 0;

  }
}

.section-tripList {
  .row-btns {
    justify-content: end;
    // border: 1px solid #000;
    padding: 10px 0;
    margin: 0 5px;

    button {
      background-color: $secondColor-2;

      svg {
        color: $primaryColor;
      }

      transition: .1s;
    }

    #prevBtn {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      &:hover {
        box-shadow: inset 0px 0px 20px .2px #0b5fe572;

        svg {
          transform: scale(1.05);
        }
      }

      &:active {
        box-shadow: inset 0px 0px 40px .4px $secondColor-1;

        svg {
          color: $primaryColor;
          transform: scale(0.97);

        }
      }

    }

    #nextBtn {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;

      &:hover {
        box-shadow: inset 0px 0px 20px .2px #0b5fe572;

        svg {
          transform: scale(1.1) rotate(2deg);
        }
      }

      &:active {
        box-shadow: inset 0px 0px 40px .4px $secondColor-1;

        svg {
          color: $secondColor-1;
        }
      }
    }
  }
}


.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}

// input placeholder font

::placeholder,
::-ms-input-placeholder {
  font-family: 'Huninn';
  color: rgb(136, 136, 136);
  opacity: 1;
  /* Firefox */
}

//rwd 
@media screen and (max-width: 768px) {
  $searchBarHeight: 50px;

  .section-banner {
    height: 100px;

    .filter {
      display: none;
    }

    h1 {
      display: none;
    }

    background: none;

    .comp-searchBar {
      margin-bottom: 0px;


      input {
        border-right: none;
        border: 1px solid #000;
      }

      .icon-wrap {
        background: $secondColor-2;

      }

    }
  }

  .section-title {
    margin-top: 10px;
  }

  .section-tripRank>.container {
    width: 100vw;
    max-width: 100%;
  }

  .section-tripRank .tripRank-tabs-wrapper {
    justify-content: center;
    margin: auto;

    .tr-tab {
      padding: 0 10px;

      h4 {
        padding: 10px 0;
      }
    }

  }



  .tr-item-card {
    h3 {
      line-height: 3;
    }

    .tr-item {
      flex-direction: column;

      // width:  calc(100 / 12) *10%;
      .tr-item-img {
        width: 100%;
        height: auto;
        aspect-ratio: 16/8;
        overflow: hidden;
      }
    }



    .tr-item-content {
      // width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .section-tripList {
    .tripList-row {
      justify-content: center;
    }
  }
}
</style>