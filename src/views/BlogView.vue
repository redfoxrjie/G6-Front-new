<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <section class="section-headSearch">
    <div class="container">
      <div class="sh-row row">
        <div class="sh-headContent">
          <div class="sh-hc-breadcrumb"><span @click="goToPage('/')">首頁</span>><span>旅行筆記</span>
          </div>
          <h2>旅行筆記</h2>

        </div>
        <div class="comp-searchBar col-md-4 col-6">
          <input class='' type="text" placeholder="搜尋筆記">
          <div class="icon-wrap" @click="goToPage('/blogSearchResult')">
            <span class="material-symbols-outlined">
              search
            </span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <div class="section-blogList">
    <div class="container">
      <div class="blogList-row row row-cols-1 row-cols-md-2 row-cols-lg-3  row-cols-xxl-4">
        <BCBlogCard v-for="(n, index) in currentCardLimit" :bcImg="blogs[index + currentShowIndex].image"
          :bcTitle="blogs[index + currentShowIndex].name" :bcLikesCount="blogs[index + currentShowIndex].likes"
          :bcViewsCount="blogs[index + currentShowIndex].viewers" :bcDate="blogs[index + currentShowIndex].date"/>
      </div>

    </div>
  </div>
  <GCompPagination :totalItems="blogsCount" :pageLimit="9" :pageIndex="currentIndex"
    @emitClick="pagenationClickHandle" />
<p>debug用 此頁顯示{{ currentCardLimit }} 筆資料,共有{{blogsCount}}筆資料</p>
  <div class="debuggerCurrentShow">
    <span>(這裡是資料區塊之後會刪除並把按鈕移到下面)</span><span>父層ref---PAGE IS {{ currentIndex }}-----</span>
    <span v-for="(n, index) in itemsLimit">{{ blogs[index + currentShowIndex] }}</span>
  </div>




</template>
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

input {
  border: none;
}

// Debugger
.debuggerCurrentShow {
  color: $gray;
  font-size: 14px;
}

$searchBarHeight: 30px;


.section-headSearch {
  padding-top: 120px;
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
import BCBlogCard from '@/components/blog/BCBlogCard.vue';
import GCompPagination from '@/components/global/GCompPagination.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// 純變數 每頁顯示幾筆資料
const itemsLimit = 9;
const currentShowIndex = computed(() => {
  return (currentIndex.value - 1) * itemsLimit;
})

const currentCardLimit = computed(() => {
  if (currentIndex.value === Math.ceil(blogsCount.value / itemsLimit)) {
    return blogsCount.value % itemsLimit || itemsLimit;
  } else {
    return itemsLimit;
  }
});

// data:json 接口
// const blogs =ref([]); //資料存取位置
const blogs = []; //資料存取位置
const blogsCount = ref(5); //先建立存取位置
//data:資料總長度
const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}json/data.json`);
    const data = await response.json();


    //存回到ref位置 ref要用ref.value的方式才會存入
    // blogs.value = data.blog;
    blogs.push(...data.blog);
    blogsCount.value = data.blog.length;
    console.log(blogsCount.value)
    // console.log(data.blog)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData();
// 路由方法
const router = useRouter();
const goToPage = (toLink) => {
  router.push(toLink);
}
// pagination 元件接取索引
const currentIndex = ref(1); //目前索引 頁面索引都從1開始
const pagenationClickHandle = (data) => {
  currentIndex.value = data;
  // console.log(blogData)
  console.log(showCards)
}

</script>