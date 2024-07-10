<template>
  <main>
    <div class="section-full-width row">
      <div id="itinerary" class="col col-12 col-md-4 col-lg-3">
        <div class="sidebar-header">
            <div class="cover-img" v-if="coverImageUrl">
              <img :src="coverImageUrl" alt="Cover Image" />
            </div>
            <div class="cover-text">
              <div class="plan-region">
                <font-awesome-icon icon="location-dot" />
                {{ areaMapping[tripData.selectedArea] }}
              </div>
              <h4 class="plan-title">{{ tripData.tripName }}</h4>
              <div class="plan-dates font-time">
                <span id="trpSdate">{{ tripData.startDate }}</span>
                －
                <span class="trpEdate">{{ tripData.endDate }}</span>
              </div>
            </div>
            <div class="functions">
              <div class="option-btn" @click="showFunctionList = !showFunctionList">
                <font-awesome-icon icon="ellipsis" size="lg" />
              </div>
              <FunctionList 
                v-if="showFunctionList" 
                @coverImageUploaded="handleCoverImageUploaded" 
                @edit-plan-setting="handleEditPlanSetting"
              />
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
              <span class="edit-time" @click="handleEditTimeClick(day)">{{ departureTimes[day] || '07:00' }}</span>
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
              <img src="https://picsum.photos/300/200/?random=1">
            </div>
            <div class="spot-info">
              <div class="spot-time font-time">{{ formatSpotTime(location.spotTime) }}</div>
              <div class="spot-name">{{ location.name }}</div>
              <div class="duration" @click="showEditStayTime(location)">停留{{ location.receivedStayTime || receivedStayTime }}</div>
              <button class="tools" @click="toggleTools($event, location)">
                <font-awesome-icon icon="ellipsis"/>
              </button>
              <ul v-if="location.showTools" class="tool-list" @click.stop>
                <li class="note" @click="handleNote">
                  <font-awesome-icon icon="file-pen" size="sm" />
                  筆記
                </li>
                <li @click="removeLocation(location)" class="delete">
                  <font-awesome-icon icon="trash-can" size="sm"/>
                  刪除
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="save-plan">
          <button id="saveTripPlan" @click="saveTripPlan">
            <font-awesome-icon icon="floppy-disk" />
            儲存行程
          </button>
        </div>
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
     <!-- 0627新增：筆記彈出層組件 -->
     <NotePopup
      :isOpen="isNotePopupOpen"
      :initialTitle="noteTitle"
      :initialContent="noteContent"
      @close="closeNotePopup"
      @save="saveNote"
    />
  </main>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // 引入leaflet的CSS
import 'leaflet-control-geocoder'; // 引入地理編碼器
import { debounce } from 'lodash'; // 引入lodash的去抖動函數
import Fuse from 'fuse.js'; // 引入Fuse.js
import IconStarRating from '@/components/icons/IconStarRating.vue';
import NotePopup from '@/components/map/NotePopup.vue';// 新增：導入 NotePopup 組件
import FunctionList from '@/components/map/FunctionList.vue';


