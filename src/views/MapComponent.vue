<template>
  <div>
    <!-- 頁眉部分 -->
    <header>
      <h1>Travel Planner</h1>
      <button @click="startPlanning">開始規劃</button>
    </header>
    <main>
      <!-- 搜索功能 -->
      <section id="itinerary">
        <h2>你的行程</h2>
        <div id="search-bar">
          <input type="text" v-model="searchQuery" placeholder="搜索地點" @input="searchLocations">
          <ul v-if="filteredSearchResults.length" class="search-results">
            <li v-for="result in filteredSearchResults" :key="result.place_id || result.osm_id"
              @click="selectResult(result.item)">
              {{ result.item.display_name || result.item.name }}
            </li>
          </ul>
        </div>
        <ul>
          <li v-for="location in itinerary" :key="location.place_id || location.osm_id">
            {{ location.display_name || location.name }}
            <button @click="removeLocation(location)">刪除</button>
          </li>
        </ul>
      </section>
      <!-- 地圖部分 -->
      <section id="map">
        <h2>地圖</h2>
        <div id="map-container"></div>
      </section>
    </main>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // 引入leaflet的CSS
import 'leaflet-control-geocoder'; // 引入地理編碼器
import { debounce } from 'lodash'; // 引入lodash的去抖動函數
import Fuse from 'fuse.js'; // 引入Fuse.js

export default {
  data() {
    return {
      map: null, // 存儲地圖實例
      searchQuery: '', // 搜索查詢
      searchResults: [], // 搜索結果
      itinerary: [], // 行程列表
      markers: [], // 存儲所有標記
      fuse: null // Fuse.js實例
    };
  },
  computed: {
    filteredSearchResults() {
      if (!this.searchQuery) {
        return [];
      }
      return this.fuse ? this.fuse.search(this.searchQuery) : this.searchResults;
    }
  },
  mounted() {
    this.initializeMap(); // 初始化地圖
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError); // 獲取當前地理位置
    } else {
      alert('您的瀏覽器不支持地理定位功能');
    }
  },
  methods: {
    // 初始化地圖
    initializeMap() {
      this.map = L.map('map-container').setView([24.958277478835058, 121.22528019206256], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // 初始化地理編碼器
      this.geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
          limit: 50, // 增加返回結果的數量上限
          countrycodes: 'tw', // 限制結果在台灣
          viewbox: '120.8,25.3,122.1,21.8', // 限制在台灣範圍
          bounded: 1 // 使視圖框架生效
        }
      });
    },
    // 設置當前地理位置
    setCurrentLocation(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.map.setView([lat, lng], 13);
    },
    // 顯示定位失敗錯誤
    showError() {
      alert('定位失敗，請手動輸入座標');
    },
    // 搜索地點
    searchLocations: debounce(function () {
      if (!this.searchQuery) {
        this.searchResults = [];
        return;
      }

      console.log('搜索查詢:', this.searchQuery);
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=50&countrycodes=tw`)
        .then(response => response.json())
        .then(results => {
          console.log('API返回結果:', results);  // 打印完整的結果查看返回的數據結構

          if (results.length === 0) {
            console.warn('沒有搜索到相關結果');
          } else if (results.length < 50) {
            console.warn('返回的結果少於50條，可能需要進一步檢查');
          } else {
            console.log('返回了50條結果，API正常工作');
          }

          this.searchResults = results.map(result => ({
            place_id: result.place_id,
            licence: result.licence,
            osm_id: result.osm_id,
            osm_type: result.osm_type,
            boundingbox: result.boundingbox,
            lat: result.lat,
            lon: result.lon,
            display_name: result.display_name,
            class: result.class,
            type: result.type,
            importance: result.importance
          }));

          console.log('解析後的搜索結果:', this.searchResults);

          // 創建或更新 Fuse.js 實例
          this.fuse = new Fuse(this.searchResults, {
            keys: ['display_name'],
            threshold: 4, // 設置模糊搜索的閾值，值越低，匹配越嚴格
            includeScore: true, // 包含匹配分數
            shouldSort: true // 按匹配度排序
          });

          console.log('Fuse實例:', this.fuse);

          // 更新filteredSearchResults以顯示所有匹配“關鍵字”的結果
          this.filteredSearchResults = this.fuse.search(this.searchQuery).map(result => result.item);
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
    }, 300), // 300毫秒的去抖動

    // 刪除行程中的地點
  removeLocation(location) {
    this.itinerary = this.itinerary.filter(item => item !== location);
  },

    // 選擇搜索結果
    selectResult(result) {
      const latlng = { lat: result.lat, lng: result.lon };
      this.map.setView([latlng.lat, latlng.lng], 13);

      // 在地圖上添加搜索結果的標記
      L.marker([latlng.lat, latlng.lng]).addTo(this.map)
        .bindPopup(result.display_name)
        .openPopup();

       // 清空搜索結果和搜索查詢
      this.searchResults = [];
      this.searchQuery = '';

      // 清空 filteredSearchResults
  this.filteredSearchResults = [];

      // 將選擇的結果加入行程列表
      this.itinerary.push(result);
    },
    // 開始規劃按鈕點擊處理函數
    startPlanning() {
      alert("開始規劃行程！");
    }
  }
};
</script>

<style scoped>
/* 全局樣式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
}

/* 頁眉樣式 */
header {
  background-color: #0073e6;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 0;
}

header button {
  background-color: #ffcc00;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}

header button:hover {
  background-color: #ff9900;
}

/* 主要內容樣式 */
main {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-top: 1rem;
}

/* 行程列表樣式 */
section#itinerary {
  flex: 1;
  padding: 1rem;
  background-color: white;
  margin-right: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#itinerary h2 {
  color: #0073e6;
}

/* 搜索框樣式 */
#search-bar {
  position: relative;
  margin-bottom: 1rem;
}

#search-bar input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.search-results li {
  padding: 0.5rem;
  cursor: pointer;
}

.search-results li:hover {
  background: #f0f0f0;
}

/* 地圖樣式 */
section#map {
  flex: 2;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

section#map h2 {
  color: #0073e6;
}

#map-container {
  height: 600px;
  width: 100%;
}
</style>
