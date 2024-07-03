<template>
  <main>
    <MapGuide />
    <!-- 傳遞 departureTime 給 MapComponent -->
    <Mapcomponent
      :trip-data="tripData"
      :departure-times="departureTimes"
      @edit-time-click="handleEditTimeClick"
      @edit-plan-setting="showTripSetting"
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

// 使用 ref 定義 reactive 變量來控制顯示狀態
const showNewTrpLightBox02 = ref(false);
const showBlackLayout = ref(false);
const tripData = ref({
  tripName: '',
  startDate: '',
  endDate: '',
  selectedArea: ''
});
const showEditDepartureTime = ref(false);
const selectedDate = ref('');
const selectedWeekday = ref('');
const departureTimes = ref({}); // 維護每一天的出發時間
const displayTripSetting = ref(false); // 控制 TripSetting 顯示狀態

// // 處理行程提交
// const handleTripSubmit = (data) => {
//   tripData.value = data;

//   showNewTrpLightBox02.value = false;
//   showBlackLayout.value = false;
//   displayTripSetting.value = false;
// };

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
  // 更新對應日期的出發時間
  departureTimes.value[selectedDate.value] = time; 
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

// 在組件載入後顯示 MapGuide、NewTrpLightBox01 及 BlackLayout
onMounted(() => {
  showNewTrpLightBox02.value = true;
  showBlackLayout.value = true;
});
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
