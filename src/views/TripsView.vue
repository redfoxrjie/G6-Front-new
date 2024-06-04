<template>
  <main>目前位在「行程一覽」</main>
</template>
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
    </div>
  </div>
  <div class="section-tripRank">
    <div class="container">
      <div class="tripRank-tabs"></div>
      <div class="tripRank-body">
        <div class="tripRank-wrapper">
          <div class="tripRank-item col-9">
          <div class="tr-item-title">
            京都｜抹茶糰子秘境、最美落日大道、日系動畫場景全在這!
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';



input {
  // margin: 0;
  // padding: 0;
  border: 0;
  // display: inline-block;
  font-family: 'Huninn';

}

.section-banner {
  /* width: 100%; */
  height: 200px;
  background-image: url("https://fakeimg.pl/1000x200/660");
  object-fit: cover;
  object-position: center;
  align-content: center;
  // display:flex;
  flex-wrap: wrap;
}

.section-banner h3 {
  text-align: center;
  width: 100%;
  height: fit-content;
  flex-grow: 0;
  color: $primaryColor;
}

.comp-searchBar {
  margin: 0 auto;
  // border: 1px solid #000;
  height: 24px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.comp-searchBar input {
  height: 24px;
  width: 80%;
  box-sizing: border-box;

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

}
.icon-wrap:hover{
  background-color: $secondColor-2;
}
.icon-wrap span {
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
}
.section-title h3{
  color: $secondColor-2;
  margin-bottom: 20px;
}
.section-title p{
  color: $black;
}


.tripRank-body{
  width: 100%;
  margin: auto;
  background-color: #a4bd7d;
}
.tripRank-item{
  background-color: #675050;
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
// input placeholder font

::placeholder,::-ms-input-placeholder {
  font-family: 'Huninn';
  color: rgb(136, 136, 136);
  opacity: 1; /* Firefox */
}


</style>