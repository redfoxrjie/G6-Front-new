<template>
  <!-- 引入 Google Fonts -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <!-- 搜尋區塊 -->
  <section class="section-headSearch">
    <div class="container">
      <div class="sh-row row">
        <div class="sh-headContent">
          <!-- 麵包屑 -->
          <div class="sh-hc-breadcrumb">
            <span @click="goToPage('/')">首頁</span>&gt;<span>旅行筆記</span>
          </div>
          <!-- 標題 -->
          <h2>旅行筆記</h2>
        </div>
        <!-- 搜尋欄位 -->
        <div class="comp-searchBar col-md-4 col-6">
          <!-- 搜尋按鈕 -->
          <!-- <div class="icon-wrap" @click="goToPage('/blogSearchResult')"> -->

          <input v-model="searchQuery" class='' type="text" placeholder="搜尋筆記" @keyup.enter="goToSearch">


          <div class="icon-wrap" @click="goToSearch">
            <font-awesome-icon icon="magnifying-glass" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 旅行筆記區塊 -->
  <div class="section-blogList">
    <div class="container">
      <div class="blogList-row row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4">
        <!-- 使用 BCBlogCard 元件來顯示每一篇筆記卡片 -->
        <BCBlogCard v-for="(blog, index) in currentCardBlogs" :key="blog.b_id" :bcImg="parseServerImg(blog.b_img)"
          :bcTitle="blog.b_title" :bcLikesCount="blog.b_likes" :bcViewsCount="blog.b_viewers" :bcDate="blog.b_date"
          @click="navigateToBlogPage(blog.b_id)" />
      </div>
    </div>
  </div>

  <!-- 分頁元件 -->
  <GCompPagination :totalItems="blogsCount" :pageLimit="itemsLimit" :pageIndex="currentIndex"
    @emitClick="pagenationClickHandle" />

  <!-- Debug 區塊 -->
  <!-- <p>debug用 此頁顯示{{ currentCardBlogs.length }} 筆資料, 共有{{ blogsCount }}筆資料</p>
  <div class="debuggerCurrentShow">
    <span>(這裡是資料區塊之後會刪除並把按鈕移到下面)</span>
    <span>父層ref---PAGE IS {{ currentIndex }}-----</span>
    <span v-for="(blog, index) in currentCardBlogs">{{ blog }}</span>
  </div> -->

</template>

<!-- <script>
import { useRouter } from 'vue-router';
import BCBlogCard from '@/components/blog/BCBlogCard.vue';
import GCompPagination from '@/components/global/GCompPagination.vue';
default return{
  data(){
    blogCardData:[],
    blogsCount:-1,
  },
  methods{
    fetchData(){

    },
    goToPage(toLink){
      this.$router.push(toLink);
    }



    }

}
</script> -->


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BCBlogCard from '@/components/blog/BCBlogCard.vue';
import GCompPagination from '@/components/global/GCompPagination.vue';

// 儲存資料的陣列
const blogs = ref([]); // 資料存取位置
const searchQuery = ref('')
// 計算資料的總數
const blogsCount = ref(0); // 先建立存取位置

// 取得資料的方法
const fetchData = async () => {
  try {
    let path = `${import.meta.env.VITE_API_URL}/front`;
    let url = path + `/blogView.php`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('http://localhost/g6-php-main/front/blogView.php')
    console.log('url:',url)
    console.log(data)

    // 存取資料到陣列中
    blogs.value = data.blogs;
    blogsCount.value = data.blogs.length; //計算blog總數
  } catch (error) {
    console.log('erro link at',`${import.meta.env.VITE_API_URL}/front/blogView.php`)
    console.error('Error fetching data:', error);
  }
};  
onMounted(()=>{
  fetchData();
});

// 
function prevent() {
  console.log('ignore');
}
// 搜尋切換

// 路由方法
const router = useRouter();
const goToPage = (toLink) => {
  router.push(toLink);
};
const goToSearch = () => {
  if(searchQuery==='')return;
  router.push(`blogsSearchResult/${searchQuery.value}`);
};

// Pagination 元件接取索引
const currentIndex = ref(1); // 目前索引頁面索引都從1開始
const pagenationClickHandle = (data) => {
  currentIndex.value = data;
  console.log('pageIndex updated to:', currentIndex.value);
};

// 每頁顯示幾筆資料
const itemsLimit = ref(9);

// 計算分頁數量
const pagesCount = computed(() => {
  return Math.ceil(blogsCount.value / itemsLimit.value);
});

// 計算當前顯示的卡片數據
const currentCardBlogs = computed(() => {
  const start = (currentIndex.value - 1) * itemsLimit.value;
  const end = start + itemsLimit.value;
  return blogs.value.slice(start, end);
});

// 解析伺服器上的圖片路徑
const parseServerImg = (imgURL) => {
  return `${import.meta.env.VITE_FILE_URL}/${imgURL}`;
};

// 導航至BlogPage頁面
const navigateToBlogPage = (b_id) => {
  // router.push({ name: 'blogPage', params: { b_id } });
  router.push(`blog/${b_id}`);

};
</script>



<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

//---- Debugger ----
.debuggerCurrentShow {
  color: $gray;
  font-size: 14px;
}

//---- Search Bar ----
$searchBarHeight: 30px;

input {
  border: none;
}

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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $secondColor-2;
  width: $searchBarHeight;
  height: $searchBarHeight;
  cursor: pointer;
  user-select: none;
  color: #fff;
  border-radius: 3px;
}

.icon-wrap:hover {
  background-color: $secondColor-2;
}
</style>
