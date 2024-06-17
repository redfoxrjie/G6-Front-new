<template>
    <main>
      <div class="section-full-width row">
        <div id="itinerary" class="col col-12 col-md-3">
          <div class="sidebar-header">
              <div class="cover-img">
                <img src="https://picsum.photos/300/200/?random=10">
              </div>
              <div class="cover-text">
                <div class="plan-region">日本</div>
                <h3 class="plan-title">九州五天四夜雙人行</h3>
                <div class="plan-dates font-time">2024/05/19－2024/05/23</div>
              </div>
              <div class="functions">
                <div class="option-btn"></div>
                <div class="star-rate"></div>
              </div>
          </div>
          <ul>
            <li v-for="location in itinerary" :key="location.place_id || location.osm_id">
              {{ location.display_name || location.name }}
              <button @click="removeLocation(location)">刪除</button>
            </li>
          </ul>
        </div>
        <!-- 地圖部分 -->
        <div id="map" class="col col-12 col-md-9">
          <div id="map-container">
            <!-- 搜索功能 -->
            <div id="search-bar">
              <input type="text" v-model="searchQuery" placeholder="搜索地點" @input="searchLocations">
              <ul v-if="filteredSearchResults.length" class="search-results">
                <li v-for="result in filteredSearchResults" :key="result.place_id || result.osm_id"
                @click="selectResult(result.item)">
                {{ result.item.display_name || result.item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
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
        // 找到對應的標記
        const markerObj = this.markers.find(marker => marker.location === location);
  
        if (markerObj) {
          // 從地圖上移除標記
          this.map.removeLayer(markerObj.marker);
  
          // 從標記數組中移除標記
          this.markers = this.markers.filter(marker => marker !== markerObj);
        }
  
        // 從行程列表中移除地點
        this.itinerary = this.itinerary.filter(item => item !== location);
      },
  
      // 選擇搜索結果
      selectResult(result) {
        const latlng = { lat: result.lat, lng: result.lon };
        this.map.setView([latlng.lat, latlng.lng], 13);
  
        // 在地圖上添加搜索結果的標記
        const marker = L.marker([latlng.lat, latlng.lng]).addTo(this.map)
        .bindPopup(result.display_name + '<br><button class="add-to-plan" style="color: red; cursor: pointer;" @click="addToPlan(result.item)">加入行程</buttom>')
        // .openPopup(result.display_name)
  
        // 存儲標記
        this.markers.push({ location: result, marker: marker });
  
        // 清空搜索結果和搜索查詢
        this.searchResults = [];
        this.searchQuery = '';
  
        // 清空 filteredSearchResults
        this.filteredSearchResults = [];
  
        // 將選擇的結果加入行程列表
        this.itinerary.push(result);
      },
    }
  };
  </script>
  
  
  <!-----------------------------------樣式表------------------------------------------->
  <style lang="scss" scoped>
  @import '../assets/styles/base/color';
  @import '../assets/styles/base/font';
  
  .section-full-width{
    margin-top: 70px;
  }
  button.add-to-plan {
    &::before {
      content: '+';
      width: 50px;
      height: 50px;
    }
  }
  
  /* 行程列表樣式 */
  #itinerary {
    position: relative;
    .sidebar-header {
      position: relative;
      .cover-img {
        width: 100%;
        aspect-ratio: 2.12/1;
        overflow: hidden;
        img { 
          width: 100%;
          height: 100%;
          display: inline-block;
          filter: brightness(75%);
        }
      }
      .cover-text {
        position: absolute;
        bottom: 12px;
        left: 12px;
        color: $primaryColor;
      }
    }
  }
  /* 地圖樣式 */
  #map {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
    #map-container {
      height: 100vh;
      width: 100%;
      z-index: 1;
      position: relative;
      /* 搜索框樣式 */
      #search-bar {
        width: 30%;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 401;
        input {
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
            z-index: 1;
            li {
              padding: 0.5rem;
              cursor: pointer;
              &:hover{
                background-color: #f0f0f0;
              }
            }
        }
      }
    }
  }
  
  </style>