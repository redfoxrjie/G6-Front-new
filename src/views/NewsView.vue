<template>
    <div class="news-container container">
        <div class="breadcrumb">
            <span @click="goToPage('/')">首頁</span> &gt; <span>最新消息</span>
        </div>
        <h2>最新消息</h2>
        <div class="news-section row">
            <div class="news-list col-12 col-md-9">
                <div 
                    v-for="item in filteredNews" 
                    :key="item.id" 
                    class="list-item"
                    @click="navigateToNewsPage(item.id)"
                >
                    <div class="news-img">
                        <img :src="parseServerImg(item.img)" alt="news image">
                        <!-- <img :src=(item.img) alt="news image"> 原本local圖片路徑參考 -->
                    </div>
                    <div class="news-info">
                        <span class="published-date font-time">{{ item.date }}</span>
                        <span class="news-type font-time">{{ item.type }}</span>
                        <div class="news-title">{{ item.title }}</div>
                    </div>
                </div>
            </div>
            <div class="news-filter col-4 col-md-3" @click.stop>
                <!-- @click.stop防止冒泡到父元素，避免點擊filter時影響tabs顯示 -->
                <h5>消息分類<span id="filter-toggle" @click="toggleFilterTabs"></span></h5>
                <div v-show="showFilterTabs">
                    <div 
                        v-for="filter in filters" 
                        :key="filter.value" 
                        class="filter-tab" 
                        @click="setFilter(filter.value)"
                    >
                        {{ filter.label }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed } from 'vue';

