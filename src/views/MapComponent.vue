<template>
  <main>
    <div class="section-full-width row">
      <div id="itinerary" class="col col-12 col-md-4 col-lg-3">
        <div class="sidebar-header">
            <div class="cover-img">
              <img src="@/assets/images/japan_yufuin-kinrinko.jpg">
            </div>
            <div class="cover-text">
              <div class="plan-region">{{ tripData.selectedArea }}</div>
              <h4 class="plan-title">{{ tripData.tripName }}</h4>
              <div class="plan-dates font-time">
                <span id="trpSdate">{{ tripData.startDate }}</span>
                －
                <span class="trpEdate">{{ tripData.endDate }}</span>
              </div>
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
        <div v-if="daysCount" class="days-tabs">
          <div
          v-for="day in daysCount" :key="day"
          :class="['tabs', {selected: day === selectedDay}]"
          @click="selectDay(day)"
          >
            第{{ day }}天
          </div>
        </div>
        <ul
          v-for="day in daysCount" :key="day"
          v-show="selectedDay === day"
          class="day-plan-list">
          <div v-if="daysCount" class="day-settings">
            <div class="departure-time">
              出發時間：
              <span class="edit-time" @click="onEditTimeClick">{{ departureTime }}</span>
            </div>
            <div class="day-info">
              {{ calculateDate(day) }} ({{ getWeekday(day) }})
            </div>
          </div>
          <li v-for="location in getItineraryForDay(day)" :key="location.place_id || location.osm_id"
            draggable="true"
            @dragstart="dragStart(location, $event)"
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
  props: {
    tripData: {
      type: Object,
      required: true,
    },
    onEditTimeClick: {
      type: Function,
      required: true,
    },
    departureTime: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      map: null, // 儲存地圖實例
      searchQuery: '', // 搜索查詢
      searchResults: [], // 搜索结果
      itinerary: [], // 行程列表
      markers: [], // 儲存所有marker
      fuse: null, // Fuse.js實例
      source: null, //儲存被拖曳的實例
      overItem: null, //儲存被觸發dragover的實例
      search: "",
      plan: null,
      daysCount: 0, // 初始化 daysCount 為 0
      selectedDay: 1,
      startDateObj: null, // 新增開始日期的 Date 物件
      weekdays: ['日', '一', '二', '三', '四', '五', '六'], // 儲存星期幾的名稱
      isMapVisible: true, 
      switchBtnText: '返回行程',
      defaultMarkerIcon: null //保存自定義marker icon
    };
  },
  components: {
    IconStarRating, //評星小功能
  },
  computed: {
    filteredSearchResults() {
      if (!this.searchQuery) {
        return [];
      }
      return this.fuse ? this.fuse.search(this.searchQuery) : this.searchResults;
    },
    filteredItinerary() {
      // Filter itinerary based on selectedDay (this function now is unfunctional)
      return this.itinerary.filter(item => item.day === this.selectedDay);
    }
  },
  watch: {
    tripData: {
      handler(newValue, oldValue) {
        if (newValue.startDate && newValue.endDate) {
          this.startDateObj = new Date(newValue.startDate); // 更新開始日期的 Date 物件
          this.calcDaysDiff(); // 重新計算天數
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 初始化地圖
    initializeMap() {
      // 台灣的setView
      // this.map = L.map('map-container').setView([24.958277478835058, 121.22528019206256], 13);
      this.map = L.map('map-container').setView([35.682203, 139.7617181], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // 自定義 marker 圖片路徑
      const markerIcon = new L.Icon({
        iconUrl: 'https://tibamef2e.com/cid101/g6/front/images/togo-marker-icon-2x.png',
        iconSize: [44, 72], // 圖片大小
        iconAnchor: [12, 41], // 圖片錨點
        popupAnchor: [1, -34],
        shadowUrl: 'https://tibamef2e.com/cid101/g6/front/images/togo-marker-shadow.png', // 如果有陰影圖片
        shadowSize: [46, 46] // 陰影圖片大小
      });

      this.defaultMarkerIcon = markerIcon; // 保存到 this.defaultMarkerIcon 中

      // 初始化地理編碼器
      this.geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
          //---------------------------------台灣
          // limit: 50, // 增加返回结果的數量上限
          // countrycodes: 'tw', // 限制结果在台灣
          // viewbox: '120.8,25.3,122.1,21.8', // 限制在台灣範圍
          // bounded: 1 // 使視圖框架生效

          //-----------------------------------日本
          limit: 50, // 增加返回结果的數量上限
          countrycodes: 'jp', // 限制结果在日本
          viewbox: '122.56,20.25,153.59,45.33', // 限制在日本範圍
          bounded: 1 // 使視圖框架生效
        }
      });
    },
    // 設置當前的地理位置
    setCurrentLocation(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      this.map.setView([lat, lng], 13);
    },
    // 顯示定位失敗的錯誤訊息 (此功能必要性再檢討)
    showError() {
      alert('定位失敗，請手動輸入座標');
    },
    // 搜尋地點
    searchLocations: debounce(function () {
      if (!this.searchQuery) {
        this.searchResults = [];
        return;
      }
      //台灣區域的資料fetch
      // fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=50&countrycodes=tw`)

      //日本區域的資料fetch
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=50&countrycodes=jp`)
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
            full_address: `${result.address?.postcode || ''}${result.address?.country || ''}${result.address?.province || ''}${result.address?.city || ''} ${result.address?.town || ''} ${result.address?.quarter || ''}${result.address?.road|| ''}`
          }));

          // 創建或更新 Fuse.js 實例
          this.fuse = new Fuse(this.searchResults, {
            keys: ['display_name'],
            threshold: 0.3, // 設置模糊搜尋的域值，值越低，匹配條件越嚴格
            includeScore: true, // 包含匹配分數
            shouldSort: true // 按匹配度排序
          });
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
    }, 300), // 300毫秒的去抖動

    // 添加marker
    addMarker(result) {
      const latlng = { lat: result.lat, lng: result.lon };
      this.map.setView([latlng.lat, latlng.lng], 13);

      // 在地圖上添加搜索结果的marker
      const marker = L.marker([latlng.lat, latlng.lng], { icon: this.defaultMarkerIcon }).addTo(this.map)
      .bindPopup(this.createPopupContent(result));
        
      // 儲存標記
      this.markers.push({ location: result, marker: marker });

      // 清空搜索结果和搜索查詢
      this.searchResults = [];
      this.searchQuery = '';

      // 清空 filteredSearchResults
      this.filteredSearchResults = [];
    },

    // 創建popup彈出框內容
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
    // addToPlan(location) {
    //   if (!this.itinerary.some(item => item.place_id === location.place_id)) {
    //     this.itinerary.push(location);
    //   }
    // },
    addToPlan(location) {
      if (!this.itinerary.some(item => item.place_id === location.place_id)) {
        location.day = this.selectedDay; // 將行程分配到選中的天數
        this.itinerary.push(location);
      }
    },
    // --------------- 返回對應天數的行程 ------------------------------------
    getItineraryForDay(day) {
      return this.itinerary.filter(item => item.day === day);
    },
    // -----------------删除行程中的地點-----------------------------------
    removeLocation(location) {
      // 找到對應的標記
      const markerObj = this.markers.find(marker => marker.location === location);

      if (markerObj) {
        // 從地圖上移除標記
        this.map.removeLayer(markerObj.marker);

        // 從標記數組中移除標記
        this.markers = this.markers.filter(marker => marker !== markerObj);
      }

      // 從行程表中移除地點
      this.itinerary = this.itinerary.filter(item => item !== location);
    },
    // -------------------------Darg and Drop--------------------------------
    dragStart(location, event) {
      this.source = location;
      event.target.classList.add('dragging'); // drag開始時添加dragging類別
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
    dragEnd(event){
      if (event && event.target) {
        event.target.classList.remove('dragging'); // drag結束時移除dragging
      }
      this.source = null;
      
    },
    clearOverItem() {
      if (!this.overItem) return;
      this.overItem.classList.remove('before');
      this.overItem.classList.remove('after');
      this.overItem = null;
    },
    drop(event) {
      if (!this.source) return;

      // 確認正確的ul列表
      const dayPlanList = event.target.closest('ul.day-plan-list');
        
      if (!dayPlanList) return; // 如果找不到對應的ul，則返回
        
      // 確認 overItem 的位置
      const listItems = Array.from(dayPlanList.children);
      let overIndex = listItems.indexOf(this.overItem);
      
      // 清除原本位置的 this.source
      const sourceIndex = this.itinerary.indexOf(this.source);
      this.itinerary.splice(sourceIndex, 1);

      // 檢查 overItem 的位置和 class
      if (this.overItem && this.overItem.classList.contains('after')) {
        overIndex++;
      }
    
      // 如果 `sourceIndex` 在 `overIndex` 之前，則 `overIndex` 需要減少1
      if (sourceIndex < overIndex) {
        overIndex--;
      }
    
      // 將 this.source 插入正確的位置
      if (this.overItem) {
        this.itinerary.splice(overIndex, 0, this.source);
      } else {
        // 如果没有 overItem，默認將 this.source 插入到列表末尾
        this.itinerary.push(this.source);
      }
    
      // 清除所有樣式和狀態
      this.clearOverItem();
      this.source = null;
    
      // 打印當下天數的行程列表
      console.log(`Current day (${this.selectedDay}) itinerary:`);
      this.getItineraryForDay(this.selectedDay).forEach((location, index) => {
        console.log(`Index: ${index}, Name: ${location.name}`);
      });
       // 打印所有天數的行程列表
      this.printItineraryForAllDays();
    },
    printItineraryForAllDays() {
      const days = new Set(this.itinerary.map(item => item.day));
      days.forEach(day => {
        console.log(`Day ${day} itinerary:`);
        this.getItineraryForDay(day).forEach((location, index) => {
          console.log(`Index: ${index}, Name: ${location.name}`);
        });
      });
    },
    //----------------行程資料帶入-----------------
    loadJsonData() {
            const trpId = this.$route.params.trp_id;
            fetch(`${import.meta.env.BASE_URL}json/mytrips.json`)
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
    //-----------------------------------計算行程天數
    // 根據開始日期計算第 day 天的日期
    calculateDate(day) {
      const date = new Date(this.startDateObj);
      date.setDate(date.getDate() + (day - 1));
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    // 根據開始日期計算第 day 天是星期幾
    getWeekday(day) {
      const date = new Date(this.startDateObj);
      date.setDate(date.getDate() + (day - 1));
      return this.weekdays[date.getDay()];
    },
    calcDaysDiff() {
      const start = new Date(this.tripData.startDate);
      const end = new Date(this.tripData.endDate);
      const timeDiff = end - start; //結束日期 減 開始日期，得到毫秒差
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24); //將毫秒數轉換為"天數"
      this.daysCount = daysDiff + 1; //包含開始和結束日期的總天數
      console.log('Days Count:', this.daysCount);
    },
    //----------選擇第N天的行程表--------
    selectDay(day) {
      this.selectedDay = day;
      this.printItineraryForAllDays(); // 打印所有天數的行程列表以檢查獨立性
      console.log(`Selected day: ${this.selectedDay}`); // 檢查點擊的天數
    },
    //----------手機版地圖與行程列表顯示切換---------
    mbMapToggle(){
      this.isMapVisible = !this.isMapVisible;
      this.switchBtnText = this.isMapVisible ? '返回行程' : '顯示地圖';
    }
  },
  mounted() {
    this.initializeMap(); // 初始化地圖
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError); // 獲取目前的地理位置
    } else {
      alert('您的瀏覽器或裝置不支援GPS定位功能');
    }
    this.loadJsonData();
    this.calcDaysDiff();
  },
};
</script>


<!-----------------------------------樣式表------------------------------------------->
<style lang="scss" scoped>
@import '../assets/styles/base/color';
@import '../assets/styles/base/font';

.hidden {
  display: none;
}
.section-full-width{
  width: 100%;
  position: relative;
  margin-top: 54px;
  margin-bottom: 0;
}

/* 行程列表樣式 */
li.dragging{
      opacity: 1 !important;
    }
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
  
  //行程景點清單
  .day-plan-list{
    box-sizing: border-box;
    padding: 0 12px;
    overflow-y: scroll;
    flex-grow: 1;
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
    li.before::before, li.after::after {
      content: '';
      width: 100%;
      height: 4px;
      background-color: $secondColor-1;
      display: block;
    }
    li.before::before {
      position: absolute;
      top: -5px;
      left: 0;
    }
    li.after::after {
      position: absolute;
      bottom: -5px;
      left: 0;
    }
    //出發時間日期樣式
    .day-settings{
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 12px 6px;
      font-size: 0.8rem;
      .departure-time {
        .edit-time {
          text-decoration: underline;
          cursor: pointer;
        }
      }
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
      &.selected {
        border-bottom: 2px solid $secondColor-2;
      }
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
  top: 8vh;
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