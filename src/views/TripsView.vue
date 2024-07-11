<template>
  <main>
    <MapGuide v-if="showMapGuide"/>
    <Mapcomponent
      :trip-data="tripData"
      :trip-days="tripDays"
      :trip-spots="tripSpots"
      :departure-times="departureTimes"
      @edit-time-click="handleEditTimeClick"
      @edit-plan-setting="showTripSetting"
      @show-edit-stay-time="showEditStayTimeHandler"
      @save-stay-time="saveStayTimeHandler"
      @save-trip-plan="handleSaveTripPlan"
    />
    <NewTrpLightBox02 :class="{ hidden: !showNewTrpLightBox02 }" @submit-trip="handleTripSubmit" />
    <BlackLayout :class="{ hidden: !showBlackLayout }" />
    <EditDepartureTime
      v-if="showEditDepartureTime"
      :currentDate="selectedDate"
      :currentWeekday="selectedWeekday"
      @time-saved="handleTimeSaved"
      @close="closeEditDepartureTime"
    />
    <TripSetting 
      v-if="displayTripSetting" 
      @close-trip-setting="closeTripSetting"
      @submit-trip="handleTripSubmit"
    />
    <EditStayTime 
      v-if="isEditStayTimeVisible"
      :location="selectedLocation"
      @save-stay-time="saveStayTimeHandler"
      @close="closeEditStayTime"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MapGuide from '../components/map/MapGuide.vue';
import Mapcomponent from './MapComponent.vue';
import NewTrpLightBox02 from '@/components/map/NewTrpLightBox02.vue';
import BlackLayout from '@/components/layout/BlackLayout.vue';
import EditDepartureTime from '@/components/map/EditDepartureTime.vue';
import TripSetting from '@/components/map/TripSetting.vue';
import EditStayTime from '@/components/map/EditStayTime.vue';

// 使用 ref 定義 reactive 變量來控制顯示狀態
const showNewTrpLightBox02 = ref(false);
const showBlackLayout = ref(false);
// 以tripData接收來自php回傳的trip資料以及子組件傳來的值
const tripData = ref({
  trp_id: null,
  u_id: null,
  tripName: '',
  startDate: '',
  endDate: '',
  selectedArea: '',
  tripRate: 0,
  tripRateSum: 0,
  tripIsPublic: 0,
  tripImg: '',
});
const tripDays = ref([]); // 定義 tripDays 用於接收 trip_day 資料
const tripSpots = ref([]);
const locations = ref([]); // 儲存地點資料

const showEditDepartureTime = ref(false);
const selectedDate = ref('');
const selectedWeekday = ref('');
const departureTimes = ref({}); // 維護每一天的出發時間
const displayTripSetting = ref(false); // 控制 TripSetting 顯示狀態
const isEditStayTimeVisible = ref(false); //「編輯停留時間」欄位預設不顯示
const selectedLocation = ref(null); // 你的選定地點
const showMapGuide = ref(true);

// 處理行程提交
const handleTripSubmit = (data) => {
  tripData.value = { 
    ...tripData.value, 
    ...Object.keys(data).reduce((acc, key) => {
      if (data[key] !== '') {
        acc[key] = data[key];
      }
      return acc;
    }, {})
  };
  showNewTrpLightBox02.value = false;
  showBlackLayout.value = false;
  displayTripSetting.value = false;
};

// 顯示/隱藏 EditDepartureTime
const openEditDepartureTime = (date, weekday) => {
  selectedDate.value = date;
  selectedWeekday.value = weekday;
  showEditDepartureTime.value = true;
};

const closeEditDepartureTime = () => {
  showEditDepartureTime.value = false;
  showBlackLayout.value = false; // 關閉 BlackLayout
};

const toggleEditDepartureTime = () => {
  showEditDepartureTime.value = !showEditDepartureTime.value;
};

// 處理編輯時間點擊
const handleEditTimeClick = ({ date, weekday }) => {
  selectedDate.value = date;
  selectedWeekday.value = weekday;
  showEditDepartureTime.value = true;
  showBlackLayout.value = true;
};

// 處理時間保存
const handleTimeSaved = (time) => {
  // 確認有順利接收到來自EditDepartureTime.vue的資料
  console.log('接收到的時間：', time);

  const startDate = new Date(tripData.value.startDate);
  const selectedDateObj = new Date(selectedDate.value);
  const day = Math.ceil((selectedDateObj - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // 更新對應日期的出發時間
  departureTimes.value[day] = time;
  showEditDepartureTime.value = false;
  showBlackLayout.value = false;
};

// 顯示 TripSetting
const showTripSetting = () => {
  displayTripSetting.value = true;
  showBlackLayout.value = true;
};
// 關閉 TripSetting
const closeTripSetting = () => {
  displayTripSetting.value = false;
  showBlackLayout.value = false;
};

/*----------編輯景點停留時間-----------------*/ 
// 顯示 EditStayTime
const showEditStayTimeHandler = (location) => {
  selectedLocation.value = location;
  isEditStayTimeVisible.value = true;
};

// 關閉 EditStayTime
const closeEditStayTime = () => {
  isEditStayTimeVisible.value = false;
};

// 儲存停留時間
const saveStayTimeHandler = (formattedTime) => {
  // 更新對應日期的停留時間
  console.log('變更的停留時間：', formattedTime);

  // 傳遞時間到 MapComponent.vue 中的 receivedStayTime
  selectedLocation.value.receivedStayTime = formattedTime;

  closeEditStayTime(); // 儲存完畢後關閉 EditStayTime 組件
};
/*---------處理儲存行程事件與接收資料-----------*/
const handleSaveTripPlan = async (tripPlanData) => {
  console.log('接收到的行程資料：', tripPlanData); // 確認 tripPlanData 的內容
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/saveTripPlan.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripPlanData),
    });

    const data = await response.json();
    console.log('後端回應資料：', data); // 檢查後端回應的內容

    if (data.status === 'success') {
      alert('行程保存成功！');
    } else {
      alert('else:行程保存失敗，請重試。');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('catch:行程保存失敗，請重試。');
  }
};

