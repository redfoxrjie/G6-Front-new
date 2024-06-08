<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <main>目前位在「行程一覽」</main>
  <div class="section-banner">
    <h1>全世界最棒的旅遊體驗</h1>
    <div class="comp-searchBar col-md-7 col-12">
      <input class='' type="text" placeholder="下一個旅遊地點">
      <div class="icon-wrap">
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
      <GCompUserAccount />
    </div>
  </div>
  <div class="section-tripRank">
    <div class="container">
      <div class="tripRank-tabs-wrapper col-11 col-md-12">
        <!-- <div class="tr-tab tr-tab-active col-2 col-md-2 ">
          <h4 class="bdradius-half">日本</h4>
        </div> -->
        <div class="tr-tab  col-2 col-md-2 " 
        v-for="(area,index) in areaFormat" :key="index" 
        @click="tabSwitch(index)" :class="{'tr-tab-active' : selectedCase== index }"
        >
          <h4 class="bdradius-half">{{area}}</h4>
        </div>
        <!-- :tcImg="trips[selectedCase][n].trp_img" -->
      </div>
      <div class="tripRank-body">
        <div class="tripRank-wrapper">
          <div class="tr-item-card col-11 col-lg-11 col-xl-10 " v-for="(n, index) in 3"
          >
            <div class="tr-item-cardTag col-2 col-md-1" >
              <h3>#{{index+1}}</h3>
            </div>
            <div class="tr-item shadow-v1 bdradius-sm col-10 col-md-11">
              <div class="tr-item-img col-12 col-md-3 col-xl-2">
                <img :src="trips[selectedCase][index].trp_img">
              </div>
              <div class="tr-item-content col-12 col-md-9 col-xl-10">
                <div class="content-title">
                  <h4>
                    {{ trips[selectedCase][index].trp_name }}
                  </h4>
                </div>
                <user-account :uName="trips[selectedCase][index].u_nickname" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section-title">
    <div class="container">
      <h3>探索所有{{areaFormat[selectedCase]}}的行程地圖</h3>
      <p>{{areaFormat[selectedCase]}}地區總共有432個行程地圖，127位ToGo 創作者參與。</p>
    </div>
  </div>
  <div class="section-tripList">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <trip-card v-for="(n,i) in 6" 
        :tcImg="trips[selectedCase][i].trp_img" 
        :tc-title="trips[selectedCase][i].trp_name" :tcMemName="trips[selectedCase][i].u_nickname"
        :key="trips[selectedCase][i].trp_id" />

      </div>
      <p v-for="(n,i) in 6"> {{ trips[selectedCase][i] }}</p>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';

    const areaFormat ={'jp':'日本','kr':"韓國",'th':"泰國",'hkmo':"港澳"};
    const trips = ref([]);
    const selectedCase = ref('jp');
    const fetchData = async () => {
      try {
        const response = await fetch('/json/data.json');
        const data = await response.json();
        //先根據地區區分 暫存陣列位置
        const classifiedTrips = {
          jp: [],
          kr: [],
          th: [],
          hkmo: []
        }
        data.trip.forEach(trip => {
          switch (trip.trp_area) {
            case '日本':
              classifiedTrips.jp.push(trip);
              break;
            case '韓國':
              classifiedTrips.kr.push(trip);
              break;
            case '泰國':
              classifiedTrips.th.push(trip);
              break;
            case '港澳':
              classifiedTrips.hkmo.push(trip);
              break;

          }
        }
      );
        //存回到ref位置 ref要用ref.value的方式才會存入
        trips.value = classifiedTrips;
        console.log(classifiedTrips)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const tabSwitch = (area)=> {
      selectedCase.value = area;
      console.log('hii',area,'result:',selectedCase.value);
    }
    const test =()=>{
      alert('dddd');
    }

fetchData();

</script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.shadow-v1 {
  -webkit-box-shadow: 0px 1px 6px 2px rgba(0,0,0,0.33);
  -moz-box-shadow: 0px 1px 6px 2px rgba(0,0,0,0.33);
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

// tripTab 上方地區類別標籤
.tripRank-tabs-wrapper {
  display: flex;
  position: relative;

  .tr-tab {
    box-sizing: border-box;
    text-align: center;
    // padding-right:100/12*1%;
    padding-right: 20px;

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

// trip-item-card
.tr-item-card {
  margin: auto;
  display: flex;
  margin-bottom: 20px;
  // background-color: #605252;

  .tr-item {
    position: relative;
    margin: auto;
    display: flex;
    background-color: #efefef;
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
}


.tr-item-img {
  aspect-ratio: 19/15;


  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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

input {
  // margin: 0;
  // padding: 0;
  border: 0;
  // display: inline-block;
  font-family: 'Huninn';

}

.section-banner {
  height: 200px;
  background-image: url("https://fakeimg.pl/1000x200/660");
  object-fit: cover;
  object-position: center;
  align-content: center;
  flex-wrap: wrap;

  h1 {
    text-align: center;
    width: 100%;
    height: fit-content;
    flex-grow: 0;
    color: $primaryColor;
    margin-bottom: 10px;
  }
}

$searchBarHeight: 30px;

.comp-searchBar {

  margin: 0 auto;
  height: $searchBarHeight;
  display: flex;
  align-content: center;
  justify-content: center;

  input {
    height: $searchBarHeight;
    width: 80%;
    box-sizing: border-box;
    padding: 0 6px;
  }
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
    height: fit-content;

    h1 {
      display: none;
    }

    background: none;

    .comp-searchBar {
      input {
        border: 1px solid #000;
        border-right: none;
      }

      .icon-wrap {
        border: 1px solid #000;
        border-left: none;
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

  .tripRank-tabs-wrapper {
    justify-content: center;
    margin: auto;



  }

  .tripRank-tabs-wrapper>.tr-tab {
    padding-right: 5px;

    h4 {
      padding: 10px 0;
    }
  }

  .tr-item-card {
    h3 {
      line-height: 3;
    }
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

    .tr-item-content {
      // width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

}
</style>