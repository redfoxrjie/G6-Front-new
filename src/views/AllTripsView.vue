<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <main>目前位在「行程一覽」</main>
  <div class="section-banner">
    <h3>全世界最棒的旅遊體驗</h3>
    <div class="comp-searchBar col-4">
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
      <GCompUserAccount/>
    </div>
  </div>
  <div class="section-tripRank">
    <div class="container">
      <div class="tripRank-tabs-wrapper">
        <div class="tr-tab tr-tab-active col-2 ">
          <h4 class="bdradius-half">日本</h4>
        </div>
        <div class="tr-tab  col-2 " v-for="n in 3">
          <h4 class="bdradius-half">日本</h4>
        </div>
        
      </div>
      <div class="tripRank-body">
        <div class="tripRank-wrapper">
          <div class="tr-item-card col-10" v-for="n in 3" >
            <div class="tr-item-cardTag col-1">
              <h3>#{{ n }}</h3>
            </div>
            <div class="tr-item shadow-v1 bdradius-sm">
              <div class="tr-item-img col-2">
                <img src="https://fakeimg.pl/300x200/200">
              </div>
              <div class="tr-item-content col-10">
                <div class="content-title">
                  <h4>
                    京都｜抹茶糰子秘境、最美落日大道、日系動畫場景全在這!
                  </h4>
                </div>
                <!-- <div class="content-detail">userinfo</div> -->
                <user-account/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section-title">
    <div class="container">
      <h3>探索所有日本的行程地圖</h3>
      <p>日本地區總共有432個行程地圖，127位ToGo 創作者參與。</p>
    </div>
  </div>
</template>
<script></script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.shadow-v1 {
  //   -webkit-box-shadow: 0px 1px 6px 2px rgba(0,0,0,0.33);
  // -moz-box-shadow: 0px 1px 6px 2px rgba(0,0,0,0.33);
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

// tripTab
.tripRank-tabs-wrapper {
  background-color: #fff;
  display: flex;
  position: relative;
  .tr-tab {
    box-sizing: border-box;
    text-align: center;
    // padding-right:100/12*1%;
    padding-right:20px ;
    h4{
      padding: 10px 0;
      border: 1.5px solid $secondColor-2;
      border-bottom: 0;

      letter-spacing: 5px;
      color: $secondColor-2;
    }
  }
  .tr-tab-active h4{
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

  .tr-item {
    position: relative;
    margin: auto;
    display: flex;
    background-color: #efefef;
  }

  .tr-item-cardTag {
    position: relative;

    h3 {
      line-height: 1.5;
      width: 100%;
      position: absolute;
      top: 25%;
      right: 0;
      background-color: $accnetColor-1;


      transform: translateY(-50%);
      text-align: center;
    }
  }
}


.tr-item-img {
  aspect-ratio: 1;

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

  .content-title {
    width: 100%;
    margin-bottom: 5px;
    // h4 {
    //   text-decoration: underline;
    // }
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

  h3 {
    text-align: center;
    width: 100%;
    height: fit-content;
    flex-grow: 0;
    color: $primaryColor;
  }
}


.comp-searchBar {
  margin: 0 auto;
  height: 24px;
  display: flex;
  align-content: center;
  justify-content: center;

  input {
    height: 24px;
    width: 80%;
    box-sizing: border-box;
  }
}


.icon-wrap {
  margin: 0;
  padding: 0;
  display: inline-flex;
  background-color: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;
  user-select: none;
  justify-content: center;

  span {
    display: inline-block;
    line-height: 24px;
    font-size: 16px;
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
  margin: 30px;
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
</style>