// 加入撈取行程資料的邏輯
const loadTripData = async (trpId) => {
  try {
    const response = await fetch(`http://localhost/phpG6/api/loadTripData.php?trp_id=${trpId}`);
    const data = await response.json();

      // 將從 PHP 返回的資料映射到 Vue 組件中的 tripData
      const trip = data.trip;
      tripData.value.trp_id = trip.trp_id;
      tripData.value.u_id = trip.u_id;
      tripData.value.tripName = trip.trp_name;
      tripData.value.startDate = new Date(trip.trp_sdate).toISOString().split('T')[0]; // 確保為 YYYY-MM-DD 格式
      tripData.value.endDate = new Date(trip.trp_edate).toISOString().split('T')[0]; // 確保為 YYYY-MM-DD 格式
      tripData.value.selectedArea = trip.trp_area;
      tripData.value.tripRate = trip.trp_rate;
      tripData.value.tripRateSum = trip.trp_rate_sum;
      tripData.value.tripIsPublic = trip.trp_is_public;
      tripData.value.tripImg = trip.trp_img;

      // 將從 PHP 返回的資料映射到 Vue 組件中的 tripDays
      tripDays.value = data.trip_day.map(day => ({
        day_id: day.day_id,
        day_num: day.day_num,
        departureTimes: day.day_deptime
      }));

      // 初始化 departureTimes (spotTime和出發時間對不上可能是這裡問題)
      data.trip_day.forEach(day => {
        const time = day.day_deptime.split(':');
        departureTimes.value[day.day_num] = `${time[0]}:${time[1]}`;
      });

      tripSpots.value = await Promise.all(data.trip_spot.map(async spot => {
      const osmData = await fetchOSMLocationData(spot.osm_id);
      console.log('OpenStreetMap 資料：', osmData);
      return {
        ...spot,
        spotTime: '',
        receivedStayTime: spot.sp_time,
        location: osmData,
      };
    }));

      console.log('接收php的trip資料：', data.trip);
      console.log('接收php的trip_day資料：', data.trip_day);
      console.log('接收php的trip_spot資料：', data.trip_spot);
      console.log('轉換後的departureTimes:', JSON.stringify(departureTimes.value));
      console.log('轉換後的tripSpots:', tripSpots.value);

      // 對每個 trip_spot 進行查詢，並儲存結果到 locations
    const locationPromises = data.trip_spot.map(async (spot) => {
      const osmId = spot.osm_id;
      const locationData = await fetchOSMLocationData(osmId);
      return {
        ...locationData,
        osm_id: osmId
      };
    });

    locations.value = await Promise.all(locationPromises);
    console.log('查詢到的地點資料locations：', JSON.stringify(locations.value));

    // 確認 tripSpots 中的 location 是否正確儲存
    console.log('轉換後的tripSpots儲存:', JSON.stringify(tripSpots.value));

  } catch (error) {
    console.error('撈取行程資料時出錯:', error);
  }
};
const fetchOSMLocationData = async (osmId) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/details.php?place_id=${osmId}&format=json`);
    const data = await response.json();

    if (data.error) {
      throw new Error('OpenStreetMap returned an error');
    }

    const geometry = data.geometry;
    const coordinates = geometry.coordinates;
    
    let lat = 0, lon = 0;
    if (coordinates && coordinates.length >= 2) {
      lon = coordinates[0];
      lat = coordinates[1];
    }

    return {
      name: data.localname,
      lat: lat,
      lon: lon
    };
  } catch (error) {
    console.error('撈取 OSM 資料時出錯:', error);
    return { name: '', lat: 0, lon: 0 }; // 如果出錯，返回空資料
  }
};


// 從 URL 中取得 trp_id 並載入行程資料
const getTrpIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('trp_id');
};

// 在組件載入後顯示 MapGuide、NewTrpLightBox01 及 BlackLayout
onMounted(() => {
  showNewTrpLightBox02.value = true;
  showBlackLayout.value = true;

  const trpId = getTrpIdFromUrl();
  if (trpId) {
    // 如果存在 trp_id，載入行程資料並隱藏組件
    loadTripData(trpId);
    showNewTrpLightBox02.value = false;
    showBlackLayout.value = false;
    showMapGuide.value = false;
  } else {
    // 如果不存在 trp_id，顯示組件
    showNewTrpLightBox02.value = true;
    showBlackLayout.value = true;
  }
});

</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
