<template>
  <main>
    <div class="section-full-width row">
      <div id="itinerary" class="col col-12 col-md-4 col-lg-3">
        <div class="sidebar-header">
            <div class="cover-img">
              <img src="@/assets/images/japan_yufuin-kinrinko.jpg">
            </div>
            <div class="cover-text">
              <div class="plan-region">日本</div>
              <h4 class="plan-title">北九州五天四夜雙人行</h4>
              <div class="plan-dates font-time">2024/05/19－2024/05/23</div>
            </div>
            <div class="functions">
              <div class="option-btn">
                <font-awesome-icon icon="ellipsis" size="lg" />
              </div>
              <div class="star-rate">
                <IconStarRating />
              </div>
            </div>
        </div>
        <div class="days-tabs">
          <div
          v-for="day in daysCount" :key="day"
          class="tabs" 
          @click="selectDay(day)"
          >
            第{{ day }}天
          </div>
        </div>
        <div class="day-settings">
          <div class="departure-time">
            出發時間：
            <span class="edit-time">04:10</span>
          </div>
          <div class="day-info">2024/05/19 (日)</div>
        </div>
        <ul v-if="selectedDay !== null" class="day-plan-list">
          <li v-for="location in itinerary" :key="location.place_id || location.osm_id"
            draggable="true"
            @dragstart="dragStart(location)"
            @dragend="dragEnd"
            @dragover="dragOver"
            @drop="drop">
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
        <div class="mb-btn-fixed">
          <button id="mapSwitch" @click="mbMapToggle">{{ switchBtnText }}</button>
        </div>
      </div>
      <!-- 地圖部分 -->
      <div id="map" class="col col-12 col-md-8 col-lg-9" v-show="isMapVisible">
        <div id="map-container">
          <!-- 搜索功能 -->
          <div id="search-bar">
            <input type="text" v-model="searchQuery" placeholder="搜尋景點" @input="searchLocations">
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
import IconStarRating from '@/components/icons/IconStarRating.vue';

export default {
  data() {
    return {
      map: null, // 存储地图实例
      searchQuery: '', // 搜索查询
      searchResults: [], // 搜索结果
      itinerary: [], // 行程列表
      markers: [], // 存储所有标记
      fuse: null, // Fuse.js实例
      source: null, //儲存被拖曳的實例
      overItem: null, //儲存被觸發dragover的實例
      search: "",
      plan: null,
      daysCount: null, // 儲存計算後的天數
      selectedDay: 1,
      isMapVisible: true, 
      switchBtnText: '返回行程'
    };
  },
  components: {
    IconStarRating //評星小功能
  },
  computed: {
    filteredSearchResults() {
      if (!this.searchQuery) {
        return [];
      }
      return this.fuse ? this.fuse.search(this.searchQuery) : this.searchResults;
    },
    filteredItinerary() {
      // Filter itinerary based on selectedDay
      return this.itinerary.filter(item => item.day === this.selectedDay);
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
    },
    // -------------------------Darg and Drop--------------------------------
    dragStart(location) {
      this.source = location;
    },
    dragEnd(){
      this.source = null;
    },
    clearOverItem() {
      if (!this.overItem) return;
      this.overItem.classList.remove('before');
      this.overItem.classList.remove('after');
      this.overItem = null;
    },
    dragOver(event) {
      this.clearOverItem();
      const target = event.target.closest('li');
      if (target && target.getAttribute('draggable') && target !== this.source) {
        this.overItem = target;
      
        if (event.offsetY > target.offsetHeight / 2) {
          target.classList.add('after');
        } else {
          target.classList.add('before');
        }
      }
      event.preventDefault();
    },

    drop(event) {
      if (!this.source) return;

      // 清除原本位置的 this.source
      const sourceIndex = this.itinerary.indexOf(this.source);
      this.itinerary.splice(sourceIndex, 1);

      // 确认 overItem 的位置，并将 this.source 插入正确的位置
      if (this.overItem) {
        const list = this.$el.querySelector('.day-plan-list');
        let overIndex = Array.from(list.children).indexOf(this.overItem);
      
        // 检查 overItem 的位置和 class
        if (this.overItem.classList.contains('after')) {
          overIndex++;
        } else if (this.overItem.classList.contains('before') && overIndex > 0) {
          overIndex--;
        }
      
        this.itinerary.splice(overIndex, 0, this.source);
      } else {
        // 如果没有 overItem，默认将 this.source 插入到列表末尾
        this.itinerary.push(this.source);
      }
    
      // 清除所有样式和状态
      this.clearOverItem();
      this.source = null;
    
      // 打印 行程列表 中每个<li>的index值与对应的location.name，检查是否换位正确
      this.itinerary.forEach((location, index) => {
        console.log(`Index: ${index}, Name: ${location.name}`);
      });
    },
    //----------------行程資料帶入-----------------
    loadJsonData() {
            const trpId = this.$route.params.trp_id;
            fetch('../../json/mytrips.json')
                .then(res => res.json())
                .then(data => {
                    this.plan = data.find(cards => cards.trp_id == trpId);
                    console.log(this.plan);
                })
                .catch((error) => {
                    //捕捉錯誤例外
                    console.error('Error loading JSON data:', error);
                    // console.log(`Error: ${error}`);
                });
        },
    //-------計算行程天數----------
    calcDaysDiff(sdate, edate) {
      const start = new Date(sdate);
      const end = new Date(edate);
      const timeDiff = end - start; //結束日期 減 開始日期，得到毫秒差
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24); //將毫秒數轉換為"天數"
      this.daysCount = daysDiff + 1; //包含開始和結束日期的總天數
      console.log('Days Count:', this.daysCount);
    },
    //----------選擇第N天的行程表--------
    selectDay(day) {
      this.selectedDay = day;
      console.log(this.selectedDay); //檢查點擊的天數
    },
    //----------手機版地圖開關---------
    mbMapToggle(){
      this.isMapVisible = !this.isMapVisible;
      this.switchBtnText = this.isMapVisible ? '返回行程' : '顯示地圖';
    }
  },
  mounted() {
    this.initializeMap(); // 初始化地图
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError); // 获取当前地理位置
    } else {
      alert('您的浏览器不支持地理定位功能');
    }
    this.loadJsonData();
    this.calcDaysDiff('2024/05/19', '2024/05/23');
  },
};

