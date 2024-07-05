<template>
    <section class="section-resultHeader">
        <div class="container">
            <h2>搜尋結果</h2>
            <h4>搜尋關鍵字: {{ $route.params.query }}</h4>
            <h3>找到 {{ blogsResultLength }} 筆 符合的旅行筆記</h3>
        </div>
    </section>
    <div class="section-resultDisplay">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3  row-cols-xxl-4">
                <BCBlogCard v-for="(n, i) in blogsResultData" :bcImg="n.b_img" :bcTitle="n.b_title"
                    :bcLikesCount="n.b_likes" :bcViewsCount="n.b_viewers" :bcDate="n.b_date" />

            </div>
            <div class="button-wrap col-6 col-md-3 col-lg-2">
                <button @click="goToPage('/blog')">
                    <h4>返回</h4>
                </button>
            </div>

        </div>
    </div>

</template>
<script>
import BCBlogCard from '@/components/blog/BCBlogCard.vue';

export default {
    data() {
        return {
            blogsResultData: [],
            blogsResultLength: 0,


        }
    },
    methods: {
        async fetchData() {
            try {
                let path = `${import.meta.env.VITE_API_URL}`;
                let url = path + `/blogSearch.php?keyword=` + this.$route.params.query;
                console.log('url:' + import.meta.env.VITE_API_URL)
                console.log('url:' + url)

                const response = await fetch(url);

                const data = await response.json();
                if (data.blogs) {
                    this.blogsResultData = data.blogs;
                    this.blogsResultLength = data.blogs.length;

                }
                console.log(data);
                console.log(this.blogsResultData);
            } catch (error) {

                console.log('url error:' + import.meta.env.VITE_API_URL + `/blogSearch.php?keyword=` + this.$route.params.query)
                console.log('fetch error:', error);
            }
        }

        ,
        goToPage(toLink) {
            this.$router.push(toLink);
        }
    },
    components: {
        'BCBlogCard': BCBlogCard
    }
    , mounted() {
        this.fetchData();
    },
    computed() {
    }
}
</script>
<!-- <script setup>
import BCBlogCard from '@/components/blog/BCBlogCard.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const blogsResultData = ref([]);
const blogsResultLength = ref(0);
const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}json/searchData.json`);
        const data = await response.json();
        blogsResultData.value = data.blogsSearch;
        blogsResultLength.value = data.blogsSearch.length;
        console.log(data.blogsSearch);
    } catch (error) {
        console.log('fetch error:', error)
    }
}


const router = useRouter();
const goToPage = (toLink) => {
    router.push(toLink);
}


fetchData();
</script> -->
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.section-resultHeader {
    margin-top: 80px;
    margin-bottom: 20px;

    h2,
    h3 {
        color: $secondColor-2;
        padding: 10px 0;
    }


}

.section-resultDisplay {
    .container {
        border-top: 2px solid $secondColor-2;
        padding: 30px 0;

        .button-wrap {
            margin: auto;
            margin-top: 40px;

            button {
                display: block;
                cursor: pointer;
                background-color: $secondColor-2 ;
                color: $black ;
                border-radius: 15px;
                padding: 5px 0px;
                width: 90%;
                margin: auto;

                h4 {
                    text-align: center;
                    color: $primaryColor;
                }
            }
        }

        .hs-section-btn-wrap {
            padding: $base-fontSize 0;
            margin: 0 auto;
        }

        .hs-btn {
            display: block;
            background-color: $accentColor-2;
            margin: auto;
            border-radius: 10px;
            padding: 2px 30px;
        }
    }
}
</style>