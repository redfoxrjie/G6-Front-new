<template>
    <div>
      <header>
        <h1>Travel Planner</h1>
        <button @click="startPlanning">開始規劃</button>
      </header>
      <main>
        <section id="itinerary">
          <h2>Your Itinerary</h2>
          <label for="trip-date">Select Date:</label>
          <input type="date" id="trip-date" v-model="tripDate" @change="loadItinerary">
          <ul id="itinerary-list">
            <!-- 遍历行程数组，生成行程项 -->
            <li v-for="(item, index) in itinerary" :key="index" class="itinerary-item" :data-lat="item.lat" :data-lng="item.lng" :data-start-time="item.startTime">
              <span class="number">{{ index + 1 }}.</span>
              <span class="itinerary-item-info">{{ item.name }}</span>
              <span class="coords">({{ item.lat.toFixed(6) }}, {{ item.lng.toFixed(6) }})</span>
              <span class="time">{{ item.startTime }}</span>
              <img v-if="item.photo" :src="item.photo" class="photo" />
              <span class="remarks">{{ item.remarks }}</span>
              <button class="edit" @click="editItem(index)">Edit</button>
              <button @click="deleteItem(index)">Delete</button>
            </li>
          </ul>
          <form id="destination-form" @submit.prevent="addDestination">
            <input type="text" id="destination-name" v-model="newDestination.name" placeholder="Destination Name" required>
            <input type="file" id="photo" ref="photo_upload" @change="onFileChange">
            <input type="text" id="remarks" v-model="newDestination.remarks" placeholder="Remarks">
            <button type="submit">Add Destination</button>
          </form>
        </section>
        <section id="map">
          <h2>Map</h2>
          <div id="map-container"></div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';  // 引入leaflet的CSS
  import 'leaflet-routing-machine';
  import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // 引入leaflet-routing-machine的CSS
  const blackIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  export default {
    data() {
      return {
        map: null, // 存储地图实例
        routeControl: null, // 存储路线控制实例
        tripDate: '', // 存储用户选择的日期
        itinerary: [], // 存储行程列表
        newDestination: { // 存储新添加的目的地信息
          name: '',
          remarks: '',
          photo: null
        }
      };
    },
    mounted() {
      this.initializeMap(); // 初始化地图
      this.addDefaultDestination(); // 添加默认目的地
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.showError); // 获取当前地理位置
      } else {
        alert('您的浏览器不支持地理定位功能');
      }
      this.loadItinerary(); // 加载存储的行程
    },
    methods: {
      // 初始化地图
      initializeMap() {
        this.map = L.map('map-container').setView([24.958277478835058, 121.22528019206256], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.routeControl = L.Routing.control({
          waypoints: [],
          routeWhileDragging: true
        }).addTo(this.map);
      },
      // 添加默认目的地
      addDefaultDestination() {
        const defaultItem = {
          name: "緯育TibaMe附設中壢職訓中心",
          lat: 24.958277478835058,
          lng: 121.22528019206256,
          startTime: "09:00",
          photo: null,
          remarks: ""
        };
        this.itinerary.push(defaultItem);
        this.addMarker(defaultItem);
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
      // 添加新目的地
      addDestination() {
        const latLng = this.map.getCenter(); // 使用地图中心点的坐标
        console.log(this.newDestination);
        const newItem = {
          name: this.newDestination.name,
          lat: latLng.lat,
          lng: latLng.lng,
          startTime: "09:00",
          photo: this.newDestination.photo,
          remarks: this.newDestination.remarks
        };
        this.itinerary.push(newItem);
        this.addMarker(newItem);
        this.saveItinerary();
        this.resetForm();
      },
      // 在地图上添加标记
      addMarker(item) {
        const marker = L.marker([item.lat, item.lng],{ icon: blackIcon }, { draggable: true }).addTo(this.map)
          .bindPopup(item.name)
          .openPopup();
  
        marker.on('dragend', (event) => {
          const newLatLng = event.target.getLatLng();
          item.lat = newLatLng.lat;
          item.lng = newLatLng.lng;
          this.updateRoute();
          this.saveItinerary();
        });
  
        this.updateRoute();
      },
      // 更新路线
      updateRoute() {
        const waypoints = this.itinerary.map(item => L.latLng(item.lat, item.lng));
        this.routeControl.setWaypoints(waypoints);
      },
      // 保存行程到本地存储
      saveItinerary() {
        localStorage.setItem('itinerary', JSON.stringify(this.itinerary));
      },
      // 从本地存储加载行程
      loadItinerary() {
        const savedItinerary = JSON.parse(localStorage.getItem('itinerary'));
        if (savedItinerary) {
          this.itinerary = savedItinerary;
          this.itinerary.forEach(item => this.addMarker(item));
          this.updateRoute();
        }
      },
      // 重置表单
      resetForm() {
        this.newDestination = {
          name: '',
          remarks: '',
          photo: null
        };
        document.getElementById('photo').value = '';
        this.$refs.photo_upload.value = '';
      },
      // 处理文件上传
      onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newDestination.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      // 编辑行程项
      editItem(index) {
        const newName = prompt('Enter new name:', this.itinerary[index].name);
        if (newName) {
          this.itinerary[index].name = newName;
          this.saveItinerary();
          this.loadItinerary();
        }
      },
      // 删除行程项
      deleteItem(index) {
        this.itinerary.splice(index, 1);
        this.saveItinerary();
        this.loadItinerary();
      },
      // 开始规划按钮点击处理函数
      startPlanning() {
        // 在这里实现规划逻辑
      }
    }
  };
  </script>
  
  <style scoped>
  /* 全局样式 */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
  }
  
  /* 页眉样式 */
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
  
  /* 主要内容样式 */
  main {
    display: flex;
    width: 100%;
    max-width: 1200px;
    margin-top: 1rem;
  }
  
  /* 行程列表样式 */
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
  
  #itinerary ul {
    padding: 0;
    list-style-type: none;
  }
  
  #itinerary li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e0e0e0;
  }
  
  #itinerary li:last-child {
    border-bottom: none;
  }
  
  /* 行程表单样式 */
  form#destination-form {
    margin-top: 1rem;
  }
  
  form#destination-form input,
  form#destination-form button {
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 100%;
  }
  
  form#destination-form button {
    background-color: #0073e6;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  form#destination-form button:hover {
    background-color: #005bb5;
  }
  
  /* 地图样式 */
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
  
  /* 行程项目样式 */
  .itinerary-item {
    display: flex;
    align-items: center;
  }
  
  .itinerary-item img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 1rem;
  }
  
  .itinerary-item-info {
    flex: 1;
  }
  
  .itinerary-item-time {
    font-size: 0.9rem;
    color: #888;
  }
  
  .itinerary-item-remarks {
    font-size: 0.9rem;
    color: #777;
  }
  
  .itinerary-item button {
    background-color: #ff4c4c;
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .itinerary-item button:hover {
    background-color: #e60000;
  }
  
  .itinerary-item .edit {
    background-color: #0073e6;
  }
  
  .itinerary-item .edit:hover {
    background-color: #005bb5;
  }
  
  .day-header {
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  </style>
  