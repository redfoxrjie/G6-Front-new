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
              <h4 class="plan-title">九州五天四夜雙人行</h4>
              <div class="plan-dates font-time">2024/05/19－2024/05/23</div>
            </div>
            <div class="functions">
              <div class="option-btn"></div>
              <div class="star-rate"></div>
            </div>
        </div>
        <ul class="day-plan-list">
          <li v-for="location in itinerary" :key="location.place_id || location.osm_id">
            <div class="spot-img">
              <img src="https://picsum.photos/300/200/?random=5">
            </div>
            <div class="spot-info">
              <div class="spot-time font-time">04:10 - 06:30</div>
              <div class="spot-name">{{ location.name }}</div>
              <div class="duration">停留2小時20分</div>
              <button @click="removeLocation(location)" class="delete-btn">刪除</button>
            </div>
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
              <li v-for="result in filteredSearchResults" :key="result.place_id || result.osm_id" @click="addMarker(result.item)">
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
      map: null, // 存储地图实例
      searchQuery: '', // 搜索查询
      searchResults: [], // 搜索结果
      itinerary: [], // 行程列表
      markers: [], // 存储所有标记
      fuse: null // Fuse.js实例
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
    this.initializeMap(); // 初始化地图
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError); // 获取当前地理位置
    } else {
      alert('您的浏览器不支持地理定位功能');
    }
  },
  methods: {
    // 初始化地图
    initializeMap() {
      this.map = L.map('map-container').setView([24.958277478835058, 121.22528019206256], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // 初始化地理编码器
      this.geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
          limit: 50, // 增加返回结果的数量上限
          countrycodes: 'tw', // 限制结果在台湾
          viewbox: '120.8,25.3,122.1,21.8', // 限制在台湾范围
          bounded: 1 // 使视图框架生效
        }
      });
    },
    // 设置当前地理位置
    setCurrentLocation(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.map.setView([lat, lng], 13);
    },
    // 显示定位失败错误
    showError() {
      alert('定位失败，请手动输入坐标');
    },
    // 搜索地点
    searchLocations: debounce(function () {
      if (!this.searchQuery) {
        this.searchResults = [];
        return;
      }

      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=50&countrycodes=tw`)
        .then(response => response.json())
        .then(results => {
          this.searchResults = results.map(result => ({
            place_id: result.place_id,
            licence: result.licence,
            osm_id: result.osm_id,
            osm_type: result.osm_type,
            boundingbox: result.boundingbox,
            lat: result.lat,
            lon: result.lon,
            display_name: result.display_name,
            name: result.name,
            class: result.class,
            type: result.type,
            importance: result.importance,
            full_address: `${result.address?.postcode || ''}${result.address?.country || ''}${result.address?.city || ''} ${result.address?.town || ''} ${result.address?.road|| ''}`
          }));

          // 创建或更新 Fuse.js 实例
          this.fuse = new Fuse(this.searchResults, {
            keys: ['display_name'],
            threshold: 0.3, // 设置模糊搜索的阈值，值越低，匹配越严格
            includeScore: true, // 包含匹配分数
            shouldSort: true // 按匹配度排序
          });
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
    }, 300), // 300毫秒的去抖动

    // 添加标记
    addMarker(result) {
      const latlng = { lat: result.lat, lng: result.lon };
      this.map.setView([latlng.lat, latlng.lng], 13);

      // 在地图上添加搜索结果的标记
      const marker = L.marker([latlng.lat, latlng.lng]).addTo(this.map)
        .bindPopup(this.createPopupContent(result));

      // 存储标记
      this.markers.push({ location: result, marker: marker });

      // 清空搜索结果和搜索查询
      this.searchResults = [];
      this.searchQuery = '';

      // 清空 filteredSearchResults
      this.filteredSearchResults = [];
    },

    // 创建弹出框内容
    createPopupContent(result) {
      const container = document.createElement('div');
      container.innerHTML = `<div style='font-size: 16px; font-weight: bold;'>${result.name}</div><div style='color: #888'>${result.full_address}</div>`;
      const button = document.createElement('button');
      button.textContent = '加入行程';
      button.style.color = '#4F82D4';
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => {
        this.addToPlan(result);
      });
      container.appendChild(button);
      return container;
    },

    // 加入行程
    addToPlan(location) {
      if (!this.itinerary.some(item => item.place_id === location.place_id)) {
        this.itinerary.push(location);
      }
    },

    // 删除行程中的地点
    removeLocation(location) {
      // 找到对应的标记
      const markerObj = this.markers.find(marker => marker.location === location);

      if (markerObj) {
        // 从地图上移除标记
        this.map.removeLayer(markerObj.marker);

        // 从标记数组中移除标记
        this.markers = this.markers.filter(marker => marker !== markerObj);
      }

      // 从行程列表中移除地点
      this.itinerary = this.itinerary.filter(item => item !== location);
    }
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
  height: 100vh;
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
      .plan-region{
        font-size: $base-fontSize * 0.875;
      }
      .plan-title {
        margin: 6px 0;
        width: 70%;
      }
    }
  }
  .day-plan-list{
    box-sizing: border-box;
    padding: 0 12px;
    overflow-y: scroll;
    height: 58vh;
    border-bottom: 1px solid $black;
    li{
      position: relative;
      width: 100%;
      cursor: grab;
      margin: 12px 0;
      background-color: #fff;
      display: flex;
      border-radius: 10px;
      .spot-img {
        border-radius: 10px 0 0 10px;
        width: 28%;
        aspect-ratio: 1/1;
        overflow: hidden;
        img {
          width: auto;
          height: 100%;
          display: inline-block;
        }
      }
      .spot-info {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        box-sizing: border-box;
        padding: 12px;
        height: auto;
        .spot-name {
          margin: 8px 0;
        }
        .duration {
          margin-top: auto;
          font-size: $base-fontSize * 0.75;
          color: $gray;
        }
        .delete-btn {
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
}
/* 地圖樣式 */
#map {
  height: fit-content;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  #map-container {
    height: 85vh;
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