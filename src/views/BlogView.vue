<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div class="section-headSearch">
    <div class="container">
      <div class="sh-row row">
        <div class="sh-headContent">
          <div class="sh-hc-breadcrumb"><span @click="goToPage('/')">首頁</span>><span @click="goToPage('/')">熱門行程</span>
          </div>
          <h2>旅行筆記</h2>

        </div>
        <div class="comp-searchBar col-md-4 col-6">
          <input class='' type="text" placeholder="搜尋筆記">
          <div class="icon-wrap" @click="goToPage('/tripsSearchResult')">
            <span class="material-symbols-outlined">
              search
            </span>
          </div>
        </div>

      </div>

    </div>
  </div>


</template>
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

$searchBarHeight: 30px;

body {
  padding-top: 100px;
}

.sh-row {
  justify-content: space-between;
  align-items: end;

  .sh-headContent {
    .sh-hc-breadcrumb {
      margin-bottom: 8px;

      span {
        display: inline-block;
        // background-color: #6e6060;
        cursor: pointer;
        padding: 2px 2px;
        padding-right: 2px;

        &:hover {
          color: $accentColor-2;
        }
      }
    }

    h2 {
      color: $secondColor-2;
    }
  }

  .comp-searchBar {

    // margin: 0 auto;
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
</style>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToPage = (toLink) => {
  router.push(toLink);
}
</script>