export default {
    data() {
        return {
            items: [],
            selectedFilter: 'all',
            showFilterTabs: true,
            filters: [
                { label: '全部公告', value: 'all' },
                { label: '重要公告', value: '重要公告' },
                { label: '活動公告', value: '活動公告' },
                { label: '其他公告', value: '其他公告' }
            ],
        };
    },
    computed: {
        filteredNews() {
            if (this.selectedFilter === 'all') {
                return this.items;
            }
            return this.items.filter(item => item.type === this.selectedFilter);
        }
    },
    mounted() {
        this.loadJsonData();
    },
    methods: {
        loadJsonData() {
            fetch(`${import.meta.env.BASE_URL}json/news.json`)
                .then((response) => response.json())
                .then(data => {
                    console.log('Loaded data:', data); // 打印加载的数据
                    this.items = data;
                    console.log('Items in component:', this.items); // 打印组件中的items
                })
                .catch((error) => {
                    console.error('Error loading JSON data:', error);
                });
        },
        parseImg(imgURL) {
            // 將相對路徑解析成正確的 URL
            return new URL(`./assets/images/${imgURL}`, import.meta.url).href;
        },
        parseServerImg(imgURL) {
	        // return `https://tibamef2e.com/cid101/g6/images/${imgURL}`
            return `${import.meta.env.VITE_FILE_URL}/${imgURL}`
        },
        setFilter(filter) {
            this.selectedFilter = filter;
            this.showFilterTabs = false; // Hide filter tabs after selecting a filter
        },
        toggleFilterTabs() {
            this.showFilterTabs = !this.showFilterTabs; //change the status of filtet tabs
        },
        hideFilterTabs() {
            this.showFilterTabs = false;
        },
        navigateToNewsPage(id) {
            this.$router.push({ name: 'newsPage', params: { id } });
        },
        goToPage(toLink) {
            this.$router.push(toLink);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.news-container {
    min-height: 380px;
    margin-top: 120px;
    .breadcrumb {
        margin: 36px 0 16px;
        vertical-align: middle;
        cursor: pointer;
        span {
            &:hover {
                color: $accentColor-2;
            }
        }
        
    }
    h2 {
        color: $secondColor-2;
    }
    .news-section {
        position: relative;
        .news-list {
            box-sizing: border-box;
            padding: 32px 0;
            padding-right: 0px;
            .list-item {
                display: flex;
                flex-direction: column;
                background-color: $secondColor-1;
                transition: all .3s ease-in-out;
                color: $primaryColor;
                padding: 16px 32px;
                box-sizing: border-box;
                border-radius: 10px;
                margin-bottom: 28px;
                cursor: pointer;
                &:hover {
                    background-color: $secondColor-2;
                    transition: all .3s ease-in-out;
                }
                .news-img {
                    overflow: hidden;
                    width: 100%;
                    // min-width: 166px;
                    aspect-ratio: 1.73/1;
                    margin-right: 16px;
                    img {
                        width: 100%;
                    }
                }
                .news-info {
                    margin-top: 10px;
                    .published-date {
                        margin-right: 16px;
                    }
                    .news-type {
                        background-color: $accentColor-1;
                        color:$black;
                        padding: 2px 4px;
                    }
                    .news-title {
                        margin-top: 16px;
                        line-height: 140%;
                    }
                }
            } 
        }
        .news-filter {
            position: absolute;
            top: -10px;
            right: 0;
            h5 {
                border-bottom: 2px solid $black;
                margin-bottom: 8px;
                line-height: 140%;
                color: $black;
                letter-spacing: $base-fontSize * 1 * 0.1;
                display: flex;
                align-items: center;
                #filter-toggle {
                    width: 20px;
                    height: 30px;
                    display: inline-block;
                    background: center/ contain no-repeat url(@/assets/images/filter-icon.svg);
                    margin-left: auto;
                    cursor: pointer;
                }
            }
            .filter-tab {
                background-color: $accentColor-1;
                text-align: center;
                box-sizing: border-box;
                padding: 24px 0;
                cursor: pointer;
                user-select: none;
                &:not(:last-child) {
                    border-bottom: 1px solid $primaryColor;
                }
                &:hover {
                    background-color: darken($color: $accentColor-1, $amount: 10);
                }
            }
        }
    }
}
@media screen and (min-width: 768px) {
    .news-container {
        margin-top: 120px;
        h2 {
            color: $secondColor-2;
        }
        .news-section {
            position: relative;
            .news-list {
                box-sizing: border-box;
                padding: 32px 0;
                padding-right: 24px;
                .list-item {
                    display: flex;
                    flex-direction: row;
                    background-color: $secondColor-1;
                    color: $primaryColor;
                    padding: 16px 32px;
                    box-sizing: border-box;
                    border-radius: 10px;
                    margin-bottom: 28px;
                    cursor: pointer;
                    &:hover {
                        background-color: $secondColor-2;
                    }
                    .news-img {
                        overflow: hidden;
                        width: 23%;
                        min-width: 166px;
                        aspect-ratio: 1.73/1;
                        margin-right: 16px;
                        img {
                            width: 100%;
                        }
                    }
                    .news-info {
                        .published-date {
                            margin-right: 16px;
                        }
                        .news-title {
                            margin-top: 16px;
                            line-height: 140%;
                        }
                    }
                } 
            }
            .news-filter {
                // position: absolute;
                top: 0;
                right: 0;
                h5 {
                    border-bottom: 2px solid $black;
                    margin-bottom: 8px;
                    line-height: 140%;
                    color: $black;
                    letter-spacing: $base-fontSize * 1 * 0.1;
                    #filter-toggle {
                    width: 20px;
                    height: 30px;
                    display: inline-block;
                    background: center/ contain no-repeat url(@/assets/images/filter-icon.svg);
                    margin-left: auto;
                    cursor: pointer;
                    }
                }
                .filter-tab {
                    background-color: $accentColor-1;
                    text-align: center;
                    box-sizing: border-box;
                    padding: 24px 0;
                    cursor: pointer;
                    transition: all .2s ease-in-out;
                    &:not(:last-child) {
                        border-bottom: 1px solid $primaryColor;
                    }
                    &:hover {
                        background-color: darken($color: $accentColor-1, $amount: 10);
                    }
                }
            }
        }
    }
}
</style>