</script>


<!-----------------------------------樣式表------------------------------------------->
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.section-full-width{
  margin-top: 54px;
  margin-bottom: 0;
}

/* 行程列表樣式 */
#itinerary {
  display: flex;
  flex-direction: column;
  height: 88vh;
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
    .functions {
      .option-btn{
        position: absolute;
        top: 12px;
        right: 16px;
        color: #fff;
        cursor: pointer;
      }
      .star-rate {
        position: absolute;
        bottom: 12px;
        right: 16px;
      }
    }
  }
  //出發時間日期樣式
  .day-settings{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 12px 12px;
    font-size: 0.8rem;
    .departure-time {
      .edit-time {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .day-info {}
  }
  //行程景點清單
  .day-plan-list{
    box-sizing: border-box;
    padding: 0 12px;
    overflow-y: scroll;
    flex-grow: 1;
    border-bottom: 1px solid red;
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
    li.before {
        width: 100%;
        height: 2px;
        background-color: $secondColor-2;
      }
  }
  .days-tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    .tabs {
      cursor: pointer;
      font-size: 0.8rem;
      padding: 16px 0px;
      text-align: center;
      color: $black;
      flex-grow: 1;
    }
  }
  .mb-btn-fixed {
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
    #mapSwitch {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      padding: 12px;
      cursor: pointer;
      font-size: 0.875rem;
      color: $gray;
    }
  }
}
/* 地圖樣式 */
#map {
  position: absolute;
  top: 10vh;
  left: 0;
  height: fit-content;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  &.hidden {
    display: none;
  }
  #map-container {
    height: 88vh;
    width: 100%;
    z-index: 1;
    position: relative;
    /* 搜索框樣式 */
    #search-bar {
      font-family: 'HunInn';
      width: 70%;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 401;
      input {
        width: 100%;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
        font-size: 1rem;
        letter-spacing: 0.05rem;
        border-radius: 10px;
        border: 2px solid $secondColor-1;
        font-family: 'HunInn';
        color: $secondColor-2;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
        &::placeholder {
          color:  $secondColor-1;
        }
        &:focus {
            border: 2px solid $secondColor-2;
            outline: unset;
            &::placeholder {
              color:  $secondColor-2;
            }
          }
      }
      .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid $secondColor-1;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1;
          li {
            color: $black;
            font-size: 0.875rem;
            box-sizing: border-box;
            padding: 8px 12px;
            cursor: pointer;
            &:hover{
              background-color: $secondColor-2;
              color: $primaryColor;
            }
          }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .section-full-width{
    margin-top: 85px;
    margin-bottom: 0;
  }
  .mb-btn-fixed {
    display: none;
  }
  #map {
    position: relative;
    top: unset;
    left: unset;
    #map-container{
      /* 搜索框樣式 */
      #search-bar {
        font-family: 'HunInn';
        width: 30%;
        min-width: 190px;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 401;
      }
    }
  }
}
</style>