export default {
  props: {
    tripData: {
      type: Object,
      required: true,
    },
    tripDays: {
      type: Array,
      required: true
    },
    onEditTimeClick: {
      type: Function,
      required: true,
    },
    departureTimes: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      map: null, // 儲存地圖實例
      geocoder: null,
      areaMapping: {
        jp: '日本',
        kr: '韓國',
        cn: '港澳',
        th: '泰國'
      },
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
      defaultMarkerIcon: null, //保存自定義marker icon
      isNotePopupOpen: false, // 筆記相關的數據
      noteTitle: '',
      noteContent: '',
      // coverImageUrl: sessionStorage.getItem('coverImage') || 'src/assets/images/default-userBg.png',
      coverImageUrl: '',
      showFunctionList: false, // 預設隱藏 FunctionList
      receivedStayTime: '2小時0分',
    };
  },
  components: {
    IconStarRating, //評星小功能
    NotePopup, // 新增：註冊 NotePopup 組件
    FunctionList,
  },
  created() {
    // 加載頁面時根據 tripData.tripImg 初始化 coverImageUrl
    if (this.tripData.tripImg) {
      this.coverImageUrl = `http://localhost/phpG6/images/${this.tripData.tripImg}`;
    } else {
      this.coverImageUrl = sessionStorage.getItem('coverImage') || 'src/assets/images/default-userBg.png';
    }
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
    },
  },
  watch: {
    tripData: {
      handler(newValue, oldValue) {
        if (newValue.startDate && newValue.endDate) {
          this.startDateObj = new Date(newValue.startDate); // 更新開始日期的 Date 物件
          this.calcDaysDiff(); // 重新計算天數
        }
        if (newValue.selectedArea && newValue.selectedArea !== oldValue.selectedArea) {
          this.updateGeocoder(newValue.selectedArea);
          this.setCenterByCountryCode(newValue.selectedArea);
        }
      },
      deep: true,
      immediate: true,
    },
    departureTimes: {
      handler(newValue) {
        console.log('departureTimes changed:', newValue);
        // 出發時間改變時重新計算景點時間
        this.recalculateSpotTimes();
      },
      deep: true
    },
    itinerary: {
      handler() {
        // 行程改變時重新計算景點時間
        this.recalculateSpotTimes();
      },
      deep: true
    },
    'tripData.tripImg': {
      handler(newImg, oldImg) {
        if (newImg) {
          this.coverImageUrl = `http://localhost/phpG6/images/${newImg}`;
        } else {
          this.coverImageUrl = sessionStorage.getItem('coverImage') || 'src/assets/images/default-userBg.png';
        }
      },
      immediate: true // 立即执行一次 handler
    },
  },
  methods: {
    // 初始化地圖
    initializeMap() {
      this.map = L.map('map-container').setView([35.6821936, 139.762221], 13);
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

      this.updateGeocoder(this.tripData.selectedArea);
      this.setCenterByCountryCode(this.tripData.selectedArea);
    },
    //更新對應的國家或地區的圖資
    updateGeocoder(countryCode) {
      const geocodingQueryParams = {
        limit: 50,
        countrycodes: countryCode
      };
      
      if (countryCode === 'jp') {
        geocodingQueryParams.viewbox = '122.56,20.25,153.59,45.33';
      } else if (countryCode === 'kr') {
        geocodingQueryParams.viewbox = '124.59,33.06,131.53,38.37';
      } else if (countryCode === 'th') {
        geocodingQueryParams.viewbox = '97.20,5.37,105.39,20.27';
      } else if (countryCode === 'cn') {
        geocodingQueryParams.viewbox = '113.31,22.09,114.30,22.37';
      }

      this.geocoder = L.Control.Geocoder.nominatim({ geocodingQueryParams });
    },
    // 根據countryCode設定地圖中心位置
    setCenterByCountryCode(countryCode) {
      let lat, lng;
      if (countryCode === 'jp') {
        lng = 139.7612242;
        lat = 35.6829273;
      } else if (countryCode === 'kr') {
        lng = 127.0020568;
        lat = 37.571731;
      } else if (countryCode === 'th') {
        lng = 100.5048956;
        lat = 13.7393362;
      } else if (countryCode === 'cn') {
        lng = 114.1678282;
        lat = 22.3180126;
      } else {
        // 如果 countryCode 不在上面列出，則設定為某個默認位置，例如台北101
        lng = 121.5654177;
        lat = 25.033968;
      }
      this.map.setView([lat, lng], 13);
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
      //OSM地圖資料fetch：根據countrycodes
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=50&countrycodes=${this.tripData.selectedArea}`)
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

      // 在地圖上添加搜索结果的marker
      const marker = L.marker(latlng, { icon: this.defaultMarkerIcon }).addTo(this.map)
      .bindPopup(this.createMarkerPopupContent(result));
        
      // 儲存標記
      this.markers.push({ location: result, marker: marker });

      // 清空搜索结果和搜索查詢
      this.searchResults = [];
      this.searchQuery = '';

      // 清空 filteredSearchResults
      this.filteredSearchResults = [];

      // 只在第一次添加標記時設置地圖視角
      if (this.markers.length === 1) {
        this.map.setView([latlng.lat, latlng.lng], 13);
      }

      // 監聽地圖縮放事件，並調整標記位置
      this.map.on('zoomend', () => {
        this.markers.forEach(({ marker }) => {
          marker.setLatLng(marker.getLatLng()).update(); // 強制更新標記位置
        });
      });
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
      this.closeTools();
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

       // 確認是否有 before 或 after 的 class
  if (this.overItem && this.overItem.classList.contains('after')) {
    overIndex++;
  } else if (this.overItem && this.overItem.classList.contains('before')) {
    overIndex = overIndex > 0 ? overIndex - 1 : 0;
  }

  // 將 this.source 插入正確的位置
  this.itinerary.splice(overIndex, 0, this.source);
    
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
                });
        },
    //-----------------------------------計算行程天數
    // 根據開始日期計算第 day 天的日期
    calculateDate(day) {
      const date = new Date(this.startDateObj);
      date.setDate(date.getDate() + (day - 1));
      const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      console.log('Calculated date for day:', day, 'is', formattedDate);
      return formattedDate;
      // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
    handleEditTimeClick(day) {
      this.$emit('edit-time-click', { date: this.calculateDate(day), weekday: this.getWeekday(day) });
    },
    //----------手機版地圖與行程列表顯示切換---------
    mbMapToggle(){
      this.isMapVisible = !this.isMapVisible;
      this.switchBtnText = this.isMapVisible ? '返回行程' : '顯示地圖';
    },
    //---------- 新增/編輯筆記 -----------------------------
    // 打開筆記彈出層
    openNotePopup(location) {
      this.noteTitle = location.name || '';
      this.noteContent = location.full_address || '';
      this.isNotePopupOpen = true;
    },

    // 關閉筆記彈出層
    closeNotePopup() {
      this.isNotePopupOpen = false;
    },

    // 保存筆記
    saveNote(note) {
      console.log('保存的筆記:', note);
      // 這裡可以添加保存筆記到行程或其他邏輯
      this.closeNotePopup();
    },
    // 修改：創建 popup 內容，添加新的「添加筆記」按鈕
    createMarkerPopupContent(result) {
      const container = document.createElement('div');
      container.innerHTML = `
        <div style='font-size: 16px; font-weight: bold;'>${result.name}</div>
        <div style='color: #888'>${result.full_address}</div>
      `;
      
      const addToPlanButton = document.createElement('button');
      addToPlanButton.textContent = '加入行程';
      addToPlanButton.style.color = '#4F82D4';
      addToPlanButton.style.cursor = 'pointer';
      addToPlanButton.addEventListener('click', () => {
        this.addToPlan(result);
      });
      
      // 新增：添加筆記按鈕
      const addNoteButton = document.createElement('button');
      addNoteButton.textContent = '添加筆記';
      addNoteButton.style.color = '#4F82D4';
      addNoteButton.style.cursor = 'pointer';
      addNoteButton.style.marginLeft = '10px';
      addNoteButton.addEventListener('click', () => {
        this.openNotePopup(result);
      });
      
      container.appendChild(addToPlanButton);
      container.appendChild(addNoteButton);
      return container;
    },
    /*--------------------編輯停留時間-----------------------*/
    showEditStayTime(location) {
      this.$emit('show-edit-stay-time', location); 
      //向父組件發送 show-edit-stay-time 事件，並將 location 物件作為參數傳遞。
    },
    // 更新接收到的停留時間
    updateReceivedStayTime(time) {
      this.receivedStayTime = time;
    },
    //---------計算每個景點的時間範圍-----------------------
    calculateEndTime(departureTime, duration) {
      if (!departureTime || !duration) return '00:00:00';

      // 解析出發時間
      const [departureHour, departureMin] = departureTime.split(':').map(Number);

      // 解析停留時間
      const durationMatch = duration.match(/(\d+)小時(\d+)分/);
      const durationHour = durationMatch ? parseInt(durationMatch[1]) : 0;
      const durationMin = durationMatch ? parseInt(durationMatch[2]) : 0;

      // 計算結束時間
      let endHour = departureHour + durationHour;
      let endMin = departureMin + durationMin;

      // 調整分鐘超過60的情況
      if (endMin >= 60) {
        endHour += Math.floor(endMin / 60);
        endMin = endMin % 60;
      }

      // 轉換為字串格式
      const formattedEndHour = String(endHour).padStart(2, '0');
      const formattedEndMin = String(endMin).padStart(2, '0');
      return `${formattedEndHour}:${formattedEndMin}`;
    },
    recalculateSpotTimes() {
      const departureTime = this.departureTimes[this.calculateDate(this.selectedDay)] || '07:00';
      const itinerary = this.getItineraryForDay(this.selectedDay);

      let startTime = departureTime;

      itinerary.forEach((location, index) => {
        const duration = location.receivedStayTime || this.receivedStayTime;
        const endTime = this.calculateEndTime(startTime, duration);
        location.spotTime = `${startTime} - ${endTime}`;
        startTime = endTime; // 下一個位置的開始時間
      });
      this.$forceUpdate(); // 強制重新渲染組件
    },
    //格式化景點時間，隱藏"秒"
    formatSpotTime(spotTime) {
      return spotTime.split(' - ').map(time => time.slice(0, 5)).join(' - '); // 去掉秒部分
    },

    /*--------------------行程封面照片-----------------------*/
    // 處理來自FunctionList.vue的圖片資料暫存於sessionStorage
    handleCoverImageUploaded(imageUrl) {
      this.coverImageUrl = imageUrl;
      sessionStorage.setItem('coverImage', imageUrl);
      this.showFunctionList = false;
    },
    clearCoverImage() {
      // 清除 sessionStorage 中的 coverImage 資料
      sessionStorage.removeItem('coverImage');
      console.log('coverImage 已清除');
    },
    // 新增上傳圖片的方法
    async uploadCoverImage() {
        const coverImage = sessionStorage.getItem('coverImage');
        if (!coverImage) return null;

        try {
            const response = await fetch('http://localhost/phpG6/api/uploadTripImage.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: coverImage }),
            });
            const result = await response.json();
            if (result.status === 'success') {
                return result.filename; // 假設伺服器回傳圖片檔名
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('圖片上傳失敗：', error);
            return null;
        }
    },
    /*------------------Function List----------------------*/
    toggleFunctionList() {
      this.showFunctionList = !this.showFunctionList;
    },
    closeFunctionList() {
      this.showFunctionList = false;
    },
    // 處理並傳送點擊EditPlanSetting觸發的事件到父組件
    handleEditPlanSetting() {
      this.$emit('edit-plan-setting');
      this.showFunctionList = false;
    },
    /*-------------------行程工具------------------------*/
    toggleTools(event, location) {
      event.stopPropagation(); // 防止事件冒泡
      location.showTools = !location.showTools;
    },
    closeTools() {
      // 關閉所有 location 的 tools
      this.getItineraryForDay(this.selectedDay).forEach(loc => {
        loc.showTools = false;
      });
    },
    handleNote() {
      // 筆記功能邏輯
      this.closeTools();
    },
    handleClickOutside(event) {
      this.closeTools();
    },
    /*-----------------儲存行程--------------------------*/
    async saveTripPlan() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const userId = userData?.u_id;

      if (!userId) {
        alert('未找到使用者ID，請確認您已登入');
        return;
      }

      // 取得上傳圖片檔
      const coverImageFilename = await this.uploadCoverImage();
      if (!coverImageFilename) {
          alert('圖片上傳失敗，請重試');
          return;
      }

      const tripPlanData = {
        u_id: userId,
        trp_name: this.tripData.tripName,
        trp_sdate: this.tripData.startDate,
        trp_edate: this.tripData.endDate,
        trp_area: this.tripData.selectedArea, // 使用原始的區域代碼
        trp_rate: 0,
        trp_rate_sum: 0,
        trp_is_public: false,
        trp_img: coverImageFilename, // 使用圖片檔名
        days: [], // days屬性來儲存每天的資料
      };

      for (let day = 1; day <= this.daysCount; day++) {
        const dayData = {
          day_num: day,
          spots: []
        };
      
        const locations = this.getItineraryForDay(day);
        locations.forEach((location, index) => {
          // 將 receivedStayTime 轉換為 HH:mm:ss 格式
          const formattedTime = this.formatToHHMMSS(location.receivedStayTime || this.receivedStayTime);
      
          dayData.spots.push({
            osm_id: location.place_id || location.osm_id,
            sp_time: formattedTime,
            sp_order: index,
            day_num: day
          });
          // 設置 console.log 來檢查 sp_time
          console.log(`Day ${day}, Spot ${index + 1} - sp_time: ${formattedTime}`);
        });
        tripPlanData.days.push(dayData);
      }

      // 確認 tripPlanData 的內容
      console.log('即將發送的行程資料：', tripPlanData);

      this.$emit('save-trip-plan', tripPlanData);
    },
    // 將時間轉換為 HH:mm:ss 格式的方法
    formatToHHMMSS(timeString) {
      // 將時間字串分割成小時和分鐘部分
      const [hoursStr, minutesStr] = timeString.split('小時');

      // 將小時和分鐘轉換為數字
      const hours = parseInt(hoursStr.trim(), 10);
      const minutes = parseInt(minutesStr.trim().replace('分', ''), 10);

      // 使用 padStart 方法來確保時與分都是兩位數
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      // 返回以 HH:mm:ss 格式表示的時間
      return `${formattedHours}:${formattedMinutes}:00`;
    },
    saveData() {
      // 確保spotTime格式為HH:mm:ss
      this.itinerary.forEach(location => {
        const [startTime, endTime] = location.spotTime.split(' - ');
        location.spotTime = `${startTime}:00 - ${endTime}:00`;
      });
    },
  },
  mounted() {
    this.initializeMap(); // 初始化地圖

    this.loadJsonData();
    this.calcDaysDiff();

    // 監聽 beforeunload 事件，以在掛載時先清除儲存於session storage的行程封面
    window.addEventListener('beforeunload', this.clearCoverImage);
    // 監聽全畫面任意點擊，以關閉Tool List
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // 移除 beforeunload 事件監聽
    window.removeEventListener('beforeunload', this.clearCoverImage, true);
    // 關閉Tool List後移除監聽事件
    document.removeEventListener('click', this.handleClickOutside, true);
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
        object-fit: cover;
        display: inline-block;
        filter: brightness(75%);
      }
    }
    .cover-text {
      position: absolute;
      bottom: 12px;
      left: 12px;
      color: $primaryColor;
      text-shadow: 1px 1px 3px rgba(0,0,0,.4);
      .plan-region{
        font-size: $base-fontSize * 0.875;
      }
      .plan-title {
        margin: 8px 0;
        width: 100%;
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
          width: fit-content;
          margin-top: auto;
          font-size: $base-fontSize * 0.75;
          color: $gray;
          cursor: pointer;
          text-decoration: underline;
          transition: color .3s ease;
          &:hover {
            color: $secondColor-2;
            transition: color .3s ease;
          }
        }
        .tools {
          position: absolute;
          top: 4px;
          right: 4px;
          cursor: pointer;
        }
        ul.tool-list {
          font-size: 0.875rem;
          background-color: #fff;
          color: $secondColor-2;
          position: absolute;
          top: 24px;
          right: 4px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,.2);
          width: fit-content;
          li {
            display: flex;
            gap: 10px;
            justify-content: space-between;
            background-color: unset;
            border-radius: unset;
            padding: 4px 12px;
            box-sizing: border-box;
            margin: 6px 0;
            text-align: right;
            letter-spacing: 0.8px;
            cursor: pointer;
            &:hover {
              background-color: $secondColor-2;
              color: #fff;
            }
          }
          .delete {
            color: #f66758;
            &:hover {
              background-color: #f66758;
              color: #fff;
            }
          }
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
  #saveTripPlan {
      width: 100%;
      background-color: #fff;
      color: $secondColor-2;
      padding: 12px;
      font-size: 0.875rem;
      transition: all .3s ease;
      box-shadow: 0 -2px 10px rgba(0,0,0,.1);
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: $secondColor-2;
        transition: all .3s ease;
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